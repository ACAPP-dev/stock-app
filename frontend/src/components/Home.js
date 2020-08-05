import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import WatchlistContainer from '../containers/WatchlistContainer'


const Home = () => {
    return(
        <div>
            <h2>Home Component</h2>
            <p>Need to add content: stock picker, watchlists, companies</p>
           
            <div>
                < WatchlistContainer />
            </div>
            
            <Card className="text-center">
                <Card.Header>Watchlists Card</Card.Header>
                <Card.Body>
                    <Card.Title>watchlist info</Card.Title>
                    
                </Card.Body>
                <Card.Footer className="text-muted">footer...</Card.Footer>
            </Card>
        </div>
    )
    
}

export default Home