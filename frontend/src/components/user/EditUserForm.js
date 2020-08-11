import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'

export default class EditUserForm extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            name: props.currentUser.name,
            email: props.currentUser.email,
            password: ""
        }
    }

    
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    returnEditUser = (event) => {
        event.preventDefault()
        this.props.editUser(this.state)
    }

    render() {
        console.log('props for edituser:', this.props)
        
            return(
                <div className='login-div'>
                    <h2>Edit User</h2>
                    <Form className='login-form' onSubmit={this.returnSignup}>
                    <Form.Group >
                            <Form.Label>Full Name: </Form.Label>
                            <Form.Control type='text' onChange={this.handleChange} name='name' placeholder='Enter first and last name' value={this.state.name} />
                            <Form.Text className='text-muted'>
                                Full name for account
                            </Form.Text>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Email: </Form.Label>
                            <Form.Control type='email' onChange={this.handleChange} name='email' placeholder='Enter email' value={this.state.email} />
                            <Form.Text className='text-muted'>
                                Email address is used for login
                            </Form.Text>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Enter Password for Verification:</Form.Label>
                            <Form.Control type="password" onChange={this.handleChange} name='password' placeholder="Enter password" value={this.state.password} />
                            <Form.Text className='text-muted'>
                                Enter Password to Update User Details
                            </Form.Text>
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Update User
                        </Button>
                    </Form>
                </div>
            )
        }
    
}