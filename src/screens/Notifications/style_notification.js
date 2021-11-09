import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#E9F3FF",
    flex: 1,
  },
});
