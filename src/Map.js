import React, { useState, useEffect } from 'react';
import './Map.css';
import { MapContainer, Marker, Circle, Popup, TileLayer } from "react-leaflet";
import db from './firebase';
import { Button } from '@material-ui/core';

function Map() {
  const position = [33.16141, -8.629944]
  const [slicks, setSlicks] = useState([])
  const [slick, setSlick] = useState([])
  const [timestamps, setTimestamps] = useState([])
  const [timestamp, setTimestamp] = useState(0)

  useEffect(() => {
    db.ref('slick').once('value').then((snapshot) => {
      setSlicks(snapshot.val())

      snapshot.val().forEach(item => {
        for (let i = 0; i < item.length; i++) {
          timestamps.push(item[i][0])
        }
      })
      setTimestamps(Array.from(new Set(timestamps)))
    });
  }, [])

  useEffect(() => {
    let slickarr = []
    timestamp && slicks?.forEach(item => {
      item.forEach(deep => {
        if (deep[0] === timestamp) {
          slickarr.push([deep[1], deep[2]])
        }
      })
    })
    setSlick(slickarr)

  }, [timestamp])

  return (
    <div className="map">
      <div className="map__container">
        <MapContainer center={position} zoom={12} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              The port of Jorg Lasfar
          </Popup>
          </Marker>
          {timestamp && slick?.map(item => <Circle center={item} pathOptions={{ color: 'red' }} radius={50} />)}
        </MapContainer>
      </div>

      <div className="map__timebar">
        {timestamps?.map(item =>
          <Button
            className="map__timebarButton "
            variant="contained"
            color={`${item === timestamp && "primary"}`}
            onClick={(e) => { setTimestamp(item) }}
          >
            {new Date(
              item
            ).toLocaleString()
            }
          </Button>
        )}</div>
    </div>
  )
}

export default Map
