import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import {Colors} from "@/constants/Colors";
import { ConversationsScreen } from './(tabs)/conversaion';

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
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer
                    screenOptions={{
                        drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                        headerShown: false,
                    }}
                >
                    <Drawer.Screen
                        name="conversation"
                        options={{
                            drawerLabel: 'Conversations',
                            title: 'Conversations',
                        }}
                    />
                    <Drawer.Screen
                        name="index"
                        options={{
                            drawerLabel: 'Home',
                            title: 'overview',
                        }}
                    />
                    <Drawer.Screen
                        name="user/[id]"
                        options={{
                            drawerLabel: 'User',
                            title: 'overview',
                        }}
                    />
                </Drawer>
            </GestureHandlerRootView>
        </ThemeProvider>
    );
}