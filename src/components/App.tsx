import { Component } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { DataService } from 'services/DataService'
import { User } from '../models/User'
import { AuthService } from '../services/AuthService'
import history from '../utils/history'
import { Home } from './Home'
import { Login } from './Login'
import { Navbar } from './Navbar'
import { Profile } from './Profile'
import { Spaces } from './space/Spaces'

interface AppState {
  user: User | undefined
}

export class App extends Component<{}, AppState> {
  private authService: AuthService = new AuthService()
  private dataService: DataService = new DataService()

  constructor(props: any) {
    super(props)

    this.state = {
      user: undefined
    }

    this.setUser = this.setUser.bind(this)
  }

  private setUser(user: User) {
    this.setState({
      user: user
    })
    console.log('setting the user: ' + user)
  }

  render() {
    return (
      <div className='wrapper'>
        <Router history={history}>
          <div>
            <Navbar user={this.state.user} />
            <Switch>
              <Route exact path='/' component={Home} />

              <Route exact path='/login'>
                <Login authService={this.authService} setUser={this.setUser} />
              </Route>

              <Route exact path='/profile'>
                <Profile
                  user={this.state.user}
                  authService={this.authService}
                />
              </Route>

              <Route exact path='/spaces'>
                <Spaces dataService={this.dataService} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}
