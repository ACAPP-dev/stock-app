import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'


const Home = () => {
    return(
        <div>
            <h2>Home Component</h2>
            <p>Need to add content: stock picker, watchlists, companies</p>
           
            
            <Card className="text-center">
                <Card.Header>Watchlists</Card.Header>
                <Card.Body>
                    <Card.Title>watchlist info</Card.Title>
                    <Card.Text>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Ticker</th>
                            <th>Company Name</th>
                            <th>Price</th>
                            <th>Change($)</th>
                            <th>Change(%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                        </Table>
                    </Card.Text>
                    <Button variant="secondary">remove button...</Button>
                </Card.Body>
                <Card.Footer className="text-muted">footer...</Card.Footer>
            </Card>
        </div>
    )
    
}

export default Home