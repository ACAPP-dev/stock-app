import React from 'react'
import { connect } from 'react-redux'

import DailyRows from '../components/daily/DailyRows'
import DailyForm from '../components/daily/DailyForm'
import getDailyData from '../actions/getDailyData'

import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'

class DailyContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tableDetailArry: []
            
        }
        this.handleSort = this.handleSort.bind(this)

    }
    

    componentDidUpdate(prevProps, prevState) {
        console.log('Componentdidupdate: ', prevState, prevProps)
        if (prevProps.daily.companies !== this.props.daily.companies) {
            this.consolidateTableData()
        }
        // if (prevState.tableDetailArry === this.state.tableDetailArry) {
        //     console.log('true')
        // }

    }

    handleSort (event) {
      

        const sortedTable = this.state.tableDetailArry.sort( (a,b) => {
            return (a.totals.totalPercentChg > b.totals.totalPercentChg) ? 1 : -1
        })
        // debugger
        this.setState({tableDetailArry: sortedTable})
        // this.render()
    }

    showRequesting = () => {
        return (<Alert className='alert' variant='warning'><h4>Requesting Data</h4></Alert>)
    }

    getDailyData = formData => {
        
        const watchlistObj = this.props.user.watchlists.find(watchlist => {
            return watchlist.id === formData.watchlistId
        })
        this.props.getDailyData(formData, watchlistObj, this.props.user.id)
    }

    formatDate = date => {
        const newDate = new Date(date * 1000).toUTCString()
        return newDate.split(' ').slice(0,4).join(' ')
    }

    getTableDays = () => {
        let dateArry = ['Day0', 'Day 1', 'Day 2', 'Day 3']
        
        if (this.props.daily.companies.length > 0) {
            const firstChart = this.props.daily.companies[0].charts[0] || null
            if (firstChart && firstChart.chart_lines.length > 0) {
                dateArry = firstChart.chart_lines.map(line => {
                    return this.formatDate(line.date)
                })   
            }
        }
        // debugger
        return dateArry
    }

    // Add sorting capability to daily view
    findChart = (company) => {
        // debugger
        return company.charts.find(chart => chart.chart_type === 'daily')
    }

    formatNumber = number => {
        if (!number || Number.isNaN(number)) { return '' }
        const numberArry = parseFloat(number).toFixed(2).split('.')
        numberArry[0] = numberArry[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return numberArry.join('.')
    }

    makePriceObject = (chart) => {
        // Return object to use for the price data in the rows
        const priceObject =  chart.chart_lines.slice(1).map( (date, index) => {
                
                const prevClose = chart.chart_lines[index].close
                return (
                    {
                        date: date.date,
                        close: this.formatNumber(date.close),
                        dollarChg: this.formatNumber(date.close - prevClose),
                        percentChg: Math.round(((date.close / prevClose) - 1) * 10000) / 100

                    }
                )})
        // debugger
        return priceObject
    }

    totalReturn = (chart) => {
        const firstClose = chart.chart_lines[0].close
        const lastClose = chart.chart_lines[chart.chart_lines.length-1].close

        return { totalDollarChg: this.formatNumber(lastClose - firstClose),
            totalPercentChg: Math.round(((lastClose / firstClose) - 1) * 10000) / 100}

    }
    consolidateTableData = () => {
        // Making object for the table data that can be sorted easier
        let tableObject = []
        // tableObject [
        //     {
        //         id: "1",
        //         ticker: "BAC",
        //         name: "Bank of Amer",
        //         data: [ {date: "xx", close: "xx", chg$: "xx", chg%: "xx} ]
        //     }
        // ]

        if (this.props.daily.companies.length > 0) {
            tableObject = this.props.daily.companies.map(company => {
                let chartArry = []
                if (this.findChart(company)) {
                    chartArry = this.makePriceObject(this.findChart(company))
                    
                    }

                const companyObject = {
                    id: company.id,
                    ticker: company.ticker,
                    name: company.name,
                    data: chartArry,
                    totals: this.totalReturn(this.findChart(company))
                }
                return companyObject
            })
        }
        // debugger
        // return tableObject
        this.setState({tableDetailArry: tableObject})

    }

    render() {
        return (
            <div className='daily-div'>
                {this.props.daily.requesting ? this.showRequesting() : null}
                <h2>View Watchlist Stock Data for Selected Days</h2>
                < DailyForm returnGetData={this.getDailyData}/>

                <Table striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ticker</th>
                            <th>Name</th>
                            <th colSpan='3'>{this.getTableDays()[1]}</th>
                            <th colSpan='3'>{this.getTableDays()[2]}</th>
                            <th colSpan='3'>{this.getTableDays()[3]}</th>
                            
                            <th colSpan='2'>Total</th>
                            
                        </tr>
                        <tr>
                            <th colSpan='3'></th>
                            <th>Close</th>
                            <th>$ Change</th>
                            <th>% Change</th>
                            <th>Close</th>
                            <th>$ Change</th>
                            <th>% Change</th>
                            
                            <th>Close</th>
                            <th>$ Change</th>
                            <th>% Change</th>
                            <th>$ Change</th>
                            <th>
                                <button id="totalPctChg" onClick={this.handleSort}>% Change</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.props.daily.companies.length < 1 ? <tr /> : 
                        < DailyRows daily={this.props.daily} /> } */}
                        {this.props.daily.companies.length < 1 ? <tr /> : 
                        < DailyRows daily={this.state.tableDetailArry} /> }
                        {/* // < DailyRows daily={this.consolidateTableData()} /> } */}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('State in dailycontainer: ', state)
    return {
        user: state.user,
        daily: state.daily
    }
}

const mapDispatchToProps = dispatch => {
    return {getDailyData: (formData, watchlistObj, userId) => dispatch(getDailyData(formData, watchlistObj, userId))}
}

export default connect (mapStateToProps, mapDispatchToProps)(DailyContainer)