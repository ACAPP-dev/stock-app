import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import WatchlistContainer from '../containers/WatchlistContainer'


const Home = () => {
    return(
        <div>
            <h2>Home Component</h2>
            <p>Need to add content: stock picker, watchlists, companies</p>
           
            <div>
                < WatchlistContainer />
            </div>
            
            
        </div>
    )
    
}

export default Home