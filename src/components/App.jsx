import React, { Component } from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";
import axios from "axios";
import Chart from "chart.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      charttype: "line",
      time: [],
      prices: []
    };
    this.chartRef = React.createRef();
    this.createChart = this.createChart.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/prices")
      .then(res => {
        //console.log(res);
        let time = [];
        let prices = [];
        res.data.forEach(el => {
          for (let key in el) {
            time.push(key);
            prices.push(el[key]);
          }
        });
        this.setState({ time: time, prices: prices }, () => {
          this.createChart();
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  createChart() {
    const myChartRef = this.chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: this.state.charttype,
      data: {
        labels: this.state.time,
        datasets: [
          {
            label: "price",
            data: this.state.prices,
            backgroundColor: "#a0c0ff"
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "time",
              ticks: {
                source: "labels"
              },
              time: {
                unit: "day",
                unitStepSize: 1,
                displayFormats: {
                  day: "MMM D"
                }
              },
              distribution: "series"
            }
          ]
        }
      }
    });
  }

  render() {
    return (
      <div>
        <h3>Cryptocurrency Charting</h3>
        <div>
          <canvas id="myChart" ref={this.chartRef} />
        </div>
      </div>
    );
  }
}

export default App;
