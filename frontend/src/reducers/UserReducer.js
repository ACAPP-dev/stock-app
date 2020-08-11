
function userReducer(state = {
        name: "", 
        email: "", 
        id: "", 
        loggedIn: false,
        watchlists: []
        }, action) {
    console.log('State from userReducer:', state)
    console.log('Action from userReducer:', action)
    
    let watchlistIndex
    let watchlistCopy
    let newWatchlists

    switch (action.type) {
        case 'START_USER_LOGIN':
            return state
        
        case 'LOGIN_USER':
        const newUser = {
            name: action.payload.name, 
            email: action.payload.email,
            id: action.payload.id,
            loggedIn: true,
            watchlists: action.payload.watchlists
        }
        return {...state, ...newUser}
        
        case 'START_CREATE_USER':
        return state

        case 'START_ADD_WATCHLIST':
            return state

        case 'ADD_WATCHLIST':
            return {...state, watchlists: action.payload} 
            
        case 'REMOVE_WATCHLIST':
            return {...state, watchlists: action.payload} 

        case 'GET_WATCHLIST_DETAIL':
            watchlistIndex = state.watchlists.findIndex(watchlist => watchlist.id === action.payload.id)
            watchlistCopy = [...state.watchlists]
            newWatchlists = watchlistCopy.splice(watchlistIndex, 1, action.payload)
            return {...state, watchlists: watchlistCopy}

        case 'ADD_DAILY_DATA':
            watchlistIndex = state.watchlists.findIndex(watchlist => watchlist.id === action.payload.id)
            watchlistCopy = [...state.watchlists]
            newWatchlists = watchlistCopy.splice(watchlistIndex, 1, action.payload)
            return {...state, watchlists: watchlistCopy}
            
            
        default:
            return state
    } 
}

export default userReducer