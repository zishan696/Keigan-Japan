import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  Image,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Text,
  SafeAreaView,
  Button,
} from "react-native";
import styles from "./styles/Style";
import MapPage from "./screens/MapPage";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePage from "./screens/HomePage";
import WebViewMqtt from "./screens/WebViewMqtt";
import WebViewRemote from "./screens/WebViewRemote";
import JoyStick from "./screens/JoyStick";
import NavigatorApp from "./screens/NavigatorApp";
import { createStackNavigator } from "@react-navigation/stack"; //new

const Stack = createStackNavigator(); //new
const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Navigation Page"
        options={{
          title: "Home page",
        }}
        component={NavigatorApp}
      />
      <Drawer.Screen
        name="Home Page"
        component={HomePage}
        options={{
          title: "Coordinate page",
        }}
      />
      <Drawer.Screen name="Map Remote" component={MapPage} />
      <Drawer.Screen name="Joy Stick" component={JoyStick} />
      <Drawer.Screen name="Web view Mqtt" component={WebViewMqtt} />
      <Drawer.Screen name="Web view Remote" component={WebViewRemote} />
    </Drawer.Navigator>
  );
}
//new
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home Page" component={HomePage} />
      <Stack.Screen name="Map Remote" component={MapPage} />
      <Stack.Screen name="Joy Stick" component={JoyStick} />
      <Stack.Screen name="Web view Mqtt" component={WebViewMqtt} />
      <Stack.Screen name="Web view Remote" component={WebViewRemote} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.bottomSafeArea}>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <MyDrawer />
          {/* <MyStack /> */}
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}
