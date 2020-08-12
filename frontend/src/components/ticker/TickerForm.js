import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TickerList from './TickerList'
import { connect } from 'react-redux'

class TickerForm extends React.Component {

    state = {
        searchText: "",
        ticker: "AAPL",
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toJSON().slice(0,10),
        endDate: new Date().toJSON().slice(0,10),
        tickers: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/tickers')
        .then(resp => resp.json())
        .then(json => this.setState({tickers: json}))
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value.toUpperCase()})
        
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.returnSubmit({
            ticker: this.state.ticker,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        })

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
            
            return < TickerList returnTicker={this.updateTicker} tickers={tickerList.slice(0, 5)} />
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
                            <Form.Label>Date Range:</Form.Label>
                            <Row>
                            <Col>
                                <Form.Label>Start Date:</Form.Label>
                                <Form.Control type="date" onChange={this.handleChange} name='startDate' value={this.state.startDate} />
                                <Form.Text className='text-muted'>
                                    Start Date for Chart
                                </Form.Text>
                            </Col>
                            <Col>
                            <Form.Label>End Date:</Form.Label>
                                <Form.Control type="date" onChange={this.handleChange} name='endDate' value={this.state.endDate} />
                                <Form.Text className='text-muted'>
                                    End Date for Chart
                                </Form.Text>
                            </Col>
                            </Row>
                        </Form.Group>
                        
                        <Button className='watchlist-btn' variant="dark" type="submit">
                            {this.props.buttonText}
                        </Button>
                        {this.props.hideAddCompany ? 
                            <Button 
                                onClick={this.props.hideAddCompany}
                                className='watchlist-btn' variant="light" >
                                Close Form
                            </Button> : null
                        }
                    </Form>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(TickerForm)
