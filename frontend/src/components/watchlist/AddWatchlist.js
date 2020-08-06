import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'

export default class AddWatchlist extends React.Component {

    state = {
        name: "",
        description: ""
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    returnWatchlist = (event) => {
        event.preventDefault()
        this.props.returnWatchlist(this.state)
    }

    closeForm = () => {
        this.props.closeForm()
    }

    render() {
        return(
            <div>
                <h2>Add Watchlist</h2>
                <Form className='login-form' onSubmit={this.returnWatchlist}>
                    <Form.Group >
                        <Form.Label>Watchlist Name: </Form.Label>
                        <Form.Control type='text' onChange={this.handleChange} name='name' placeholder='Enter Name' value={this.state.name} />
                        <Form.Text className='text-muted'>
                            Name for Watchlist
                        </Form.Text>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Description: </Form.Label>
                        <Form.Control type="text" onChange={this.handleChange} name='description' placeholder="Enter description" value={this.state.description} />
                        <Form.Text className='text-muted'>
                            Enter Description for Watchlist
                        </Form.Text>
                    </Form.Group>
                    <Button className='watchlist-btn' variant="primary" type="submit">Submit</Button>
                    <Button className='watchlist-btn' onClick={this.closeForm} variant="secondary">Close Form</Button>
                </Form>
            </div>
        )
    // }
    }
}