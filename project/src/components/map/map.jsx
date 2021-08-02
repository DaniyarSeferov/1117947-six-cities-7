import {useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {locationProp} from '../room-screen/room-screen.prop';
import useMap from '../../hooks/use-map/use-map';

function Map(props) {
  const {city, points} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const activeCustomIcon = leaflet.icon({
    iconUrl: 'img/pin-active.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  useEffect(() => {
    const markers = [];

    if (map) {
      points.forEach((point) => {
        const marker = leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: point.isActive ? activeCustomIcon : defaultCustomIcon,
          })
          .addTo(map);
        markers.push(marker);
      });
    }

    return () => {
      if (map && markers) {
        markers.forEach((marker) => map.removeLayer(marker));
      }
    };
  }, [map, points]);

  return props.render(mapRef);
}

Map.propTypes = {
  city: PropTypes.object.isRequired,
  points: PropTypes.arrayOf(locationProp).isRequired,
};

export default Map;
