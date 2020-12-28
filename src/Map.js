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
  const [twentyfour, setTwentyfour] = useState([])
  //https://www.xspdf.com/resolution/50298100.html


  useEffect(() => {
    db.ref('slick').once('value').then((snapshot) => {
      setSlicks(snapshot.val())

      snapshot.val().forEach(item => {
        for (let i = 0; i < item.length; i++) {
          timestamps.push(item[i][0])
        }
      })
      setTimestamps(Array.from(new Set(timestamps)))
      for (let i = 0; i < 24; i++) {
        twentyfour.push(i)
      }
      setTwentyfour(Array.from(new Set(twentyfour)))
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
            url="http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
          // dark mode: http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png
          // light mode: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
          />
          <Marker position={position}>
            <Popup>
              The port of Jorg Lasfar
          </Popup>
          </Marker>
          {timestamp && slick?.map(item => <Circle center={item} pathOptions={{ color: 'red' }} radius={50} />)}
        </MapContainer>
      </div>

      {/* <div className="map__timebar">
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
        )}</div> */}
      <div className="map__control">
        <div class="horizoncontrol" id="horizoncontrol">
          <div class="horizoncontrol__previous" data-name="previous">
            <span>-1h</span>
            <svg width="36" height="47" viewBox="0 0 36 47" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.345 1.882C7.707.842 8.9 0 9.991 0H34.01C35.109 0 36 .897 36 2.004v42.992C36 46.103 35.1 47 34.009 47H9.99c-1.1 0-2.276-.854-2.625-1.903L0 23 7.345 1.882z"
                fill="#fff" opacity="0.7" fill-rule="evenodd"></path>
            </svg>
          </div>
          <div class="horizoncontrol__datetimecontainer">
            <ul class="horizoncontrol__timegroup ">
              {twentyfour?.map(item =>
                <li class="horizoncontrol__time" data-horizon="36"><span>{item}</span></li>
              )}
              {/* <li class="horizoncontrol__time is-selected" data-horizon="54"><span>20h</span></li> */}
            </ul>
            <ul class="horizoncontrol__dategroup">
              <li class="horizoncontrol__date" data-horizon="6"><span>12/27</span></li>
              <li class="horizoncontrol__date" data-horizon="30"><span>12/28</span></li>
              <li class="horizoncontrol__date is-selected" data-horizon="54"><span>12/29</span></li>
              <li class="horizoncontrol__date" data-horizon="78"><span>12/30</span></li>
              <li class="horizoncontrol__date" data-horizon="102"><span>12/31</span></li>
              <li class="horizoncontrol__date" data-horizon="126"><span>1/1</span></li>
              <li class="horizoncontrol__date" data-horizon="150"><span>1/2</span></li>
              <li class="horizoncontrol__date" data-horizon="174"><span>1/3</span></li>
              <li class="horizoncontrol__date" data-horizon="180"><span>1/4</span></li>
            </ul>
          </div>
          <div class="horizoncontrol__next" data-name="next">
            <span>+1h</span>
            <svg width="36" height="47" viewBox="0 0 36 47" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M28.655 1.882C28.293.842 27.1 0 26.009 0H1.99C.891 0 0 .897 0 2.004v42.992C0 46.103.9 47 1.991 47H26.01c1.1 0 2.276-.854 2.625-1.903L36 23 28.655 1.882z"
                fill="#fff" opacity="0.7" fill-rule="evenodd"></path>
            </svg>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Map
