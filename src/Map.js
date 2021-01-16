import './Map.css';
import { MapContainer, Marker, CircleMarker, Circle, FeatureGroup, Popup, TileLayer, LayersControl } from "react-leaflet";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

function Map({ timestamp, twentyfour, weekdays, data }) {
  const position = [33.1250, -8.6233]
  const [map, setMap] = useState(null)
  const [center, setCenter] = useState({ lat: 33.1250, lng: -8.6233 })

  const [slick, setSlick] = useState(data[11])
  const [hour, setHour] = useState(11)
  const mapRef = useRef()


  const onMove = useCallback(() => {
    setCenter(map?.getCenter())
  }, [map])

  useEffect(() => {
    map?.on('move', onMove)
    return () => {
      map?.off('move', onMove)
    }
  }, [map, onMove])

  useEffect(() => {
    setSlick(data[hour])
  }, [hour])

  const decreaseHour = (() => {
    return hour === 0 ? null : setHour(hour - 1)
  })

  const increaseHour = (() => {
    return hour === 23 ? null : setHour(hour + 1)
  })

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '70vw',
    },
    margin: {
      height: theme.spacing(3),
    },
  }));

  function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  };

  const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  const classes = useStyles();

  const updateRange = (e, data) => {
    setHour(data)
  }

  return (
    <div className="map">
      <div className="map__nav">
        {center &&
          <>
            <p>
              {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
            </p>
          </>
        }
      </div>

      <div className="map__container">
        <MapContainer ref={mapRef}
          onzoomend={() => console.log(mapRef.current.leafletElement.getZoom())} center={position} zoom={11} scrollWheelZoom={true} whenCreated={setMap}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Light mode">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Dark mode">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          <Marker position={position}>
            <Popup>
              The port of Jorg Lasfar
          </Popup>
          </Marker>
          <FeatureGroup>
            {slick.length > 0 ? slick.map(item =>
              <>
                <Popup>{`${item[1]},  ${item[2]}`}</Popup>
                <Circle center={[item[1], item[2]]} pathOptions={{ color: ' rgba(133,32,47,0.6)' }} radius={130} />
              </>
            ) : null}
          </FeatureGroup>
        </MapContainer>
      </div>

      <div className="map__control">
        <div className="horizoncontrol" id="horizoncontrol">
          <div className="horizoncontrol__previous" data-name="previous" onClick={(e) => { decreaseHour() }}>
            <span>-1h</span>
            <svg width="36" height="47" viewBox="0 0 36 47" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.345 1.882C7.707.842 8.9 0 9.991 0H34.01C35.109 0 36 .897 36 2.004v42.992C36 46.103 35.1 47 34.009 47H9.99c-1.1 0-2.276-.854-2.625-1.903L0 23 7.345 1.882z"
                fill="#fff" opacity="0.7" fill-rule="evenodd"></path>
            </svg>
          </div>
          <div className="horizoncontrol__datetimecontainer">
            <ul className="horizoncontrol__timegroup ">
              {twentyfour?.map(item =>
                <li className={`horizoncontrol__time ${hour === item && "is-selected"}`} data-horizon="36" onClick={(e) => { setHour(item) }}><span>{item}</span></li>
              )}
            </ul>
            <ul className="horizoncontrol__dategroup">
              {weekdays?.map(day => <li className="horizoncontrol__date" data-horizon="6"><span>{day.toLocaleDateString().replace(/\/[0-9]+$/, '')}</span></li>)}
            </ul>
          </div>
          <div className="horizoncontrol__next" data-name="next" onClick={(e) => { increaseHour() }}>
            <span>+1h</span>
            <svg width="36" height="47" viewBox="0 0 36 47" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M28.655 1.882C28.293.842 27.1 0 26.009 0H1.99C.891 0 0 .897 0 2.004v42.992C0 46.103.9 47 1.991 47H26.01c1.1 0 2.276-.854 2.625-1.903L36 23 28.655 1.882z"
                fill="#fff" opacity="0.7" fill-rule="evenodd"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="map__slideContainer">
        <div className={`${classes.root} map__slider`}>
          <PrettoSlider valueLabelDisplay="on" aria-label="pretto slider" max={23} value={hour} onChange={updateRange} />
        </div>
      </div>

    </div>
  )
}

export default Map
