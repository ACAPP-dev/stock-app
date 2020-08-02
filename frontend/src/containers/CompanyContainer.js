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
                        <Col sm={9} >
                            <div>
                                <span><img src={this.props.data.logo} alt='logo' width='15px' height='15px' /></span>
                                <span> {this.props.data.name}</span>
                                <span> ({this.props.data.ticker})</span></div>
                            <div>Need to add latest stock price</div>
                        </Col>
                        <Col sm={3} >Add to watchlist button</Col>
                    </Row>
                    <Row className='company-row'>
                        <Col className='company-col'>
                            <div>Latest Stock Statistics</div>
                            <p>Use statistics container to return a table</p>
                            <div>Exchange: {this.props.data.exchange}</div>
                            <div>52 Week High: {this.props.data.fifty_two_week_high}</div>
                            <div>Date: {this.props.data.fifty_two_week_high_date}</div>
                            <div>52 Week Low: {this.props.data.fifty_two_week_low}</div>
                            <div>Date: {this.props.data.fifty_two_week_low_date}</div>
                        </Col>
                        <Col>
                            <div>Industry Info</div>
                            <div>Sector: {this.props.data.industry}</div>

                        </Col>
                    </Row>



                </Container>
                <p>Chart goes here</p>
                {/* < Chart /> */}
            </React.Fragment>
        )
    }
    
}

const mapStateToProps = state => {
    console.log('state in companycontainer:', state)
    return {data: state.companies}
}

export default connect(mapStateToProps)(CompanyContainer)