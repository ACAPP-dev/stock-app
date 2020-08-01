function fetchCompany(ticker) {
    
  
  // from to in stock data is unix time from 6/1/20 to 6/15/20
// const FINNHUB_STOCK_DATA_URL = 'https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=1590969600&to=1592179200&token=bsfleivrh5rf14r5rh80'
const FINNHUB_COMPANY_DATA_URL = 'https://finnhub.io/api/v1/stock/profile2?symbol='
const FINNHUB_BASIC_DATA_URL = 'https://finnhub.io/api/v1/stock/metric?symbol='
const FINNHUB_API_KEY = '&token=bsfleivrh5rf14r5rh80'
let companyData = {}
let basicData = {}

    return dispatch => {
        dispatch({ type: 'START_COMPANY_FETCH'})
        
        // Get company and stock price data from API (2 fetches)

        fetch(FINNHUB_COMPANY_DATA_URL + ticker + FINNHUB_API_KEY)
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
            companyData = json
            return fetchBasicData()
        })

        const fetchBasicData = () => {
            fetch(FINNHUB_BASIC_DATA_URL + ticker + '&metric=price' + FINNHUB_API_KEY)
            .then(resp => resp.json())
            .then(json => {
                console.log(json.metric)
                basicData = json.metric
                return databaseFetch()
            })
        }

        const databaseFetch = () => {
        // Persist company data to database

        // create_table "companies", force: :cascade do |t|
        // t.string "ticker"
        // t.string "name"
        // t.string "country"
        // t.string "exchange"
        // t.string "market_cap"
        // t.string "outstanding_shares"
        // t.string "web_url"
        // t.string "logo"
        // t.string "industry"
        // t.string "three_month_trading_volume"
        // t.string "fifty_two_week_high"
        // t.string "fifty_two_week_high_date"
        // t.string "fifty_two_week_low"
        // t.string "fifty_two_week_low_date"

        const companyDataObject = {data: {
            ticker: companyData.ticker,
            name: companyData.name,
            country: companyData.country,
            exchange: companyData.exchange,
            market_cap: companyData.marketCapitalization,
            outstanding_shares: companyData.shareOutstanding,
            web_url: companyData.weburl,
            logo: companyData.logo,
            industry: companyData.finnhubIndustry,
            three_month_trading_volume: basicData['3MonthAverageTradingVolume'],
            fifty_two_week_high: basicData['52WeekHigh'],
            fifty_two_week_high_date: basicData['52WeekHighDate'],
            fifty_two_week_low: basicData['52WeekLow'],
            fifty_two_week_low_date: basicData['52WeekLowDate']
        }}
        
        const companyObject = {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify(companyDataObject)
        }

        fetch('http://localhost:3000/companies', companyObject)
        .then(resp => resp.json())
        .then(json => {
            console.log('company database response: ', json)
            return dispatch({type: 'ADD_COMPANY', payload: json})
        })
        }
    }
}

export default fetchCompany