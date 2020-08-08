function fetchCompany(formData) {
    
//   debugger
  // from to in stock data is unix time from 6/1/20 to 6/15/20
// const FINNHUB_STOCK_DATA_URL = 'https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=1590969600&to=1592179200&token=bsfleivrh5rf14r5rh80'
const FINNHUB_BASIC_URL = 'https://finnhub.io/api/v1'
const FINNHUB_QUOTE_URL = '/quote?symbol='
const FINNHUB_COMPANY_DATA_URL = '/stock/profile2?symbol='
const FINNHUB_BASIC_DATA_URL = '/stock/metric?symbol='
const FINNHUB_CHART_URL = '/stock/candle?symbol='
const FINNHUB_CHART_TIMEFRAME = '&resolution=D&from='
const FINNHUB_API_KEY = '&token=bsfleivrh5rf14r5rh80'
const chartStartDate = (Date.parse(formData.startDate)/1000).toString()

// 1593561600000
// 1593561600
// Test Date: '1593561600' // July 1, 2020 - need to make this variable
const chartEndDate = (Date.parse(formData.endDate)/1000).toString()
// Test Date: '1596153600' // July 31, 2020 - need to make this variable
let finnhubTimeframeUrl = FINNHUB_CHART_TIMEFRAME + chartStartDate + '&to=' + chartEndDate
let companyData = {}
let quoteData = {}
let basicData = {}
let newChartData = []

    return dispatch => {
        dispatch({ type: 'START_COMPANY_FETCH'})
        
        // Get company, stock, and chart data from API (3 fetches)

        fetch(FINNHUB_BASIC_URL + FINNHUB_COMPANY_DATA_URL + formData.ticker + FINNHUB_API_KEY)
        .then(resp => resp.json())
        .then(json => {
            companyData = json
            return fetchQuoteData()
        })

        const fetchQuoteData = () => {
            fetch(FINNHUB_BASIC_URL + FINNHUB_QUOTE_URL + formData.ticker + FINNHUB_API_KEY)
            .then(resp => resp.json())
            .then(json => {
                quoteData = json
                return fetchBasicData()
            })
        }

        const fetchBasicData = () => {
            fetch(FINNHUB_BASIC_URL + FINNHUB_BASIC_DATA_URL + formData.ticker + '&metric=price' + FINNHUB_API_KEY)
            .then(resp => resp.json())
            .then(json => {
                basicData = json.metric
                return fetchChartData()
            })
        }

        const fetchChartData = () => {
            fetch(FINNHUB_BASIC_URL + FINNHUB_CHART_URL + formData.ticker + finnhubTimeframeUrl + FINNHUB_API_KEY)
            .then(resp => resp.json())
            .then(json => {
                console.log('chart data: ', json)
                newChartData = readyChartData(json)
                return databaseFetch()
            })

        }


        const databaseFetch = () => {
            // Persist company and chart data to database

            const companyDataObject = {
                data: {
                    ticker: companyData.ticker,
                    name: companyData.name,
                    country: companyData.country,
                    exchange: companyData.exchange,
                    market_cap: companyData.marketCapitalization,
                    outstanding_shares: companyData.shareOutstanding,
                    web_url: companyData.weburl,
                    logo: companyData.logo,
                    industry: companyData.finnhubIndustry,
                    current_price: quoteData.c,
                    previous_close_price: quoteData.pc,
                    three_month_trading_volume: basicData['3MonthAverageTradingVolume'],
                    fifty_two_week_high: basicData['52WeekHigh'],
                    fifty_two_week_high_date: basicData['52WeekHighDate'],
                    fifty_two_week_low: basicData['52WeekLow'],
                    fifty_two_week_low_date: basicData['52WeekLowDate']
                },
                chartStartDate: chartStartDate,
                chartEndDate: chartEndDate,
                chartData: newChartData
            }
        
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

// Convert chart data from API fetch to a format that can persist to the database and work with the chart library
// Add volume to model later?
const readyChartData = (chartData) => {
    const newChartData = []

    chartData.t.map( (date, index) => {
        return newChartData.push(
            {date: date,
            open: chartData.o[index],
            high: chartData.h[index],
            low: chartData.l[index],
            close: chartData.c[index]
            }
        )
    })
    // console.log(newChartData)
    return newChartData
}
// Example of chart data format: 
//  newChart.data = [ {
//     "date": "2018-08-01",
//     "open": "136.65",
//     "high": "136.96",
//     "low": "134.15",
//     "close": "136.49"
//   },

export default fetchCompany