import React from 'react';
import './Tooltip.scss'

const Tooltip = ({x, y, data}) => {
    return <foreignObject className="tooltip" x={x} y={y} data={data} height={80} width={140}>
        <div className="tooltip-content">
            <div className="item top">
                top: {data.top}
            </div>
            <div className="item bottom">
                bottom: {data.bottom}
            </div>
        </div>
    </foreignObject>
}

export default Tooltip