import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class GroupMemberList extends Component {
    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={this.props.profilePicture}
                    style={[styles.profilePicStyle, this.props.profileBorder]}
                />
                <Text style={styles.userNameStyle}>{this.props.patientName}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profilePicStyle: {
        width: 75,
        height: 75,
        borderRadius: 100,
        borderWidth: 5
    },
    userNameStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#979797'
    }
})