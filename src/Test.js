import React, { useState, useEffect } from 'react'
import { addDays } from 'date-fns';

function Test() {
  const [weekdays, setWeekdays] = useState([])
  const now = new Date()

  useEffect(() => {


    for (let i = 0; i < 8; i++) {
      weekdays.push(addDays(now, i))
      setWeekdays(Array.from(new Set(weekdays)))
    }
  }, [])

  return (
    <div>
      {now.toISOString()}
      {weekdays?.map(day => <p>{day.toLocaleDateString().replace(/[0-9]+\//, '')}</p>)}
    </div>
  )
}

export default Test
