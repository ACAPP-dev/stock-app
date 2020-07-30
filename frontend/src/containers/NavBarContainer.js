import React from 'react'
import { connect } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import checkmark from '../images/checkmark.jpg'

// import { loginUser } from '../reducers/userReducer'

// need to set up and import presentational navbar components

class NavBarContainer extends React.Component {

    userNavInfo = () => {
        // debugger
        if (this.props.user.name) {
            return (
                <React.Fragment>
                    <Nav.Link href='/logout'>Logout</Nav.Link>
                    {/* Need to add link to specific user details below */}
                    <Nav.Link href='/user' >
                    <img className='nav-image' src={ checkmark } alt='checkmark' width='20' height='20' />
                        {this.props.user.name}
                    </Nav.Link>
                </React.Fragment>
            )

        } else {
            return <Nav.Link href='/login'>Login</Nav.Link>
        }
    }


    render() {
        return (
            <Navbar fixed='top' bg='dark' variant='dark'>
                <Navbar.Brand href='/about'>Andrew's Stock App</Navbar.Brand>
                <Nav className='mr-auto'>
                    <Nav.Link href='/'>Home</Nav.Link>
                    
                    <Nav.Link href='/company'>Company Container</Nav.Link>
                    <Nav.Link href='/watchlists'>Watchlists</Nav.Link>
                    
                </Nav>
                <Nav className='justify-content-end'>
                    {this.userNavInfo()}
                    
                </Nav>
            </Navbar>
            
        )
    }
}

const mapStateToProps = state => {
    console.log('mapStateToProps in NavBarContainer:', state.users)
    return {user: state.users}
}


export default connect(mapStateToProps)(NavBarContainer)