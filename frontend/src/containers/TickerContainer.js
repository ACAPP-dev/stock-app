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

    handleSubmit = (formData) => {
        this.setState({redirect: true})
        this.props.fetchCompanyData(formData)
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
    return {fetchCompanyData: formData => dispatch(fetchCompany(formData))}
}


export default connect(null, mapDispatchToProps)(TickerContainer)
