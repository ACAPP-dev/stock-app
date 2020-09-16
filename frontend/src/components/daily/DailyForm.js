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
        chartStartDate: new Date(new Date().setDate(new Date().getDate() - 5)).toJSON().slice(0,10),
        endDate: new Date().toJSON().slice(0,10),
        chartEndDate: new Date(new Date().setDate(new Date().getDate() +1)).toJSON().slice(0,10)
    }

    convertDateToString = date => {
        return new Date(date).toJSON().slice(0,10)
    }

    convertStringToDate = date => {
        return new Date(`${date}T00:00:00`)
    }
    
    getWeekdayStartDate = date => {
        if (date.getDay() === 0) {
            return new Date(new Date(date).setDate(new Date(date).getDate() - 2))
        } else if (date.getDay() === 6) {
            return new Date(new Date(date).setDate(new Date(date).getDate() - 1))
        } else {return date}
    }

    getNextThirdWeekdayEndDate = startDate => {
        // Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6
        // Return number of days to add (normally 4 weekdays)
        switch (startDate.getDay()) {
            case 0:
                return 5
            case 1:
                return 4
            case 2:
                return 6
            case 3:
                return 6
            case 4:
                return 6
            case 5:
                return 6
            case 6:
                return 5
            default:
                return 2
        }
    }

    getPrevThirdWeekdayStartDate = endDate => {
        // Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6
        // Return number of days to deduct (normally 4 weekdays)
        switch (endDate.getDay()) {
            case 0:
                return 6
            case 1:
                return 6
            case 2:
                return 6
            case 3:
                return 6
            case 4:
                return 6
            case 5:
                return 4
            case 6:
                return 5
            default:
                return 4
        }
    }

    getWeekdayEndDate = date => {
        if (date.getDay() === 0) {
            return new Date(new Date(date).setDate(new Date(date).getDate() + 1))
        } else if (date.getDay() === 6) {
            return new Date(new Date(date).setDate(new Date(date).getDate() + 2))
        } else {return date}
    }
    
    handleChange = event => {
        
        if (event.target.name === 'startDate') {
            // Convert input date to date format
            const convertedStartDate = this.convertStringToDate(event.target.value)
            // Convert start date to weekday if needed
            const weekdayStartDate = this.getWeekdayStartDate(convertedStartDate)
            // Calculate end date based on 3 weekdays from weekdayStartDate (current fixed)
            const newEndDate = new Date(weekdayStartDate).setDate(new Date(weekdayStartDate).getDate() + this.getNextThirdWeekdayEndDate(weekdayStartDate))
            // Calculate chart start date (this date is 1 day before the set start date for calculation purposes)
            const chartStartDate = new Date(new Date(weekdayStartDate).setDate(new Date(weekdayStartDate).getDate() - 1))
            // Convert chart start date to weekday if needed 
            const chartWeekdayStartDate = this.getWeekdayStartDate(chartStartDate)
            
            this.setState({
                startDate: this.convertDateToString(weekdayStartDate),
                chartStartDate: this.convertDateToString(chartWeekdayStartDate),
                endDate: this.convertDateToString(newEndDate),
                chartEndDate: this.convertDateToString(newEndDate)
            })
        } else if (event.target.name === 'endDate') {
            
             // Convert input date to date format
            const convertedEndDate = this.convertStringToDate(event.target.value)
             // Convert end date to weekday if needed
            const weekdayEndDate = this.getWeekdayEndDate(convertedEndDate)
             // Calculate start date based on 3 weekdays before weekdayEndDate (current fixed)
            const newStartDate = new Date(weekdayEndDate).setDate(new Date(weekdayEndDate).getDate() - this.getPrevThirdWeekdayStartDate(weekdayEndDate))
             // Calculate chart start date (this date is 1 day before the set start date for calculation purposes)
            const chartStartDate = new Date(new Date(newStartDate).setDate(new Date(newStartDate).getDate() - 1))
             // Convert chart start date to weekday if needed 
            const chartWeekdayStartDate = this.getWeekdayStartDate(chartStartDate)

            this.setState({
                startDate: this.convertDateToString(newStartDate),
                chartStartDate: this.convertDateToString(chartWeekdayStartDate),
                endDate: this.convertDateToString(weekdayEndDate),
                chartEndDate: this.convertDateToString(weekdayEndDate)
            })
        } 
    }

    dropdownSelect = (id, name) => {
        this.setState({
            watchlistId: id,
            watchlistName: name
        })
    }

    returnSubmit = event => {
        event.preventDefault()
        if (this.state.watchlistId > 0) {
            this.props.returnGetData(this.state)
        } else {
            alert('Select watchlist to view stock data.')
        }
    }

    // <Form.Control required as="select" custom></Form.Control>
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
                                    End Date for View (5 Days Max)
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
    return {user: state.user}
}
export default connect(mapStateToProps)(DailyForm)