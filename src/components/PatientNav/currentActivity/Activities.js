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
    TouchableOpacity,
    Dimensions,
    FlatList
} from 'react-native'

import Modal from 'react-native-modal'
import { Button } from '../../commonComponents/ButtonWithMargin'

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

const cities = ["London", "Berlin"];
const cityDistances = [8370, 21670]

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
            eventDistanceTravelled: 0,
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
            numberOfBreaks: 0,
            isModalVisible: false,
            eventsArray: [],
        };

        this._onPress = this._onPress.bind(this);
        this.writeStats = this.writeStats.bind(this);
        this.mainActivityPageCalculations = this.mainActivityPageCalculations.bind(this);
        this.incrementBreaks = this.incrementBreaks.bind(this);
        this.decrementBreaks = this.decrementBreaks.bind(this);
        this.updateIndividualTotalDistancegTravelled = this.updateIndividualTotalDistancegTravelled.bind(this);
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

    mainActivityPageCalculations() {
        let cityIndex = 0;
        let groupIndex = 0
        let groupDistanceTravelled = 0;
        let distanceTravelledOldCity = 0;
        let distanceTravelledNewCity = 0;

        let totalDistanceTravelled = 0;
        let distanceTravelledLondon = 0;
        let distanceTravelledBerlin = 0;

        var firebaseRef = firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Account Details/group');
        firebaseRef.once('value', (snapshot) => {
            groupIndex = snapshot.val();

            firebase.database().ref('/Groups/' + groupIndex + '/totalDistanceTravelled').once('value', (snapshot) => {
                groupDistanceTravelled = snapshot.val();

                firebase.database().ref('/Groups/' + groupIndex + '/cityIndex').once('value', (snapshot) => {
                    cityIndex = snapshot.val();

                    firebase.database().ref('/Groups/' + groupIndex + '/Patients/' + firebase.auth().currentUser.uid + '/distanceTravelled' + cities[0]).once('value', (snapshot) => {
                        distanceTravelledLondon = snapshot.val();

                        firebase.database().ref('/Groups/' + groupIndex + '/Patients/' + firebase.auth().currentUser.uid + '/distanceTravelled' + cities[1]).once('value', (snapshot) => {
                            distanceTravelledBerlin = snapshot.val();

                            groupDistanceTravelled += this.state.eventDistanceTravelled;
                            distanceTravelledLondon += this.state.eventDistanceTravelled;

                            if (groupDistanceTravelled >= cityDistances[cityIndex]) {
                                distanceTravelledBerlin = groupDistanceTravelled - cityDistances[cityIndex];
                                distanceTravelledLondon -= distanceTravelledBerlin;


                                if (cityIndex < cities.length - 1) {
                                    cityIndex++;
                                }

                            }

                            else if (cityIndex === 1) {
                                distanceTravelledLondon -= this.state.eventDistanceTravelled;
                                distanceTravelledBerlin += this.state.eventDistanceTravelled;
                            }


                            totalDistanceTravelled = groupDistanceTravelled;

                            firebase.database().ref('/Groups/' + groupIndex).update({
                                totalDistanceTravelled,
                                cityIndex
                            }).then((data) => {

                            }).catch((error) => {

                            })

                            firebase.database().ref('/Groups/' + groupIndex + '/Patients/' + firebase.auth().currentUser.uid).update({
                                distanceTravelledLondon,
                                distanceTravelledBerlin
                            }).then((data) => {

                            }).catch((error) => {

                            })

                        })
                    
                    })


                });

            });

        });

    }

    updateIndividualTotalDistancegTravelled = (eventDistanceTravelled) => {

        let totalDistanceTravelled = 0;

        firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats/totalDistanceTravelled').once('value', function (snapshot) {
            totalDistanceTravelled = snapshot.val() + eventDistanceTravelled;

            firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats').update({
                totalDistanceTravelled
            }).then((data) => {

            }).catch((error) => {

            })


        })
    }

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

    handleFeedback = () => {
        let distanceTravelled = this.state.distanceTravelled;
        this.setState({
            eventDistanceTravelled: distanceTravelled
        })
        let pace = this.state.pace;
        let timeElapsed = this.state.timeElapsed;

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes

        let numberOfBreaks = this.state.numberOfBreaks;

        let timestamp = date + '/' + month + '/' + year + ' ' + hours + ':' + min;

        firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats/eventCounter').once('value', function (snapshot) {
            let counter = snapshot.val();
            let eventCounter = counter + 1;
            var eventCounterString = eventCounter.toString();

            if (eventCounter < 10) {
                eventCounterString = '0' + eventCounterString
            }

            firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats/Event' + eventCounterString).set({
                distanceTravelled,
                pace,
                timeElapsed,
                timestamp,
                numberOfBreaks
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

        this.mainActivityPageCalculations();
        this.updateIndividualTotalDistancegTravelled(distanceTravelled);
        //this.props.navigation.navigate('FeedbackPage')
    }

    _onPress() {
        this.openModal();
    }

    incrementBreaks() {
        this.setState({
            numberOfBreaks: this.state.numberOfBreaks+1,
        })
    }

    decrementBreaks() {
        this.setState({
            numberOfBreaks: (this.state.numberOfBreaks !== 0) ? this.state.numberOfBreaks-1 : 0
        })
    }

    handleCancel = () => {
        this.toggleModal();
    }

    getUser = () => {
        return firebase.auth().currentUser.displayName;
    }

    filterByUid = (data) => {
        const result = [];
        const map = new Map();
        for (const item of data) {
            if(!map.has(item.uid)){
                map.set(item.uid, true);        // set any value to Map
                result.push(item);
            }
        }
        return result
    }

    handleEventChosen = (item) => {
        console.log('Event to save: ', item.name)

        var firebaseRef = firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats');
        var currentEvent = []
        firebaseRef.once('value')
            .then((dataSnapshot) => {
                var obj = dataSnapshot.val()
                console.log('obj: ', obj)
                if (obj != null) {
                    var statsArray = Object.keys(obj).map((key) => {
                        return obj[key];
                    })
                    console.log('statsArray', statsArray)
                    
                    // Need to make it actually filter out the non event stuff instead of popping()
                    statsArray.pop();
                    statsArray.pop();
                    statsArray.pop();
                    statsArray.pop();
                    statsArray.pop();

                    console.log('Hey look at this: ', statsArray)

                    if (statsArray != [] && statsArray != null) {
                        statsArray = statsArray.map((x) => {
                            return {
                                ...x,
                                timestamp: Math.floor((new Date(x.timestamp)).getTime() / 1000),
                                user: this.getUser(),
                                uid: firebase.auth().currentUser.uid
                            };   
                        } 
                    );
                    if (statsArray.length > 1) {
                        currentEvent = statsArray.slice(-1).pop();
                    } else {
                        currentEvent = statsArray[0];
                    }
                    console.log('CurrentEvent: ', currentEvent)

                    var events = this.state.eventsArray;

                    console.log('EventsArray', events)

                    events.map((el) => {
                        if (el.key === item.key) {
                            if (el.stats === undefined) {
                                el.stats = [currentEvent]
                            } else {
                                el.stats = this.filterByUid(el.stats.concat([currentEvent]))
                            }
                            return el
                        } else {
                            return el 
                        }
                    })

                    console.log('New Events Array: ', events)
                    this.setState({eventsArray: events})

                    firebase.database().ref('Events/').set({
                        events
                    }).then((data)=>{
                            console.log('Events written to firebase ' , data)
                    }).catch((error)=>{
                            console.log('Error writing events to firebase ' , error)
                    })

                    this.handleFeedback();
                    this.toggleModal();
                    this.props.navigation.navigate('FeedbackPage');

                }            
            }
        })
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    openModal = () => {
        this.readEventData();
        this.toggleModal();
    }

    readEventData = () => {
        var firebaseRef = firebase.database().ref('Events/events');
        return firebaseRef.once('value')
            .then((dataSnapshot) => {
                //console.log('test1', dataSnapshot.val());
                this.setState({ eventsArray: dataSnapshot.val() });
            }
        );
    };

    filterOutCurrent = (data) => {
        if (data != [] && data != null) {
            var currentTime = Math.round((new Date()).getTime() / 1000);
            let filteredItems = data.filter(item => item.key < currentTime);
            return filteredItems;
        } else {
            return [];
        }
    }

    render() {
        return (
            <View>
                <Modal 
                    isVisible={this.state.isModalVisible}
                    backdropOpacity={0.0}
                    backgroundColor={'white'}
                    onBackButtonPress={this.toggleModal}
                    coverScreen={true}
                    animationInTiming={1}
                    animationOutTiming={1}
                    style={{ 
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 0 
                        }}
                    >
                    <View style={{ flex: 1}}>
                        <Header title='Finish Event'/>
                        <View style ={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                            <View>
                                <Text style={{margin: 20, fontSize: 20}}>Choose which event you just went too.</Text>
                                <View>
                                    < FlatList
                                        data={this.filterOutCurrent(this.state.eventsArray)}
                                        renderItem={({item}) => (
                                            <TouchableOpacity
                                                style={styles.touchableUpcoming1}
                                                onPress={() => this.handleEventChosen(item)}>
                                                <View style={styles.touchableUpcomingTextView}>
                                                    <Text style={{fontSize : 18}}>{item.name}</Text>
                                                    <Text style={{fontSize : 12}}>{item.time}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    />  
                                    </View>
                                </View>
                            <View>
                                <Text style={{margin: 20, fontSize: 20}}>If you didn't make an event, press the cancel button and go to the Events Page to create a new event.</Text>
                                <Button title="Cancel" onPress={this.handleCancel} />
                            </View>
                        </View>
                    </View>
                </Modal>
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

                    <View style={styles.separator}>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <Image
                            source={require('./numberOfBreaksAssets/bench.png')}
                            style={{ width: 50, height: 29, marginLeft: 15, marginTop: 15 }}
                        />

                        <Text
                            style={[styles.shoeDescriptorStyle, {marginLeft: -85}]}
                        >
                            Breaks
                        </Text>
                        <View
                            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                        >
                            <TouchableOpacity onPress={this.decrementBreaks}>
                                <Image
                                    source={require('./numberOfBreaksAssets/minus.png')}
                                    style={{width: 28, height: 28, marginTop: 16, marginRight: 15}}
                                />
                            </TouchableOpacity>    
                            <Text style={styles.dataStyle}> {this.state.numberOfBreaks} </Text>
                            <TouchableOpacity onPress={this.incrementBreaks}>
                                <Image
                                    source={require('./numberOfBreaksAssets/plus.png')}
                                    style={{ width: 29, height: 28, marginTop: 16, marginRight: 15 }}
                                />
                            </TouchableOpacity>
                        </View>
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
    separator: {
        width: 265,
        marginTop: 15,
        marginLeft: 81,
        borderBottomWidth: 1,
        borderColor: '#979797'
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
        marginTop: 15,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    dataStyle: {
        marginLeft: 'auto',
        marginRight: 15,
        marginTop: 15,
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
        marginBottom: 20,
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

    touchableUpcoming1 : {
        flex: 1, 
        flexDirection: 'row',    
        justifyContent: 'space-between', 
        backgroundColor: 'transparent', 
        paddingBottom: 20},

    touchableUpcomingTextView: {
        flex: 1, 
        flexDirection: 'column', 
        paddingLeft: 18, 
        width : Dimensions.get('window').width       
    },

});

AppRegistry.registerComponent('Activities', () => Activities);