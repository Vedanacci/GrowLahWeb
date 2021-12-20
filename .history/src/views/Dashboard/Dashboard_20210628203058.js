import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardSpecial from "components/Card/CardSpecial";
import firebase from "firebase/app";
import "firebase/database";
import { db_config } from "config";
import View from '@material-ui/core/Button';

import { bugs, website, server } from "variables/general.js";

import {
  allMetrics,
  dataPoints,
  toggleConst
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
var Chartist = require("chartist");
const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  var allMetrics3 = [];
  Object.assign(allMetrics3, allMetrics)
  var allMetrics2 = [];
  console.log(allMetrics)
  var toggled = [false];
  Object.assign(toggled, toggleConst);
  console.log("Toggle")
  console.log(toggled);
  console.log("Toggle")
  console.log(toggleConst);
  var labels = [];
  var label1 = JSON.parse(JSON.stringify(allMetrics[0].data.labels[allMetrics[0].data.labels.length - 1]))
  console.log(label1)
  var hour = Math.round(label1.substr(0, label1.indexOf(':')));
  var min = Math.round(label1.substr(label1.indexOf(':') + 1));
  const zeroPad = (num, places) => String(num).padStart(places, '0')
  if (toggled[0] == true) {
    for (var count = 0; count < dataPoints; count++) {
      var newHour = hour;
      var lbl = min - (dataPoints - 1 - count) * 15
      console.log("lbl")
      console.log(lbl)
      if (lbl < 0) {
        lbl = 60 + lbl % 60
        newHour = hour - Math.ceil(-(min - (dataPoints - 1 - count) * 15) / 60)
        if (newHour < 0) {
          newHour = newHour + 24
        }
      }
      labels.push(zeroPad(newHour, 2) + ":" + zeroPad(lbl, 2))
    }
  }
  for (var count = 0; count < allMetrics3.length; count++) {
    var metric = JSON.parse(JSON.stringify(allMetrics3[count]))
    console.log("c")
    console.log(metric);
    console.log("cd")
    console.log(toggled[0])
    if (toggled[0] == true) {
      metric.data.series[0] = metric.data.series[0].splice(-dataPoints);
      metric.data.labels = labels
    }
    else {
      console.log("false")
      var delta = 10;
      var lightArrayIn = metric.data.series[0].slice(-(dataPoints * delta));
      console.log(lightArrayIn)
      metric.data.series[0] = [];
      for (var i = lightArrayIn.length - 1; i >= 0; i = i - delta) {
        metric.data.series[0].push(lightArrayIn[i]);
      }
      metric.data.series[0].reverse()
      console.log(metric.data.series[0])
    }
    console.log(metric)
    allMetrics2.push(metric)
    console.log("allm21")
    console.log(allMetrics2)
  }
  console.log("allm2")
  console.log(allMetrics2)
  console.log(allMetrics)
  return (
    <div>

      <GridContainer >
        {allMetrics2.map(i => {
          return <GridItem xs={12} sm={12} md={3} key="hello">
            <CardSpecial chart style={{
              backgroundColor: (i.high >= i.data.series[0][dataPoints - 1] && i.low <= i.data.series[0][dataPoints - 1]) ? "#66bb6a" : "#ef5350",
              padding: "10px 10px",
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
            }}>
              {NotifName(i.title, i.data.series[0][dataPoints - 1], i.high, i.low)}
            </CardSpecial>
          </GridItem>
        })}
      </GridContainer>


      <GridContainer>
        {allMetrics2.map(i => {
          var type = i.title.includes("Humidity") ? 'Humidity' : i.title.includes("Light") ? 'Light' : i.title.includes("Temp") ? 'Temp' : 'PH'
          console.log(i.high)
          console.log(i.data.series[0])
          console.log(i.low)
          var color = "primary"
          return <GridItem xs={12} sm={12} md={6} key={i.title} id={type}>
            <Card chart>
              <CardHeader color={color}>
                <ChartistGraph
                  className="ct-chart"
                  data={i.data}
                  type="Line"
                  options={i.options}
                  listener={{
                    "draw": function (data) {
                      if (data.type === 'line' || data.type === 'area') {
                        data.element.animate({
                          d: {
                            begin: 2000 * data.index,
                            dur: 2000,
                            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                            to: data.path.clone().stringify(),
                            easing: Chartist.Svg.Easing.easeOutQuint
                          }
                        });
                      }
                    }
                  }}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>{i.title} : {i.data.series[0][dataPoints - 1]}</h4>
                <p1>Optimum Range: {i.low} - {i.high}</p1>
              </CardBody>
            </Card>
          </GridItem>;
        })}
      </GridContainer>
    </div>
  );
}

function NotifName(title, data, high, low) {
  if (title.includes("Humidity")) {
    if (high < data) {
      return (title + " is too high, Please check your environment")
    }
    else if (low > data) {
      return (title + " is too low, Please check your environment")
    }
    else {
      return (title + ' Good!')
    }
  }
  else if (title.includes("Light")) {
    if (high < data) {
      return (title + " is too high, Please check your environment")
    }
    else if (low > data) {
      return (title + " is too low, Please check your environment")
    }
    else {
      return (title + ' Level Good!')
    }
  } else if (title.includes("Temp")) {
    if (high < data) {
      return (title + " is too high, Please lower your temperature")
    }
    else if (low > data) {
      return (title + " is too low, Please raise your temperature")
    }
    else {
      return (title + ' Level Good!')
    }
  } else if (title.includes("PH")) {
    if (high < data) {
      return (title + " is too high, Please add water")
    }
    else if (low > data) {
      return (title + " is too low, Please add nutrient solution")
    }
    else {
      return (title + ' Level Good!')
    }
  }
}