import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import WatchListing from '../components/watchlist/WatchListing'
import { connect } from 'react-redux'
import AddWatchlist from '../components/watchlist/AddWatchlist'
import addWatchlist from '../actions/addWatchlist'
import fetchWatchlist from '../actions/removeWatchlist'
import fetchWatchlistDetail from '../actions/fetchWatchlistDetail'

class WatchlistContainer extends React.Component {

    state = {
        showAddWatchlist: false
    }

    addWatchlist = formData => {
        this.setState({showAddWatchlist: false})
        return this.props.addWatchlist(formData, this.props.user.id)
    }

    viewWatchlist = id => {
        this.props.fetchWatchlistDetail(id, this.props.user.id)
    }

    removeWatchlist = id => {
        console.log('removewatchlist in watchlistcontainer: ', id)

    }

    // Not needed for index - will need to get details of stocks / companies at some point
    // getWatchlist = () => {
    //     fetch(`/watchlists/${this.props.user.id}`)
    //         .then(resp => resp.json())
    //         .then(json => {
    //             console.log(json)
    //         })
    // }

    addWatchListForm = () => {
        this.setState({showAddWatchlist: true})
    }

    closeForm = () => {
        this.setState({showAddWatchlist: false})
    }

    render() {
        // this.getWatchlist()

        return(
            <div className='watchlist-div'>
                <h2>Watchlists</h2>
                
                {this.state.showAddWatchlist ?
                    < AddWatchlist closeForm={this.closeForm} returnWatchlist={this.addWatchlist} /> :
                    <Button className='watchlist-btn' onClick={this.addWatchListForm}>Add Watchlist</Button>
                }
                < WatchListing viewWatchlist={this.viewWatchlist} returnRemove={this.removeWatchlist} watchList={this.props.watchLists} />
                {/* <Link className='nav' to='/watchlists/new'>Add Watchlist</Link> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('watchlist state:', state)
    return {user: state.user, watchLists: state.user.watchlists}    
}

const mapDispatchToProps = dispatch => {
    return {
        addWatchlist: (formData, userId) => dispatch(addWatchlist(formData, userId))
        getWatchlistDetail: (watchlistId, userId) => dispatch(fetchWatchlistDetail(watchlistId, userId))
    }

}


export default connect (mapStateToProps, mapDispatchToProps)(WatchlistContainer)