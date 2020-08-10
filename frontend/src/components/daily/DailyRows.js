import React from 'react'

const DailyRows = props => {
    console.log('props in dailyrows: ', props)
    
    const findChart = company => {
        // debugger
        return company.charts.find(chart => chart_type === 'daily')
    }

    return props.watchlist.companies.map(company => {
        const chart = findChart(company)
        if (chart) {
            return (
                <tr key={company.id}>
                    <td colSpan='3' />
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