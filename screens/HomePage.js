import "react-native-gesture-handler";
import React, { Component } from "react";
import "../shim.js";
import { View, TextInput, Text, Button } from "react-native";
import styles from "../styles/Style";
let mqtt = require("mqtt");
let pub = mqtt.connect("ws://ik1-131-72130.vs.sakura.ne.jp:8888");

export default class HomePage extends Component {
  componentDidMount() {}
  constructor(props) {
    super(props);
    this.state = {
      Xvalue: 0,
      Yvalue: 0,
    };
    this.pubMessage = this.pubMessage.bind(this);
  }
  pubMessage() {
    let topic3 = "mqtt-positionX";
    let topic4 = "mqtt-positionY";
    let positionX = this.state.Xvalue.toString();
    let positionY = this.state.Yvalue.toString();
    console.log("published topic to Ros-topic");

    // Publish the message
    pub.publish(topic3, positionX);
    pub.publish(topic4, positionY);
  }
  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>Enter Coodinates for Dolly</Text>
        <TextInput
          placeholder="Position X"
          style={styles.input}
          onChangeText={(x) =>
            this.setState({ Xvalue: (this.state.Xvalue = x) })
          }
        ></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Position Y"
          onChangeText={(y) =>
            this.setState({ Yvalue: (this.state.Yvalue = y) })
          }
        />
        <Button title="Publish" onPress={this.pubMessage}></Button>
      </View>
    );
  }
}
