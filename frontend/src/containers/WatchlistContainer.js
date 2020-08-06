import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import WatchListing from '../components/watchlist/WatchListing'
import { connect } from 'react-redux'
import AddWatchlist from '../components/watchlist/AddWatchlist'
import addWatchlist from '../actions/addWatchlist'
import removeWatchlist from '../actions/removeWatchlist'
import fetchWatchlistDetail from '../actions/fetchWatchlistDetail'
import WatchDetail from '../components/watchlist/WatchDetail'
import addCompany from '../actions/addCompany'
import removeCompany from '../actions/removeCompany'

class WatchlistContainer extends React.Component {

    state = {
        showAddWatchlist: false,
        showWatchlistDetail: false
    }

    addWatchlist = formData => {
        this.setState({showAddWatchlist: false})
        return this.props.addWatchlist(formData, this.props.user.id)
    }

    viewWatchlist = id => {
        this.props.fetchWatchlistDetail(id, this.props.user.id)
        this.setState({showWatchlistDetail: true})
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

    addCompany = (formData) => {
        console.log('add company clicked in watchlist detail')
        this.props.addCompany(formData, this.props.user.id)
    }

    removeCompany = (watchlistId, companyId) => {
        console.log('remove company clicked in watchlist detail', watchlistId, companyId)
        this.props.removeCompany(watchlistId, companyId, this.props.user.id)
    }

    closeForm = () => {
        this.setState({showAddWatchlist: false})
    }

    render() {
        // this.getWatchlist()

        return(
            <div className='watchlist-div'>
                <h2>Watchlists</h2>
                {this.state.showWatchlistDetail ?
                    < WatchDetail 
                        hideWatchlist={this.hideWatchlist} 
                        watchDetail={this.props.watchlistDetail} 
                        addCompany={this.addCompany}
                        removeCompany={this.removeCompany}
                    /> :
                    null
                }
                {this.state.showAddWatchlist ?
                    < AddWatchlist closeForm={this.closeForm} returnWatchlist={this.addWatchlist} /> :
                    <Button className='watchlist-btn' onClick={this.addWatchListForm}>Add Watchlist</Button>
                }
                < WatchListing 
                    viewWatchlist={this.viewWatchlist} 
                    returnRemove={this.removeWatchlist} 
                    watchlists={this.props.watchLists}
                />
                {/* <Link className='nav' to='/watchlists/new'>Add Watchlist</Link> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('watchlist state:', state)
    return {user: state.user, watchLists: state.user.watchlists,
        watchlistDetail: state.watchlists}    
}

const mapDispatchToProps = dispatch => {
    return {
        addWatchlist: (formData, userId) => dispatch(addWatchlist(formData, userId)),
        removeWatchlist: (watchlistId, userId) => dispatch(removeWatchlist(watchlistId, userId)),
        addCompany: (formData, userId) => dispatch(addCompany(formData, userId)),
        removeCompany: (watchlistId, companyId, userId) => dispatch(removeCompany(watchlistId, companyId, userId)),
        fetchWatchlistDetail: (watchlistId, userId) => dispatch(fetchWatchlistDetail(watchlistId, userId))
    }

}


export default connect (mapStateToProps, mapDispatchToProps)(WatchlistContainer)