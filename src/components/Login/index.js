import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isError: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, isError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  usernameChanged = event => {
    this.setState({username: event.target.value})
  }

  passwordChanged = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://res.cloudinary.com/dfgc7y56h/image/upload/v1674630318/Frame_274_mv1aa0.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="hotel-name">Tasty Kitchens</h1>
          <h1 className="login">Login</h1>
          <div className="input-container">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              onChange={this.usernameChanged}
              className="input-element"
              id="username"
              type="text"
              value={username}
              placeholder="Enter Username"
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              onChange={this.passwordChanged}
              className="input-element"
              id="password"
              type="password"
              value={password}
              placeholder="Enter Password"
            />
          </div>

          <button type="submit" className="login-btn">
            {' '}
            Login
          </button>
          {isError && <p className="error-msg">*{errorMsg}</p>}
        </form>

        <img
          src="https://res.cloudinary.com/dfgc7y56h/image/upload/v1674540368/Rectangle_1456_mxblxu.png"
          alt="website login"
          className="login-img"
        />
      </div>
    )
  }
}

export default Login
