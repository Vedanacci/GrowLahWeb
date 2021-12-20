/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import firebase from "firebase";
// import "firebase/database";
// import {
//   FirebaseDatabaseProvider,
//   FirebaseDatabaseNode
// } from "@react-firebase/database";
import { db_config } from "config";

import dashboard from "views/Dashboard/Dashboard"

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import Dashboard from "views/Dashboard/Dashboard";

import {
  dataPoints,
  allMetrics,
  allMetricsSide,
  lightlevels1,
  humiditylevels1,
  ph1,
  temp1,
  toggleConst
} from "variables/charts.js";
import Login from "views/Login/login";

var newLevels = [];
var newLevelsSide = [];
var path = "vedantbahadur"
var pctg = 0.25;
var delta = 10;
var systemName = '';

const hist = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props)

    this.app = firebase.initializeApp(db_config);
    this.auth = firebase.auth()
    // this.database = firebase.database().ref().child(path);
    this.firestore = firebase.firestore()
    this.signIn = this.signIn.bind(this)
    this.refresh = this.refresh.bind(this)
    this.state = {
      speed: [],
    };
    this.systemName = systemName;
  }

  componentDidMount() {
    //console.log("didmount")
  }

  refresh() {
    //console.log("Refreshing")
    // Object.assign(toggleConst, true)
    //console.log(toggleConst);
    this.setState({});
    //console.log("Refreshed")
    // // this.getHumidity();
    // this.signIn("test@gmail.com", "VedantTest")
  }

  signIn(email, password) {
    //console.log("Signing In")
    this.auth.signInWithEmailAndPassword(email, password).then(value => {
      //console.log(value);
      //console.log(value.user.phoneNumber);
      this.firestore.collection("Users").doc(value.user.uid).collection("myGarden").get().then(
        (snap) => {
          newLevels = [];
          newLevelsSide = [];
          snap.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);
            path = doc.data()['path'];
            var database = firebase.database().ref().child(path);
            this.getIOTData(doc.id, database);
            newLevelsSide.push(doc.id);
          })
          Object.assign(allMetricsSide, newLevelsSide)

        }
      )
    })
  }

  compareObjects(object1, object2, key) {
    const obj1 = object1[key].toUpperCase()
    const obj2 = object2[key].toUpperCase()

    if (obj1 < obj2) {
      return -1
    }
    if (obj1 > obj2) {
      return 1
    }
    return 0
  }

  getHumidity(snap, humidity, labels, name) {
    var lightArray = [];
    //console.log("Toggle is")
    //console.log(toggleConst)
    var lightArray = Object.values(snap.val());

    //console.log(lightArray)
    humidity.data = {
      labels: labels,
      series: [lightArray]
    }
    humidity.title = "Humidity (%)"
    humidity.high = 85
    humidity.low = 65
    humidity.updateInfo((1 - pctg) * Math.min(lightArray), (1 + pctg) * Math.max(lightArray))
    if (!newLevels.includes(humidity)) {
      newLevels.push(humidity)
    }
    Object.assign(allMetrics, newLevels)
    //console.log("allmetrics is")
    //console.log(allMetrics)
    this.setState({
    });
  }

  getIOTData(name, database) {
    // Object.assign(lightLevels, lightlevels1);
    var humidity = {}
    Object.assign(humidity, humiditylevels1);
    var ph = {}
    Object.assign(ph, ph1);
    var temp = {}
    Object.assign(temp, temp1);
    database.child("startTime").on('value', (start) => {
      var startTime = start.val()['hour']
      var min = start.val()['min']
      database.child("elapsed").on('value', (val) => {
        var ms = val.val() + startTime * 3600000
        var hour = Math.floor(((ms * 1.15740741 * (10 ** (-8))) % 1) * 24);
        var mins = (Math.floor(ms / 60000) % 60)
        //console.log(mins)
        mins = (mins + min) % 60
        //console.log(mins)
        //console.log("Hours", hour);
        var labels = [];
        for (var count = 0; count < dataPoints; count++) {
          var lbl = hour - (dataPoints - 1 - count) * 2
          //console.log(lbl)
          if (lbl < 0) {
            lbl = 24 + lbl
          }
          const zeroPad = (num, places) => String(num).padStart(places, '0')
          labels.push(zeroPad(lbl, 2) + ":" + zeroPad(mins, 2))
        }
        database.child("light").on('value', (snap) => {
          //console.log("printing")
          var lightArray = Object.values(snap.val());
          for (var count = 0; count < lightArray.length; count += 1) {
            lightArray[count] = Math.round((lightArray[count] * 10000 / 4095.0)) / 100
          }
          //console.log("Lightlevel")
          //console.log(lightArray)
          lightlevels1.data = {
            labels: labels,
            series: [lightArray]
          }
          lightlevels1.title = "Light (%)"
          lightlevels1.high = 100
          lightlevels1.low = 0
          //console.log(lightlevels1.data.series)
          if (!newLevels.includes(lightlevels1)) {
            newLevels.push(lightlevels1)
          }
          Object.assign(allMetrics, newLevels)
          //console.log("allmetrics is")
          //console.log(allMetrics)
          this.setState({
          });
        });
        database.child("humidity").on('value', (snap) => {
          //console.log("printing")
          // var lightArray = snap.val().slice(-dataPoints);
          this.getHumidity(snap, humidity, labels, name)
        });
        database.child("ph").on('value', (snap) => {
          //console.log("printing")
          var lightArray = Object.values(snap.val());
          //console.log(lightArray)
          ph.data = {
            labels: labels,
            series: [lightArray]
          }
          ph.title = "PH (0-14)"
          ph.high = 7.1
          ph.low = 6.5
          ph.updateInfo((1 - pctg) * Math.min(lightArray), (1 + pctg) * Math.max(lightArray))
          if (!newLevels.includes(ph)) {
            newLevels.push(ph)
          }
          Object.assign(allMetrics, newLevels)
          //console.log("allmetrics is")
          //console.log(allMetrics)
          this.setState({
          });
        });
        database.child("temp").on('value', (snap) => {
          //console.log("printing")
          var lightArray = Object.values(snap.val());
          //console.log(lightArray)
          temp.data = {
            labels: labels,
            series: [lightArray]
          }
          temp.title = "Temp (˚C)" //name +
          temp.high = 32
          temp.low = 27
          temp.updateInfo((1 - pctg) * Math.min(lightArray), (1 + pctg) * Math.max(lightArray))
          if (!newLevels.includes(temp)) {
            newLevels.push(temp)
          }
          newLevels.sort((first, second) => {
            //console.log(first, second);
            return this.compareObjects(first, second, "title");
          });
          //console.log(newLevels)
          Object.assign(allMetrics, newLevels)
          //console.log("allmetrics is")
          //console.log(allMetrics)
          this.systemName = name;
          this.setState({
          });
        });
      });
    })
  };

  render() {
    //console.log("rendering");
    if (this.auth.currentUser == null) {
      return (
        <Login fn={this.signIn} />
      )
    } else {
      return (
        <Router history={hist}>
          <Switch>
            {/* <Admin></Admin> */}
            <Route path="/admin" render={props => <Admin refresh={this.refresh} systemName = {this.systemName}/>} />
            {/* <Route path="/rtl" component={RTL} /> */}
            <Redirect from="/" to="/admin/dashboard" />
            {/* <Dashboard/> */}
          </Switch>
        </Router>
        // <div>
        //   <h1>Count is {this.state.speed}</h1>
        // </div>
      );

    }

  }
}
ReactDOM.render(
  <App />,
  document.getElementById("root")
);


