import './index.css'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = () => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSuccessLogin = data => {
    const jwtToken = data
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    Cookies.set('user_name', username, {expires: 30})
    history.replace('/')
  }
  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const reponse = await fetch(apiUrl, option)
    const data = await reponse.json()
    onSuccessLogin(data.jwt_token)
  }

  return (
    <div className="login-container">
      <div className="login-card-container">
        <div className="login-welcome-container">
          <img
            src="https://res.cloudinary.com/mhv3tqhg/image/upload/v1788443299/Illustration.png"
            alt="login-image"
            className="login-image"
          />
        </div>
        <div className="login-credentials-container">
          <img
            src="https://res.cloudinary.com/mhv3tqhg/image/upload/f_auto,q_auto/logo"
            alt="login-logo"
            className="login-logo"
          />
          <h1 className="insta-share-heading">Insta Share</h1>
          <form className="form-container" onSubmit={onSubmitForm}>
            <label htmlFor="username" className="username-title">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Enter you username"
              className="username-style"
              id="username"
              onChange={onChangeUsername}
              value={username}
            />
            <label htmlFor="password" className="password-title">
              PASSWORD
            </label>
            <input
              type="text"
              placeholder="Enter your password"
              className="password-style"
              id="password"
              onChange={onChangePassword}
              value={password}
            />
            <input type="submit" className="submit-style" />
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
