import React, { useState } from 'react';

import BarChart from './BarChart/BarChart';
import { genData, DATA_LAYER } from './helpers';

import './App.scss';
import Legend from './Legend/Legend';

const WIDTH = 1000;
const HEIGHT = 500;


function App() {
  const [data, setData] = useState(genData());
  const [layers, setLayers] = useState([DATA_LAYER.TOP, DATA_LAYER.BOTTOM]);

  const handleLegendItemClick = (layer) => {
      if (layers.includes(layer)) {
        setLayers(layers.filter(l => l !== layer).sort())
      } else {
        setLayers(layers.concat(layer).sort())
      }
  }

  return (
    <div className="App">
       <svg height={HEIGHT} width={WIDTH}>
          <BarChart data={data} width={WIDTH} height={HEIGHT} layers={layers}/>
       </svg>
       <button onClick={() => setData(genData())}>Новые данные</button>
       <Legend activeLayers={layers} onItemClick={handleLegendItemClick} />
    </div>
  );
}
export default App;
