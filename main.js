import {
  Map,
  View
} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import SourceVector from 'ol/source/Vector';
import Vector from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import * as olProj from 'ol/proj';
import Overlay from 'ol/Overlay';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

const vectorLayer = new Vector({
  source: new SourceVector({
    features: [
      new Feature({
        geometry: new Point(olProj.fromLonLat([20, 50]))
      })
    ]
  })
});
map.addLayer(vectorLayer);

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});
map.addOverlay(overlay);

closer.onclick = () => {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

map.on('singleclick', (event) => {
  if (map.hasFeatureAtPixel(event.pixel)) {
    var coordinate = event.coordinate;

    content.innerHTML = '<b>Hello world!</b><br />I am a popup.';
    overlay.setPosition(coordinate);
  } else {
    overlay.setPosition(undefined);
    closer.blur();
  }
});