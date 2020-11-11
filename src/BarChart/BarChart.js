import React, {useState} from 'react';
import * as d3 from 'd3';

import {DATA_LAYER} from '../helpers';
import Tooltip from './Tooltip/Tooltip';

import './BarChart.scss'
import Axis from "./Axis/Axis";
import Bar from "./Bar/Bar";


const BarChart = ({data, width, height, layers}) => {
    const [activeColumn, setActiveColumn] = useState(null);

    const totals = data.map((d) => layers.reduce((sum, layer) => sum + d[layer], 0));
    const widthScale = d3.scaleBand().domain(d3.range(0, data.length)).range([0, width]).padding(0.1).paddingOuter(1);
    const heightScale = d3.scaleLinear().domain([0, d3.max(totals)]).range([0, height]);

    const handleColumnMouseEnter = (data) => {
        setActiveColumn(data)
    }
    const handleColumnMouseLeave = () => {
        if (activeColumn) {
            setActiveColumn(null)
        }

    }

    return <>
        <g>
            {
                data.map((d) => <Bar
                    height={height}
                    d={d}
                    heightScale={heightScale}
                    widthScale={widthScale}
                    onMouseEnter={handleColumnMouseEnter}
                    onMouseLeave={handleColumnMouseLeave}
                    layers={layers}
                />)
            }
        </g>
        <g transform={`translate(0, ${height})`}><Axis scale={widthScale}/></g>
        {activeColumn && <Tooltip data={activeColumn} x={widthScale(activeColumn.index)}
                                  y={height - heightScale(totals[activeColumn.index])}/>}
    </>
}
export default BarChart