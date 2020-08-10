
function companyReducer(state={ requesting: false, charts: [{chart_lines: []}]}, action) {
    console.log('State from companyReducer:', state)
    console.log('Action from companyReducer:', action)

    switch (action.type) {
        
        case 'START_COMPANY_FETCH':
            // debugger
            return {...state, charts: [...state.charts], requesting: true}
        case 'ADD_COMPANY':
            // debugger
            return {...state, ...action.payload, requesting: false}
        
        default:
            return state
    }
}
export default companyReducer