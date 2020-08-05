function fetchWatchlistDetail(watchlistId, userId) {
    
    const FETCH_URL = `http://localhost:3000/users/${userId}/watchlists/${watchlistId}`

    // debugger
    return dispatch => {
        dispatch({ type: 'START_GET_WATCHLIST_DETAIL'})

        fetch(FETCH_URL)
        .then(resp => resp.json())
        .then(json => {
            console.log('watchlist get detail response: ', json)
            return dispatch({type: 'GET_WATCHLIST_DETAIL', payload: json})
        })
    }
}

export default fetchWatchlistDetail