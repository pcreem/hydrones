import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './Map';
import Chart from './Chart';
import db from './firebase';
import { addDays } from 'date-fns';
import { Avatar, Button, makeStyles } from '@material-ui/core';
import data from './data.json';

function App() {
  const [slicks, setSlicks] = useState([])
  const [slick, setSlick] = useState([])
  const [timestamps, setTimestamps] = useState([])
  const [timestamp, setTimestamp] = useState(0)
  const [twentyfour, setTwentyfour] = useState([])
  const [weekdays, setWeekdays] = useState([])
  const [chartormap, setChartorMap] = useState("map")
  const [demoorrealtime, setDemoorRealtime] = useState("demo")
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

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className="app">
      <div className="app__nav">
        <Avatar alt="hyrdones" src="https://i.ibb.co/dbw8Wdh/favicon.jpg" />
        <div className={classes.root}>
          <Button variant="contained" onClick={(e) => { setChartorMap(chartormap === "map" ? "chart" : "map") }}>{
            chartormap === "map" ? "Chart" : "Map"
          }</Button>
          {/* <Button variant="contained" onClick={(e) => { setDemoorRealtime(demoorrealtime === "demo" ? "realtime" : "demo") }}>{
            demoorrealtime === "demo" ? "Realtime" : "Demo"
          }</Button> */}
        </div>

      </div>
      {chartormap === "map" ? <Map data={data} timestamp={timestamp} slick={slick} twentyfour={twentyfour} weekdays={weekdays} /> : <Chart data={data} weekdays={weekdays} twentyfour={twentyfour} />}


    </div>
  );
}

export default App;
