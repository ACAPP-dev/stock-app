
function watchlistReducer(state={}, action) {
    console.log('State from watchlistReducer:', state)
    console.log('Action from watchlistReducer:', action)
    
    switch (action.type) {
        case 'ADD_WATCHLIST':
            // debugger
            return state
        default:
            return state
    }

    
}

export default watchlistReducer