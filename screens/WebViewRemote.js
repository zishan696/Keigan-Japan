import React from "react";
import { View, StyleSheet } from "react-native";

import { WebView } from "react-native-webview";

const HTML = `

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>MQTT DASH</title>
  <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
</head>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
<style type="text/css">
.container{
text-align: center;
border: 7px solid red;
width: 300px;
height: 400px;
padding-top: 50px;
padding-bottom: 50px;
}
.mid-left {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
.mid-right {
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.top-center {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.bottom-center {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
</head>

<body>

<script>

let pub = mqtt.connect('wss://test.mosquitto.org:8081');
let topic = "mqtt-msg"
let metricU =''+90
let metricD =''+-90
let metricL =''+99
let metricR =''+-99

function end() {
clearInterval(pubLoop);
}

function up(){
pubLoop = setInterval(() => {
  pub.publish(topic, metricU);
  console.log("pub: " + metricU);
}, 1000);
}
function upC(){
pub.publish(topic, metricU);
}

function down(){
pubLoop = setInterval(() => {
  pub.publish(topic, metricD);
  console.log("pub: " + metricD);
}, 1000);
}
function downC(){
pub.publish(topic, metricD);
}

function left(){
pubLoop = setInterval(() => {
  pub.publish(topic, metricL);
  console.log("pub: " + metricL);
}, 1000);
}
function leftC(){
pub.publish(topic, metricL);
}

function right(){
pubLoop = setInterval(() => {
  pub.publish(topic, metricR);
  console.log("pub: " + metricR);
}, 1000);
}
function rightC(){
pub.publish(topic, metricR);
}

function stop(){
pub.end();
}


</script>
<body>
<h1 style="color:green;text-align:center;">Welcome to MQTT remote control!!</h1>
<form name="ctrlPanel">
<div class="container">
  <div class="position-relative h-100">
    <div class="position-absolute top-center">
      <button id="u" type="button" onclick="upC()" onmousedown="up()" onmouseup="end()" ontouchstart="up()" ontouchend="end()" class="btn btn-primary btn-lg">Up</button>
    </div>
    <div class="position-absolute mid-right">
      <button id="r" type="button" onclick="rightC()"  onmousedown="right()" onmouseup="end()" ontouchstart="right()" ontouchend="end()" class="btn btn-primary btn-lg">Right</button>
    </div>
    <div class="position-absolute mid-left">
      <button id="l" type="button" onclick="leftC()" onmousedown="left()" onmouseup="end()" ontouchstart="left()" ontouchend="end()" class="btn btn-primary btn-lg">Left</button>
    </div>
    <div class="position-absolute bottom-center">
      <button id="d" type="button" onclick="downC()" onmousedown="down()" onmouseup="end()" ontouchstart="down()" ontouchend="end()" class="btn btn-primary btn-lg">Down</button>
    </div>
  </div>
</div>
<div style = "position:relative; text-align: center;">
  <h3>Stop!!</h3>
  <button id="s" type="button" onclick="stop()">Stop</button>
</div>



</form>
<div id="feedback"></div>


</body>
</html>


`;

export default function WebViewRemote() {
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: HTML }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
