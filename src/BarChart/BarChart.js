import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import * as d3 from 'd3';
import Tooltip from './Tooltip/Tooltip';
import Axis from "./Axis/Axis";
import Bar from "./Bar/Bar";

import './BarChart.scss'


const BarChart = ({data, width, height, layers, transform}) => {
    const [widthRange, setWidthRange] = useState([0, width]);
    const [activeColumn, setActiveColumn] = useState(null);

    const totals = data.map((d) => layers.reduce((sum, layer) => sum + d[layer], 0));
    const widthScale = d3.scaleBand().domain(d3.range(0, data.length)).range(widthRange).padding(0.1).paddingOuter(1);
    const heightScale = d3.scaleLinear().domain([0, d3.max(totals)]).range([0, height]);

    const handleColumnMouseEnter = (data) => {
        setActiveColumn(data)
    }
    const handleColumnMouseLeave = () => {
        if (activeColumn) {
            setActiveColumn(null)
        }
    }
    useEffect(() => {
        if (!transform) return
        setWidthRange([0, width].map(d => transform.applyX(d)));
    }, [transform])
    return <g>
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
        <g transform={`translate(0, ${height})`}><Axis scale={widthScale} /></g>
        { activeColumn && <Tooltip
            data={activeColumn}
            x={widthScale(activeColumn.index)}
            y={height - heightScale(totals[activeColumn.index])}/>
        }
    </g>
}
export default BarChart

