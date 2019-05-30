import React, { Component } from 'react'
import { AppRegistry, Text, View, Image, StyleSheet, ScrollView } from 'react-native'
import { PieChart } from 'react-native-svg-charts'

export default class PlacesVisitedPlaceHolder extends Component {
    render() {

        const data = [
            {
                key: 1,
                amount: 50,
                svg: { fill: '#600080' },
            },
            {
                key: 2,
                amount: 50,
                svg: { fill: '#9900cc' }
            },
            {
                key: 3,
                amount: 40,
                svg: { fill: '#c61aff' }
            },
            {
                key: 4,
                amount: 95,
                svg: { fill: '#d966ff' }
            },
            {
                key: 5,
                amount: 35,
                svg: { fill: '#ecb3ff' }
            }
        ]

        const placesVisited = this.props.data

        return (
            <View>
                <PieChart
                    style={{ height: 80, width: 80 }}
                    valueAccessor={({ item }) => item.amount}
                    data={placesVisited}
                    innerRadius={"85%"}
                    padAngle={0}
                />
                <Image
                    source={this.props.countryFlag}
                    style={styles.destinationPicStyle}
                />
                <Text style={styles.destinationNameStyle}>{this.props.destination}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    destinationPicStyle: {
        position: 'absolute',
        width: 67,
        height: 67,
        marginTop: 6.5,
        marginLeft: 6.5
    },
    destinationNameStyle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#979797',
        alignSelf: 'center',
        marginTop: 5
    }
})
AppRegistry.registerComponent('PlacesVisitedPlaceHolder', () => PlacesVisitedPlaceHolder);