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
        startDate: new Date(new Date().setDate(new Date().getDate() - 3)).toJSON().slice(0,10),
        endDate: new Date().toJSON().slice(0,10)
    }

    handleChange = event => {
        if (event.target.name === 'startDate') {
            const newEndDate = new Date(new Date(event.target.value).setDate(new Date(event.target.value).getDate() + 3)).toJSON().slice(0,10)
            this.setState({
                startDate: event.target.value,
                endDate: newEndDate
            })
        } else if (event.target.name === 'endDate') {
            const newStartDate = new Date(new Date(event.target.value).setDate(new Date(event.target.value).getDate() - 3)).toJSON().slice(0,10)
            this.setState({
                startDate: newStartDate,
                endDate: event.target.value
            })
        }
    }

    returnSubmit = event => {


    }

    
    selectWatchlist = () => {
        
            return (
                <DropdownButton title="Select Watchlist">
                    {this.props.user.watchlists.map(watchlist => {
                        return (
                            <Dropdown.Item>{watchlist.name}</Dropdown.Item>
                        )
                    })}    
                </DropdownButton>
            )
        }

    render() {
    return (
        <div>
                
        <Form>
            
            
            <Form.Group >
                
                <Form.Label>Daily Setup</Form.Label>
                <Row>
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
                    <Col><Button>Refresh Data</Button></Col>
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