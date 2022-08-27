const path = require('path')
const fs = require('fs')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { main } = require('./wackywebm.js')
const express = require('express')
const router = express.Router()
const app = express()

const tempDir = 'server_tmp';

async function wackify (req, res) {
  console.log('/wackify')
  const tempfiles = []
  try {
    let { 
      mode=['bounce'],
      bitrate='1M',
      thread=1,
      tempo=2,
      angle=360,
      compression=0,
      transparency=1
    } = req.query
    // because + is space in http query
    console.log(mode)
    const filename = req.files.file.tempFilePath
    const keyfilename = req.files.keyfile?req.files.keyfile.tempFilePath:undefined
    const outfile = filename + '_out.webm'
    tempfiles.push(filename, keyfilename, outfile)
    
    await main(
      mode,
      filename,
      keyfilename,
      bitrate,
      thread,
      tempo,
      angle,
      compression,
      transparency,
      outfile
    )
    
    const buf = fs.readFileSync(outfile)
    tempfiles.forEach(function (f) {
      try {
        fs.unlinkSync(f)
      } catch (e) {
        // console.log(e)
      }
    })
    res.setHeader('Content-Type', 'video/webm')
    res.status(200).send(buf)
  } catch (e) {
    console.log(e)
    tempfiles.forEach(function (f) {
      try {
        fs.unlinkSync(f)
      } catch (e) {
        // console.log(e)
      }
    })
    res.status(501).send('wackify error')
  }
}

router.post('/wackify', wackify)

app.use(cors())
app.use(express.json())
app.use('/api', fileUpload({
  useTempFiles: true,
  tempFileDir: tempDir,
  debug: true
}))
app.use('/api', router)

const root = path.join(__dirname, 'web', 'dist');
app.use(express.static(root));
app.get('/*', (req, res) => {
  res.sendFile('index.html', { root });
});

if (!fs.existsSync(tempDir)){
  fs.mkdirSync(tempDir);
}
console.log("http server listening on port 8080")
app.listen(8080)