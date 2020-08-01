import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';
// import Bootstrap CSS for styling of certain user interface items
import 'bootstrap/dist/css/bootstrap.min.css'

import NavBarContainer from './containers/NavBarContainer';
import Home from './components/Home';
import About from './components/About'

import Login from './components/Login'

import fetchUser from './actions/fetchUser'
import TickerContainer from './containers/TickerContainer'
import CompanyContainer from './containers/CompanyContainer'
import WatchlistContainer from './containers/WatchlistContainer';

// from to in stock data is unix time from 6/1/20 to 6/15/20
const FINNHUB_STOCK_DATA_URL = 'https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=1590969600&to=1592179200&token=bsfleivrh5rf14r5rh80'
const FINNHUB_API_KEY = 'bsfleivrh5rf14r5rh80'





class App extends React.Component {

  

  // Disable Fetch for now...
  componentDidMount() {
    // fetch(FINNHUB_STOCK_DATA_URL)
    // .then(resp => resp.json())
    // .then(json => {
    //   console.log(json)
    // })

    // Testing: Automatically Log in seed user
    // need to code
  }


    //sample api request from finnhub.io documentation
    // const request = require('request');

    // request('https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=1572651390&to=1572910590&token=bsfleivrh5rf14r5rh80', { json: true }, (err, res, body) => {
    //   if (err) { return console.log(err); }
    //   console.log(body.url);
    //   console.log(body.explanation);
    // });

  handleLogin = (formData) => {
    // debugger
    this.props.loginUser(formData)
  }
  
  render() {
    return (
    <Router>
      <div className="App">
        <div><NavBarContainer /></div>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" render={routerProps => <Login {...routerProps} loggedIn={this.props.user.loggedIn} loginUser={this.handleLogin} />} />
          <Route exact path="/logout" component={Home} />
          <Route exact path="/user" component={Home} />
          <Route exact path="/stock" component={TickerContainer} />
          <Route exact path="/company" component={CompanyContainer} />
          <Route exact path="/watchlists" component={WatchlistContainer} />
        </div>
      </div>
    </Router>)
  }
}

const mapStateToProps = state => {
  console.log('mapStateToProps in App:', state.user)
  return {user: state.user}
}

const mapDispatchToProps = dispatch => {
  return {loginUser: (user) => dispatch(fetchUser(user))}
}

export default connect (mapStateToProps,mapDispatchToProps)(App);
