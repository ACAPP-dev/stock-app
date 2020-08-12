function getDailyData(formData, watchlistObj, userId) {
  
    const FINNHUB_BASIC_URL = 'https://finnhub.io/api/v1'
    const FINNHUB_COMPANY_DATA_URL = '/stock/profile2?symbol='
    const FINNHUB_CHART_URL = '/stock/candle?symbol='
    const FINNHUB_CHART_TIMEFRAME = '&resolution=D&from='
    const FINNHUB_API_KEY = '&token=bsfleivrh5rf14r5rh80'
    const chartStartDate = (Date.parse(formData.chartStartDate)/1000).toString()
    const chartEndDate = (Date.parse(`${formData.chartEndDate}T22:00:00`)/1000).toString()
    let finnhubTimeframeUrl = FINNHUB_CHART_TIMEFRAME + chartStartDate + '&to=' + chartEndDate

    const readyChartData = (chartData) => {

        if (chartData.length > 0) {
            return chartData.t.map( (date, index) => {
                return (
                    {date: date,
                    open: chartData.o[index],
                    high: chartData.h[index],
                    low: chartData.l[index],
                    close: chartData.c[index]
                    }
                )
            })
        } else {
            return chartData
        }
    }

    

    return dispatch => {
        dispatch({ type: 'START_GET_DAILY_DATA'})
        
        const databaseFetch = dailyData => {
            // Persist company and chart data to database
        //    debugger
            const companyObject = {
                method: 'POST',
                headers: {"Content-Type": "application/json", "Accept": "application/json"},
                body: JSON.stringify({userId: userId, watchlistId: formData.watchlistId, data: dailyData})
            }
    
            fetch('http://localhost:3000/daily', companyObject)
            .then(resp => resp.json())
            .then(json => {
                console.log('add daily data database response: ', json)
                return dispatch({type: 'ADD_DAILY_DATA', payload: json})
            })
        }

        

        function fetchData(ticker) {
            return fetch(FINNHUB_BASIC_URL + FINNHUB_COMPANY_DATA_URL + ticker + FINNHUB_API_KEY)
            .then(resp => resp.json())
            .then(json => {
                console.log('companydata in getdailydata: ', json)
                return makeCompanyObj(json)
            })
        }

        function fetchChart(ticker) {
            return fetch(FINNHUB_BASIC_URL + FINNHUB_CHART_URL + ticker + finnhubTimeframeUrl + FINNHUB_API_KEY)
            .then(resp => resp.json())
            .then(json => {
                console.log('chart data: ', json)
                return {
                    chartStartDate: chartStartDate,
                    chartEndDate: chartEndDate,
                    chartData: readyChartData(json)
                }
            })
        }
        
        
     
                
        const makeCompanyObj = (companyData) => {
            return {
                ticker: companyData.ticker,
                name: companyData.name,
                country: companyData.country,
                exchange: companyData.exchange,
                market_cap: companyData.marketCapitalization,
                outstanding_shares: companyData.shareOutstanding,
                web_url: companyData.weburl,
                logo: companyData.logo,
                industry: companyData.finnhubIndustry
            }  
        }
        

        async function chainedFetchData(p, ticker) {
            
            const companyObj = await p
            const companyData = await fetchData(ticker)
            const chartData = await fetchChart(ticker)
            console.log(companyData)
            console.log(chartData)
            // debugger
            return {...companyObj, [ticker]: {companyData: companyData, chartData: chartData}}
    
        }
       
        // const dailyDataObject = watchlistObj.companies
        //     .map(company => company.ticker)
        //     .reduce(chainedFetchData, Promise.resolve({}))
        //     .then(dailyData => databaseFetch(dailyData))

        watchlistObj.companies
            .map(company => company.ticker)
            .reduce(chainedFetchData, Promise.resolve({}))
            .then(dailyData => databaseFetch(dailyData))

    }
    
}
    export default getDailyData