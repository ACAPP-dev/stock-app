import React from 'react'
import { connect } from 'react-redux'

import DailyRows from '../components/daily/DailyRows'
import DailyForm from '../components/daily/DailyForm'
import getDailyData from '../actions/getDailyData'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class DailyContainer extends React.Component {
    
    showRequesting = () => {
        return (<Alert className='alert' variant='warning'><h4>Requesting Data</h4></Alert>)
    }

    getDailyData = formData => {
        
        const watchlistObj = this.props.user.watchlists.find(watchlist => {
            return watchlist.id === formData.watchlistId
        })
        this.props.getDailyData(formData, watchlistObj, this.props.user.id)
    }

    render() {

        

        return (
            <div className='daily-div'>
                {this.props.daily.requesting ? this.showRequesting() : null}
                <h2>View Watchlist Stock Data for Selected Days</h2>
                < DailyForm returnGetData={this.getDailyData}/>
                
                <Table striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ticker</th>
                            <th>Name</th>
                            <th colSpan='3'>Day 1</th>
                            <th colSpan='3'>Day 2</th>
                            <th colSpan='3'>Day 3</th>
                            
                            <th colSpan='2'>Total</th>
                            
                        </tr>
                        <tr>
                            <th colSpan='3'></th>
                            <th>Close</th>
                            <th>$ Change</th>
                            <th>% Change</th>
                            <th>Close</th>
                            <th>$ Change</th>
                            <th>% Change</th>
                            
                            <th>Close</th>
                            <th>$ Change</th>
                            <th>% Change</th>
                            <th>$ Change</th>
                            <th>% Change</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                   
                        {this.props.daily.companies.length < 1 ? <tr /> : 
                        < DailyRows daily={this.props.daily} /> }
                    
                    </tbody>
                    
                </Table>
                
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('state in dailycontainer: ', state)
    return {
        user: state.user,
        daily: state.daily
    }
}

const mapDispatchToProps = dispatch => {

    return {getDailyData: (formData, watchlistObj, userId) => dispatch(getDailyData(formData, watchlistObj, userId))}
}

export default connect (mapStateToProps, mapDispatchToProps)(DailyContainer)