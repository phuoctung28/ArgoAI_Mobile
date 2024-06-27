import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect} from 'react';
import 'react-native-reanimated';
import {useColorScheme} from '@/hooks/useColorScheme';
import {Colors} from "@/constants/Colors";
import {Tabs} from "expo-router";
import {FontAwesome, FontAwesome5} from "@expo/vector-icons";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                }}>
                <Tabs.Screen
                    name={'index'}
                    options={{
                        tabBarLabel: 'Chat',
                        tabBarIcon: ({color}) => (
                            <Entypo name="chat" size={24} color={color} />)
                    }}
                />
                <Tabs.Screen
                    name={'home'}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({color}) => (
                            <FontAwesome name="home" color={color} size={24}/>
                        )
                    }}
                />
                <Tabs.Screen
                    name={'+not-found'}
                    options={{
                        tabBarLabel: 'Setting',
                        tabBarIcon: ({color}) => (
                            <Ionicons name="settings-sharp" size={24} color={color} />                        )
                    }}
                />
            </Tabs>
        </ThemeProvider>
    );
}