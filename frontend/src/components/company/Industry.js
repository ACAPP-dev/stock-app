import React from 'react'

const Industry = props => {

    function formatNumber(number) {
        if (!number || Number.isNaN(number)) { return '' }
        const numberArry = parseFloat(number).toFixed(2).split('.')
        numberArry[0] = numberArry[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return numberArry.join('.')
    }


    return(
        <table className='small-table'>
            <tbody>
                <tr>
                    <td>Sector</td>
                    <td>{props.data.industry}</td>
                </tr>
                <tr>
                    <td>Market Capitalization</td>
                    <td>{formatNumber(props.data.market_cap)}M</td>
                </tr>
                <tr>
                    <td>Outstanding Shares</td>
                    <td>{formatNumber(props.data.outstanding_shares)}M</td>
                </tr>
                <tr>
                    <td>Three Month Average Trading Volume</td>
                    <td>{formatNumber(props.data.three_month_trading_volume/10)}M</td>
                </tr>
            </tbody>
        </table>

        
    )



}

export default Industry