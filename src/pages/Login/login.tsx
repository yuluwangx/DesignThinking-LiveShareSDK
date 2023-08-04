import { Button, Card, Typography } from 'antd'
import { FaMicrosoft } from 'react-icons/fa'; 
import './login.css'
import { signIn } from '../../SignIn'
import { useNavigate } from 'react-router-dom';
import logogif from '../../assets/logogif.gif';

function Login(): JSX.Element {
  const { Title } = Typography; // Destructure Title from Typography
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
            <div className="card-content"> 
              <img className="logo" src={logogif} alt="Logo" /> 
              <Title level={2} style={{ textAlign: 'center', textTransform: 'none' }}>IBM Design Thinking Toolkit</Title>
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
            </div> 
          </Card>
        </div>


  )
}
export default Login
