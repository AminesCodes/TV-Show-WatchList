import React from 'react'

export default function TopBar(props) {
    return (
        <>
            <div className='col-3'>
                <img 
                    className='d-block mx-auto m-2'
                    src={require('../assets/film-solid.svg')} 
                    alt='App logo1' 
                    style={{height: '50px', objectFit: 'scale-down'}}/>
            </div>
            <div className='col-9 mt-3 h3 text-center'>
                TV Show WatchList
            </div>
        </>
    )
}