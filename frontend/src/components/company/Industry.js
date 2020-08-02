import React from 'react'

const Industry = props => {

    return(
        <table className='small-table'>
            <tbody>
                <tr>
                    <td>Sector</td>
                    <td>{props.data.industry}</td>
                </tr>
                <tr>
                    <td>Market Capitalization</td>
                    <td>{props.data.market_cap}</td>
                </tr>
                <tr>
                    <td>Outstanding Shares</td>
                    <td>{props.data.outstanding_shares}</td>
                </tr>
                <tr>
                    <td>Three Month Trading Volume</td>
                    <td>{props.data.three_month_trading_volume}</td>
                </tr>
            </tbody>
        </table>

        
    )



}

export default Industry