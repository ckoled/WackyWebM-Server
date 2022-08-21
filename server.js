// const path = require('path')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const { main } = require('./wackywebm.js')
const express = require('express')
const router = express.Router()
const app = express()

const tempDir = 'server_tmp';

const defaults = {
  mode: 'bounce',
  bitrate: '1M',
  thread: 2,
  tempo: 2,
  angle: 360,
  compression: 0,
  transparency: 1
}
async function wackify (req, res) {
  console.log('/wackify')
  const tempfiles = []
  try {
    const options = {
      ...defaults,
      ...req.query
    }
    let { 
      mode,
      bitrate,
      thread,
      tempo,
      angle,
      compression,
      transparency
    } = options
    // because + is space in http query
    mode = mode.toLowerCase().split(' ')
    console.log(mode)
    const filename = req.files.file.tempFilePath
    const keyfilename = req.files.keyfile?req.files.keyfile.tempFilePath:undefined
    tempfiles.push(filename, keyfilename)
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
      filename + '_out.webm'
    )
    const file = filename + '_out.webm'
    tempfiles.push(file)
    const buf = fs.readFileSync(file)
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

app.use(express.json())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: tempDir,
  debug: true
}))
app.use('/api', router)
app.get('*', function (req, res) {
  res.status(404).send("Not Found")
})

if (!fs.existsSync(tempDir)){
  fs.mkdirSync(tempDir);
}
console.log("http server listening on port 8080")
app.listen(8080)