import React from "react";
import { View, StyleSheet } from "react-native";

import { WebView } from "react-native-webview";

const HTML = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>MQTT Dolly Remote</title>
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
width: 400px;
height: 400px;
padding-top: 50px;
padding-bottom: 50px;
}
.bottom-center {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.zoom-within-container {
  height: 300px; /* [1.1] Set it as per your need */
  overflow: hidden; /* [1.2] Hide the overflowing of child elements */
}
.zoom-within-container img {
  transform: scale(4);
}
.dot {
    height: 2px;
    width: 2px;
    position: absolute;
    border: 2px solid red;
    top: 150px;
    left:170px;
}
</style>
</head>

<body>

<script>

let pub = mqtt.connect('wss://test.mosquitto.org:8081');
let sub = mqtt.connect('wss://test.mosquitto.org:8081');

function pubMessage() {
  let topic3 = "mqtt-positionX"
  let topic4 = "mqtt-positionY"
  var X = 0.0;
  var Y = 0.0;

//Set the appropriate values on the twist message object according to values in text boxes.
    // get values from text input fields.
    X = 0 + Number(document.getElementById('positionXText').value);
    let positionX = X.toString();
    Y = 0 + Number(document.getElementById('positionYText').value);
    let positionY = Y.toString();
    console.log("published topic to Ros-topic")

    // Publish the message
    pub.publish(topic3, positionX);
    pub.publish(topic4, positionY);
}

function askImage() {
  //image map display
  pub.publish("askMap", "Map asked");
  sub.subscribe("topic/test");
  sub.subscribe("topic/img");
  sub.on('message', function (topic, message) { // message is Buffer
    console.log("Subscribed python test");
    if (topic === "topic/test") {
      console.log("Subscribed message: ", message.toString());
    }
    if (topic === "topic/img") {
      console.log("topic/img");
      let data = message;
      console.log("Image Message: "+message);
      let img = document.getElementById( 'image_rev' );
      img.width="330";
      img.height="330";
      let st="";
      for(let i=0;i<data.length;i++){
        st +=  String.fromCharCode( data[i]);
      }
      img.src = 'data:image/png;base64,'+btoa(st);
    }
  });
}

//Get X and Y pixels from mouse click

function FindPosition(oElement)
{
  if(typeof( oElement.offsetParent ) != "undefined")
  {
    for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent)
    {
      posX += oElement.offsetLeft;
      posY += oElement.offsetTop;
    }
      return [ posX, posY ];
    }
    else
    {
      return [ oElement.x, oElement.y ];
    }
}

function GetCoordinates(e)
{
  var PosX = 0;
  var PosY = 0;
  var ImgPos;
  ImgPos = FindPosition(myImg);
  if (!e) var e = window.event;
  if (e.pageX || e.pageY)
  {
    PosX = e.pageX;
    PosY = e.pageY;
  }
  else if (e.clientX || e.clientY)
    {
      PosX = e.clientX + document.body.scrollLeft
        + document.documentElement.scrollLeft;
      PosY = e.clientY + document.body.scrollTop
        + document.documentElement.scrollTop;
    }
  PosX = PosX - ImgPos[0]-3;
  PosY = PosY - ImgPos[1]-3;
  document.getElementById("x").innerHTML = (PosX);
  document.getElementById("y").innerHTML = (PosY);
  let axisX = PosX.toString();
  let axisY = PosY.toString();
  pub.publish("x_Coordinate", axisX);
  pub.publish("y_Coordinate", axisY);
}

sub.subscribe("topic/x");
sub.subscribe("topic/y");
sub.on('message', function (topic, message) { // message is Buffer
  if (topic === "topic/x") {
    console.log("Subscribed to dolly x-coordinate")
    var xDoll =  parseFloat(message);
  }
  if (topic === "topic/y") {
    console.log("Subscribed to dolly y-coordinate")
    var yDoll =  parseFloat(message);
  }
  //Position of the robot as red dot
  var el = document.getElementById('GFG_DIV');
       el.style.position = "absolute";
       el.style.left = (xDoll*11.33) + 'px';
       el.style.top = (-yDoll*10) + 'px';
});
window.onbeforeunload = closingCode;
function closingCode(){
   pub.publish("windowClosed", "stop publishing position");
   return null;
}
</script>

<body>
<h1 style="color:blue;text-align:center;">Welcome to Dolly remote control!!</h1>
<p style="text-align:center;">Enter positive or negative numeric decimal values in the boxes below</p>

<form name="ctrlPanel">
<div class="container" >
  <div class="position-relative h-100">
<table>
 <tr><td>position X</td><td><input id="positionXText" name="positionXText" type="text" value="0"/></td></tr>
 <tr><td>position Y</td><td><input id="positionYText" name="positionYText" type="text" value="0"/></td></tr>
</table>
    <div class="position-absolute bottom-center">
      <button id="sendMsg" type="button" onclick="pubMessage()">Publish Message</button>
      <button id="askimage" type="button" onclick="askImage()">Map</button>
    </div>
  </div>
</div>
</form>

<form name="mapImage">
<div class="container">
  <div class="position-relative h-100">
    <div class="zoom-within-container">
      <img id="image_rev" src="" alt="">
      <script type="text/javascript">
      var myImg = document.getElementById("image_rev");
      myImg.onmousedown = GetCoordinates;
    </script>
  </div>
  <div id="GFG_DIV">
  <img class="dot">
  </div>

  </div>
</div>
<p>X:<span id="x"></span></p>
<p>Y:<span id="y"></span></p>
</form>

<div id="feedback"></div>
</body>
</html>

`;

export default function WebViewMqtt() {
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
