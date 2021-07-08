import {useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from './useMap';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {locationProp} from '../room-screen/room-screen.prop';

function Map(props) {
  const {city, points} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points]);

  return props.render(mapRef);
}

Map.propTypes = {
  city: PropTypes.object.isRequired,
  points: PropTypes.arrayOf(locationProp).isRequired,
};

export default Map;
