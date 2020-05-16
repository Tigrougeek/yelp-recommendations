import React from "react";

const loadFile = () => {
    console.log('truc xinh dep!!!!!')
}

const NumberOfRestaurantsByZipCode = () => {
    return (
        <div>
            <button className='button' onClick={loadFile} style={{backgroundColor: 'pink', color:'white'}}>
                Number of restaurants by zip code
            </button>
        </div>
    )
}

export default NumberOfRestaurantsByZipCode
