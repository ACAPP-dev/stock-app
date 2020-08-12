
function dailyReducer(state={companies: [], requesting: false}, action) {
    // console.log('State from dailyReducer:', state)
    // console.log('Action from dailyReducer:', action)
    
    switch (action.type) {
        case 'START_GET_DAILY_DATA':
            return {...state, companies: [...state.companies], requesting: true}
       
        case 'ADD_DAILY_DATA':

            return {...state, ...action.payload, requesting: false}

        default:
            return state
    }
}

export default dailyReducer