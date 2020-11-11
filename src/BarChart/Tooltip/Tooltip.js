import React, {useRef} from 'react';
import './Tooltip.scss'
import {useTextSize} from "../../helpers";

const Tooltip = ({x, y, data}) => {
    const topRef = useRef(null)
    const bottomRef = useRef(null)
    const topSize = useTextSize(topRef, [data])
    const bottomSize = useTextSize(bottomRef, [data])
    return <g transform={`translate(${x}, ${y})`} pointerEvents="none">
        <rect width={140} height={80} fill="#F5F5DC" rx="4" ry="4" stroke="black"/>
        <g transform={`translate(10, 10)`}>
            <g>
                <text ref={topRef} dominantBaseline="hanging">top: {data.top}</text>
                <rect width={20} height={20} fill="green" x={topSize + 5} y={0}/>
            </g>
            <g transform={`translate(0, 40)`}>
                <text ref={bottomRef} dominantBaseline="hanging">bottom: {data.bottom}</text>
                <rect width={20} height={20} stroke="black" fill="yellow" x={bottomSize + 5} y={0}/>
            </g>
        </g>
    </g>
}

export default Tooltip