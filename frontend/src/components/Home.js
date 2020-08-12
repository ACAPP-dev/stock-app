import React from 'react'
import { NavLink } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Home = () => {
    return(
        <div className='home-div'>
            <h2>Home Component</h2>
            <p>Select Item Below to Get Started!</p>
            
            <Row>
                <Col className='home-col'>
                    <NavLink exact className='nav-link' to="/about">Instructions</NavLink></Col>
                <Col className='home-col'>
                    <NavLink exact className='nav-link' to="/login">Login</NavLink>
                </Col>
            </Row>
            <Row>
                <Col className='home-col'>
                    <NavLink exact className='nav-link' to="/new">Signup</NavLink>
                </Col>
                <Col className='home-col'>
                    <NavLink exact className='nav-link' to="/stock">Stock Lookup</NavLink>
                </Col>
            </Row>
            
        </div>
    )
    
}

export default Home