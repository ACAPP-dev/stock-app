import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
// import Bootstrap CSS for styling of certain user interface items
import 'bootstrap/dist/css/bootstrap.min.css'

// import NavBarContainer from './containers/NavBarContainer';
import Home from './components/Home';
import Login from './components/Login'

import CompanyContainer from './containers/CompanyContainer'

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
  }


    //sample api request from finnhub.io documentation
    // const request = require('request');

    // request('https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=1572651390&to=1572910590&token=bsfleivrh5rf14r5rh80', { json: true }, (err, res, body) => {
    //   if (err) { return console.log(err); }
    //   console.log(body.url);
    //   console.log(body.explanation);
    // });

  
  render() {
    return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Andrew's Final Project</h1>
          <h2>Stock App</h2>
        </header>
       
        {/* <NavBarContainer /> */}
        
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/company" component={CompanyContainer} />
      </div>
    </Router>)
  }
}

export default App;
