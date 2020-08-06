function removeWatchlist(watchlistId, userId) {
    
    const DELETE_URL = `http://localhost:3000/users/${userId}/watchlists/${watchlistId}`

    const removeObject = {
        method: 'DELETE',
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({watchlistId: watchlistId, userId: userId})
      }
  
    return dispatch => {
        dispatch({ type: 'START_WATCHLIST_REMOVE'})

        fetch(DELETE_URL, removeObject)
        .then(resp => resp.json())
        .then(json => {
            console.log('watchlist remove response: ', json)
            return dispatch({type: 'REMOVE_WATCHLIST', payload: json})
        })
    }
}

export default removeWatchlist