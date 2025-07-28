import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../components/HomeScreen";
import MathScreen from "../components/cards/MathScreen";
import EnglishScreen from "../components/cards/EnglishScreen";
import HistoryScreen from "../components/cards/HistoryScreen";
import ScienceScreen from "../components/cards/ScienceScreen";
import LoadingScreen from "../components/LoadingScreen";
import MathInfoScreen from "../components/info/MathInfoScreen";
import ResultScreen from "../components/ResultScreen";
import LoginScreen from "../components/login/LoginScreen"; // ✅ hanya import saja
import AdminHomeScreen from "../components/admin/AdminHomeScreen";

const Stack = createNativeStackNavigator();

function RootStack() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? "Home" : "Login"}
      screenOptions={{ animation: "fade" }}
    >
      <Stack.Screen name="Login" options={{ headerShown: false }}>
        {(props) => (
          <LoginScreen {...props} onLoginSuccess={() => setIsLoggedIn(true)} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="AdminHome"
        component={AdminHomeScreen}
        options={{ title: "Daftar Murid" }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Matematika" component={MathScreen} />
      <Stack.Screen
        name="MathInfo"
        component={MathInfoScreen}
        options={{ title: "Informasi Quiz" }}
      />
      <Stack.Screen name="Bahasa Inggris" component={EnglishScreen} />
      <Stack.Screen name="Sains" component={ScienceScreen} />
      <Stack.Screen name="Sejarah" component={HistoryScreen} />
      <Stack.Screen
        name="Hasil"
        component={ResultScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
