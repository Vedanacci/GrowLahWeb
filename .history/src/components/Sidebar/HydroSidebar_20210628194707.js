import React from 'react';
import ChartistGraph from 'react-chartist';
import CardSpecial from "../Card/CardSpecial"
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import {
    allMetrics,
    allMetricsSide,
    lightlevels1,
    humiditylevels1,
    ph1,
    lightlevels2,
    humiditylevels2,
    waterlevels2,
    lightlevels3,
    humiditylevels3,
    waterlevels3,
    toggleConst
} from "variables/charts.js";
import { all } from 'q';
import View from '@material-ui/core/Button';


import light from "./light.png";
import humidity from "./water.png";
import temp from "./temp.png";
import ph from "./ph.png";






function HydroStat(props) {
    const { title, data1, picture } = props;
    return (
        <CardSpecial chart>
            <CardBody style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                <CardHeader>
                    <h4
                        style={{
                            fontWeight: "bold",
                            margin: "0",
                            fontSize: "16px"
                        }}>{title}</h4>
                </CardHeader>

                <img style={{ width: "60px", height: "60px" }} src={picture} />

                <p style={{ margin: "0", fontSize: "16px" }}>{data1}</p>

            </CardBody>
        </CardSpecial>
    )
}
function toggle() {
    console.log("Toggling")
}

export default function HydroSidebar({ refresh }) {
    var Side = [];
    console.log(allMetrics);
    console.log("done")
    console.log(refresh)
    function refresh2() {
        console.log("refresh hydro");
        refresh()
    };
    // console.log(allMetrics[10])
    for (var count = 0; count < Math.floor(allMetrics.length / 4); count++) {
        console.log(count)
        // console.log(allMetricsSide)
        console.log(allMetrics[count * 4])
        console.log([allMetricsSide[count], allMetrics[count * 4].data.series[0][6], allMetrics[count * 4 + 1].data.series[0][6], allMetrics[count * 4 + 2].data.series[0][6]])
        Side.push([allMetricsSide[count], allMetrics[count * 4].data.series[0][6], allMetrics[count * 4 + 1].data.series[0][6], allMetrics[count * 4 + 2].data.series[0][6]])
    }
    console.log("Side is")
    console.log(allMetrics.length / 4)
    console.log(Side);
    return (

        <div
            style={{
                backgroundColor: "#43a047",
                border: "none",
                position: "absolute",
                top: "0",
                bottom: "0",
                left: "0",
                width: "15vw",
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <Toggle refresh={refresh2} />
            {/* {Side.map(i => {
                console.log("I is")
                console.log(i)
                return (<HydroStat title={i[0]} data1={"Light level%: " + i[2]} data2={"Humidity level%: " + i[1]} data3={"PH: " + i[3]} />)
            })}; */}
            {/* {Side.map(i => {
                console.log("I is")
                console.log(i)
                return (<HydroStat title={i[0]} data1={"Light level%: " + i[1]} data2={"Humidity level%: " + i[2]} data3={"PH: " + i[3]} />)
            })}; */}

            <HydroStat title="Light(%)" picture={light} data1={allMetrics[1].data.series[0][allMetrics[1].data.series[0].length - 1]} />
            <HydroStat title="Humidity(%)" picture={humidity} data1={allMetrics[0].data.series[0][allMetrics[0].data.series[0].length - 1]} />
            <HydroStat title="PH (0-14)" picture={ph} data1={allMetrics[2].data.series[0][allMetrics[2].data.series[0].length - 1]} />
            <HydroStat title="Temp(˚C)" picture={temp} data1={allMetrics[3].data.series[0][allMetrics[3].data.series[0].length - 1]} />

        </div>

    );
}

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("Handling click")
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn,
        }));
        console.log(this.state.isToggleOn)
        console.log(toggleConst)
        Object.assign(toggleConst, [this.state.isToggleOn])
        this.props.refresh();
    }

    render() {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", backgroundColor: "blue", width: "100%" }}>
                <CardSpecial chart>
                    <View onClick={this.handleClick}>
                        {this.state.isToggleOn ? 'Long Term' : 'Short Term'}</View>
                </CardSpecial>

                <CardSpecial chart>
                    <View onClick={this.handleClick}>
                        {this.state.isToggleOn ? 'Long Term' : 'Short Term'}</View>
                </CardSpecial>
            </div>
        );
    }
}