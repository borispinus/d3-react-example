import React, {useRef, useState} from 'react';
import Legend from './Legend/Legend';
import BarChart from './BarChart/BarChart';
import {DATA_LAYER, genData, useZoom} from './helpers';

import './App.scss';

const WIDTH = window.innerWidth;
const HEIGHT = 500;

const PADDING_BOTTOM = 100;

function App() {
  const ref = useRef(null);
  const [data, setData] = useState(genData);
  const [layers, setLayers] = useState([DATA_LAYER.TOP, DATA_LAYER.BOTTOM]);
  const transform = useZoom(ref);

  const handleLegendItemClick = (layer) => {
      if (layers.includes(layer)) {
        setLayers(layers.filter(l => l !== layer).sort())
      } else {
        setLayers(layers.concat(layer).sort())
      }
  }
  return (
    <div className="App">
       <svg height={HEIGHT} width={WIDTH} ref={ref}>
          <BarChart
              data={data}
              width={5 * WIDTH}
              height={HEIGHT-PADDING_BOTTOM}
              layers={layers}
              transform={transform}
          />
       </svg>
       <button onClick={() => setData(genData())}>Новые данные</button>
       <Legend activeLayers={layers} onItemClick={handleLegendItemClick} />
    </div>
  );
}
export default App;
