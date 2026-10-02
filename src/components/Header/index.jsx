import './index.css'
import {FaSearch} from 'react-icons/fa'
import {useState, useContext} from 'react'
import {useHistory, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import SearchContext from '../../SearchContext'

const Header = () => {
  const history = useHistory()
  const [isMenu, setisMenu] = useState(false)
  const {searchInput, setSearchInput} = useContext(SearchContext)
  const toggle = () => {
    setisMenu(prev => !prev)
  }
  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }
  const navbarDetails = isMenu ? 'navigation show-menu' : 'navigation'
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/')
  }
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img
          src="https://res.cloudinary.com/mhv3tqhg/image/upload/v1788442354/logo.png"
          alt="logo"
          className="logo-style"
        />
        <h1>Insta Share</h1>
      </div>

      <div className={navbarDetails}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Caption"
            onChange={onChangeSearchInput}
            value={searchInput}
          />
          <FaSearch />
        </div>
        <Link to="/" className="nav-link">
          Home
        </Link>

        <Link to="/profile" className="nav-link">
          Profile
        </Link>

        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>

      <button type="button" className="menu-button" onClick={toggle}>
        {isMenu ? '✕' : '☰'}
      </button>
    </nav>
  )
}

export default Header
