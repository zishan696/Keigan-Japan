import { StyleSheet } from "react-native";
const THEME_COLOR = "#285E29";
export default StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  upButton: {
    justifyContent: "center",
    bottom: 100,
    width: "20%",
  },
  downButton: {
    width: "20%",
    justifyContent: "center",
    top: 20,
  },
  bottomButton: {
    width: "20%",
    justifyContent: "center",
    top: 40,
  },
  leftButton: {
    width: 70,
    justifyContent: "center",
    right: 100,
    bottom: 100,
  },
  rightButton: {
    width: 70,
    justifyContent: "center",
    left: 100,
    bottom: 135,
  },
  text: {
    fontSize: 26,
    color: "purple",
  },
  touchableHighlight: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    borderRadius: 50,
    alignItems: "center",
    position: "absolute",
    left: 10,
    top: 10,
  },
  input: {
    borderBottomWidth: 2,
    width: 200,
    margin: 20,
  },
  box: {
    height: 350,
    width: 350,
  },
  topSafeArea: {
    flex: 0,
    backgroundColor: THEME_COLOR,
  },
  imageStyle: {
    width: 350,
    // margin: 0,
    height: 350,
    //resizeMode: "stretch",
    borderWidth: 2,
    // transform: [{ scale: done }],
    borderColor: "red",
    overflow: "hidden",
  },
  button: {
    marginTop: 50,
  },
  dot: {
    borderStyle: "dotted",
    borderWidth: 1,
    borderRadius: 1,
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: THEME_COLOR,
  },
});
