import React from 'react'
import { connect } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// need to set up and import presentational navbar components

class NavBarContainer extends React.Component {

    render() {
        return (
            <Navbar fixed='top' bg='dark' variant='dark'>
                <Navbar.Brand href='/about'>Andrew's Stock App</Navbar.Brand>
                <Nav className='mr-auto'>
                    <Nav.Link href='/'>Home</Nav.Link>
                    <Nav.Link href='/login'>Login</Nav.Link>
                </Nav>
                
            </Navbar>
            
        )
    }
}

export default connect()(NavBarContainer)