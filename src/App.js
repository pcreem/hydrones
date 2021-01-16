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
  const [timenow, setTimenow] = useState(new Date())
  const now = new Date()
  const [level, setLevel] = useState("");

  const levels = [
    'All',
    'Plastic',
    'Hydrocarbure'];

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
      setInterval(function () { setTimenow(new Date()); }, 1000);

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
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

  const classes = useStyles();

  return (
    <div className="app">
      <div className="app__nav">
        <Avatar alt="hyrdones" src="https://i.ibb.co/dbw8Wdh/favicon.jpg" className={classes.large} />
        <div className="app__navDatetime">
          <p>{timenow.toLocaleDateString()}</p>
          <p>{timenow.toLocaleTimeString()}</p>
          <p onClick={(e) => { setChartorMap(chartormap === "map" ? "chart" : "map") }}>{
            chartormap === "map" ? "Chart" : "Map"
          }</p>
        </div>
      </div>
      <div className="app__infoContainer">
        <div className="app__infoLeft">
          {chartormap === "map" ? <Map data={data} timestamp={timestamp} slick={slick} twentyfour={twentyfour} weekdays={weekdays} /> : <Chart data={data} weekdays={weekdays} twentyfour={twentyfour} />}
        </div>
        <div className="app__infoRight">
          <div className="app__infoRightTop">
            <div className="app__infoRightTopSwitch">
              <p onClick={(e) => { setChartorMap(chartormap === "map" ? "chart" : "map") }}>{
                chartormap === "map" ? "Chart" : "Map"
              }</p>
              <p onClick={(e) => { setDemoorRealtime(demoorrealtime === "demo" ? "realtime" : "demo") }}>{
                demoorrealtime === "demo" ? "Realtime" : "Demo"
              }</p>
            </div>
          </div>
          <div className="app__infoRightButtom">
            <div className="app__level">
              {levels?.map(item => <p onClick={(e) => { setLevel(item) }}>{item}</p>)}
            </div>
          </div>
        </div>
      </div>



    </div>
  );
}

export default App;
