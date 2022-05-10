var mqtt = require("mqtt");
console.log(mqtt);
var client = mqtt.connect("wxs://test.mosquitto.org");
console.log(mqtt);
var topic = "presence";
client.on("connect", function () {
  console.log("message.toString()");
  client.subscribe("presence", function (err) {
    if (!err) {
      client.publish("presence", "Hello mqtt");
    }
  });
});

client.on("message", function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
