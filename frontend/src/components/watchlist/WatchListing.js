import React from 'react'
import Table from 'react-bootstrap/Table'

const WatchListing = props => {
    console.log('watchlisting props: ', props)


    return(
        <React.Fragment>
            <h2>List of Watchlists</h2>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Company Name</th>
                    </tr>
                </thead>
                <tbody>
                    {props.watchList.map(watchlist => {
                        return(
                        <tr>
                            <td>{watchlist.name}</td>
                            <td>{watchlist.description}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
        </React.Fragment>

    )



}

export default WatchListing
