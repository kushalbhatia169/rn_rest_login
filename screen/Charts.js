// @ts-ignore
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import React, { Component } from 'react';
import {  Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import PieChart2 from 'react-native-pie-chart-radar';

  class Charts extends Component{

    dataPie = [
        {value: 100, stroke: "#22594e", strokeWidth: 6},
        {value: 60, stroke: "#2f7d6d"},
        {value: 30, stroke: "#3da18d"},
        {value: 20, stroke: "#69c2b0"},
        {value: 10, stroke: "#a1d9ce"},
      ]

    state = {
        data : [
            { name: 'Seoul', population: 21500000, color: 'rgba(26, 255, 146, 1)', legendFontColor: '#000000', legendFontSize: 15 },
            { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#000000', legendFontSize: 15 },
            { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#000000', legendFontSize: 15 },
            { name: 'New York', population: 8538000, color: 'orange', legendFontColor: '#000000', legendFontSize: 15 },
            { name: 'Moscow', population: 11920000, color: '#08130D', legendFontColor: '#000000', legendFontSize: 15 }
        ],
        data2 : [0.4, 0.6, 0.8]
    }

    chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
      } 

      chartConfig = {
        backgroundGradientFrom: '#e26a00',
        backgroundGradientTo: '#87ceeb',
        color: (opacity = 1) => `rgba(255, 000, 000, ${opacity})`
      }
      render() {
       return(   
                <TouchableOpacity>
                    <View>
                        <Text style={styles.header}>
                            Employee Tax Deduction Chart
                        </Text>
                        <LineChart
                            data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                            datasets: [{
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ]
                            }]
                            }}
                            width={Dimensions.get('window').width} // from react-native
                            height={220}
                            onDataPointClick={{
                                value: this.state.data[0].population,
                                dataset: this.state.data,
                                getColor: opacity => this.getColor(dataset, opacity)
                            }}
                            chartConfig={{
                                backgroundColor: '#e26a00',
                                backgroundGradientFrom: '#87ceeb',
                                backgroundGradientTo: '#ffa726',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                fromZero: true
                            }}
                            bezier
                            style={{
                            marginVertical: 8,
                            borderRadius: 16
                            }}
                        />
                    </View>
                    <View>
                        <Text style={styles.header}>
                            Employee Tax Deduction Chart BAR
                        </Text>
                        <BarChart
                            data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                            datasets: [{
                                data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                                ]
                            }]
                            }}
                            width={Dimensions.get('window').width} // from react-native
                            height={220}
                            chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#ffa726',
                            backgroundGradientTo: '#ffa726',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                            }}
                            bezier
                            style={{
                            marginVertical: 8,
                            borderRadius: 16
                            }}
                        />
                    </View>
                
                    <View>
                        <Text style={styles.header}>
                            Employee Tax Deduction Chart Pie
                        </Text>
                        <PieChart
                            data={this.state.data}
                            width={Dimensions.get('window').width}
                            height={220}
                            chartConfig={this.chartConfig}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            />
                    </View>
                    <View>
                         <Text style={styles.header}>
                            Employee Tax Deduction Chart Pie
                        </Text>
                    <ProgressChart
                        data={this.state.data2}
                        width={Dimensions.get('window').width}
                        height={220}
                        chartConfig={this.chartConfig}
                        />
                    </View>
            
                    <View>
                        <Text style={styles.header}>Stacked Bar Chart</Text>
                        <StackedBarChart
                            data={{
                            labels: ['Test1', 'Test2'],
                            legend: ['L1', 'L2', 'L3'],
                            data: [
                                [60, 60, 60],
                                [30, 30, 60],
                            ],
                            barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
                            }}
                            width={Dimensions.get('window').width - 16}
                            height={220}
                            chartConfig={{
                                backgroundColor: '#1cc910',
                                backgroundGradientFrom: '#eff3ff',
                                backgroundGradientTo: '#efefef',
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                        />
                    </View>
                    <View>
                        <Text style={styles.header}>
                            Employee Tax Deduction Chart Pie
                        </Text>
                        <PieChart2
                            chart_wh={250}
                            series={[123, 321, 123, 789, 537]}
                            sliceColor={['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']}
                            doughnut={true}
                            coverRadius={0.45}
                            coverFill={'#FFF'}
                        />
                    </View>
                </TouchableOpacity>
            
       );
      }
  }

  export default Charts;

  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
      fontSize: 18,
      padding: 16,
      marginTop: 16,
    },
  });
  