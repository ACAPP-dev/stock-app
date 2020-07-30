
function userReducer(state = {
        name: "", email: "", id: "", loggedIn: false
        }, action) 
    {
    console.log('State from userReducer:', state)
    console.log('Action from userReducer:', action)
    
    switch (action.type) {
        case 'LOGIN_USER':
            
            return {...state, 
                name: action.payload.name, 
                email: action.payload.email,
                id: action.payload.id,
                loggedIn: true
            }
        default:
            return state
    } 
}

export default userReducer