
function companyReducer(state={ charts: [{chart_lines: []}]}, action) {
    console.log('State from companyReducer:', state)
    console.log('Action from companyReducer:', action)

    switch (action.type) {
        
        case 'START_COMPANY_FETCH':
            return state
        case 'ADD_COMPANY':
            // debugger
            return {...state, ...action.payload}
        
        default:
            return state
    }
}
export default companyReducer