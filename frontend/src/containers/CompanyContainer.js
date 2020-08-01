import React from 'react'
import Chart from '../components/company/Chart'
import { connect } from 'react-redux'

class CompanyContainer extends React.Component {

    render() {
        return (
            <div>
                <h2>Company Container</h2>
                < Chart />
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    console.log('state in companycontainer:', state)
    return state
}

export default connect(mapStateToProps)(CompanyContainer)