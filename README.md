# "Andrew's Stock App" Javascript / React / Redux Based Web App

Problem: Most stock apps use standard time periods (day, week, month, year) to view stock price trends.  This can make it difficult to spot and track price movement over short term periods.

Solution: "Andrew's Stock App" allows the user to view candlestick charts over custom time periods, create and maintain watchlists, and view stock price data over a user specified three day period.

## Features

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

Use the following link to see an overview of the webapp on YouTube: https://youtu.be/4omxv2ArO0c

My blog also talks about this project here: https://acapp-dev.github.io/final_project_-_stock_market_app

## Technologies

<ul>
    <li>Javascript</li>
    <li>Ruby on Rails API Framework (Ruby version 2.6.1p33)</li>
    <li>Sqlite3 Database</li>
    <li>React Open Source Framework</li>
    <li>Redux Framework for React</li>
    <li>Stock Data from Finnhub: https://Finnhub.io</li>
    <li>Charts Framework from AMCharts: https://amcharts.com</li>
</ul>

## Installation

To refresh or set up the database, use the following steps:

    $ rails db:drop

    $ rails db:migrate

    $ rails db:seed


Download the code for this webapp using:

    $ git clone https://github.com/ACAPP-dev/stock-app.git

Update Gem files using command:

    $ bundle install 
    
    or
    
    $ bundle update

## Development

    You can use:
    
    $ rails s
            
    to start webserver.
    
    Use:

    $ rails c

    to enter a console session for debugging and/or exploring.

    Start Webpage (from project directory /frontend):

    $ yarn start

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/ACAPP-dev/stock-app/issues. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

Written by **Andrew Capp** in conjunction with _Flatiron Academy_ - August 2020

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [Code of Conduct](https://github.com/ACAPP-dev/stock-app/blob/master/CODE_OF_CONDUCT.md).