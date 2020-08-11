import React from 'react'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'

export default class NewUser extends React.Component {

    state = {
        name: "",
        email: "",
        password: ""
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    showError = () => {
        return (<Alert className='alert' variant='danger'><h4>{this.props.reducerError}</h4></Alert>)
    }

    returnSignup = (event) => {
        event.preventDefault()
        this.props.signupUser(this.state)
    }

    render() {
        if (this.props.loggedIn) {
            return <Redirect to="/" />
        } else {
            return(
                <div className='login-div'>
                    {this.props.reducerError ? this.showError() : null}
                    <h2>New User Signup</h2>
                    <Form className='login-form' onSubmit={this.returnSignup}>
                    <Form.Group >
                            <Form.Label>Full Name: </Form.Label>
                            <Form.Control type='text' onChange={this.handleChange} name='name' placeholder='Enter first and last name' value={this.state.name} required />
                            <Form.Text className='text-muted'>
                                Full name for account
                            </Form.Text>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Email: </Form.Label>
                            <Form.Control type='email' onChange={this.handleChange} name='email' placeholder='Enter email' value={this.state.email} required />
                            <Form.Text className='text-muted'>
                                Email address is used for login
                            </Form.Text>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" onChange={this.handleChange} name='password' placeholder="Enter password" value={this.state.password} required />
                            <Form.Text className='text-muted'>
                                Password is encripted using Bcrypt GEM
                            </Form.Text>
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Create User
                        </Button>
                    </Form>
                </div>
            )
        }
    }
}