import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import WatchListing from '../components/watchlist/WatchListing'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AddWatchlist from '../components/watchlist/AddWatchlist'
import addWatchlist from '../actions/addWatchlist'
import removeWatchlist from '../actions/removeWatchlist'
import fetchWatchlistDetail from '../actions/fetchWatchlistDetail'
import WatchDetail from '../components/watchlist/WatchDetail'
import addCompany from '../actions/addCompany'
import removeCompany from '../actions/removeCompany'
import TickerForm from '../components/ticker/TickerForm'
import fetchCompany from '../actions/fetchCompany'

class WatchlistContainer extends React.Component {

    state = {
        showAddWatchlist: false,
        showWatchlistDetail: false,
        showAddCompany: false,
        currentWatchlistId: "",
        redirect: false

    }

    addWatchlist = formData => {
        this.setState({showAddWatchlist: false})
        return this.props.addWatchlist(formData, this.props.user.id)
    }

    viewWatchlist = id => {
        this.props.fetchWatchlistDetail(id, this.props.user.id)
        this.setState({showWatchlistDetail: true, currentWatchlistId: id})
    }

    hideWatchlist = () => {
        this.setState({showWatchlistDetail: false})
    }

    removeWatchlist = (id) => {
        console.log('removewatchlist in watchlistcontainer: ', id)
        this.props.removeWatchlist(id, this.props.user.id)
    }

    // Not needed for index - will need to get details of stocks / companies at some point
    // getWatchlist = () => {
    //     fetch(`/watchlists/${this.props.user.id}`)
    //         .then(resp => resp.json())
    //         .then(json => {
    //             console.log(json)
    //         })
    // }

    componentDidUpdate() {
        window.scrollTo(0, 0)
    }

    addWatchListForm = () => {
        this.setState({showAddWatchlist: true})
    }

    showAddStockForm = () => {
        this.setState({showAddCompany: true})
    }

    hideAddStockForm = () => {
        this.setState({showAddCompany: false})
    }

    addCompany = (formData) => {
        console.log('add company clicked in watchlist detail')
        this.props.addCompany(this.state.currentWatchlistId, formData.ticker, this.props.user.id)
    }

    viewCompany = (ticker) => {
        this.setState({redirect: true})
        // Set default chart dates of last 30 days
        const startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toJSON().slice(0,10)
        const endDate = new Date().toJSON().slice(0,10)
        const formData = {ticker: ticker,
            startDate: startDate,
            endDate: endDate
        }
        this.props.fetchCompanyData(formData)
    }

    removeCompany = (watchlistId, companyId) => {
        this.props.removeCompany(watchlistId, companyId, this.props.user.id)
    }

    closeForm = () => {
        this.setState({showAddWatchlist: false})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/company" />
        } else {
            return(
                <div className='watchlist-div'>
                    <h2>Watchlists</h2>
                    {this.state.showWatchlistDetail ?
                        < WatchDetail 
                            hideWatchlist={this.hideWatchlist} 
                            watchDetail={this.props.watchlistDetail}
                            addCompany={this.showAddStockForm}
                            viewCompany={this.viewCompany}
                            removeCompany={this.removeCompany}
                        /> :
                        null
                    }
                    {this.state.showAddCompany ?
                        < TickerForm buttonText={'Add to Watchlist'} hideAddCompany={this.hideAddStockForm} returnSubmit={this.addCompany} /> : null }
                    {this.state.showAddWatchlist ?
                        < AddWatchlist closeForm={this.closeForm} returnWatchlist={this.addWatchlist} /> :
                        <Button className='watchlist-btn' onClick={this.addWatchListForm}>Add Watchlist</Button>
                    }
                    < WatchListing 
                        viewWatchlist={this.viewWatchlist} 
                        returnRemove={this.removeWatchlist} 
                        watchlists={this.props.watchLists}
                    />
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user, 
        watchLists: state.user.watchlists,
        watchlistDetail: state.watchlists
    }    
}

const mapDispatchToProps = dispatch => {
    return {
        addWatchlist: (formData, userId) => dispatch(addWatchlist(formData, userId)),
        removeWatchlist: (watchlistId, userId) => dispatch(removeWatchlist(watchlistId, userId)),
        addCompany: (watchlistId, formData, userId) => dispatch(addCompany(watchlistId, formData, userId)),
        removeCompany: (watchlistId, companyId, userId) => dispatch(removeCompany(watchlistId, companyId, userId)),
        fetchWatchlistDetail: (watchlistId, userId) => dispatch(fetchWatchlistDetail(watchlistId, userId)),
        fetchCompanyData: (formData) => dispatch(fetchCompany(formData))
    }

}


export default connect (mapStateToProps, mapDispatchToProps)(WatchlistContainer)