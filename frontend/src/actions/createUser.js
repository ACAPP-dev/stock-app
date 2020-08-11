function createUser(formData) {

    const userObject = {
        method: 'POST',
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({user: formData})
      }
  
    return dispatch => {
        dispatch({ type: 'START_CREATE_LOGIN'})

        fetch('http://localhost:3000/users', userObject)
        .then(resp => resp.json())
        .then(json => {
            console.log('create user response: ', json)
            return dispatch({type: 'CREATE_USER', payload: json})
        })
    }
}

export default createUser