import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import WatchlistContainer from '../containers/WatchlistContainer'


const Home = () => {
    return(
        <div className='watchlist-div'>
            <h2>Home Component</h2>
            <p>Need to add content: stock picker, watchlists, companies</p>
            
            <Row>
                <Col className='home-col'>Instructions</Col>
                <Col className='home-col'>Log In</Col>

            </Row>
            <Row>
                <Col className='home-col'>Daily View</Col>
                <Col className='home-col'>Stock Lookup</Col>

            </Row>
            
        </div>
    )
    
}

export default Home