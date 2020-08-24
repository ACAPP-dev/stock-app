function fetchWatchlistDetail(watchlistId, userId) {
    
    const FETCH_URL = `http://localhost:3000/users/${userId}/watchlists/${watchlistId}`

    return dispatch => {
        dispatch({ type: 'START_GET_WATCHLIST_DETAIL'})

        fetch(FETCH_URL)
        .then(resp => resp.json())
        .then(json => {
            return dispatch({
                type: 'LOGIN_USER', payload: json,
                type: 'GET_WATCHLIST_DETAIL', payload: json.watchlists.find(watchlist => watchlist.id === watchlistId)
            })
        })
    }
}

export default fetchWatchlistDetail