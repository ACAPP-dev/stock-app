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
        this.props.getDailyData(formData, this.state.user.id)
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
    return state
}

const mapDispatchToProps = dispatch => {

    return {getDailyData: (formData, userId) => dispatch(getDailyData(formData, userId))}
}

export default connect (mapStateToProps, mapDispatchToProps)(DailyContainer)