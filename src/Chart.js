import React from 'react'
import { Bar } from "react-chartjs-2";
import numeral from "numeral";
import './Chart.css'

function Chart({ weekdays }) {

  return (
    <div className="chart">
      <Bar
        data={{
          labels: weekdays.map(item => item.toLocaleDateString()),

          datasets: [{
            data: [50, 60, 70, 10, 40, 80, 90, 20, 30,],
            borderWidth: 0.5,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
          }]
        }}
        width={600}
        height={400}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: function (value) {
                    return numeral(value).format("0a");
                  },
                },
              },
            ],
          },
        }}
      />
    </div>
  )
}

export default Chart