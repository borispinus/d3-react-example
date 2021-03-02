import React from 'react';
import {DATA_LAYER} from "../../helpers";

const Bar = ({d, onMouseLeave, onMouseEnter, layers, heightScale, widthScale, height}) => {
    const showTop = layers.includes(DATA_LAYER.TOP)
    const showBottom = layers.includes(DATA_LAYER.BOTTOM);
    return (
        <g key={d.index} transform={`translate(${widthScale(d.index)}, 0)`}
           className="rect_g"
           onMouseEnter={() => onMouseEnter(d)}
           onMouseLeave={onMouseLeave}>
            {showTop && <rect
                className="rect_top"
                y={height - heightScale(d.top + (showBottom ? d.bottom : 0))}
                width={widthScale.bandwidth()}
                height={heightScale(d.top)}
            />}
            {showBottom && <rect
                className="rect_bottom"
                y={height - heightScale(d.bottom)}
                width={widthScale.bandwidth()}
                height={heightScale(d.bottom)}
            />}
        </g>
    );
};

export default Bar;