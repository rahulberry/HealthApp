// MyEvents.js

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
    Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from "firebase";
import Fire from '../PractitionerNav/Fire';

import {
    NavigationScreenProp,
    NavigationState,
} from 'react-navigation';
import { Button } from '../commonComponents/ButtonWithMargin';

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

export class EventsScreen extends React.Component<Props> {
    static navigationOptions = {
	tabBarLabel: 'My Events',
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
        account: ""    
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
            account: this.getUser()
        };
        //this.readEventData();
        this.realtimeEventsRefresh();
    };

    readEventData = () => {
        var firebaseRef = firebase.database().ref('Events/events');
        return firebaseRef.once('value')
            .then((dataSnapshot) => {
                console.log('test1', dataSnapshot.val());
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
        console.log('User (current screen \'My Events\'):', firebase.auth().currentUser.displayName)
        return firebase.auth().currentUser.displayName;
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
    };

    filterGoing = (name, events) => {
        if (events == null) {
            return [];
        } else {
            var goingEvents = events.filter(item => item.going != null);
            goingEvents = goingEvents.filter(item => item.going.includes(name));
            return goingEvents;
        }
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

    onRefresh = () => {
        this.setState({ isFetching: true }, function() { this.refreshData });
    }

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

    render() {
        return (
            <View style={styles.mainStyle}>
                <View style={styles.container}>
                < FlatList
                    onRefresh={() => this.refreshData()}
                    refreshing={this.state.isFetching}
                    data={this.filterOutOld(this.filterGoing(this.state.account, this.state.eventsArray))}
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
        width : Dimensions.get('window').width},
})

export default EventsScreen