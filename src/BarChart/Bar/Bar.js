import React from 'react';
import {DATA_LAYER} from "../../helpers";

const Bar = ({d, onMouseLeave, onMouseEnter, layers, heightScale, widthScale, height}) => {
    const showTop = layers.includes(DATA_LAYER.TOP)
    const showBottom = layers.includes(DATA_LAYER.BOTTOM);
    const getBottomShift = (d) => showTop ? heightScale(d.top) : 0;
    return (
        <g key={d.index} transform={`translate(${widthScale(d.index)}, 0)`}
           onMouseEnter={() => onMouseEnter(d)}
           onMouseLeave={onMouseLeave}>
            {showTop && <rect
                className="rect_top"
                y={height - heightScale(d.top + d.bottom)}
                width={widthScale.bandwidth()}
                height={heightScale(d[DATA_LAYER.TOP])}
            />}
            {showBottom && <rect
                className="rect_bottom"
                y={height - heightScale(d.top + d.bottom) + getBottomShift(d)}
                width={widthScale.bandwidth()}
                height={heightScale(d[DATA_LAYER.BOTTOM])}
            />}
        </g>
    );
};

export default Bar;