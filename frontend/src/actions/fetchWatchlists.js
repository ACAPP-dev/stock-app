function fetchWatchlists(userId) {
    // const watchListObject = {
    //     method: 'GET',
    //     headers: {"Content-Type": "application/json", "Accept": "application/json"},
    //     body: JSON.stringify(userId)
    //   }
  
    return dispatch => {
        dispatch({ type: 'START_WATCHLIST_FETCH'})

        fetch(`http://localhost:3000/users/${userId}/watchlists`)
        .then(resp => resp.json())
        .then(json => {
            console.log('watchlist fetch response: ', json)
            return dispatch({type: 'LOGIN_USER', payload: json})
        })
    }
}

export default fetchWatchlists