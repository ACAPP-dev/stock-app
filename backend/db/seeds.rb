# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create user(s)

user1 = User.create(name: 'Andrew Capp', email: 'acapp909@gmail.com', password: '1234')

user2 = User.create(name: 'Dad', email: 'dad@gmail.com', password: '1111')

# Build database of tickers - just use part of Excel file for now (see downloaded data in Excel files)

ticker_arry = 
    [
        {ticker: 'A', ticker_name: 'Agilent Technologies, Inc. Common Stock', exchange: 'N'}, 
        {ticker: 'AA', ticker_name: 'Alcoa Corporation Common Stock ', exchange: 'N'}, 
        {ticker: 'AAAU', ticker_name: 'Perth Mint Physical Gold ETF', exchange: 'P'}, 
        {ticker: 'AACG', ticker_name: 'ATA Creativity Global - American Depositary Shares, each representing two common shares', exchange: 'Q'}, 
        {ticker: 'AACQU', ticker_name: 'Artius Acquisition Inc. - Unit consisting of one ordinary share and one third redeemable warrant', exchange: 'Q'}, 
        {ticker: 'AADR', ticker_name: 'AdvisorShares Dorsey Wright ADR ETF', exchange: 'P'}, {ticker: 'B', ticker_name: 'Barnes Group, Inc. Common Stock', exchange: 'N'}, 
        {ticker: 'BA', ticker_name: 'Boeing Company (The) Common Stock', exchange: 'N'}, 
        {ticker: 'BAB', ticker_name: 'Invesco Taxable Municipal Bond ETF', exchange: 'P'}, 
        {ticker: 'BABA', ticker_name: 'Alibaba Group Holding Limited American Depositary Shares each representing eight Ordinary share', exchange: 'N'}
    ]

ticker_arry.each {|ticker|
    Ticker.create(ticker: ticker[:ticker], ticker_name: ticker[:ticker_name], exchange: ticker[:exchange])
}

# Build watchlists (belongs to user)

watch1 = user1.watchlists.build(name: "Main", description: "Current holdings")
watch1.save
watch2 = user1.watchlists.build(name: "Tech", description: "Tech companies")
watch2.save

# Build companies (part of watchlist_companies join table) Basic info and will download / replace statistics upon request or startup

watch1.companies.build(ticker: 'BAC')
watch1.companies.build(ticker: 'BABA')
watch1.companies.build(ticker: 'BA')
watch1.save

watch2.companies.build(ticker: 'AAPL')
watch2.companies.build(ticker: 'MSFT')
watch2.save

# For now expect chart data to download - may add later...
