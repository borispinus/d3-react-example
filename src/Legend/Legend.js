import React from 'react';
import cn from 'classnames';

import { DATA_LAYER } from '../helpers';

import './Legend.scss'

const Legend = ({ activeLayers, onItemClick }) => {
    return <div className="Legend">
        <div className={cn("item top", { disabled: !activeLayers.includes(DATA_LAYER.TOP) })} onClick={() => onItemClick(DATA_LAYER.TOP)}>
            {DATA_LAYER.TOP}
        </div>
        <div className={cn("item bottom", { disabled: !activeLayers.includes('bottom') })} onClick={() => onItemClick(DATA_LAYER.BOTTOM)}>
            {DATA_LAYER.BOTTOM}
        </div>
    </div>
}

export default Legend;