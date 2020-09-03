import React, { useState } from 'react';
import * as d3 from 'd3';

import { DATA_LAYER } from '../helpers';
import Tooltip from './Tooltip/Tooltip';

import './BarChart.scss'


const BarChart = ({ data, width, height, layers }) => {
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
  const showTop = layers.includes(DATA_LAYER.TOP)
  const showBottom = layers.includes(DATA_LAYER.BOTTOM);

  const getBottomShift = (d) => showTop ? heightScale(d.top) : 0;
  return <>
    <g>
      {
        data.map((d) =>
          <g key={d.index} transform={`translate(${widthScale(d.index)}, 0)`}
            onMouseEnter={() => handleColumnMouseEnter(d)}
            onMouseLeave={handleColumnMouseLeave} >
            {showTop && <rect
              className="rect_top"
              y={height - heightScale(totals[d.index])}
              width={widthScale.bandwidth()}
              height={heightScale(d[DATA_LAYER.TOP])}
            />}
            {showBottom && <rect
              className="rect_bottom"
              y={height - heightScale(totals[d.index]) + getBottomShift(d)}
              width={widthScale.bandwidth()}
              height={heightScale(d[DATA_LAYER.BOTTOM])}
            />}
          </g>)
      }
    </g>
    {activeColumn && <Tooltip data={activeColumn} x={widthScale(activeColumn.index)} y={height - heightScale(totals[activeColumn.index])} />}
  </>
}
export default BarChart