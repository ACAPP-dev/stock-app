import React from 'react'
import Table from 'react-bootstrap/Table'

const TickerList = (props) => {
    console.log('tickerlist props:', props)
    
    const handleClick = (event) => {
        props.returnTicker(event.target.parentElement.getAttribute('data-ticker'))
        
    }

    return (
        <div>
            <h2>Click on Ticker to Select</h2>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Company Name</th>
                        <th>Exchange</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tickers.map(ticker => {
                        return(
                            
                        <tr data-ticker={ticker.ticker} onClick={handleClick}>
                            <td>{ticker.ticker}</td>
                            <td>{ticker.ticker_name}</td>
                            <td>{ticker.exchange}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
        
        </div>
    )

}

export default TickerList