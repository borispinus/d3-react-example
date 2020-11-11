import * as d3 from 'd3';
import {useEffect, useLayoutEffect, useState} from "react";

const MAX_DAYS_COUNT = 10;

export const  DATA_LAYER = {
    TOP: 'top',
    BOTTOM: 'bottom'
  }

export const genData = () => d3.range(d3.randomInt(6, MAX_DAYS_COUNT)(),).map((_, index) => ({
    [DATA_LAYER.TOP]: d3.randomInt(100)(),
    [DATA_LAYER.BOTTOM]: d3.randomInt(100)(0),
    index
  }));

export const useTextSize = (textRef, deps) => {
    const [size, setSize] = useState(0);

    useEffect(() => {
        if (textRef.current) {
           setSize(textRef.current.getBBox().width)
        }
    }, [textRef.current, ...deps])
    return size;
}
  