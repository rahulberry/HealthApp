// Events.js

// To Do:
// 
// Need to add a location picker modal and show location in view on the EventInformation page
// Need to send a notification 1 hour before an event
// Add getName from firebase and use that for the account

import React from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from "firebase";
import {
    NavigationScreenProp,
    NavigationState,
} from 'react-navigation';
import { Button } from '../commonComponents/ButtonWithMargin';
import Dialog from "react-native-dialog";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Header } from './Header'
import Modal from 'react-native-modal';

import MapView, { Marker, AnimatedRegion } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

const LATITUDE= 51.499500;
const LONGITUDE= -0.174757;

export class EventsScreen extends React.Component<Props> {
    static navigationOptions = {
	tabBarLabel: 'All Events',
        tabBarIcon: ({
            tintColor,
            focused,
            horizontal,
        }: {
            tintColor: string;
            focused: boolean;
            horizontal: boolean;
        }) => (
            <Ionicons
                name={focused ? 'ios-calendar' : 'ios-calendar'}
                size={horizontal ? 20 : 26}
                style={{ color: tintColor }}/>
        ),
        
    };
    state = {
        eventsArray: [],
        firebaseArray: [],
        dialogVisible: false,
        eventName: "",
        eventTime: "",
        dateTime: "",
        currentItem: {},
        isFetching: false,
        account: "",
        isModalVisible: false,
        markers: [],
        pace: '',
        distance: '',
        };

    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            eventsArray: [],
            firebaseArray: [],
            dialogVisible: false,
            eventName: "",
            eventTime: "",
            dateTime: "",
            currentItem: {},
            isFetching: false,
            account: this.getUser(),
            isModalVisible: false,
            markers: [{
                coordinates: {
                  latitude: LATITUDE,
                  longitude: LONGITUDE
                },
              }],
            pace: '2.0',
            distance: '200'
            //markers: []
        };
        this.readEventData(); // May need to comment this out?
        this.realtimeEventsRefresh();
        //this.readStats();
    };

    readEventData = () => {
        var firebaseRef = firebase.database().ref('Events/events');
        return firebaseRef.once('value')
            .then((dataSnapshot) => {
                //console.log('test1', dataSnapshot.val());
                this.setState({ eventsArray: dataSnapshot.val() });
            }
        );
    };

    realtimeEventsRefresh() {
        var firebaseRef = firebase.database().ref('Events/events');
        firebaseRef.on("value", (snapshot) => {
            this.setState({ eventsArray: snapshot.val() });
      });
    }

    getUser = () => {
        console.log('User (current screen \'Events\'):', firebase.auth().currentUser.displayName)
        return firebase.auth().currentUser.displayName;
    }

    filterOutCurrent = (data) => {
        if (data != [] && data != null) {
            var currentTime = Math.round((new Date()).getTime() / 1000);
            let filteredItems = data.filter(item => item.key <= currentTime);
            return filteredItems.reverse();
        } else {
            return [];
        }
    }

    filterOutOld = (data) => {
        if (data != [] && data != null) {
            var currentTime = Math.round((new Date()).getTime() / 1000);
            let filteredItems = data.filter(item => item.key > currentTime);
            return filteredItems;
        } else {
            return [];
        }
    }

    filterByKey = (data) => {
        const result = [];
        const map = new Map();
        for (const item of data) {
            if(!map.has(item.key)){
                map.set(item.key, true);        // set any value to Map
                result.push(item);
            }
        }
        return result
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

    writeEventsData = (events1) => {
        this.readEventData();
        if (this.state.firebaseArray == null) {
            var currentData = [];
        } else {
            var currentData = this.state.firebaseArray;
            }
        console.log('test', currentData);
        var events = this.filterByKey(currentData.concat(events1))
        firebase.database().ref('Events/').set({
                events
        }).then((data)=>{
                console.log('Events written to firebase ' , data)
        }).catch((error)=>{
                console.log('Error writing events to firebase ' , error)
        })
        this.readEventData();
    };

    setTestData = () => {
        // This function is for debugging. It provides 2 events that have happened and two that are upcoming (as of time of coding)
        var events = [
            {key : '1557837000', name : 'Old Test Event 1', time : '14/05/2019 12:30', going : ['Gary', 'Alfred', 'Amy', 'Josh'], colour : 'red', coords : {latitude: LATITUDE, longitude: LONGITUDE}, stats : [], pace: '2.0', distance: '200'},
            {key : '1557857000', name : 'Another Old Test Event', time : '14/05/2019 18:03', going : ['Gary', 'Billy', 'Amy'], colour : 'red', coords : {latitude: LATITUDE, longitude: LONGITUDE}, stats : [], pace: '2.0', distance: '200'},
            {key : '1560342934', name : 'New Test Event 1', time : '12/06/2019 12:35', going : ['Jill', 'John', 'Amy', 'Josh'], colour : 'red', coords : {latitude: LATITUDE, longitude: LONGITUDE}, stats : [], pace: '2.0', distance: '200'},
            {key : '1560861334', name : 'Another New Test Event', time : '18/06/2019 12:35', going : ['Gary', 'Bill', 'Amy'], colour : 'red', coords : {latitude: LATITUDE, longitude: LONGITUDE}, stats : [], pace: '2.0', distance: '200'}
        ]
        firebase.database().ref('Events/').set({
                events
        }).then((data)=>{
                console.log('Events written to firebase ' , data)
        }).catch((error)=>{
                console.log('Error writing events to firebase ' , error)
        })
    }

    invalidNameAlert = () => {
        Alert.alert(
            'Invalid name',
            'You cannot make an event without a name.',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        );
    };

    invalidTimeAlert = () => {
        Alert.alert(
            'Invalid time and date',
            'You cannot make an event in the past.',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        );
    };

    deleteItemAlert = (item) => {
        Alert.alert(
            'Warning',
            'Are you sure you would like to delete that event?',
            [
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => this.deleteItem(item)},
            ],
            { cancelable: false }
        )
    };

    refreshData = () => {
        //this.readStats();
        var firebaseRef = firebase.database().ref('Events/events');
        firebaseRef.once('value')
            .then((dataSnapshot) => {
                var data = dataSnapshot.val();
                console.log('Firebase Data', data);
                var sorted = this.filterByKey(data.sort((a, b) => (a.key > b.key) ? 1 : -1))
                this.setState({ eventsArray: sorted })
                this.setState({isFetching : false})
            }
        );
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    onRefresh = () => {
        this.setState({ isFetching: true }, function() { this.refreshData });
    };

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    showNameDialog = () => {
        this.setState({ dialogVisible : true} );
    };

    handleInput = (input) => {
        this.setState({eventName : input.toString()});
    };

    deleteItem = (data) => {
        let allItems = this.state.eventsArray;
        let events = allItems.filter(item => item.key != data.key);
        this.setState({ eventsArray: events });

        firebase.database().ref('Events/').set({
                events
        }).then((data)=>{
                //success callback
                console.log('data ' , data)
        }).catch((error)=>{
                //error callback
                console.log('error ' , error)
        })
    };

    handleDelete = (item) => {
        this.setState({currentItem : item});
        this.deleteItemAlert(item);
    };

    onPress = (item) => {
        this.props.navigation.navigate('EventsInformation', {item})
    };

    onLongPress = (item) => {
        this.handleDelete(item)
    };

    onGoingPress = (item) => {
        if (item.going == null) {
            var goingArray = [];
        } else {
            var goingArray = item.going;
        }

        var name = this.state.account;
        if (goingArray.includes(name) == true) {
            let filteredItems = goingArray.filter(item => item != name);
            item.going = filteredItems;
        } else {
            var joined = goingArray.concat(name);
            item.going = joined;
        }

        /*
        firebase.database().ref('Events/').remove()
            .then(()=>{
                this.setState({firebaseArray: this.state.eventsArray})
                this.writeEventsData([]);
            })
        */
        
        var events = this.state.eventsArray;
        firebase.database().ref('Events/').update({
            events,
        })

        //this.setState({isFetching : this.state.isFetching});
    };

    handleCancel = () => {
        this.hideDateTimePicker();
        this.setState({ eventName : "", eventTime: "", dateTime: "", dialogVisible: false });
    };

    handleLocation = () => {
        this.toggleModal();
    }

    handleDone = () => {
        console.log('pace', this.state.pace)
        console.log('distance', this.state.distance)
        this.toggleModal();
        var name = this.state.eventName;    
        if (name == "") {
            this.invalidNameAlert();
        } else {
        var newDateAndTime = this.state.eventTime;
        var events = this.state.eventsArray;
        var time = this.state.dateTime;
        var going = [this.state.account];
        var coords = {
            latitude: this.state.markers[0].coordinates.latitude,
            longitude: this.state.markers[0].coordinates.longitude
          };
        var distance = this.state.distance;
        var pace = this.state.pace;
        var joined = [{key : newDateAndTime, name : name, time : time, going : going, coords : coords, stats : [], pace : pace, distance : distance}].concat(events);
        this.setState({ eventsArray : joined.sort((a, b) => (a.key > b.key) ? 1 : -1)}); // In Unix Timestamp Mode so that sort works correctly
        this.writeEventsData(joined);
        this.hideDateTimePicker();
        this.setState({ eventName : "", eventTime: "", dateTime: "", dialogVisible: false, markers: [{coordinates: {latitude: LATITUDE, longitude: LONGITUDE }}], pace: '2.0', distance: '200' });
        }
    };

    handleDatePicked = (dateTime) => {
        var unixDateAndTime = Math.floor(dateTime.getTime() / 1000);
        var currentTime = Math.round((new Date()).getTime() / 1000);
        if (unixDateAndTime < currentTime - 3600) {
            this.invalidTimeAlert(); 
            this.hideDateTimePicker();
        } else {
            var today = dateTime;
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            } 
            if (mm < 10) {
                mm = '0' + mm;
            }         
            var h = today.getHours();
            var m = today.getMinutes();
            if (m < 10) {
                m = '0' + m;
            }
            if (h < 10) {
                h = '0' + h;
            }
            var today = dd + '/' + mm + '/' + yyyy + ' '+ h + ':' + m;
            this.setState({eventTime : unixDateAndTime.toString()});
            this.setState({dateTime : today});
            this.showNameDialog();
        }
    };

    changeButtonColour = (item) => {
        if (item.going == null) {
            var goingArray = [];
        } else {
            var goingArray = item.going;
        }
        var name = this.state.account;
        if (goingArray.includes(name) == true) {
            return "green";
        } else {
            return "red";
        }
    };

    logCoordinates = (e) => {
        console.log(e)
        this.setState({markers: 
            [{
                coordinates: e.coordinate
            }]
        })
    }

    filterOutCurrent = (data) => {
        if (data != [] && data != null) {
            var currentTime = Math.round((new Date()).getTime() / 1000);
            let filteredItems = data.filter(item => item.key <= currentTime);
            return filteredItems;
        } else {
            return [];
        }
    }

    // THIS FUNCTION IS HORRIBLE AND HACKY AND PROBABLY HAS ISSUES IF MULTIPLE USERS TRY TO UPDATE THE EVENT AT ONCE I DON'T CARE
    readStats = () => {
        var firebaseRef = firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats');
        if (firebaseRef === null || firebaseRef === undefined) {
            console.log('No stats data for current patient. Merge abrted.')
        } else {
            console.log('Data found, and being merged.')
        }
        return firebaseRef.once('value')
            .then((dataSnapshot) => {
                var eventCounter = 0;
                var obj = dataSnapshot.val()
                //console.log('obj', obj)
                if (obj != null) {
                    var statsArray = Object.keys(obj).map((key) => {
                        return obj[key];
                    })
                    eventCounter = statsArray.pop();
                    //console.log('eventCounter', eventCounter)
                    //console.log('statsArray', statsArray)
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
                        //console.log('User Stats Array: ', statsArray);

                        let stillToHappenEvents = this.filterOutOld(this.state.eventsArray);
                        let doneEvents = this.filterOutCurrent(this.state.eventsArray);
                        
                        doneEvents = doneEvents.map((el) => {
                            var stats = el.stats;
                            if (statsArray === undefined || statsArray.length == 0) {
                                return el;
                            } else {
                                //console.log('User Stats Array: ', statsArray);
                                if (stats === undefined) {
                                    stats = [];
                                }
                                var statsValue = statsArray[0];
                                console.log('Stats Value: ', statsValue);
                                //console.log('Stats Value Concat: ', stats.concat([statsValue]));
                                statsArray = statsArray.slice(1);
                                //console.log('test', this.filterByUid(stats.concat([statsValue])))
                                return {
                                    ...el,
                                    stats: this.filterByUid(stats.concat([statsValue]))
                                }
                            }
                        })

                        // Need to add code so that if you have already been to the most recent planned event, it askes you to create another event (time fixed at the timestamp of this event.)

                        //console.log('Done Events: ', doneEvents);
                        let events = stillToHappenEvents.concat(doneEvents);
                        this.setState({eventsArray: events});
                        firebase.database().ref('Events/').set({
                            events
                        }).then((data)=>{
                                console.log('Events written to firebase ' , data)
                        }).catch((error)=>{
                                console.log('Error writing events to firebase ' , error)
                        })

                        //firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats').remove().then(() => {
                        //    console.log('Old Events Delted.');
                        //})
                        eventCounter = eventCounter + 1;
                        firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats').set({
                            eventCounter
                    })
                    }
                }
            }
        );
    };

    render() {
        return (
            <View style={styles.mainStyle} >
                <View style={styles.container}>
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
                        <View style={{ flex: 1}} behavior="padding" enabled>
                            <Header title='Choose Location'/>
                                <View style ={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}} >
                                    <View>
                                        <View style={{flexDirection: 'column', alignContent: 'center', paddingTop: 0.05 * Dimensions.get('window').width, paddingStart: 0.05 * Dimensions.get('window').width}}>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={{fontSize : 30, fontWeight: 'bold'}}>Goal Pace: </Text>
                                                <TextInput
                                                    style={{height: 52, borderColor: 'white', fontSize: 30, borderWidth: 1}}
                                                    onChangeText={(pace) => this.setState({pace})}
                                                    value={this.state.pace}
                                                />
                                                <Text style={{fontSize : 20, paddingTop: 10}}>m/s.</Text>
                                            </View>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={{fontSize : 30, fontWeight: 'bold'}}>Goal Distance: </Text>
                                                <TextInput
                                                    style={{height: 52, borderColor: 'white', fontSize: 30, borderWidth: 1}}
                                                    onChangeText={(distance) => this.setState({distance})}
                                                    value={this.state.distance}
                                                />
                                                <Text style={{fontSize : 20, paddingTop: 10}}>m.</Text>
                                            </View>
                                            {/* <Text>Longitude: {this.returnCoords().longitude}</Text>
                                            <Text>Latitude: {this.returnCoords().latitude}</Text> */}
                                        </View>
                                    </View>
                                    <MapView
                                            style={styles.map}
                                            showsUserLocation = {true}
                                            showsMyLocationButton = {true}
                                            loadingEnabled
                                            region={{
                                                latitude: this.state.markers[0].coordinates.latitude,
                                                longitude: this.state.markers[0].coordinates.longitude,
                                                //latitude: this.returnCoords().latitude,
                                                //longitude: this.returnCoords().longitude,
                                                latitudeDelta: 0.015,
                                                longitudeDelta: 0.015
                                            }}
                                            onPress={e => this.logCoordinates(e.nativeEvent)}
                                            >
                                            {this.state.markers.map(marker => (
                                                <Marker
                                                coordinate={marker.coordinates}
                                                title={"Start Location"}
                                                />
                                            ))}
                                        </MapView>
                                    <View style={{flexDirection: 'column', alignContent: 'center', paddingTop: 0.05 * Dimensions.get('window').width, paddingStart: 0.05 * Dimensions.get('window').width}}>                                    
                                        <Text style={{fontSize : 30, fontWeight : 'bold'}}>Current Location</Text>
                                        <Text>Longitude: {this.state.markers[0].coordinates.longitude}</Text>
                                        <Text>Latitude: {this.state.markers[0].coordinates.latitude}</Text>
                                    </View>
                                <Button title="Done" onPress={this.handleDone} />
                            </View>
                        </View>
                    </Modal>
                < FlatList
                    onRefresh={() => this.refreshData()}
                    refreshing={this.state.isFetching}
                    data={this.filterOutOld(this.state.eventsArray)}
                    renderItem={({item}) => (
                        <View style={styles.touchableUpcoming}>
                            <TouchableOpacity
                                style={styles.touchableUpcoming1}
                                onPress={() => this.onPress(item)}
                                onLongPress={() => this.onLongPress(item)}>
                                <View style={styles.touchableUpcomingTextView}>
                                    <Text style={{fontSize : 18}}>{item.name}</Text>
                                    <Text style={{fontSize : 12}}>{item.time}</Text>
                                </View>
                            </TouchableOpacity>
                            <Button color= {this.changeButtonColour(item)} title="Going" onPress={() => this.onGoingPress(item)} />     
                        </View> 
                    )}
                />            
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Create Event</Dialog.Title>
                    <Dialog.Description>
                        Please enter a name for your event.
                    </Dialog.Description>
                    <Dialog.Input label = "Event Name" onChangeText = {(name) => this.handleInput(name)} />
                    <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                    <Dialog.Button label="Done" onPress={this.handleLocation} />
                </Dialog.Container>
            </View>
            <View style = {{flexDirection: 'row', justifyContent: 'flex-end'}}>
                {/* Uncomment this for debugging <Button title="Don't Press" onPress={this.setTestData} />{/* */}
                <Button title="Add Event" onPress={this.showDateTimePicker} />
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        mode={'datetime'}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    mainStyle: { 
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    completed: {
        width : Dimensions.get('window').width, 
        fontSize : 28, 
        fontWeight : 'bold', 
        paddingTop : 20, 
        paddingLeft : 10 
    },
    upcoming: {
        fontSize : 30, 
        fontWeight : 'bold', 
        //color : 'white',
        paddingTop : 20, 
        //paddingBottom : 20, 
        paddingLeft : 20, 
        //backgroundColor : '#8ae2ad' 
    },
    touchableUpcoming : {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    touchableUpcoming1 : {
        flex: 1, 
        flexDirection: 'row',    
        justifyContent: 'space-between', 
        backgroundColor: 'transparent', 
        paddingBottom: 20},
    touchableCompleted: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    touchableCompleted1: {
        alignItems: 'center', 
        backgroundColor: 'transparent', 
        padding: 10},
    touchableCompletedTextView: {
        flex: 1, 
        flexDirection: 'column', 
        paddingTop: 20, 
        width : Dimensions.get('window').width},
    touchableUpcomingTextView: {
        flex: 1, 
        flexDirection: 'column', 
        paddingLeft: 18, 
        width : Dimensions.get('window').width       
    },
    map: {
        width : Dimensions.get('window').width,
        height: Dimensions.get('window').width
    },
})

export default EventsScreen