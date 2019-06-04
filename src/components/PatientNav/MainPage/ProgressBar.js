import React, { Component } from 'react'
import { AppRegistry, Text, View } from 'react-native'
import { PieChart } from 'react-native-svg-charts'

export default class ProgressBar extends Component {
    render() {

        const data = this.props.data

        return (
            <PieChart
                style={{ height: 300 }}
                valueAccessor={({ item }) => item.amount}
                data={data}
                innerRadius={"90%"}
                padAngle={0}
            />
        );
    }
}

AppRegistry.registerComponent('ProgressBar', () => ProgressBar);