function removeCompany(watchlistId, companyId, userId) {
    
    const DELETE_URL = `http://localhost:3000/watchlists/removecompany/${companyId}`
    
    // debugger
    const removeObject = {
        method: 'DELETE',
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({watchlistId: watchlistId, companyId: companyId, userId: userId})
      }
  
    return dispatch => {
        dispatch({ type: 'START_COMPANY_REMOVE'})

        fetch(DELETE_URL, removeObject)
        .then(resp => resp.json())
        .then(json => {
            console.log('watchlist remove response: ', json)
            return dispatch({type: 'GET_WATCHLIST_DETAIL', payload: json})
        })
    }
}

export default removeCompany