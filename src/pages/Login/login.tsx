import { Button, Card, Typography } from 'antd'
import { FaMicrosoft } from 'react-icons/fa'
import './login.css'
import { signIn } from '../../SignIn'
import { useNavigate } from 'react-router-dom'
import logogif from '../../assets/logogif.gif'
import { pages } from '@microsoft/teams-js'
import { useEffect, useState } from 'react'
import { inTeams } from '../../utils/inTeams'
import { AppRoutes } from './AppRoutes.js'


function Login(): JSX.Element {
  const { Title } = Typography // Destructure Title from Typography
  const navigate = useNavigate() // call the useHistory hook
  const handleLogin = async (): Promise<void> => {
    try {
      // await signIn();
      navigate('/homeScreen') // navigate to home page after successful login
    } catch (err) {
      console.log(err)
    }
  }
  const [selectedRoute, setSelectedRoute] = useState(undefined)
  //@ts-ignore
  const onSelectedRouteChange = (e) => {
    setSelectedRoute(e.currentTarget.value)
  }
  useEffect(() => {
    if (!inTeams) return
    pages.config.registerOnSaveHandler(function (saveEvent) {
      pages.config.setConfig({
        suggestedDisplayName: 'Live Share React',
        contentUrl: `${window.location.origin}${selectedRoute}?inTeams=true`,
      })
      saveEvent.notifySuccess()
    })
    // Update the "Save" button in Teams to be enabled if selected route is known, otherwise disable
    pages.config.setValidityState(!!selectedRoute)
  }, [selectedRoute])

  return (
    <div className="login center">
      <Card className="login-container">
        <div className="card-content">
          < img className="logo" src={logogif} alt="Logo" />
          <Title
            level={2}
            style={{ textAlign: 'center', textTransform: 'none' }}>
            IBM Design Thinking Toolkit
          </Title>
          <input type="radio" name="Live Share Manual Join" />
          <Button
            className="button"
            type="primary"
            size="large"
            block
            icon={<FaMicrosoft />}
            onClick={handleLogin}>
            Log in with Microsoft
          </Button>
          <div>
            <input
              type="radio"
              name="Go Home Page"
              value={AppRoutes.Home}
              checked={selectedRoute === AppRoutes.Home}
              onChange={onSelectedRouteChange}
            />
            {'Go Home Page'}
          </div>
        </div>
      </Card>
    </div>
  )
}
export default Login