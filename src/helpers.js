import * as d3 from 'd3';
import {useEffect, useState} from "react";

const MAX_DAYS_COUNT = 100;

export const  DATA_LAYER = {
    TOP: 'top',
    BOTTOM: 'bottom'
  }

export const genData = () => d3.range(d3.randomInt(50, MAX_DAYS_COUNT)(),).map((_, index) => ({
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

export function debounce(f, ms) {
    let isCooldown = false;

    return function() {
        if (isCooldown) return;

        f.apply(this, arguments);

        isCooldown = true;

        setTimeout(() => isCooldown = false, ms);
    };

}

export const useZoom = (ref) => {
    const [transform, setTransform] = useState(null)
    useEffect(() => {
        if (!ref) return
        const selection = d3.select(ref.current)
        const zoom = d3.zoom()
            .on("zoom", event => setTransform(event.transform))
        zoom(selection)
    }, [ref.current])
    return transform;
}