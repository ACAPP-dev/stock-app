import React from 'react';
import './App.css';
// import candlestick chart components from amcharts.com below:
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

// from to in stock data is unix time from 6/1/20 to 6/15/20
const FINNHUB_STOCK_DATA_URL = 'https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=1590969600&to=1592179200&token=bsfleivrh5rf14r5rh80'
const FINNHUB_API_KEY = 'bsfleivrh5rf14r5rh80'

class App extends React.Component {
  
  componentDidMount() {
    fetch(FINNHUB_STOCK_DATA_URL)
    .then(resp => resp.json())
    .then(json => {
      console.log(json)
    })
  }

    // Sample xy chart from amcharts.com for React:
  testChart = () => {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingRight = 20;

    let data = [];
    let visits = 10;
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
    }
  
    chart.data = data;
    console.log(chart.data)
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
  
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
  
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
  
    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();
  
    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;
  
    // this.chart = chart;
    
   
    }
  
    
  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }


    //sample api request from finnhub.io documentation
    // const request = require('request');

    // request('https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=1572651390&to=1572910590&token=bsfleivrh5rf14r5rh80', { json: true }, (err, res, body) => {
    //   if (err) { return console.log(err); }
    //   console.log(body.url);
    //   console.log(body.explanation);
    // });

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Andrew's Final Project</h1>
          <h2>Stock App</h2>
        </header>
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}>
          {this.testChart()}
        </div>
      </div>
    );
  }
}

export default App;
