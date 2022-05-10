import React from "react";
import styles from "../styles/Style";
import "../shim.js";
import {
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Button,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

let mqtt = require("mqtt");
let pub = mqtt.connect("ws://ik1-131-72130.vs.sakura.ne.jp:8888");
let sub = mqtt.connect("ws://ik1-131-72130.vs.sakura.ne.jp:8888");

let topic = "mqtt-msg";
let metricU = "" + 10;
let metricD = "" + -10;
let metricL = "" + 11;
let metricR = "" + -11;
let makeZ = "" + 0;
let pubLoop;

export default function JoyStick() {
  function end() {
    clearInterval(pubLoop);
  }

  function up() {
    pubLoop = setInterval(() => {
      pub.publish(topic, metricU);
      console.log("pub: " + metricU);
    }, 500);
  }

  function upC() {
    pub.publish(topic, metricU);
    console.log("pub: " + metricU);
  }

  function down() {
    pubLoop = setInterval(() => {
      pub.publish(topic, metricD);
      console.log("pub: " + metricD);
    }, 500);
  }
  function downC() {
    pub.publish(topic, metricD);
    console.log("pub: " + metricD);
  }

  function left() {
    pubLoop = setInterval(() => {
      pub.publish(topic, metricL);
      console.log("pub: " + metricL);
    }, 500);
  }
  function leftC() {
    pub.publish(topic, metricL);
    console.log("pub: " + metricL);
  }

  function right() {
    pubLoop = setInterval(() => {
      pub.publish(topic, metricR);
      console.log("pub: " + metricR);
    }, 500);
  }
  function rightC() {
    pub.publish(topic, metricR);
    console.log("pub: " + metricR);
  }

  function stop() {
    pub.publish(topic, makeZ);
    //pub.end();
  }
  return (
    <SafeAreaView style={styles.view}>
      <Text>Joy Stick</Text>
      <View
        style={styles.upButton}
        onTouchStart={() => up()}
        onTouchEnd={() => end()}
      >
        <Button color="black" title="UP" onPress={() => upC()}></Button>
      </View>

      <View
        style={styles.downButton}
        onTouchStart={() => down()}
        onTouchEnd={() => end()}
      >
        <Button color="red" title="DOWN" onPress={() => downC()}></Button>
      </View>

      <View
        style={styles.leftButton}
        onTouchStart={() => left()}
        onTouchEnd={() => end()}
      >
        <Button title="LEFT" onPress={() => leftC()}></Button>
      </View>

      <View
        style={styles.rightButton}
        onTouchStart={() => right()}
        onTouchEnd={() => end()}
      >
        <Button title="RIGHT" onPress={() => rightC()}></Button>
      </View>
      <View
        style={styles.bottomButton}
        onTouchStart={() => stop()}
        onTouchEnd={() => end()}
      >
        <Button title="STOP" onPress={() => stop()}></Button>
      </View>
    </SafeAreaView>
  );
}
