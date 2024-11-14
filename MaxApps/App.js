import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigation from "./app/navigations/Stacks/AppNavigation";

const Stack = createStackNavigator();

function App() {
  return <AppNavigation />;
}

export default App;
