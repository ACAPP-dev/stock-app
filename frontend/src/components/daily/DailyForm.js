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
        startDate: '2020-07-01',
        endDate: '2020-07-09'
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
                            End Date for View (5 Days Max)
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