import React from 'react'
import { connect } from 'react-redux'

import DailyRow from '../components/daily/DailyRow'
import DailyForm from '../components/daily/DailyForm'
import getDailyData from '../actions/getDailyData'

import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class DailyContainer extends React.Component {
    
    getDailyData = formData => {
        
        const watchlistObj = this.props.watchlists.find(watchlist => {
            return watchlist.id === formData.watchlistId
        })
        this.props.getDailyData(formData, watchlistObj)
    }

    render() {

        

        return (
            <div className='daily-div'>
                <h2>Daily Container</h2>
                < DailyForm returnGetData={this.getDailyData}/>
                
                <Table striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ticker</th>
                            <th>Name</th>
                            <th colspan='3'>Day 1</th>
                            <th colspan='3'>Day 2</th>
                            <th colspan='3'>Day 3</th>
                            
                            <th colspan='2'>Total</th>
                            
                        </tr>
                        <tr>
                            <th colspan='3'></th>
                            <th>Close Price</th>
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
                        <tr>
                            <td>< DailyRow /></td>
                    
                    </tr>
                    </tbody>
                </Table>
                
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        watchlists: state.user.watchlists
    }
}

const mapDispatchToProps = dispatch => {

    return {getDailyData: (formData, watchlistObj) => dispatch(getDailyData(formData, watchlistObj))}
}

export default connect (mapStateToProps, mapDispatchToProps)(DailyContainer)