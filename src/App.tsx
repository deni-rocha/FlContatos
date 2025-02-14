/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useColorScheme } from "nativewind";
import "./global.css"

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Header } from "./components/header";


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark'

  return (
    <View className={`w-72 h-72 flex flex-col justify-center ${isDark ? 'bg-black' : 'bg-white'}`} >
      <Text
        className={`font-bold text-2xl ${isDark ? 'bg-white' : 'bg-black'}`}
        onPress={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
      >
        {title}
      </Text>
      <Text
        className={`text-lg ${isDark ? 'bg-white' : 'bg-black'}`}
      >
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {

  const { colorScheme, setColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark'

  return (
    <SafeAreaView className={`${isDarkMode ? 'bg-black' : 'bg-white'}`} >
      <StatusBar

      // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      // backgroundColor={backgroundStyle.backgroundColor}
      />
      <View className="mx-4 h-full">
        <Header />

      </View>
    </SafeAreaView>
  );
}

export default App;
