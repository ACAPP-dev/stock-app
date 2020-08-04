import React from 'react'
import Chart from '../components/company/Chart'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Statistics from '../components/company/Statistics'
import Industry from '../components/company/Industry'

class CompanyContainer extends React.Component {

    render() {
        return (
            <React.Fragment>
                <h2>Company Container</h2>
                
                <Container className='company-container'>
                    <Row className='company-row'>
                        <Col sm={9} >
                            <div>
                                <span><img src={this.props.data.logo} alt='logo' width='15px' height='15px' /></span>
                                <span> {this.props.data.name}</span>
                                <span> ({this.props.data.ticker})</span>
                            </div>
                            <div>Need to add latest stock price</div>
                        </Col>
                        <Col sm={3} >Add to watchlist button</Col>
                    </Row>
                    <Row className='company-row'>
                        <Col className='company-col'>
                            <h6>Latest Stock Statistics</h6>
                            < Statistics data={this.props.data} />
                        </Col>
                        <Col>
                        <h6>Company Info</h6>
                            < Industry data={this.props.data} />

                        </Col>
                    </Row>



                </Container>
                <p>Chart goes here</p>
                < Chart chart={this.props.data.charts[0]} />
            </React.Fragment>
        )
    }
    
}

const mapStateToProps = state => {
    // console.log('state in companycontainer:', state)
    return {data: state.companies}
}

export default connect(mapStateToProps)(CompanyContainer)