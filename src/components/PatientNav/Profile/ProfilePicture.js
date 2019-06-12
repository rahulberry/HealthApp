import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image } from 'react-native';

export default class ProfilePicture extends Component {
    render() {
        return (
            <View>
                <Image
                    style={styles.profilePicture}
                    source={this.props.profilePicture}
                />
                <Text style={styles.dataStyle} > {this.props.name} </Text>
                <Text style={styles.achievementStyle}> Personal Achievements </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profilePicture: {
        alignSelf: 'center',
        marginTop: 20,
        width: 190,
        height: 190,
        borderRadius: 100
    },
    dataStyle: {
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 23,
        fontWeight: 'bold'
    },
    achievementStyle: {
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold'
    },
    badgesStyle: {
        marginTop: 24,
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
        marginTop: 20,
        fontSize: 17,
        fontWeight: 'bold'
    },
});

AppRegistry.registerComponent('ProfilePicture', () => ProfilePicture);