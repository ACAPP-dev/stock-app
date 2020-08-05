import React from 'react'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

const WatchListing = props => {
    console.log('watchlisting props: ', props)

    const handleRemove = id => {
        props.returnRemove(id)
    }

    return(
        
            <Container className='watchlist-card-container'>
            {props.watchList.map(watchlist => {
                return(
                    
                    <Card className='watchlist-card' key={watchlist.id}>
                        <Card.Img variant='top' src='holder.js/100px160' />
                        <Card.Body>
                            <Card.Title>{watchlist.name}</Card.Title>
                            <Card.Text>{watchlist.description}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant='dark' onClick={() => handleRemove(watchlist.id)}>Edit Watchlist</Button>
                            <Button variant='danger' onClick={() => handleRemove(watchlist.id)}>Remove Watchlist</Button>
                        </Card.Footer>

                    </Card>
                   
               
                )
            })}

        </Container>
       
           
    )



}

export default WatchListing
