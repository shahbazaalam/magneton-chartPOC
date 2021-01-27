import React, { useState } from "react";
import { Pie } from "react-chartjs-2";

const Chart3 = (props) => {
  
  return (
    <div className="App">
      <h2>CHART - 3</h2>
      <div>
        <Pie
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

export default Chart3;
