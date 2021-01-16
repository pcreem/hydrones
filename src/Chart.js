import React from 'react'
import { Bar } from "react-chartjs-2";
import numeral from "numeral";
import './Chart.css'

function Chart({ weekdays, twentyfour, data }) {

  return (
    <div className="chart">
      <Bar
        data={{
          // labels: weekdays.map(item => item.toLocaleDateString()),
          labels: twentyfour.map(item => item),

          datasets: [{
            data: data.map(item => item.length),
            borderWidth: 0.5,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
          }]
        }}
        width={600}
        height={400}
        options={{
          title: {
            display: true,
            text: weekdays[0].toLocaleDateString()
          },
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