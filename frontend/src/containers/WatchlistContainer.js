import React from 'react'
import WatchListing from '../components/watchlist/WatchListing'
import { connect } from 'react-redux'

class WatchlistContainer extends React.Component {

    // Not needed for index - will need to get details of stocks / companies at some point
    // getWatchlist = () => {
    //     fetch(`/watchlists/${this.props.user.id}`)
    //         .then(resp => resp.json())
    //         .then(json => {
    //             console.log(json)
    //         })
    // }

    render() {
        // this.getWatchlist()

        return(
            <div>
                <h2>Watchlist Container</h2>
                < WatchListing watchList={this.props.watchLists} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('watchlist state:', state)
    return {user: state.user, watchLists: state.user.watchlists}
    
}

export default connect (mapStateToProps)(WatchlistContainer)