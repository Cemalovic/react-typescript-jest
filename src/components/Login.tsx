import React from 'react'
import { Component, SyntheticEvent } from 'react'
import { User } from '../models/User'
import { AuthService } from '../services/AuthService'
import history from '../utils/history'

interface LoginProps {
  authService: AuthService
  setUser: (user: User) => void
}

interface LoginState {
  userName: string
  password: string
  loginAttempted: boolean
  loginSuccesfull: boolean
}

interface CustomEvent {
  target: HTMLInputElement
}

export class Login extends Component<LoginProps, LoginState> {
  state: LoginState = {
    userName: '',
    password: '',
    loginAttempted: false,
    loginSuccesfull: false
  }

  private setUserName(e: CustomEvent) {
    this.setState({
      userName: e.target.value
    })
  }

  private setPassword(e: CustomEvent) {
    this.setState({
      password: e.target.value
    })
  }

  private async handleSubmit(e: SyntheticEvent) {
    e.preventDefault()

    this.setState({
      loginAttempted: true
    })

    const result = await this.props.authService.login(
      this.state.userName,
      this.state.password
    )

    if (result) {
      this.setState({
        loginSuccesfull: true
      })

      this.props.setUser(result)

      history.push('/profile')
    } else {
      this.setState({
        loginSuccesfull: false
      })
    }
  }

  render() {
    let loginMessage

    if (this.state.loginAttempted) {
      if (this.state.loginSuccesfull) {
        loginMessage = <label>Login succesfull</label>
      } else {
        loginMessage = <label>Login failed</label>
      }
    }

    return (
      <div>
        <h2>Please login</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            value={this.state.userName}
            onChange={(e) => this.setUserName(e)}
          />
          <br />
          <input
            type='password'
            value={this.state.password}
            onChange={(e) => this.setPassword(e)}
          />
          <br />
          <input type='submit' value='Login' />
        </form>
        Here is the Latest React version: <strong>{React.version}</strong>
        {loginMessage}
      </div>
    )
  }
}
