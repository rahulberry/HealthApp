import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image } from 'react-native';

import ProgressCircle from 'react-native-progress-circle'

export default class LastRowAchievement extends Component {

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: 'center', marginLeft: -7 }}>
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 17, marginLeft: 15 }}>
                        <ProgressCircle
                            percent={this.props.tenEvent}
                            radius={55}
                            borderWidth={7}
                            color="#8ae2ad"
                            shadowColor="#e6e9ef"
                            bgColor="#fff"
                        >
                        </ProgressCircle>
                        <Image
                            source={require('./images/attendedTenMiles.png')}
                            style={styles.badgeConstraints}
                        />
                    </View>
                    <Text style={{ marginTop: 5, fontWeight: 'bold', fontSize: 17, marginLeft: 40 }} >
                        Attended 10 events
                    </Text>
                </View>

                <View style={{ alignItems: 'center', marginLeft: 8 }}>
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 17, marginLeft: 20 }}>
                        <ProgressCircle
                            percent={this.props.walkedAroundWorld}
                            radius={55}
                            borderWidth={7}
                            color="#8ae2ad"
                            shadowColor="#e6e9ef"
                            bgColor="#fff"
                        >
                        </ProgressCircle>
                        <Image
                            source={require('./images/walkedAroundTheWorld.png')}
                            style={styles.badgeConstraints}
                        />
                    </View>
                    <Text
                        style={{ marginTop: 5, fontWeight: 'bold', fontSize: 17, marginLeft: 20, width: 130, textAlign: 'center' }}>
                        Walked the world
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    badgeConstraints: {
        width: 95,
        height: 95,
        position: 'absolute',
        marginTop: 8,
        marginBottom: 100,
        marginLeft: 63,
    },
    badgesStyle: {
        marginTop: 20,
        marginLeft: 63,
        width: 100,
        height: 100,
        borderRadius: 100
    },
    achievementTextStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        width: 100,
        marginLeft: 63,
        fontSize: 17,
        fontWeight: 'bold'
    }
});

AppRegistry.registerComponent('LastRowAchievements', () => LastRowAchievements);