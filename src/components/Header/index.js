import './index.css'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const {activeTab} = props
  const activeHome = activeTab === 'HOME' ? 'active-class' : null
  const activeCart = activeTab === 'CART' ? 'active-class' : null
  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="website-logo-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dfgc7y56h/image/upload/v1674630318/Frame_274_mv1aa0.png"
              alt="website logo"
              className="website-logo1"
            />
          </Link>
          <h1 className="hotel-name1">Tasty Kitchens</h1>
        </div>
        <div className="nav-desktop-container">
          <ul className="list-container">
            <li className="list-item">
              <Link to="/" className={`list-item ${activeHome}`}>
                Home
              </Link>
            </li>
            <li className="list-item">
              <Link to="/cart" className={`list-item ${activeCart}`}>
                Cart
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="logout-btn"
            onClick={onClickLogoutButton}
          >
            Logout
          </button>
        </div>
        <div className="nav-mobile-container">
          <button type="button" className="open-icon">
            <img
              src="https://res.cloudinary.com/dfgc7y56h/image/upload/v1674631700/Icon_ohthe7.png"
              alt="options"
            />
          </button>
        </div>
      </div>
      <div className="mobile-view-container">
        <div className="nav-mobile-menu-container">
          <div className="list-container">
            <li className="list-item">
              <Link to="/" className="list-item">
                Home
              </Link>
            </li>
            <li className="list-item">
              <Link to="/cart" className="list-item">
                Cart
              </Link>
            </li>
          </div>
          <button
            onClick={onClickLogoutButton}
            type="button"
            className="logout-btn"
          >
            Logout
          </button>
        </div>
        <button type="button" className="close-btn">
          <img
            src="https://res.cloudinary.com/dfgc7y56h/image/upload/v1674632443/Shape_fszjvo.png"
            alt="close"
            className="close-icon"
          />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
