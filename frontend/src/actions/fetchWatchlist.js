function fetchWatchlist(id) {
    // const watchListObject = {
    //     method: 'POST',
    //     headers: {"Content-Type": "application/json", "Accept": "application/json"},
    //     body: JSON.stringify(formData)
    //   }
  
    return dispatch => {
        dispatch({ type: 'START_WATCHLIST_FETCH'})
//dont need fetch object unless creating a new watchlist...
        fetch('http://localhost:3000/login')
        .then(resp => resp.json())
        .then(json => {
            console.log('watchlist fetch response: ', json)
            return dispatch({type: 'GET_WATCHLIST', payload: json})
        })
    }
}

export default fetchWatchlist