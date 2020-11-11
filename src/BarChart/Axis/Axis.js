import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

const Axis = ({ scale }) => {
    const ref = useRef(null);
    useEffect(() => {
       if (ref.current) {
           d3.axisBottom(scale)(d3.select(ref.current))
       }
    });
    return <g ref={ref} />;
};

export default Axis;