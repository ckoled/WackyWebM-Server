import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Collapse, Form, Input, InputNumber, Select, Space, Spin, Typography, Upload, UploadFile } from 'antd'
import { RcFile } from 'antd/lib/upload'
import axios from 'axios'
import { useState } from 'react'
import ReactPlayer from 'react-player'

import './App.css'

const modes = [
  'bounce',
  'shutter',
  'sporadic',
  'shrink',
  'audiobounce',
  'audioshutter',
  'transparency',
  'keyframes'
]

interface IFormValues {
  mode: string[]
}

function App() {
  const [ file, setFile ] = useState<UploadFile>()
  const [ keyfile, setKeyFile ] = useState<UploadFile>()
  const [ form ] = Form.useForm()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ errorMsg, setErrorMsg ] = useState('')
  const [ resp, setResp ] = useState<any>(null)

  const onFinish = async (vals: Partial<IFormValues>) => {
    setIsLoading(true)
    setErrorMsg('')
    console.log(vals)
    try {
      const { protocol, hostname, port } = window.location;
      const url = `${protocol}//${hostname}:${port}/api/wackify`
      const formData = new FormData();
      formData.append('file', file as RcFile);
      formData.append('keyfile', keyfile as RcFile);
      const resp = await axios.request({
        url,
        method: 'POST',
        params: vals,
        data: formData,
        responseType: 'blob'
      })
      setResp(window.URL.createObjectURL(new Blob([resp.data])))
    } catch (error) {
      setErrorMsg(JSON.stringify(error))
    }
    setIsLoading(false)
  }

  return (
    <div className="App">
      <div id='content'>
        <h1>Wackify</h1>
        <Form
          name='options'
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label='File'
          >
            <Upload
              onRemove={file => {
                setFile(undefined);
              }}
              beforeUpload={file => {
                setFile(file);

                return false;
              }}
              fileList={file?[file]:[]}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
          <Form.List name='mode'>
            {(fields, { add, remove }) => (
              <div style={{display: 'flex', flexDirection: 'column'}}>
                {fields.map(field => (
                  <Space key={field.key} align='baseline'>
                    <Form.Item
                      {...field}
                      label='Mode'
                      initialValue='bounce'
                    >
                      <Select>
                        {modes.map((mode, i) => (
                          <Select.Option key={i} value={mode}>{mode}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Mode
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>
          <Collapse>
            <Collapse.Panel header='Other Options' key='panel1'>
              <Form.Item
                name='bitrate'
                label='Bitrate'
              >
                <Input placeholder='1M'/>
              </Form.Item>
              <Form.Item
                name='tempo'
                label='Tempo'
              >
                <InputNumber placeholder='2'/>
              </Form.Item>
              <Form.Item
                name='angle'
                label='Angle'
              >
                <InputNumber placeholder='360'/>
              </Form.Item>
              <Form.Item
                name='compression'
                label='Compression'
              >
                <InputNumber placeholder='0'/>
              </Form.Item>
              <Form.Item
                name='transparency'
                label='Transparency'
              >
                <InputNumber placeholder='1'/>
              </Form.Item>
              <Form.Item
                label='KeyFile'
              >
                <Upload
                  onRemove={keyfile => {
                    setKeyFile(undefined);
                  }}
                  beforeUpload={keyfile => {
                    setKeyFile(keyfile);

                    return false;
                  }}
                  fileList={keyfile?[keyfile]:[]}
                >
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
              </Form.Item>
            </Collapse.Panel>
          </Collapse>
          <br/>
          <Form.Item>
            <Button disabled={isLoading} type='primary' htmlType='submit'>Submit</Button>
          </Form.Item>
        </Form>
        <Spin spinning={isLoading}/>
        <Typography.Title level={4} type='danger'>{errorMsg}</Typography.Title>
        { resp && 
          <>
            <a href={resp} download={file?.name + '_wacky.webm'}>Download</a>
            <ReactPlayer url={resp} muted={true} playing={true} controls={true}/>
          </>
        }
      </div>
      <footer>
        Made Using <a href='https://github.com/OIRNOIR/WackyWebM'>WackyWebM</a>
      </footer>
    </div>
  )
}

export default App
