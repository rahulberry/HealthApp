//Activities.js - Performs distance calculations and sets up the timer to render in backend

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    Platform,
    PermissionsAndroid
} from 'react-native';

import { Header } from '../Header'

import EmergencyButton from './EmergencyButton'
import CircularProgressBar from './CircularProgessBar'

import firebase from 'firebase'
//Timer imports
import Stopwatch from './Stopwatch'

import Stats from './Stats'
//MapView imports
import MapView, { AnimatedRegion, Polyline } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import haversine from "haversine"

//MapView constants
const LATITUDE = 51.499500;
const LONGITUDE = -0.174757;
/* delta values set the zoom along the lat and long directions */
const LATITUDEDELTA = 0.015;
const LONGITUDEDELTA = 0.0121;

export default class Activities extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            percentageCompleted: 0,
            //Timer states
            timerStart: false,
            stopwatchStart: false,
            totalDuration: 90000,
            timerReset: false,
            stopwatchReset: false,
            //Mapview states
            latitude: LATITUDE,
            longitude: LONGITUDE,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDEDELTA,
                longitudeDelta: LONGITUDEDELTA
            }),
            pace: 0,
            timeElapsed: 0
        };
        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);
    }

    //Timer functions
    toggleStopwatch() {
        this.setState({ stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false });
        if (this.state.stopwatchStart) {
            //Save the data locally first
            this.resetStopwatch();

            let distanceTravelled = this.state.distanceTravelled;
            let timeElapsed = this.state.timeElapsed;
            let pace = this.state.pace;

            firebase.database().ref('Patients/BPlNxGZmqlY4TrqG34g64aURGop2/Stats/').update({
                distanceTravelled,
                pace,
                timeElapsed
            });
            this.props.navigation.navigate('FeedbackPage')
        }
        else {
            this.setState({ percentageCompleted: 0.3 });
        }
    }

    resetStopwatch() {
        this.setState({ stopwatchStart: false, stopwatchReset: true, percentageCompleted: 0 });
    }

    getFormattedTime() {
        this.currentTime = Stopwatch.time;
        return this.currentTime;
    };

    //Mapview functions
    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                const { coordinate, routeCoordinates, distanceTravelled } = this.state;
                const { latitude, longitude } = position.coords;
                const newCoordinate = {
                    latitude,
                    longitude
                };

                if (Platform.OS === "android") {
                    if (this.marker) {
                        this.marker._component.animateMarkerToCoordinate(
                            newCoordinate,
                            500
                        );
                    }
                }
                else {
                    coordinate.timing(newCoordinate).start();
                }

                this.setState({
                    latitude,
                    longitude,
                    routeCoordinates: routeCoordinates.concat([newCoordinate]),
                    distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
                    prevLatLng: newCoordinate,
                });
            },

            error => console.log(error),
            { enableHighAccuracy: true }

        );
    }

    calcDistance = newLatLng => {
        const { prevLatLng } = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    };

    render() {
        return (
            <View>
                <Header title='Activities' EmergencyButton = {true} />
            <ScrollView>

                <CircularProgressBar percentage={this.state.percentageCompleted} />

                <TouchableWithoutFeedback onPress={this.toggleStopwatch}>
                    <View style={!this.state.stopwatchStart ? styles.startActivitybutton : styles.endActivitybutton}>
                        <Text style={styles.buttonText}>{!this.state.stopwatchStart ? "Start Activity" : "End Activity"}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <Stats stats={ parseFloat(this.state.distanceTravelled).toFixed(2) } />

                <Stopwatch laps msecs
                    start={this.state.stopwatchStart}
                    options={options}
                    reset={this.state.stopwatchReset} />

            </ScrollView>
            </View>
        );
    }
}

const handleTimerComplete = () => alert("custom completion function");

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        alignItems: 'center'
    },

    map: {
        width: 400,
        height: 600
    },

    startActivitybutton: {
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#8ae2ad',
        marginTop: 40,
        marginBottom: 30,
        width: 200,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF'
    },

    endActivitybutton: {
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#c60b0b',
        marginTop: 40,
        marginBottom: 30,
        width: 200,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF'
    },

    buttonText: {
        padding: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    }
});

const options = {
    container: {
        backgroundColor: 'transparent',
        padding: 5,
    },
    text: {
        fontSize: 30,
        color: '#FFF',
        marginLeft: 7,
    },
    clockDescriptorStyle: {
        paddingTop: 20,
        marginLeft: 22,
        fontSize: 20,
        fontWeight: 'bold'
    },
    dataStyle: {
        marginLeft: 'auto',
        marginRight: 10,
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    clockPicture: {
        width: 34,
        height: 38,
        marginLeft: 24,
        marginTop: 15
    }
};

AppRegistry.registerComponent('Activities', () => Activities);