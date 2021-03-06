import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';

// import Bootstrap CSS for styling of certain user interface items
import 'bootstrap/dist/css/bootstrap.min.css'

import NavBarContainer from './containers/NavBarContainer';
import Home from './components/Home';
import About from './components/About'

import Login from './components/user/Login'
import NewUserForm from './components/user/NewUserForm'
import EditUserForm from './components/user/EditUserForm'
import fetchUser from './actions/fetchUser'
import createUser from './actions/createUser'
import editUser from './actions/editUser'
import DailyContainer from './containers/DailyContainer'
import TickerContainer from './containers/TickerContainer'
import CompanyContainer from './containers/CompanyContainer'
import WatchlistContainer from './containers/WatchlistContainer';

class App extends React.Component {

  handleLogin = (formData) => {
    this.props.loginUser(formData)
  }
  
  handleSignup = (formData) => {
    this.props.signupUser(formData)
  }

  handleEditUser = (formData) => {
    this.props.updateUser(formData)
  }

  render() {
    return (
    <Router>
      <div className="App">
        <div><NavBarContainer /></div>
        <div className='app-div'>
          <Route exact path="/" render={routerProps => <Home {...routerProps} user={this.props.user} />} />
          <Route exact path="/daily" component={DailyContainer} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" render={routerProps => <Login {...routerProps} reducerError={this.props.user.error} loggedIn={this.props.user.loggedIn} loginUser={this.handleLogin} />} />
          <Route exact path="/new" render={routerProps => <NewUserForm {...routerProps} reducerError={this.props.user.error} loggedIn={this.props.user.loggedIn} signupUser={this.handleSignup} />} />
          <Route exact path="/logout" render={routerProps => <Home {...routerProps} user={this.props.user} />} />
          <Route exact path="/user" render={routerProps => <EditUserForm {...routerProps} currentUser={this.props.user} reducerError={this.props.user.error} loggedIn={this.props.user.loggedIn} editUser={this.handleEditUser} />} />
          <Route exact path="/stock" component={TickerContainer} />
          <Route exact path="/company" component={CompanyContainer} />
          <Route exact path="/watchlists" component={WatchlistContainer} />
        </div>
      </div>
    </Router>)
  }
}

const mapStateToProps = state => {
  return {user: state.user}
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (user) => dispatch(fetchUser(user)),
    signupUser: (user) => dispatch(createUser(user)),
    updateUser: (user) => dispatch(editUser(user))
  }

}

export default connect (mapStateToProps,mapDispatchToProps)(App);
