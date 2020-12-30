import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './Map';
import Chart from './Chart';
import db from './firebase';
import { addDays } from 'date-fns';
import { Avatar } from '@material-ui/core';

function App() {
  const [slicks, setSlicks] = useState([])
  const [slick, setSlick] = useState([])
  const [timestamps, setTimestamps] = useState([])
  const [timestamp, setTimestamp] = useState(0)
  const [twentyfour, setTwentyfour] = useState([])
  const [weekdays, setWeekdays] = useState([])
  const now = new Date()

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

      for (let i = 0; i < 9; i++) {
        weekdays.push(addDays(now, i))
        setWeekdays(Array.from(new Set(weekdays)))
      }
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
    <div className="app">
      <div className="app__avatar">
        <Avatar alt="hyrdones" src="https://i.ibb.co/dbw8Wdh/favicon.jpg" />
      </div>

      <Map timestamp={timestamp} slick={slick} twentyfour={twentyfour} weekdays={weekdays} />
      <Chart weekdays={weekdays} />
    </div>
  );
}

export default App;
