import React from 'react'
import Chart from '../components/company/Chart'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class CompanyContainer extends React.Component {

    render() {
        return (
            <React.Fragment>
                <h2>Company Container</h2>
                <Container className='company-container'>
                    <Row className='company-row'>
                        <Col sm={9} >Company Name / Info</Col>
                        <Col sm={3} >Add to watchlist button</Col>
                    </Row>
                    <Row className='company-row'>
                        <Col className='company-col'>Latest Stock Statistics</Col>
                        <Col className='company-col'>Industry Info</Col>
                    </Row>



                </Container>
                < Chart />
            </React.Fragment>
        )
    }
    
}

const mapStateToProps = state => {
    console.log('state in companycontainer:', state)
    return state
}

export default connect(mapStateToProps)(CompanyContainer)