import React from 'react'
import { Card, Segment } from 'semantic-ui-react'

class PlayerGraphs extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  cat = ['pts', 'rebTot', 'ast', 'stl', 'blk', 'fgpct', 'ftpct', 'pt3pct', 'tov']
  fcat = ['pts', 'rebTot', 'ast', 'stl', 'blk', 'fgA', 'fgM', 'ftA', 'ftM', 'pt3M', 'tov']
  weights = ['PTS', 'REBTot', 'AST', 'STL', 'BLK', 'FGA', 'FGM', 'FTA', 'FTM', 'PT3M', 'TOV']
  colors = [
    'rgba(166,206,227,0.5)',
    'rgba(31,120,180,0.5)',
    'rgba(178,223,138,0.5)',
    'rgba(51,160,44,0.5)',
    'rgba(251,154,153,0.5)',
    'rgba(227,26,28,0.5)',
    'rgba(253,191,111,0.5)',
    'rgba(255,127,0,0.5)',
    'rgba(202,178,214,0.5)',
    'rgba(106,61,154,0.5)',
    'rgba(255,132,100,0.5)']
  borderColors = [
    'rgba(166,206,227,1)',
    'rgba(31,120,180,1)',
    'rgba(178,223,138,1)',
    'rgba(51,160,44,1)',
    'rgba(251,154,153,1)',
    'rgba(227,26,28,1)',
    'rgba(253,191,111,1)',
    'rgba(255,127,0,1)',
    'rgba(202,178,214,1)',
    'rgba(106,61,154,1)',
    'rgba(255,132,100,1)'
  ]

  plotFantasySeries() {
    const seasonData = this.props.seasonStats
    if (!seasonData)
      return


    const size = seasonData.length
    const weeks = Array(size).fill(null).map((v, i) => i + 1)
    const fantasyData = _.map(this.fcat, (cat, i) => {
      const data = _.map(seasonData, (data) => { return this.props.weights[this.weights[i]] * data[cat] })
      // return this.props.weights[this.weights[i]]
      return {
        label: cat.toUpperCase().replace("PCT", "%").replace("TOT", "").replace("PT3", "3PT"),
        data: data,
        backgroundColor: this.colors[i],
        borderColor: this.borderColors[i],
        borderWidth: 1
      }
    })

    var ctx = document.getElementById("fantasySeriesChart").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: weeks,
        datasets: fantasyData
      },
      options: {
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

  plotPieChart() {
    const seasonData = this.props.seasonStats
    if (!seasonData)
      return

    const fantasyData = _.map(this.fcat, (cat, i) => {
      const data = _.map(seasonData, (data) => { return data[cat] })
      // return this.props.weights[this.weights[i]]
      return _.map(data, (dataPt) => { return dataPt * this.props.weights[this.weights[i]] })
    })

    var ctx = document.getElementById("pieChart").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: _.map(this.fcat, (cat) => (cat.toUpperCase().replace("PCT", "%").replace("TOT", "").replace("PT3", "3PT"))),
        datasets: [{
          data: _.map(this.fcat, (cat, i) => Math.abs(_.round(_.meanBy(seasonData, cat) * this.props.weights[this.weights[i]], 2))),
          borderColor: this.borderColors,
          backgroundColor: this.colors,
          borderWidth: 1
        }]
      },
      options: {

      }
    });
  }

  plotSeriesChart() {
    const seasonData = this.props.seasonStats
    if (!seasonData)
      return

    const size = seasonData.length
    const weeks = Array(size).fill(null).map((v, i) => i + 1)
    const datasets = _.map(this.cat, (cat, i) => {
      const data = _.map(seasonData, (data) => { return data[cat] })
      return {
        label: cat.toUpperCase().replace("PCT", "%").replace("TOT", "").replace("PT3", "3PT"),
        data: data,
        backgroundColor: this.colors[i],
        borderColor: this.borderColors[i],
        borderWidth: 1
      }
    })

    var ctx = document.getElementById("seriesChart").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: weeks,
        datasets: datasets
      },
      options: {
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

  componentWillReceiveProps() {
    this.plotPieChart()
    this.plotSeriesChart()
    this.plotFantasySeries()
    this.forceUpdate()
  }

  render() {
    return (
      <div id="player-graphs">
        <Card.Group itemsPerRow={2}>
          <Card>
            <Card.Content>
              <canvas id="pieChart" width="50" height="50"></canvas>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <canvas id="seriesChart" width="50" height="50"></canvas>
            </Card.Content>
          </Card>
        </Card.Group>
        <Card fluid>
          <Card.Content>
            <canvas id="fantasySeriesChart"></canvas>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default PlayerGraphs