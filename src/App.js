import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './Map';
import Chart from './Chart';
import db from './firebase';
import { addDays } from 'date-fns';
import List from './List';
import { Avatar, Button, ButtonGroup, makeStyles } from '@material-ui/core';

function App() {
  const [slicks, setSlicks] = useState([])
  const [slick, setSlick] = useState([])
  const [timestamps, setTimestamps] = useState([])
  const [timestamp, setTimestamp] = useState(0)
  const [twentyfour, setTwentyfour] = useState([])
  const [weekdays, setWeekdays] = useState([])
  const [level, setLevel] = useState("");
  const levels = ['Clean Water',
    'Plastic',
    'Light pollution',
    'Medium - pollution',
    'Medium + pollution',
    'Heavy pollution'];
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

  const onLevelChange = (e) => {
    setLevel(e.target.value)
  };

  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

  const classes = useStyles();

  return (
    <div className="app">
      {/* <div className="app__nav">
        <Avatar alt="Hydrones" src="https://i.ibb.co/dbw8Wdh/favicon.jpg" className={classes.large} />
        <List level={level} levels={levels} onLevelChange={onLevelChange} />
        <ButtonGroup variant="contained" size="small" aria-label="small primary button group">
          {levels.map(item => <Button onClick={(e) => { setLevel(item) }}>{item}</Button>)}
        </ButtonGroup>
      </div> */}
      <Map timestamp={timestamp} slick={slick} twentyfour={twentyfour} weekdays={weekdays} />
      <Chart weekdays={weekdays} />
    </div>
  );
}

export default App;
