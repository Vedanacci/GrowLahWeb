// ##############################
// // // javascript library for creating charts
// #############################
var Chartist = require("chartist");
function options(high = 100, low=0) {
  return ({
    showArea: true,
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 200
    }),
    low: low,
    high: high, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 20,
      right: 10,
      bottom: 0,
      left: 0
    }
  })
};

function responsiveOptions() {
  return [
    ['screen and (max-width: 960px)', {
      // showLine: false,
      axisX: {
        showLabel: false,
          labelInterpolationFnc: function(value) {
            return 'Week ' + value;
          }
      }
    }]
  ];
}


// #############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

// ##############################
// // // Daily Sales
// #############################

const dataPoints = 12

const labels = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

const lightlevels1 = {
  data: {
    labels: labels,
    series: [[12, 17, 7, 17, 23, 18, 10]]
  },
  options: options(),
  responsiveOptions: responsiveOptions(),
  title: "System 1 Light (%)",
  high: 8,
  low: 6
  // for animation

};

// ##############################
// // // Email Subscriptions
// #############################

const humiditylevels1 = {
  data: {
    labels: labels,
    series: [[80, 43, 30, 70, 53, 43, 36]]
  },
  options: options(85, 65),
  responsiveOptions: responsiveOptions(),
  title: "System 1 Humidity (%)",

  updateInfo(low, high) {
    this.options = options(high, low);
  }
};



// ##############################
// // // Completed Tasks
// #############################

const ph1 = {
  data: {
    labels: labels,
    series: [[230, 750, 450, 300, 280, 240, 200, 190]]
  },
  options: options(8.5, 7),
  responsiveOptions: responsiveOptions(),
  title: "System 1 PH (0-14)",

  updateInfo(low, high) {
    this.options = options(high, low);
  }
};

const temp1 = {
  data: {
    labels: labels,
    series: [[23, 75, 45, 30, 28, 24, 20, 19]]
  },
  options: options(35, 25),
  responsiveOptions: responsiveOptions(),
  title: "System 1 Temp (˚C)",

  updateInfo(low, high) {
    this.options = options(high, low);
  }
};



// ##############################
// // // Completed Tasks
// #############################

const waterlevels3 = {
  data: {
    labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
    series: [[230, 750, 450, 300, 280, 240, 200, 190]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  responsiveOptions: responsiveOptions(),
};

const allMetrics = [lightlevels1, humiditylevels1, ph1, temp1];
const allMetricsSide = ["Title"];

const toggleConst = [false];
const systemName = '';

module.exports = {
  systemName,
  toggleConst,
  dataPoints,
  allMetrics,
  allMetricsSide,
  labels,
  lightlevels1,
  humiditylevels1,
  ph1,
  temp1,
};
