import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const WatchListing = props => {
    console.log('watchlisting props: ', props)

    const handleRemove = id => {
        props.returnRemove(id)
    }

    return(
        <React.Fragment>
            <h2>List of Watchlists</h2>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Company Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.watchList.map(watchlist => {
                        return(
                        <tr key={watchlist.id}>
                            <td>{watchlist.name}</td>
                            <td>{watchlist.description}</td>
                            <td><Button variant='dark' onClick={() => handleRemove(watchlist.id)}>Remove</Button></td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
        </React.Fragment>

    )



}

export default WatchListing
