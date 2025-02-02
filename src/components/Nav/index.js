import {Link, withRouter} from 'react-router-dom'
import {FaEnvelope} from 'react-icons/fa'
import {IoMdHome} from 'react-icons/io'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Nav = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu">
          <Link to="/" className="nav-link">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li>Jobs</li>
          </Link>
        </ul>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <Link to="/">
            <li className="nav-menu-item-mobile">
              <IoMdHome className="nav-bar-image" />
            </li>
          </Link>
          <Link to="/jobs">
            <li className="nav-menu-item-mobile">
              <FaEnvelope className="nav-bar-image" />
            </li>
          </Link>
          <button
            type="button"
            className="logout-mobile-btn"
            onClick={onClickLogout}
          >
            <FiLogOut className="logout-icon" />
          </button>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Nav)
