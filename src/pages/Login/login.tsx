import { Button, Card } from 'antd'
import { FaMicrosoft } from 'react-icons/fa'; 
import './login.css'
import { signIn } from '../../SignIn'
import { useNavigate } from 'react-router-dom'; // import useHistory hook

function Login(): JSX.Element {
  const navigate = useNavigate(); // call the useHistory hook
  const handleLogin = async (): Promise<void> => {
    try {
      await signIn();
      navigate('/home');  // navigate to home page after successful login
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login center">
      <Card className="login-container">
          <Button
            className="button"
            type="primary"
            size="large"
            block
            icon={<FaMicrosoft />}
            onClick={handleLogin}
          >
            Log in with Microsoft
          </Button>        
      </Card>
    </div>
  )
}
export default Login
