import React from 'react'

const DailyRows = props => {
    console.log('props in dailyrows: ', props)
    
    const formatNumber = number => {
        if (!number || Number.isNaN(number)) { return '' }
        const numberArry = parseFloat(number).toFixed(2).split('.')
        numberArry[0] = numberArry[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return numberArry.join('.')
    }

    const findChart = company => {
        // debugger
        return company.charts.find(chart => chart.chart_type === 'daily')
    }

    const priceData = chart => {
        // Return object to use for the price data in the rows


        



    }


    return props.watchlist.companies.map(company => {
        const chart = findChart(company)
        if (chart) {
            return (
                <tr key={company.id}>
                    <td>{company.id}</td>
                    <td>{company.ticker}</td>
                    <td>{company.name}</td>
                    {chart.chart_lines.map(day => {
                        return (
                            <React.Fragment>
                            <td>{day.close}</td>
                            <td>Need $ Change</td>
                            <td>Need % Change</td>
                            </React.Fragment>
                        )
                    })}
                    <React.Fragment>
                    <td>Need total $ Change</td>
                    <td>Need total % Change</td>
                    </React.Fragment>
                </tr>

            )
            
        } else { return (<tr>Blank Row</tr>)}


    })
}

export default DailyRows