
function userReducer(state = {
        name: "", 
        email: "", 
        id: "", 
        loggedIn: false,
        watchlists: []
        }, action) {
    // console.log('State from userReducer:', state)
    // console.log('Action from userReducer:', action)
    
    switch (action.type) {
        case 'LOGIN_USER':
            const newUser = {
                name: action.payload.name, 
                email: action.payload.email,
                id: action.payload.id,
                loggedIn: true,
                watchlists: action.payload.watchlists
            }

            return {...state, ...newUser}
        case 'START_USER_LOGIN':
            return state
        default:
            return state
    } 
}

export default userReducer