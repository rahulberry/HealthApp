import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Image, ScrollView, Alert } from 'react-native';

import ProfilePicture from './ProfilePicture';
import FirstRowAchievement from './FirstRowAchievement'
import LastRowAchievements from './LastRowAchievements'
import firebase from 'firebase'

import { Header } from '../Header'

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            walkedThreeHours: 0,
            fifteenMiles: 0,
            tenEvents: 0,
            walkedAroundTheWorld: 0,
            name: "",
            displayImageUri: '',
        };

        this.updateDistanceTravelledAchievements = this.updateDistanceTravelledAchievements.bind(this);
        this.updateGroupProgress = this.updateGroupProgress.bind(this);
    }

    //Update states storing progress of achievements from firebase

    updateGroupProgress = () => {

        let groupIndex = 0;

        var firebaseRef = firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Account Details/group');
        firebaseRef.on('value', (snapshot) => {
            groupIndex = snapshot.val();

            var groupRef = firebase.database().ref('/Groups/' + groupIndex + '/totalDistanceTravelled');
            groupRef.on('value', (snapshot) => {
                this.setState({
                    walkedAroundTheWorld: (snapshot.val() / 836.70),
                })
            });

        });

    }

    updateDistanceTravelledAchievements = () => {

        var firebaseRef = firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Account Details/display_image');
        firebaseRef.on('value', (snapshot) => {
            
            this.setState({
                displayImageUri: snapshot.val(),
            })

        });

        var firebaseRef = firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Account Details/name');
        firebaseRef.once('value', (snapshot) => {
            this.setState({
                name: snapshot.val(),
            })
        });

        var firebaseRef = firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats/totalDistanceTravelled');
        firebaseRef.on('value', (snapshot) => {
            this.setState({
                fifteenMiles: (snapshot.val() / 241.402),
            })
        });

        var firebaseRef = firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats/eventCounter');
        firebaseRef.on('value', (snapshot) => {
            this.setState({
                tenEvents: snapshot.val() * 10,
            })
        });

        var firebaseRef = firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats/totalTimeElapsed');
        firebaseRef.on('value', (snapshot) => {
            this.setState({
                walkedThreeHours: snapshot.val() / 108,
            })
        });

        this.updateGroupProgress();

    };

    componentWillMount() {
        this.updateDistanceTravelledAchievements();
    }

    render() {
        return (
            <View>
                <Header title='Profile' emergencyButton={false} />
                <ScrollView style={{ marginBottom: 150 }}>
                    <ProfilePicture
                        name={this.state.name}
                        profilePicture={{ uri: this.state.displayImageUri }}
                    />
                    <FirstRowAchievement 
                        walkedThreeHours={this.state.walkedThreeHours}
                        walkedFifteenMiles={this.state.fifteenMiles}
                    />
                    <LastRowAchievements
                        tenEvent={this.state.tenEvents}
                        walkedAroundWorld={this.state.walkedAroundTheWorld}
                    />
                </ScrollView>
            </View>
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