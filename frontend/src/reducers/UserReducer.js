
function userReducer(state = {name: ""}, action) {
    console.log('State from userReducer:', state)
    console.log('Action from userReducer:', action)
    return state
}

export default userReducer