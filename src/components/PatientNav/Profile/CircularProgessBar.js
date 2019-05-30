import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Image, Text, View } from 'react-native';

import ProgressCircle from 'react-native-progress-circle'

export default class CircularProgressBar extends Component {

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', paddingTop: 90 }}>
                <ProgressCircle
                    percent={73}
                    radius={55}
                    borderWidth={7}
                    color="#8ae2ad"
                    shadowColor="#e6e9ef"
                    bgColor="#fff"
                >
                </ProgressCircle>
                <Image
                    source={require('./images/trophy.png')}
                    style={styles.badgeConstraints}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    badgeConstraints: {
        width: 95,
        height: 95,
        position: 'absolute',
        marginTop: 97,
        marginBottom: 100,
        marginLeft: 100,
        marginRight: 100,
    }
});

AppRegistry.registerComponent('CircularProgressBar', () => CircularProgressBar);