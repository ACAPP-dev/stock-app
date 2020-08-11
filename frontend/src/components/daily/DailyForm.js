import React from 'react'
import { connect } from 'react-redux'

import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class DailyForm extends React.Component {

    state = {
        watchlistId: '',
        watchlistName: 'Select',
        startDate: new Date(new Date().setDate(new Date().getDate() - 2)).toJSON().slice(0,10),
        chartStartDate: new Date(new Date().setDate(new Date().getDate() - 3)).toJSON().slice(0,10),
        endDate: new Date().toJSON().slice(0,10),
        chartEndDate: new Date(new Date().setDate(new Date().getDate() +1)).toJSON().slice(0,10)
    }

    convertDateToString = date => {
        return date.toJSON().slice(0,10)
    }

    convertStringToDate = date => {
        return new Date(`${date}T00:00:00`)
    }

    getWeekdayStartDate = date => {
        if (date.getDay() === 0) {
            return date.setDate(new Date(date).getDate() - 2)
        } else if (date.getDay() === 6) {
            return date.setDate(new Date(date).getDate() - 1)
        } else {return date}
    }

    getWeekdayEndDate = date => {
        if (date.getDay() === 0) {
            return date.setDate(new Date(date).getDate() + 1)
        } else if (date.getDay() === 6) {
            return date.setDate(new Date(date).getDate() + 2)
        } else {return date}
    }
    
    handleChange = event => {
        
        if (event.target.name === 'startDate') {
            
            // Convert input date to date format
            const convertedStartDate = this.convertStringToDate(event.target.value)
            // Convert start date to weekday if needed
            const weekdayStartDate = this.getWeekdayStartDate(convertedStartDate)
            // Calculate end date based on 3 days (current fixed)
            const newEndDate = weekdayStartDate.getDate() + 2
            // Convert end date to weekday if needed
            const weekdayEndDate = this.getWeekdayEndDate(newEndDate)
            // Calculate chart end date based on weekday end date (this is 1 day after the shown date due to the requirements of the API)
            const chartEndDate = weekdayEndDate.getDate() + 1
            // Convert chart end date to weekday if needed
            const chartWeekdayEndDate = this.getWeekdayEndDate(chartEndDate)
            // Calculate chart start date (this date is 1 day before the set start date for calculation purposes)
            const chartStartDate = weekdayStartDate.getDate() - 1
            // Convert chart start date to weekday if needed 
            const chartWeekdayStartDate = this.getWeekdayStartDate(chartStartDate)
            

            this.setState({
                startDate: this.convertDateToString(weekdayStartDate),
                chartStartDate: this.convertDateToString(chartWeekdayStartDate),
                endDate: this.convertDateToString(weekdayEndDate),
                chartEndDate: this.convertDateToString(chartWeekdayEndDate)
            })
        } else if (event.target.name === 'endDate') {
            const newStartDate = new Date(new Date(event.target.value).setDate(new Date(event.target.value).getDate() - 2)).toJSON().slice(0,10)
            const newChartStartDate = new Date(new Date(event.target.value).setDate(new Date(event.target.value).getDate() - 3)).toJSON().slice(0,10)
            const newChartEndDate = new Date(new Date(event.target.value).setDate(new Date(event.target.value).getDate() + 1)).toJSON().slice(0,10)
            this.setState({
                startDate: newStartDate,
                endDate: event.target.value,
                chartStartDate: newChartStartDate,
                chartEndDate: newChartEndDate
            })
        } 
        console.log('setstate in daily form: ', this.state)
    }

    dropdownSelect = (id, name) => {
        this.setState({
            watchlistId: id,
            watchlistName: name
        })
    }

    returnSubmit = event => {
        event.preventDefault()
        this.props.returnGetData(this.state)

    }

    
    selectWatchlist = () => {
        
            return (
                <DropdownButton 
                    title={'Watchlist: ' + this.state.watchlistName}
                    
                    >
                    {this.props.user.watchlists.map(watchlist => {
                        return (
                            <Dropdown.Item 
                                key={watchlist.id}
                                onClick={()=>this.dropdownSelect(watchlist.id, watchlist.name)}
                            >{watchlist.name}</Dropdown.Item>
                        )
                    })}    
                </DropdownButton>
            )
        }

    render() {
    return (
        <div className='daily-form-div'>
                
        <Form onSubmit={this.returnSubmit}>
            
            
            <Form.Group >
                <Row >
                    <Col>{this.selectWatchlist()}</Col>    
                    <Col>
                        <Form.Label>Start Date:</Form.Label>
                        <Form.Control type="date" onChange={this.handleChange} name='startDate' value={this.state.startDate} />
                        <Form.Text className='text-muted'>
                            Start Date for View
                        </Form.Text>
                    </Col>
                    <Col>
                    <Form.Label>End Date:</Form.Label>
                        <Form.Control type="date" onChange={this.handleChange} name='endDate' value={this.state.endDate} />
                        <Form.Text className='text-muted'>
                            End Date for View (3 Days Max)
                        </Form.Text>
                    </Col>
                    <Col><Button variant='success' type='submit'>Get Data</Button></Col>
                </Row>
            </Form.Group>
            </Form>
            </div>
    )
    }
}

const mapStateToProps = state => {
    console.log('state in daily form: ', state)
    return {user: state.user}
}
export default connect(mapStateToProps)(DailyForm)