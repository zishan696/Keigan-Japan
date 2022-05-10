import React, { Component } from "react";
import "react-native-gesture-handler";
import { View, TextInput, Text, Button } from "react-native";
import styles from "../styles/Style";
import { render } from "react-dom";
export default class NavigatorApp extends Component {
  render() {
    return (
      <View style={styles.view}>
        <View style={{ marginTop: -100 }}>
          <Text style={styles.text}>Select your options</Text>
        </View>
        <View style={styles.button}>
          <Button
            title="Coordinate input page"
            color="red"
            onPress={() => this.props.navigation.navigate("Home Page")}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Map Page"
            color="red"
            onPress={() => this.props.navigation.navigate("Map Remote")}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Joy Stick"
            color="red"
            onPress={() => this.props.navigation.navigate("Joy Stick")}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Web view Mqtt"
            color="red"
            onPress={() => this.props.navigation.navigate("Web view Mqtt")}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Web view Remote"
            color="red"
            onPress={() => this.props.navigation.navigate("Web view Remote")}
          />
        </View>
      </View>
    );
  }
}
