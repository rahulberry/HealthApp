import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image} from 'react-native';

import ProgressCircle from 'react-native-progress-circle'

export default class LastRowAchievement extends Component {

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 17, marginLeft: 35 }}>
                        <ProgressCircle
                            percent={this.props.tenmiles}
                            radius={55}
                            borderWidth={7}
                            color="#8ae2ad"
                            shadowColor="#e6e9ef"
                            bgColor="#fff"
                        >
                        </ProgressCircle>
                        <Image
                            source={require('./images/walked10miles.png')}
                            style={styles.badgeConstraints}
                        />
                    </View>
                    <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 17, marginLeft: 40 }} > Walked 10 miles </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 17, marginLeft: 0 }}>
                        <ProgressCircle
                            percent={this.props.hundredmiles}
                            radius={55}
                            borderWidth={7}
                            color="#8ae2ad"
                            shadowColor="#e6e9ef"
                            bgColor="#fff"
                        >
                        </ProgressCircle>
                        <Image
                            source={require('./images/walked100miles.png')}
                            style={styles.badgeConstraints}
                        />
                    </View>
                    <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 17, marginLeft: 15 }}> Walked 100 miles </Text>
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