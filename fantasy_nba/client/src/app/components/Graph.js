import React from 'react'

class Graph extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  randomData(min, max, size) {
    return {
      x: Array(size).fill(null).map((u, i) => i + 1),
      y: Array(size).fill(null).map(() => Math.floor(Math.random() * (max - min) + min))
    }
  }

  componentDidMount() {

    let size = 200
    let min = 0
    let max = 100

    let data = this.randomData(min, max, size)

    var ctx = document.getElementById(this.props.id).getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.x,
        datasets: [{
          label: 'Fantasy Points',
          data: data.y,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          pointRadius: 0,
          cubicInterpolationMode: 'monotone'
        }]
      },
      options: {
        legend: {
          display: false
        },
        hover: {
          mode: 'nearest',
          intersect: false
        },
        tooltips: {
          mode: 'nearest',
          intersect: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  render() {
    return (
      <div id={this.props.id + "-container"} className="col s12 m6 chart-container">
        <canvas id={this.props.id}></canvas>
      </div>
    )
  }
}

export default Graph