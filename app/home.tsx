import {Link, Stack} from "expo-router";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {StyleSheet} from "react-native";

export default function HomeScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Home' }} />
            <ThemedView style={styles.container}>
                <ThemedText type="title">Home screen</ThemedText>
                <Link href="/" style={styles.link}>
                    <ThemedText type="link">Go to home screen!</ThemedText>
                </Link>
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
});
