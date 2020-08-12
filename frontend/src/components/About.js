import React from 'react'

const About = () => {
    return (
        <div className='home-div'>
            <h2>About Andrew's Stock App</h2>
            <div>Problem: Most stock apps use standard time periods (day, week, month, year) to view stock price trends.  This can make it difficult to spot and track price movement over short term periods.</div>
            <br />
            <div>Solution: "Andrew's Stock App" allows the user to view candlestick charts over custom time periods, create and maintain watchlists, and view stock price data over a user specified three day period.</div>
            <br />
            <div><h4>Features</h4>
                <ul>
                    <li>Easily create an account with your name, email address, and password.</li>
                    <li>Passwords are encrypted using bcrypt.</li>
                    <li>Enter stock ticker or enter company name and select from list.</li>
                    <li>View company data and candlestick stock chart for user specified time period.</li>
                    <li>Create and save multiple "watchlists" to quickly view stock data.</li>
                    <li>Daily View (list of multiple stocks on one page):
                        <ol>
                            <li>Select watchlist.</li>
                            <li>Specify custom three day period.</li>
                            <li>Get a table with closing stock price and movement for each day.</li>
                            <li>See every stock in your specified watchlist.</li>
                        </ol>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default About