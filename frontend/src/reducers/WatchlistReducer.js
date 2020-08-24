
function watchlistReducer(state={companies: []}, action) {
    // console.log('State from watchlistReducer:', state)
    // console.log('Action from watchlistReducer:', action)
    
    switch (action.type) {
                    
        case 'START_GET_WATCHLIST_DETAIL':
            return state

        case 'GET_WATCHLIST_DETAIL':
            
            const companies = []

            action.payload.companies.map(company => {
                return companies.push({
                    id: company.id,
                    ticker: company.ticker,
                    name: company.name,
                    currentPrice: company.current_price,
                    prevClosePrice: company.previous_close_price
                })
            })

            const watchlistDetail = {
                id: action.payload.id,
                name: action.payload.name,
                description: action.payload.description,
                companies: companies
            }
            return {...state, ...watchlistDetail}

        case 'START_WATCHLIST_REMOVE':
            return state

        case 'START_WATCHLIST_FETCH':
            return state
       
        default:
            return state
    }
}

export default watchlistReducer