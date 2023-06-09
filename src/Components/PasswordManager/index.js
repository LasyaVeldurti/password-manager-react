import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    passwordList: [],
    website: '',
    username: '',
    password: '',
    count: 0,
    passwordHidden: true,
  }

  onFormSubmit = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],

      count: prevState.count + 1,
    }))
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    const {passwordList} = this.state
    const filteredList = passwordList.filter(eachPassword =>
      eachPassword.website
        .toLowerCase()
        .includes(event.target.value.toLowerCase()),
    )
    this.setState({passwordList: filteredList})
  }

  deleteLog = id => {
    const {passwordList} = this.state
    const filteredList = passwordList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordList: filteredList})
  }

  togglePassword = () => {
    this.setState(prevState => ({passwordHidden: !prevState.passwordHidden}))
    const {passwordHidden} = this.state
    const {starImage} = (
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        alt="stars"
      />
    )
    /*  const modifiedList = passwordList.map(
      eachPwd => (eachPwd.password = starImage),
    )
   */
    if (passwordHidden) {
      this.setState({password: starImage})
    }
  }

  render() {
    const {passwordList, website, username, password, count} = this.state
    let isListEmpty

    if (passwordList.length === 0) {
      isListEmpty = true
    } else {
      isListEmpty = false
    }

    const noPasswordsImage = (
      <img
        className="no-pwd-img"
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
      />
    )
    const renderPasswordContainer = passwordList.map(eachValue => (
      <PasswordItem
        listDetails={eachValue}
        key={eachValue.id}
        deleteLog={this.deleteLog}
      />
    ))
    return (
      <div className="bg-container">
        <div className="logo-container">
          <img
            className="logo-img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
        </div>

        <div className="input-container">
          <div className="form-container">
            <div>
              <h1 className="heading">Add new Password</h1>

              <form onSubmit={this.onFormSubmit}>
                <div className="website">
                  <img
                    className="icon-img"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                  <input
                    value={website}
                    className="input-box"
                    onChange={this.onChangeWebsite}
                    placeholder="Enter Website"
                    type="text"
                  />
                </div>
                <div className="website">
                  <img
                    className="icon-img"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                  <input
                    value={username}
                    className="input-box"
                    onChange={this.onChangeUsername}
                    placeholder="Enter Username"
                    type="text"
                  />
                </div>
                <div className="website">
                  <img
                    className="icon-img"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                  <input
                    value={password}
                    className="input-box"
                    onChange={this.onChangePassword}
                    placeholder="Enter Password"
                    type="password"
                  />
                </div>
                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
          </div>
          <picture>
            <source
              media="(min-width:767px)"
              srcSet="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            />
            <source
              media="(min-width:768px)"
              srcSet="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
            />
            <img
              className="pwd-manager-img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
              alt="password manager"
            />
          </picture>
        </div>

        <div className="output-display-container">
          <div className="password-count">
            <div className="count">
              <h1>Your Passwords </h1> <p>{count}</p>
            </div>
            <div className="search-icon">
              <img
                className="search-img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                className="input-box"
                onChange={this.onChangeSearchInput}
                placeholder="search"
                type="search"
              />
            </div>
          </div>
          <hr />
          <div>
            <div className="checkbox-container">
              <input
                onClick={this.togglePassword}
                type="checkbox"
                id="checkbox"
              />
              <label htmlFor="checkbox">Show Passwords</label>
            </div>
            <ul className="ul-container">
              {isListEmpty ? noPasswordsImage : renderPasswordContainer}
            </ul>
            <p className="no-pwd">No Passwords</p>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
