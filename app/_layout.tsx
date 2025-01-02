import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { Onboarding } from "@/app/screens/Onboarding";

export { ErrorBoundary } from "expo-router";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Karla-Regular": require("@/assets/fonts/Karla-Regular.ttf"),
    "Karla-Medium": require("@/assets/fonts/Karla-Medium.ttf"),
    "Karla-Bold": require("@/assets/fonts/Karla-Bold.ttf"),
    "Karla-ExtraBold": require("@/assets/fonts/Karla-ExtraBold.ttf"),
    "MarkaziText-Regular": require("@/assets/fonts/MarkaziText-Regular.ttf"),
    "MarkaziText-Medium": require("@/assets/fonts/MarkaziText-Medium.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const Navigation = () => {
  const { state } = useAuth();

  if (state.isOnboardingCompleted) {
    return <Stack screenOptions={{ headerShown: false }} />;
  }

  return <Onboarding />;
};

function RootLayoutNav() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
