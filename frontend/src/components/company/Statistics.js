import React from 'react'

const Statistics = props => {
    
    function formatNumber(number) {
        
        if (!number || Number.isNaN(number)) { return '' }

        const numberArry = parseFloat(number).toFixed(2).split('.')
        numberArry[0] = numberArry[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        
        // if (numberArry[1].split('').length < 2) {
        //     numberArry[1] = numberArry[1] * 10
        // } else if (numberArry[1].split('').length > 2) {
        //     numberArry[1] = Math.round(numberArry[1] / 100)
        // }   
        

        return numberArry.join('.')
    }

    return(
        <table className='small-table'>
            <tbody>
                <tr>
                    <td>Exchange</td>
                    <td>{props.data.exchange}</td>
                </tr>
                <tr>
                    <td>52 Week High</td>
                    <td>${formatNumber(props.data.fifty_two_week_high)}</td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td>{props.data.fifty_two_week_high_date}</td>
                </tr>
                <tr>
                    <td>52 Week Low</td>
                    <td>${formatNumber(props.data.fifty_two_week_low)}</td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td>{props.data.fifty_two_week_low_date}</td>
                </tr>
            </tbody>
        </table>

        
    )



}

export default Statistics