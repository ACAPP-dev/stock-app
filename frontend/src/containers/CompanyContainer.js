import React from 'react'
import Chart from '../components/company/Chart'
import { connect } from 'react-redux'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Statistics from '../components/company/Statistics'
import Industry from '../components/company/Industry'
import addCompany from '../actions/addCompany'

class CompanyContainer extends React.Component {

    showRequesting = () => {
        return (<Alert className='alert' variant='warning'><h4>Requesting Data</h4></Alert>)

    }

    formatNumber = number => {
        if (!number || Number.isNaN(number)) { return '' }
        const numberArry = parseFloat(number).toFixed(2).split('.')
        numberArry[0] = numberArry[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return numberArry.join('.')
    }

    addCompany = (watchlistId, ticker) => {
        console.log('add company clicked in company dropdown')
        this.props.addCompany(watchlistId, ticker, this.props.user.id)
    }

    addToWatchlist = () => {
        if (this.props.data.ticker && this.props.user.watchlists.length > 0) {
            return (
                <DropdownButton title="Add to Watchlist">
                    {this.props.user.watchlists.map(watchlist => {
                        return (<Dropdown.Item
                            onClick={()=>{this.addCompany(watchlist.id, this.props.data.ticker)}}
                            >{watchlist.name}</Dropdown.Item>)
                    })}    
                </DropdownButton>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.data.requesting ? this.showRequesting() : null}
                <Container className='company-container'>
                    <Row className='company-row'>
                        <Col sm={9} >
                            <div>
                                <span><img src={this.props.data.logo} alt='logo' width='15px' height='15px' /></span>
                                <span> {this.props.data.name}</span>
                                <span> ({this.props.data.ticker})</span>
                            </div>
                            <div>
                                <span className='space-span'>Current Price: ${this.formatNumber(this.props.data.current_price)}</span>
                                <span className='space-span'>Change: {Math.round(((this.props.data.current_price / this.props.data.previous_close_price) - 1) * 10000) / 100}%</span>
                                
                            </div>
                        </Col>
                        <Col sm={3} > {this.addToWatchlist()}</Col>
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
                <div className='watchlist-div'>{this.props.data.name} - Candlestick Chart</div>
                < Chart chart={this.props.data.charts.find(chart => chart.chart_type === 'Candle') || this.props.data.charts[0]} />
            </React.Fragment>
        )
    }
    
}

const mapStateToProps = state => {
    console.log('state in companycontainer:', state)
    return {data: state.companies, user: state.user}
}

const mapDispatchToProps = dispatch => {
    return {addCompany: (watchlistId, formData, userId) => dispatch(addCompany(watchlistId, formData, userId))}
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyContainer)