import React from 'react'
import Button from 'react-bootstrap/Button'

export default class WatchlistLike extends React.Component {

    state = {
        likes: 0
    }

    handleLike = (event) => {
        // debugger
        const oldLikes = this.state.likes
        this.setState({likes: oldLikes + 1 })
    }

    render() {

        return (
            <React.Fragment>
                <Button onClick={this.handleLike}>Like</Button>
                <div>{this.state.likes} Likes</div>
            </React.Fragment>

        )
    }



}


