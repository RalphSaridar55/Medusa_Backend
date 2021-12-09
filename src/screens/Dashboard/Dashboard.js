import React from 'react';
import { View,ScrollView, Text, Image, Dimensions } from 'react-native';
import {styles} from './Dashboard_style';
import { StackedBarChart, BarChart } from 'react-native-chart-kit';

const Dashboard = () =>{
    const data = [
        {key:1},
        {key:2},
        {key:3},
        {key:4},
    ]
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
    const dataFirstChart = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        legend: ["USA", "EU", "ASIA"],
        data: [
          [60, 60, 60],
          [30, 30, 60],
          [60, 60, 90],
          [30, 30, 50],
          [30, 30, 60],
          [60, 60, 90],
          [30, 30, 50],
        ],
        barColors: ["#2E2E7F", "#7F67C9", "#5BC5C9"],
        withVerticalLines:false,
        withInnerLines:false,
      };
      const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `#6893B9`,
        labelColor: (opacity = 1) => `#6893B9`,
        strokeWidth: 0, // optional, default 3
        barPercentage: 0.6,
        useShadowColorFromDataset: false, // optional,
        propsForBackgroundLines:{
            opacity:0
        },
        propsForHorizontalLabels:  {
            opacity:1,
            width:0
        },
        showValuesOnTopOfBars:false
      };

      const chart2config = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `#5BC5C9`,
        labelColor: (opacity = 1) => `#6893B9`,
        strokeWidth: 0, // optional, default 3
        barPercentage: 0.6,
        useShadowColorFromDataset: false, // optional,
        propsForBackgroundLines:{
            opacity:0
        },
        propsForHorizontalLabels:  {
            opacity:1,
            width:0
        },
        showValuesOnTopOfBars:false
      }

      const dataSecondChart = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43, 70]
          }
        ]
      };

    return(
        <ScrollView style={styles.container}>
            <View style={styles.cardContainer}>
                <View style={styles.totalSalesContainer}>
                    <Text style={styles.totalLabel}>Total Sales</Text>
                    <Text style={styles.totalValue}>USD $ 15000</Text>
                </View>
                <View style={styles.weekSalesContainer}>
                    <Text style={{fontFamily:'Adam-Bold'}}>This week</Text>
                    <Text style={styles.weekValue}>USD $ 1500</Text>
                </View>
                <View style={styles.totalGraphContainer}>
                    <StackedBarChart
                        //style={graphStyle}
                        data={dataFirstChart}
                        width={screenWidth*0.9}
                        height={220}
                        withHorizontalLabels={false}
                        chartConfig={chartConfig}
                        withInnerLines={false}
                        showValuesOnTopOfBars={false}
                    />
                </View>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.totalSalesContainer}>
                    <Text style={styles.totalLabel}>Average Order</Text>
                    <Text style={styles.totalValue}>USD $ 15000</Text>
                </View>
                <View style={styles.totalGraphContainer}>
                    <BarChart
                        //style={graphStyle}
                        data={dataSecondChart}
                        width={screenWidth*0.8}
                        height={220}
                        yAxisLabel="$"
                        chartConfig={chart2config}
                        withInnerLines	= {false}
                        //withHorizontalLabels = {false}
                        propsForHorizontalLabels = {{
                            opacity:0
                        }}
                    />
                </View>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.totalSalesContainer}>
                    <Text style={styles.totalLabel}>Statistics</Text>
                </View>
                <View style={styles.totalSalesContainer}>
                    <Text style={styles.totalOrders}>2000</Text>
                    <Text style={styles.totalCustomers}>500</Text>
                </View>
                <View style={styles.totalSalesContainer}>
                    <Text style={styles.ordersLabel}>Orders</Text>
                    <Text style={styles.customersLabel}>Customers</Text>
                </View>
            </View>
            
            <View style={styles.cardContainer}>
                <View style={styles.totalSalesContainer}>
                    <Text style={styles.totalLabel}>Recent Orders</Text>
                </View>
                <View style={styles.recentOrdersData}>
                    <Text style={styles.roLabel}>Order Number</Text>
                    <Text style={styles.roValue}>#320</Text>
                </View>
                <View style={styles.recentOrdersData}>
                    <Text style={styles.roLabel}>Date</Text>
                    <Text style={styles.roValue}>Jun 4, 2020</Text>
                </View>
                <View style={styles.recentOrdersData}>
                    <Text style={styles.roLabel}>Amount</Text>
                    <Text style={styles.roValue}>$ 50,000</Text>
                </View>
                <View style={styles.recentOrdersData}>
                    <Text style={styles.roLabel}>Buyer</Text>
                    <Text style={styles.roValue}>Buyer A</Text>
                </View>
                <View style={styles.recentOrdersData}>
                    <Text style={styles.roLabel}>Product</Text>
                    <Text style={styles.roValue}>Mouse</Text>
                </View>
                <View style={styles.recentOrdersData}>
                    <Text style={styles.roLabel}>Status</Text>
                    <Text style={styles.roValue}>Pending</Text>
                </View>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.totalSalesContainer}>
                    <Text style={styles.totalLabel}>Top Products</Text>
                </View>
                <View style={styles.topProductsContainer}>
                    {/* <Grid
                        //style={styles.list}
                        renderItem={()=>{
                            return(
                                <View style={styles.productImageContainer}>
                                    <Image source={require("../../../assets/images/mouse.png")}
                                    style={styles.productImage}
                                    resizeMode="contain"/>
                                </View>
                            )
                        }}
                        //renderPlaceholder={this._renderPlaceholder}
                        data={data}
                        //data={['black', 'white', 'red', 'green', 'blue']}
                        numColumns={2}
                    /> */}    
                    <View style={styles.productImageContainer}>
                        <Image source={require("../../../assets/images/mouse.png")}
                        style={styles.productImage}
                        resizeMode="contain"/>
                    </View>
                    <View style={styles.productImageContainer}>

                        <Image source={require("../../../assets/images/mouse.png")}
                        style={styles.productImage}
                        resizeMode="contain"/>
                    </View>{/* 
                    <Image source={require("../../../assets/images/logo.png")} style={styles.productImage}/>
                    <Image source={require("../../../assets/images/logo.png")} style={styles.productImage}/> */}
                </View>
            </View>
        </ScrollView>
    )
}

export default Dashboard