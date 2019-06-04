//Activities.js - Performs distance calculations and sets up the timer to render in backend

import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    ScrollView,
    Text,
    Alert,
    Image,
    Vibration,
    Platform,
    PermissionsAndroid,
    TouchableOpacity
} from 'react-native'

import { Header } from '../Header'

import EmergencyButton from './EmergencyButton'
import CircularProgressBar from './CircularProgessBar'
import Stats from './Stats'

import firebase from 'firebase'

//MapView imports
import MapView, { AnimatedRegion, Polyline } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import haversine from "haversine"

//MapView constants
const LATITUDE = 51.499500;
const LONGITUDE = -0.174757;
/* delta values set the zoom along the lat and long directions */
const LATITUDEDELTA = 0.015;
const LONGITUDEDELTA = 0.0121;

var THRESHOLD = 0.5;
var DISTANCETHRESHOLD = 100;

export default class Activities extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);

        this.state = {
            //MapView States
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
            //Timing Components
            interval: 0,
            prevTime: ({
                hours: new Date().getHours(),
                minutes: new Date().getMinutes(),
                seconds: new Date().getSeconds()
            }),
            pace: 0,
            percentageCompleted: 0,
            //EventCounter
            eventCounter: 1,
            timeElapsed: 0,
        };

        this._onPress = this._onPress.bind(this);
        this.writeStats = this.writeStats.bind(this);
    }

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

                let distanceDelta = this.calcDistance(newCoordinate);
                let pace = distanceDelta / this.state.interval;
                let percentageOfDistanceThresholdCompleted = ((this.state.distanceTravelled + distanceDelta) / DISTANCETHRESHOLD) * 100;

                if (pace < THRESHOLD) {
                    Vibration.vibrate(500);
                };

                this.setState({
                    latitude,
                    longitude,
                    routeCoordinates: routeCoordinates.concat([newCoordinate]),
                    distanceTravelled: distanceTravelled + distanceDelta,
                    prevLatLng: newCoordinate,
                    pace: pace,
                    percentageCompleted: percentageOfDistanceThresholdCompleted,
                });

            },


            error => console.log(error),
            {
                enableHighAccuracy: true,
                distanceFilter: 9
            }

        );
    }

    calcDistance = newLatLng => {
        const { prevLatLng } = this.state;

        let currentTime = {
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds()
        }

        this.setState({
            interval: ((currentTime.hours - this.state.prevTime.hours) * 3600)
                + ((currentTime.minutes - this.state.prevTime.minutes) * 60)
                + ((currentTime.seconds - this.state.prevTime.seconds)),
            prevTime: currentTime
        });

        return (((haversine(prevLatLng, newLatLng)) * 1.609) * 1000) || 0;
    };

    writeStats(distanceTravelled, timeElapsed, pace, eventCounter) {

        firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats/Event' + eventCounter).set({
            distanceTravelled,
            pace,
            timeElapsed,
            eventCounter
        }).then((data) => {
            //success callback
        }).catch((error) => {
            //error callback
        })

    }


    _onPress() {

        let distanceTravelled = this.state.distanceTravelled;
        let pace = this.state.pace;
        let timeElapsed = this.state.timeElapsed;
        
        firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats/eventCounter').once('value', function (snapshot) {
            let counter = snapshot.val();
            let eventCounter = counter + 1;

            firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats/Event' + eventCounter).set({
                distanceTravelled,
                pace,
                timeElapsed,
            }).then((data) => {
                firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats').update({
                    eventCounter
                }).then((data) => {
                    
                    }).catch((error) => {

                    })
            }).catch((error) => {
                //error callback
            })
        });

        this.props.navigation.navigate('FeedbackPage')
    }

    render() {
        return (
            <View>
                <Header title='Activities' emergencyButton = {true} />
                <ScrollView style={{marginBottom: 75}}>

                    <CircularProgressBar percentage={this.state.percentageCompleted} />

                    <View
                        style={styles.endActivitybutton}
                        elevation={1}
                    >
                        <TouchableOpacity onPress={this._onPress}>
                            <Text style={styles.buttonText}>{"End activity"} </Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Stats stats={parseFloat(this.state.distanceTravelled).toFixed(2)} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Image
                            source={require('./images/pace.png')}
                            style={{ width: 47, height: 39, marginLeft: 10, marginTop: 5 }}
                        />

                        <Text
                            style={styles.shoeDescriptorStyle}
                        >
                            Pace
                    </Text>
                        <Text style={styles.dataStyle}> {parseFloat(this.state.pace).toFixed(2)} m/s </Text>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const handleTimerComplete = () => alert("custom completion function");

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        width: 400,
        height: 600
    },
    bubble: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.7)",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20
    },
    latlng: {
        width: 200,
        alignItems: "stretch"
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: "center",
        marginHorizontal: 10
    },
    buttonContainer: {
        flexDirection: "row",
        marginVertical: 20,
        backgroundColor: "transparent"
    },
    shoeDescriptorStyle: {
        paddingTop: 20,
        marginLeft: 15,
        fontSize: 20,
        fontWeight: 'bold'
    },
    dataStyle: {
        marginLeft: 'auto',
        marginRight: 15,
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    shoePicture: {
        width: 49,
        height: 40,
        marginLeft: 15,
        marginTop: 10
    },

    endActivitybutton: {
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#E78282',
        marginTop: 30,
        marginBottom: 30,
        width: 225,
        height: 44,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF'
    },

    buttonText: {
        paddingTop: 5,
        fontWeight: 'bold',
        fontSize: 20
    },

});

AppRegistry.registerComponent('Activities', () => Activities);