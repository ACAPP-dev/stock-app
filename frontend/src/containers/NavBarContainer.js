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
                    
                    {/* <NavLink activeClassName='active-nav' className='nav' to={`/users/${this.props.user.id}/watchlists`} >Watchlists</NavLink> */}
                    <NavLink activeClassName='active-nav' className='nav' to='/watchlists'>Watchlists</NavLink>
                    <NavLink activeClassName='active-nav' className='nav' to='/logout'>Logout</NavLink>
                    {/* Need to add link to specific user details below */}
                    <NavLink activeClassName='active-nav' className='nav' to='/user' >
                    <img className='nav-image' src={ checkmark } alt='checkmark' width='20' height='20' />
                        {this.props.user.name}
                    </NavLink>
                </React.Fragment>
            )

        } else {
            return <NavLink activeClassName='active-nav' className='nav' to="/login" >Login</NavLink>
                    }
    }


    render() {
        return (
            <Navbar fixed='top' bg='dark' variant='dark'>
                <Navbar.Brand>
                    <NavLink activeClassName='active-nav' className='nav' to="/about" >Andrew's Stock App</NavLink>
                </Navbar.Brand>
                <Nav className='mr-auto'>
                    <NavLink exact activeClassName='active-nav' className='nav' to="/" >Home</NavLink>
                    <NavLink activeClassName='active-nav' className='nav' to="/stock" >Look Up Stock</NavLink>
                    <NavLink activeClassName='active-nav' className='nav' to="/company" >Company Data</NavLink>
                    
                </Nav>
                <Nav className='justify-content-end'>
                    {this.userNavInfo()}
                    
                </Nav>
            </Navbar>
            
        )
    }
}

const mapStateToProps = state => {
    // console.log('mapStateToProps in NavBarContainer:', state)
    return {user: state.user}
}


export default connect(mapStateToProps)(NavBarContainer)