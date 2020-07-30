import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'

export default class Login extends React.Component {

    state = {
        email: "acapp909@gmail.com",
        password: "1234"
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    returnLogin = (event) => {
        event.preventDefault()
        this.props.loginUser(this.state)
    }

    render() {
        console.log('login props for loginuser:', this.props.loggedIn)
        if (this.props.loggedIn) {
            return <Redirect to="/" />
        } else {
            return(
                <div>
                    <h2>User Login</h2>
                    <Form className='login-form' onSubmit={this.returnLogin}>
                        <Form.Group controlID='formBasicEmail'>
                            <Form.Label>Email: </Form.Label>
                            <Form.Control type='email' onChange={this.handleChange} name='email' placeholder='Enter email' value={this.state.email} />
                            <Form.Text className='text-muted'>
                                Email address is used for login
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" onChange={this.handleChange} name='password' placeholder="Enter password" value={this.state.password} />
                            <Form.Text className='text-muted'>
                                Password is encripted using Bcrypt GEM
                            </Form.Text>
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            )
        }
    }
}