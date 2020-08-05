function addWatchlist(formData, userId) {
    const objData = {
        watchList: formData,
        userId: userId
    }
    
    const watchlistObject = {
        method: 'POST',
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify(objData)
      }
    // debugger
    return dispatch => {
        dispatch({ type: 'START_ADD_WATCHLIST'})

        fetch('http://localhost:3000/watchlists', watchlistObject)
        .then(resp => resp.json())
        .then(json => {
            console.log('watchlist add response: ', json)
            return dispatch({type: 'ADD_WATCHLIST', payload: json})
        })
    }
}

export default addWatchlist