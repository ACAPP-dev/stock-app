import React from 'react'
import Tickers from '../components/ticker/TickerList'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import fetchCompany from '../actions/fetchCompany'
import TickerForm from '../components/ticker/TickerForm'

class TickerContainer extends React.Component {

    state = {
        redirect: false
    }

    handleSubmit = (ticker) => {
        this.setState({redirect: true})
        this.props.fetchCompanyData(ticker)
    }

    render() {
        if (this.state.redirect) {
            
            return <Redirect to="/company" />
        } else {
            return < TickerForm buttonText={'Get Stock Data'} returnSubmit={this.handleSubmit} />
        }  
    }
}

const mapDispatchToProps = dispatch => {
    return {fetchCompanyData: (ticker) => dispatch(fetchCompany(ticker))}
}


export default connect(null, mapDispatchToProps)(TickerContainer)
