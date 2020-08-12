import React from 'react'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import market from '../../images/market.png'

const WatchListing = props => {
    console.log('watchlisting props: ', props)

    const handleView = id => {
        props.viewWatchlist(id)
    }

    const handleRemove = id => {
        props.returnRemove(id)
    }

    

    return(
        
            <Container className='watchlist-card-container'>
            {props.watchlists.map(watchlist => {
                return(
                    
                    <Card bg='light' className='watchlist-card' key={watchlist.id}>
                        <Card.Img variant='top' src={ market } height='100px' />
                        
                        <Card.Body>
                            <Card.Title>{watchlist.name}</Card.Title>
                            <Card.Text>{watchlist.description}</Card.Text>
                        </Card.Body>
                        
                        <Card.Footer>
                            <Button className='watchlist-btn' variant='primary' onClick={() => handleView(watchlist.id)}>View/Edit</Button>
                            <Button className='watchlist-btn' variant='danger' onClick={() => handleRemove(watchlist.id)}>Delete</Button>
                        </Card.Footer>

                    </Card>
                   
               
                )
            })}

        </Container>
       
           
    )



}

export default WatchListing
