import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

const Chart1 = (props) => {
  
  
  return (
    <div className="App">
      <h2>CHART - 1</h2>
      <div>
        <Bar
          data={props.chartData}
          options={{
            responsive: true,

            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chart1;
