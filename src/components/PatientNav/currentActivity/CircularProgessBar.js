import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

import ProgressCircle from 'react-native-progress-circle'

export default class CircularProgressBar extends Component {

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
                <ProgressCircle
                    percent={this.props.percentage}
                    radius={130}
                    borderWidth={15}
                    color="#8ae2ad"
                    shadowColor='#eaeaea'
                    bgColor="#ffffff"
                >
                    <Text style={{ fontSize: 50, fontWeight: 'bold' }}>{Math.floor(this.props.percentage)} %</Text>
                </ProgressCircle>
            </View>
        );
    }
}

AppRegistry.registerComponent('CircularProgressBar', () => CircularProgressBar);