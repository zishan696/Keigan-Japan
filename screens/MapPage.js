import React, { Component } from "react";
import Svg, { Line, Path, Polyline } from "react-native-svg";
import {
  TouchableOpacity,
  View,
  Text,
  Button,
  ImageBackground,
} from "react-native";
import styles from "../styles/Style";
import "../shim.js";
import { decode as atob, encode as btoa } from "base-64";
import { ScrollView } from "react-native-gesture-handler";

import { SafeAreaView } from "react-native-safe-area-context";
let mqtt = require("mqtt");
let pub = mqtt.connect("ws://ik1-131-72130.vs.sakura.ne.jp:8888");
let sub = mqtt.connect("ws://ik1-131-72130.vs.sakura.ne.jp:8888");
var Img = " ";

export default class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base64Icon: "https://reactjs.org/logo-og.png",
      xCor: 0,
      yCor: 0,
      xCorDoll: 0,
      yCorDoll: 0,
      asked: false,
      showClickPos: false,
      showDolly: false,
      greenCoordinatesX: [],
      greenCoordinatesY: [],
      coordinates: "0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0",
    };
    this.askImage = this.askImage.bind(this);
    this.displayImage = this.displayImage.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
  }

  refreshPage() {
    this.forceUpdate();
    this.setState({
      base64Icon: "https://reactjs.org/logo-og.png",
    });
    this.setState({ showDolly: false });
  }

  componentDidMount() {
    sub.subscribe("topic/x");
    sub.subscribe("topic/y");
    sub.subscribe("topic/Stop_BlueDot");
    sub.subscribe("XGreenLine_topic");
    sub.subscribe("YGreenLine_topic");
    sub.on(
      "message",
      function (topic, message) {
        // message is Buffer
        console.log("Location updated");
        if (topic === "topic/x") {
          //console.log("Subscribed to dolly x-coordinate");
          var xDoll = parseFloat(message);
          this.setState({ xCorDoll: xDoll });
        }
        if (topic === "topic/y") {
          //console.log("Subscribed to dolly y-coordinate");
          var yDoll = parseFloat(message);
          this.setState({ yCorDoll: yDoll });
        }
        if (topic === "topic/Stop_BlueDot") {
          console.log("Blue Dot off: ", message.toString());
          this.setState({ showClickPos: false });
        }
        if (topic === "XGreenLine_topic") {
          this.setState({ greenCoordinatesX: [] });
          let data = message;
          let valueX = [];
          let st = "";
          let j = 0;
          for (let i = 0; i <= data.length; i++) {
            if (String.fromCharCode(data[i]) != ",") {
              st += String.fromCharCode(data[i]);
            } else {
              valueX[j] = parseFloat(st);
              st = "";
              j++;
            }
          }
          //console.log("X array: ", valueX);
          this.setState({ greenCoordinatesX: valueX.slice() });
        }
        if (topic === "YGreenLine_topic") {
          this.setState({ greenCoordinatesY: [] });
          let data = message;
          let valueY = [];
          let st = "";
          let j = 0;
          for (let i = 0; i <= data.length; i++) {
            if (String.fromCharCode(data[i]) != ",") {
              st += String.fromCharCode(data[i]);
            } else {
              valueY[j] = parseFloat(st);
              st = "";
              j++;
            }
          }
          this.setState({ greenCoordinatesY: valueY.slice() });
        }
        // console.log("The array X: ", this.state.greenCoordinatesX);
        // console.log("The array Y: ", this.state.greenCoordinatesY);
        console.log("The array Length: ", this.state.greenCoordinatesY.length);
        if (
          this.state.greenCoordinatesX.length > 0 &&
          this.state.greenCoordinatesY.length > 0
        ) {
          let stVal = "";
          for (let i = 0; i < this.state.greenCoordinatesY.length; i++) {
            stVal += this.state.greenCoordinatesX[i].toString();
            stVal += ",";
            stVal += this.state.greenCoordinatesY[i].toString();
            if (i < this.state.greenCoordinatesY.length - 1) {
              stVal += " ";
            }
          }
          if (stVal.length > 0) {
            this.setState({ coordinates: stVal });
            console.log("Coordinates: ", this.state.coordinates);
          }
        }
      }.bind(this)
    );
  }

  handlePress(evt) {
    var PosX = evt.nativeEvent.locationX;
    var PosY = evt.nativeEvent.locationY;
    console.log("X: " + PosX, "Y: " + PosY);
    PosX = PosX - 23;
    PosY = PosY - 23;
    this.setState({
      xCor: PosX + 12,
      yCor: PosY - 18,
      showClickPos: true,
    });
    let axisX = PosX.toString();
    let axisY = PosY.toString();
    pub.publish("x_Coordinate", axisX);
    pub.publish("y_Coordinate", axisY);
  }
  displayImage() {
    this.setState({
      base64Icon:
        "https://i.pinimg.com/originals/10/b2/f6/10b2f6d95195994fca386842dae53bb2.png",
    });
    this.askImage();
  }
  askImage() {
    //image map display
    this.setState({ asked: true });
    this.setState({ showDolly: true });
    pub.publish("askMap", "Map asked");

    sub.subscribe("topic/img");
    sub.on(
      "message",
      function (topic, message) {
        // message is Buffer
        if (topic === "topic/img") {
          console.log("topic/img");
          let data = message;
          let st = "";
          for (let i = 0; i < data.length; i++) {
            st += String.fromCharCode(data[i]);
          }
          Img = "data:image/png;base64," + btoa(st);
        }
        this.setState({
          base64Icon: Img,
        });
      }.bind(this)
    );
  }
  render() {
    let blueDot =
      this.state.showClickPos && this.state.asked ? (
        <View style={{ position: "absolute" }}>
          <Text
            style={{
              color: "blue",
              paddingTop: this.state.yCor,
              paddingLeft: this.state.xCor,
              fontSize: 50,
              fontWeight: "bold",
            }}
          >
            .
          </Text>
        </View>
      ) : null;
    let redDot = this.state.showDolly ? (
      <View style={{ position: "absolute" }}>
        <Text
          style={{
            color: "red",
            paddingTop: this.state.yCorDoll,
            paddingLeft: this.state.xCorDoll,
            fontSize: 50,
            fontWeight: "bold",
          }}
        >
          .
        </Text>
      </View>
    ) : null;
    let lineShow =
      this.state.showClickPos &&
      this.state.greenCoordinatesX.length > 0 &&
      this.state.greenCoordinatesY.length > 0 ? (
        // <Svg>
        //   <Line
        //     x1={this.state.greenCoordinatesX[0] + 10}
        //     y1={this.state.greenCoordinatesY[0] + 60}
        //     x2={this.state.greenCoordinatesX[11]}
        //     y2={this.state.greenCoordinatesY[11] + 38}
        //     stroke="green"
        //     strokeWidth="5"
        //   />
        // </Svg>
        <Svg>
          <Polyline
            points={this.state.coordinates}
            fill="none"
            stroke="green"
            strokeWidth="3"
          />
        </Svg>
      ) : null;

    return (
      <SafeAreaView style={styles.view}>
        <ScrollView
          style={{
            flex: 1,
            paddingTop: "5%",
          }}
        >
          <View style={styles.view}>
            <View style={{ marginLeft: "80%" }}>
              <Button title="Reload" color="green" onPress={this.refreshPage} />
            </View>
            <Text style={{ fontWeight: "bold", color: "purple" }}>
              Map Screen
            </Text>
            <View style={styles.box}>
              <TouchableOpacity
                style={{}}
                onPress={
                  this.state.asked
                    ? (evt) => this.handlePress(evt)
                    : console.log("Press Asked Map")
                }
              >
                <ImageBackground
                  source={{
                    uri: this.state.base64Icon,
                  }}
                  style={styles.imageStyle}
                >
                  {blueDot}
                  {redDot}
                  {lineShow}
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <Button title="Ask Map" onPress={this.displayImage}></Button>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginRight: "55%",
                marginTop: -25,
              }}
            >
              <Text
                style={{
                  color: "red",
                  fontSize: 50,
                  fontWeight: "bold",
                }}
              >
                .
              </Text>
              <Text style={{ marginTop: 40 }}>- Realtime Dolly position</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginRight: "70%",
                marginTop: -40,
              }}
            >
              <Text
                style={{
                  color: "blue",
                  fontSize: 50,
                  fontWeight: "bold",
                }}
              >
                .
              </Text>
              <Text style={{ marginTop: 40 }}>- Goal Selected</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginRight: "65%",
                marginTop: -40,
              }}
            >
              <Text
                style={{
                  color: "green",
                  fontSize: 40,
                  fontWeight: "bold",
                }}
              >
                _
              </Text>
              <Text style={{ marginTop: 35 }}>- Navigation line</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
