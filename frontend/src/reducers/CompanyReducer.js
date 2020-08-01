
function companyReducer(state={}, action) {
    console.log('State from companyReducer:', state)
    console.log('Action from companyReducer:', action)
    return state


    switch (action.type) {
        case 'START_COMPANY_FETCH':
            return state
        case 'ADD_COMPANY':
            return state
        default:
            return state
    }
}
export default companyReducer