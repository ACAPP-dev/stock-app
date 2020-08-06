import React from 'react'
import Tickers from '../components/ticker/TickerList'
import { connect } from 'react-redux'
import fetchCompany from '../actions/fetchCompany'
import TickerForm from '../components/ticker/TickerForm'

class TickerContainer extends React.Component {

    handleSubmit = (ticker) => {
        this.props.fetchCompanyData(ticker)
    }

    render() {
        return < TickerForm buttonText={'Get Stock Data'} returnSubmit={this.handleSubmit} />
    }
}

const mapDispatchToProps = dispatch => {
    return {fetchCompanyData: (ticker) => dispatch(fetchCompany(ticker))}
}

export default connect(null, mapDispatchToProps)(TickerContainer)
