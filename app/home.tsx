import {Link, Stack} from "expo-router";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Dimensions, StyleSheet, View} from "react-native";
import {BarChart, LineChart, PieChart, ProgressChart} from "react-native-chart-kit";
import React from "react";

export default function HomeScreen() {
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };
    return (
        <>
            <Stack.Screen options={{title: 'Home'}}/>
            <ThemedView style={styles.container}>
                <View>
                    {/*<LineChart*/}
                    {/*    data={{*/}
                    {/*        labels: ["January", "February", "March", "April", "May", "June"],*/}
                    {/*        datasets: [*/}
                    {/*            {*/}
                    {/*                data: [*/}
                    {/*                    Math.random() * 100,*/}
                    {/*                    Math.random() * 100,*/}
                    {/*                    Math.random() * 100,*/}
                    {/*                    Math.random() * 100,*/}
                    {/*                    Math.random() * 100,*/}
                    {/*                    Math.random() * 100*/}
                    {/*                ]*/}
                    {/*            }*/}
                    {/*        ]*/}
                    {/*    }}*/}
                    {/*    width={Dimensions.get("window").width - 20}*/}
                    {/*    height={220}*/}
                    {/*    yAxisLabel="$"*/}
                    {/*    yAxisSuffix="k"*/}
                    {/*    yAxisInterval={1}*/}
                    {/*    chartConfig={{*/}
                    {/*        backgroundColor: "#e26a00",*/}
                    {/*        backgroundGradientFrom: "#fb8c00",*/}
                    {/*        backgroundGradientTo: "#ffa726",*/}
                    {/*        decimalPlaces: 2,*/}
                    {/*        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,*/}
                    {/*        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,*/}
                    {/*        style: {*/}
                    {/*            borderRadius: 16*/}
                    {/*        },*/}
                    {/*        propsForDots: {*/}
                    {/*            r: "6",*/}
                    {/*            strokeWidth: "2",*/}
                    {/*            stroke: "#ffa726"*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*    bezier*/}
                    {/*    style={{*/}
                    {/*        marginVertical: 8,*/}
                    {/*        borderRadius: 16*/}
                    {/*    }}*/}
                    {/*/>*/}
                </View>
                <View style={styles.smallGraph}>
                    {/*<BarChart*/}
                    {/*    style={{*/}
                    {/*        backgroundColor: 'white',*/}
                    {/*        borderRadius:16*/}
                    {/*    }}*/}
                    {/*    data={data}*/}
                    {/*    width={Dimensions.get("window").width - 20}*/}
                    {/*    height={300}*/}
                    {/*    yAxisLabel="$"*/}
                    {/*    yAxisSuffix="k"*/}
                    {/*    chartConfig={{*/}
                    {/*        backgroundColor:'#ff707a',*/}
                    {/*        backgroundGradientFromOpacity: 0,*/}
                    {/*        backgroundGradientToOpacity: 0.5,*/}
                    {/*        color: (opacity = 1) => `white`,*/}
                    {/*        strokeWidth: 2,*/}
                    {/*        barPercentage: 0.5,*/}
                    {/*        useShadowColorFromDataset: false*/}
                    {/*    }}*/}
                    {/*    verticalLabelRotation={0}*/}
                    {/*/>*/}
                </View>
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,

        backgroundColor: 'white',

    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    smallGraph: {

    }
});
