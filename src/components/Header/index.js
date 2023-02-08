import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'

import Cookies from 'js-cookie'

class Header extends Component {
  state = {showOptions: false}

  onClickLogoutButton = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  showOptions = () => {
    this.setState({showOptions: true})
  }

  closeOptions = () => {
    this.setState({showOptions: false})
  }

  render() {
    const {showOptions} = this.state
    const {activeTab} = this.props
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
              onClick={this.onClickLogoutButton}
            >
              Logout
            </button>
          </div>
          <div className="nav-mobile-container">
            <button
              type="button"
              className="open-icon"
              onClick={this.showOptions}
            >
              <img
                src="https://res.cloudinary.com/dfgc7y56h/image/upload/v1674631700/Icon_ohthe7.png"
                alt="options"
              />
            </button>
          </div>
        </div>
        {showOptions ? (
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
                onClick={this.onClickLogoutButton}
                type="button"
                className="logout-btn"
              >
                Logout
              </button>
            </div>
            <button
              type="button"
              className="close-btn"
              onClick={this.closeOptions}
            >
              <img
                src="https://res.cloudinary.com/dfgc7y56h/image/upload/v1674632443/Shape_fszjvo.png"
                alt="close"
                className="close-icon"
              />
            </button>
          </div>
        ) : null}
      </nav>
    )
  }
}

export default withRouter(Header)
