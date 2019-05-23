import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, ScrollView } from 'react-native';

import ProfilePicture from './ProfilePicture';
import FirstRowAchievement from './FirstRowAchievement'
import LastRowAchievements from './LastRowAchievements'

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sevenDayStreak: 25,
            topOfLeaderboard: 50,
            tenMiles: 75,
            hundredMiles: 100
        };
    }

    //Update states storing progress of achievements from firebase

    render() {
        return (
            <ScrollView>
                <ProfilePicture />
                <FirstRowAchievement
                    streak={this.state.sevenDayStreak}
                    leaderboard={this.state.topOfLeaderboard}
                />
                <LastRowAchievements
                    tenmiles={this.state.tenMiles}
                    hundredmiles={this.state.hundredMiles}
                /> 
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    }
});

AppRegistry.registerComponent('Profile', () => Profile);