import React from 'react';

export default function Dice(props) {

    let styles = {
        backgroundColor: props.isHeld ? '#59E391' : 'white'
    }

    return (
        <div
            style={styles}
            className='die'
            onClick={props.holdDice}>

            <h1 className='die-value'>{props.value}</h1>
        </div>
    )
}