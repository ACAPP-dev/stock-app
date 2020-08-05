import React from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const WatchDetail = props => {
    console.log('watchdetail props: ', props)
    
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
                </tr>
            </thead>
            <tbody>
                {props.watchDetail.companies.map((company, index)=>{
                    return (<tr key={company.id}>
                        <td>{index + 1}</td>
                        <td>{company.ticker}</td>
                        <td>{company.name}</td>
                        <td>Future: Add stock price</td>
                    </tr>)
                })}
            </tbody>
            </Table>
            <Button className='watchlist-btn'>Add Stock</Button>
            <Button className='watchlist-btn'>Hide Detail</Button>
        </Container>
    )
}

export default WatchDetail