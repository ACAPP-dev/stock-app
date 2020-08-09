import React from 'react'
import { connect } from 'react-redux'

import DailyRow from '../components/daily/DailyRow'
import DailyForm from '../components/daily/DailyForm'

import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class DailyContainer extends React.Component {


    render() {



        return (
            <div className='daily-div'>
                <h2>Daily Container</h2>
                < DailyForm />
                
                <Table striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ticker</th>
                            <th>Name</th>
                            <th colspan='3'>Day 1</th>
                            <th colspan='3'>Day 2</th>
                            <th colspan='3'>Day 3</th>
                            <th colspan='3'>Day 4</th>
                            <th colspan='3'>Day 5</th>
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

export default connect ()(DailyContainer)