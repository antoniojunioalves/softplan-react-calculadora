import React from 'react'
import './Display.css'

export default props => {
    return (
        <div className="display">            
            <h5 className="memoryDisplay">{props.valueMemoryDisplay}</h5 >
            <div className="textDisplay">{props.value}</div>
        </div>
    )
}