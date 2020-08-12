function addWatchlist(formData, userId) {
    
    const FETCH_URL = `http://localhost:3000/users/${userId}/watchlists`

    const watchlistObject = {
        method: 'POST',
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({watchlist: formData})
    }

    return dispatch => {
        dispatch({ type: 'START_ADD_WATCHLIST'})

        fetch(FETCH_URL, watchlistObject)
        .then(resp => resp.json())
        .then(json => {
            return dispatch({type: 'ADD_WATCHLIST', payload: json})
        })
    }
}

export default addWatchlist