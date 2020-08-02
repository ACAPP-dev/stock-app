import React from 'react'

const Statistics = props => {

    return(
        <table className='small-table'>
            <tbody>
                <tr>
                    <td>Exchange</td>
                    <td>{props.data.exchange}</td>
                </tr>
                <tr>
                    <td>52 Week High</td>
                    <td>{props.data.fifty_two_week_high}</td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td>{props.data.fifty_two_week_high_date}</td>
                </tr>
                <tr>
                    <td>52 Week Low</td>
                    <td>{props.data.fifty_two_week_low}</td>
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