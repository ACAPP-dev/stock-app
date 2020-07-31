import React from 'react'
import { NavLink } from 'react-router-dom';
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
            return <NavLink style={{ marginRight: '10px' }} to="/login" >Login</NavLink>
                    }
    }


    render() {
        return (
            <Navbar fixed='top' bg='dark' variant='dark'>
                <Navbar.Brand>
                    <NavLink style={{ marginRight: '10px' }} to="/about" >Andrew's Stock App</NavLink>
                </Navbar.Brand>
                <Nav className='mr-auto'>
                    <NavLink style={{ marginRight: '10px' }} to="/" >Home</NavLink>
                    <NavLink style={{ marginRight: '10px' }} to="/stock" >Look Up Stock</NavLink>
                    <NavLink style={{ marginRight: '10px' }} to="/company" >Company Data</NavLink>
                    <NavLink style={{ marginRight: '10px' }} to="/watchlists" >Watchlists</NavLink>
                </Nav>
                <Nav className='justify-content-end'>
                    {this.userNavInfo()}
                    
                </Nav>
            </Navbar>
            
        )
    }
}

const mapStateToProps = state => {
    console.log('mapStateToProps in NavBarContainer:', state)
    return {user: state.user}
}


export default connect(mapStateToProps)(NavBarContainer)