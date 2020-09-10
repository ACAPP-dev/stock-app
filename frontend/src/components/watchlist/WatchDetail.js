import React from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import WatchlistLike from './WatchlistLike'

const WatchDetail = props => {
    
    function formatNumber(number) {
        if (!number || Number.isNaN(number)) { return '' }
        const numberArry = parseFloat(number).toFixed(2).split('.')
        numberArry[0] = numberArry[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return numberArry.join('.')
    }

    const returnHide = () => {
        props.hideWatchlist()
    }

    const addCompany = () => {
        props.addCompany()
    }

    const viewCompany = ticker => {
        props.viewCompany(ticker)
    }
    
    const removeCompany = companyId => {
        props.removeCompany(props.watchDetail.id, companyId, )
    }

    

    return (
        <Container>
            <h2>{props.watchDetail.name}</h2>
            <h4>{props.watchDetail.description}</h4>
            <Table striped bordered hover size='sm'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Ticker</th>
                    <th>Name</th>
                    <th>Price...</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.watchDetail.companies.map((company, index)=>{
                    return (<tr key={company.id}>
                        <td>{index + 1}</td>
                        <td>{company.ticker}</td>
                        <td>{company.name}</td>
                        <td>
                            <div className='space-span'>Current Price: ${formatNumber(company.currentPrice)}</div>
                            <div className='space-span'>Change: {Math.round(((company.currentPrice / company.prevClosePrice) - 1) * 10000) / 100}%</div>
                        </td>
                        <td><Button className='watchlist-btn' variant='success' onClick={() => viewCompany(company.ticker)}>View Detail</Button>
                        <Button className='watchlist-btn' variant='danger' onClick={() => removeCompany(company.id)}>Remove</Button></td>
                       
                    </tr>)
                })}
            </tbody>
            </Table>
            <Button onClick={addCompany} className='watchlist-btn'>Add Stock</Button>
            <Button onClick={returnHide} className='watchlist-btn'>Hide Detail</Button>
        </Container>
    )
}

export default WatchDetail