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

    const getPriceData = chart => {
        // Return object to use for the price data in the rows
        const priceReturn =  chart.chart_lines.slice(1).map( (date, index) => {
                
                const prevClose = chart.chart_lines[index].close
                return (
                    {
                        close: formatNumber(date.close),
                        dollarChg: formatNumber(date.close - prevClose),
                        percentChg: Math.round(((date.close / prevClose) - 1) * 10000) / 100

                    }
                )})
        // debugger
        return priceReturn
    }

    const totalReturn = chart => {
        const firstClose = chart.chart_lines[0].close
        const lastClose = chart.chart_lines[chart.chart_lines.length-1].close

        return { totalDollarChg: formatNumber(lastClose - firstClose),
            totalPercentChg: Math.round(((lastClose / firstClose) - 1) * 10000) / 100}

    }

    // Original Functionality based on store passed to props
    // return props.daily.companies.map(company => {
    //     const chart = findChart(company)
        
    //     if (chart) {
    //         const priceData = getPriceData(chart)
    //         const totalData = totalReturn(chart)
    //         return (
    //             <tr key={company.id}>
    //                 <td>{company.id}</td>
    //                 <td>{company.ticker}</td>
    //                 <td>{company.name}</td>
    //                 {priceData.map( (day, index) => {
    //                     return (
    //                         <React.Fragment key={index}>
    //                         <td className='td-right'>${day.close}</td>
    //                         <td className='td-right'>${day.dollarChg}</td>
    //                         <td className='td-right'>{day.percentChg}%</td>
    //                         </React.Fragment>
    //                     )
    //                 })}
    //                 <React.Fragment>
    //                 <td className='td-right'>${totalData.totalDollarChg}</td>
    //                 <td className='td-right'>{totalData.totalPercentChg}%</td>
    //                 </React.Fragment>
    //             </tr>

    //         )
            
    //     } else { return (<tr>Blank Row</tr>)}


    // })

    // Revised functionality based on new tableObject passed as props

    return props.daily.map(company => { 
        return (
            <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.ticker}</td>
                <td>{company.name}</td>
                {company.data.map( (day, index) => {
                    return (
                        <React.Fragment key={index}>
                        <td className='td-right'>${day.close}</td>
                        <td className='td-right'>${day.dollarChg}</td>
                        <td className='td-right'>{day.percentChg}%</td>
                        </React.Fragment>
                    )
                })}
                <React.Fragment>
                <td className='td-right'>${company.totals.totalDollarChg}</td>
                <td className='td-right'>{company.totals.totalPercentChg}%</td>
                </React.Fragment>
            </tr>
        )
    })
}

export default DailyRows