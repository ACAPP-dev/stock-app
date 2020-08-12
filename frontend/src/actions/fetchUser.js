function fetchUser(formData) {
    const loginObject = {
        method: 'POST',
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify(formData)
      }
  
    return dispatch => {
        dispatch({ type: 'START_USER_LOGIN'})

        fetch('http://localhost:3000/login', loginObject)
        .then(resp => resp.json())
        .then(json => {
            return dispatch({type: 'LOGIN_USER', payload: json})
        })
    }
}

export default fetchUser