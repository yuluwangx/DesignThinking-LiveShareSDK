import { Button, Card, Form, Input, message } from 'antd'
import './login.css'
// import { useStore } from '../../store/index'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setToken } from '../../utils/token'

interface IValues {
  username: string
  password: string
}

function Login(): JSX.Element {
  // const { loginStore } = useStore()
  const navigate = useNavigate()

  const onFinish = async (values: IValues): Promise<void> => {
    console.log('Success:', values)
    const info = await axios.post('http://localhost:8080/login', values)
    console.log(info)
    if (info.data.code === 200) {
      setToken(info.data.data)
      navigate('/face')
      message.success('SUCCESS')
    } else {
      message.error('ERROR')
    }
  }

  return (
    <div className="login">
      <Card className="login-container">
        <div className="Log">LOGIN</div>
        <Form
          initialValues={{
            remember: true,
          }}
          validateTrigger={['onBlur', 'onChange']}
          onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your phone!',
              },
              {
                pattern: /^[a-zA-Z]{6}$/,
                message: 'Invalide username(Six alphabet)',
                validateTrigger: 'onBlur',
              },
            ]}>
            <Input size="large" placeholder="Please input your username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                len: 6,
                message: 'Atleaste 6 digits',
                validateTrigger: 'onBlur',
              },
            ]}>
            <Input size="large" placeholder="Please input your password" />
          </Form.Item>

          <Form.Item>
            <Button
              className="button"
              type="primary"
              htmlType="submit"
              size="large"
              block>
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login
