import { LayerGroup, useMap } from 'react-leaflet';
import 'leaflet-velocity';
import L from 'leaflet';
import { useEffect } from 'react';

export default function VelocityLayer(props) {
  const map = useMap();

  useEffect(() => {
    const velocityLayer = L.velocityLayer({
      displayValues: false,
      displayOptions: {
        velocityType: 'Global Wind',
        position: 'bottomleft',
        emptyString: 'No velocity data',
        angleConvention: 'bearingCW',
        displayPosition: 'bottomleft',
        displayEmptyString: 'No velocity data',
        speedUnit: 'kt'
      },

      // OPTIONAL
      minVelocity: 0,          // used to align color scale
      maxVelocity: 10,         // used to align color scale
      velocityScale: 0.01,    // modifier for particle animations, arbitrarily defaults to 0.005
      //colorScale: []       // define your own array of hex/rgb colors
    });

    velocityLayer.addTo(map);

    loadData(props.url, velocityLayer);

    return () => {
      map.removeLayer(velocityLayer);
    };
  }, [map, props.url]);

  const loadData = (url, layer) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (layer) {
          layer.setData(data);
        }
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });
  };

  return null; // VelocityLayer is not a visible element, so we return null
}
