import './App.css'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import Login from './components/Login'
import UserProfile from './components/UserProfile'
import ProtectedComponent from './components/ProtectedComponent'

const App = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <ProtectedComponent exact path="/" component={Home} />
    <ProtectedComponent path="/profile" component={MyProfile} />
    <ProtectedComponent path="/users/:userId" component={UserProfile} />
  </Switch>
)
export default App
