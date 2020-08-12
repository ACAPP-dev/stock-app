function addCompany(watchlistId, formData, userId) {
    
    const FETCH_URL = `http://localhost:3000/watchlists/addcompany`

    const watchlistObject = {
        method: 'POST',
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({watchlistId: watchlistId, ticker: formData, userId: userId})
    }

    return dispatch => {
        dispatch({ type: 'START_ADD_COMPANY_TO_WATCHLIST'})

        fetch(FETCH_URL, watchlistObject)
        .then(resp => resp.json())
        .then(json => {
            return dispatch({type: 'GET_WATCHLIST_DETAIL', payload: json})
        })
    }
}

export default addCompany