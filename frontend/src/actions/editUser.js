function editUser(formData) {

    const userObject = {
        method: 'UPDATE',
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({user: formData})
      }
  
    return dispatch => {
        dispatch({ type: 'START_CREATE_USER'})

        fetch('http://localhost:3000/users', userObject)
        .then(resp => resp.json())
        .then(json => {
            console.log('create user response: ', json)
            return dispatch({type: 'LOGIN_USER', payload: json})
        })
    }
}

export default editUser