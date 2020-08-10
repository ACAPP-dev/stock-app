
function dailyReducer(state={companies: []}, action) {
    console.log('State from dailyReducer:', state)
    console.log('Action from dailyReducer:', action)
    
    switch (action.type) {
        case 'START_GET_DAILY_DATA':
            return state        
       
        case 'ADD_DAILY_DATA':
            return {...state, ...action.payload}

        default:
            return state
    }
}

export default dailyReducer