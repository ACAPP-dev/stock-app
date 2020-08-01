import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Tickers from '../components/ticker/TickerList'
import { connect } from 'react-redux'
import fetchCompany from '../actions/fetchCompany'

class TickerContainer extends React.Component {

    
    state = {
        searchText: "",
        ticker: "AAPL",
        startDate: "",
        tickers: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/tickers')
        .then(resp => resp.json())
        .then(json => this.setState({tickers: json}))
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
        
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.fetchCompanyData(this.state.ticker)

    }
    
    updateTicker = (ticker) => {
        this.setState({ticker: ticker})
    }

    returnTickers = () => {
        
        if (this.state.searchText) {
            const tickerList = this.state.tickers.filter(ticker => {
                const matchText = new RegExp(this.state.searchText, "gi")
                return ticker.ticker_name.match(matchText)
            })
            
            return < Tickers returnTicker={this.updateTicker} tickers={tickerList.slice(0, 5)} />
        }
    }

    render() {
        

        return (

            <div>
                <h2>Enter Company Name to Search for Ticker</h2>
                <Form className='login-form' onSubmit={this.handleSubmit}>
                    <Form.Group >
                        <Form.Label>Company Name to Search:</Form.Label>
                        <Form.Control type='text' onChange={this.handleChange} name='searchText' value={this.state.searchText} />
                            <Form.Text className='text-muted'>
                                Enter company name to search for ticker
                            </Form.Text>
                        </Form.Group>
                        <div>
                            {this.returnTickers()}
                        </div>
                        
                        <h2>or Enter Ticker</h2>
                        <Form.Group >
                        <Form.Label>Ticker:</Form.Label>
                        <Form.Control type='text' onChange={this.handleChange} name='ticker' value={this.state.ticker} />
                            <Form.Text className='text-muted'>
                                Enter ticker to get stock data
                            </Form.Text>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Date Range(Future):</Form.Label>
                            <Form.Control type="date" onChange={this.handleChange} name='startDate' placeholder="07/01/2020" value={this.state.startDate} />
                            <Form.Text className='text-muted'>
                                Will add in future
                            </Form.Text>
                        </Form.Group>
                        
                        <Button variant="dark" type="submit">
                            Get Stock Data
                        </Button>
                    </Form>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => {
    return {fetchCompanyData: (ticker) => dispatch(fetchCompany(ticker))}

}

export default connect(mapStateToProps, mapDispatchToProps)(TickerContainer)
