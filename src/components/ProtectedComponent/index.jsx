import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedComponent = props => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    console.log('No JWT → redirecting to login')
    return <Redirect to="/login" />
  }

  return <Route {...props} />
}

export default ProtectedComponent
