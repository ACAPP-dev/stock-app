import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import WatchListing from '../components/watchlist/WatchListing'
import { connect } from 'react-redux'
import AddWatchlist from '../components/watchlist/AddWatchlist'
import addWatchlist from '../actions/addWatchlist'

class WatchlistContainer extends React.Component {

    state = {
        showAddWatchlist: false
    }

    addWatchlist = formData => {
        this.setState({showAddWatchlist: false})
        return this.props.addWatchlist(formData, this.props.user.id)
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

    render() {
        // this.getWatchlist()

        return(
            <div>
                <h2>Watchlist Container</h2>
                < WatchListing returnRemove={this.removeWatchlist} watchList={this.props.watchLists} />
                {this.state.showAddWatchlist ?
                    < AddWatchlist returnWatchlist={this.addWatchlist} /> :
                    <Button onClick={this.addWatchListForm}>Add Watchlist</Button>
                }
                
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
    }

}


export default connect (mapStateToProps, mapDispatchToProps)(WatchlistContainer)