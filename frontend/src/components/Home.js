import React from 'react'
import { NavLink } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Home = (props) => {
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
                    {props.user.id ?
                        <NavLink exact className='nav-link' to="/watchlists">Watchlists</NavLink> :
                        <NavLink exact className='nav-link' to="/new">Signup</NavLink>
                    }
                </Col>
                <Col className='home-col'>
                    <NavLink exact className='nav-link' to="/stock">Stock Lookup</NavLink>
                </Col>
            </Row>
            {props.user.id ? (
                <Row>
                    <Col className='home-col'>
                        <NavLink exact className='nav-link' to="/daily">Daily View</NavLink>
                    </Col>
                </Row>
                ) : null
            }   
        </div>
    )
    
}

export default Home