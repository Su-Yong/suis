import { globalLayer } from '@vanilla-extract/css';

import { defaultLayerOrder } from './layer.css';

defaultLayerOrder.forEach((layerName) => globalLayer(layerName));
