import React from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const WatchDetail = props => {
    console.log('watchdetail props: ', props)
    
    const returnHide = () => {
        props.hideWatchlist()
    }

    const addCompany = () => {
        props.addCompany()
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
                        <td>Future: Add stock price</td>
                        <td><Button variant='danger' onClick={() => removeCompany(company.id)}>Remove</Button></td>
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