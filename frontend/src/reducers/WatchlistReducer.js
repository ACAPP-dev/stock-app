
function watchlistReducer(state={companies: []}, action) {
    console.log('State from watchlistReducer:', state)
    console.log('Action from watchlistReducer:', action)
    
    switch (action.type) {
        case 'ADD_WATCHLIST':
            // debugger
            return state
            
        case 'START_GET_WATCHLIST_DETAIL':
            return state

        case 'GET_WATCHLIST_DETAIL':
            
            const companies = []

            action.payload.companies.map(company => {
                companies.push({
                    id: company.id,
                    ticker: company.ticker,
                    name: company.name
                })
            })

            const watchlistDetail = {
                id: action.payload.id,
                name: action.payload.name,
                description: action.payload.description,
                companies: companies
            }
            // debugger
            return {...state, ...watchlistDetail}

    default:
        return state
    }
}

export default watchlistReducer