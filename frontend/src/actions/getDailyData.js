function getDailyData(formData, watchlistObj) {
    console.log('formdata from getDailyData: ', formData)
  
      // !!!Need to iterate through watchlistObj.companies for company fetches...

    const FINNHUB_BASIC_URL = 'https://finnhub.io/api/v1'
    const FINNHUB_QUOTE_URL = '/quote?symbol='
    const FINNHUB_COMPANY_DATA_URL = '/stock/profile2?symbol='
    const FINNHUB_BASIC_DATA_URL = '/stock/metric?symbol='
    const FINNHUB_CHART_URL = '/stock/candle?symbol='
    const FINNHUB_CHART_TIMEFRAME = '&resolution=D&from='
    const FINNHUB_API_KEY = '&token=bsfleivrh5rf14r5rh80'
    const chartStartDate = (Date.parse(formData.startDate)/1000).toString()
    const chartEndDate = (Date.parse(formData.endDate)/1000).toString()
    let finnhubTimeframeUrl = FINNHUB_CHART_TIMEFRAME + chartStartDate + '&to=' + chartEndDate
    let companyData = {}
    let quoteData = {}
    let basicData = {}
    let newChartData = []
    
    const dailyDataArry = []

    

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
        return newChartData
    }

    return dispatch => {
        dispatch({ type: 'START_GET_DAILY_DATA'})
        

        return watchlistObj.companies.map((index, company) => {
           
            // Get company, stock, and chart data from API (3 fetches)
    
                fetch(FINNHUB_BASIC_URL + FINNHUB_COMPANY_DATA_URL + company.ticker + FINNHUB_API_KEY)
                .then(resp => resp.json())
                .then(json => {
                    companyData = json
                    console.log('companydata in getdailydata: ', companyData)
                    return fetchChartData()
                })

                const fetchChartData = () => {
                    fetch(FINNHUB_BASIC_URL + FINNHUB_CHART_URL + company.ticker + finnhubTimeframeUrl + FINNHUB_API_KEY)
                    .then(resp => resp.json())
                    .then(json => {
                        console.log('chart data: ', json)
                        newChartData = readyChartData(json)
                        return makeObj()
                    })
                }
        
                const makeObj = () => {
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
                            industry: companyData.finnhubIndustry
                            },
                        chartStartDate: chartStartDate,
                        chartEndDate: chartEndDate,
                        chartData: newChartData
                    }
                    if (index < watchlistObj.companies.length) {
                        return dailyDataArry.push(companyDataObject)
                    } else {
                        dailyDataArry.push(companyDataObject)
                        return databaseFetch()
                    }
                }
        })

        const databaseFetch = () => {
            // Persist company and chart data to database

            const companyObject = {
                method: 'POST',
                headers: {"Content-Type": "application/json", "Accept": "application/json"},
                body: JSON.stringify(dailyDataArry)
            }

            fetch('http://localhost:3000/daily', companyObject)
            .then(resp => resp.json())
            .then(json => {
                console.log('add daily data database response: ', json)
                return dispatch({type: 'ADD_DAILY_DATA', payload: json})
            })
        }
    }

}
    export default getDailyData