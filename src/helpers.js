import * as d3 from 'd3';

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
  