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
    Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from "firebase";
import Fire from '../../components/PractitionerNav/Fire';
import {
    NavigationScreenProp,
    NavigationState,
} from 'react-navigation';
import { Button } from '../commonComponents/ButtonWithMargin';
import Dialog from "react-native-dialog";
import DateTimePicker from "react-native-modal-datetime-picker";

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

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
        this.readEventData();
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

    getUser = () => {
        var user = 'josh'
        // Need to grab this from firebase. Might need to change how this is implemented cause of async shit
        return user;
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

    setTestData = () => {
        // This function is for debugging. It provides 2 events that have happened and two that are upcoming (as of time of coding)
        var events = [
            {key : '1557837000', name : 'Old Test Event 1', time : '14/05/2019 12:30', going : ['gary', 'alfred', 'amy', 'josh'], colour : 'red'},
            {key : '1557857000', name : 'Another Old Test Event', time : '14/05/2019 18:03', going : ['gary', 'billy', 'amy'], colour : 'red'},
            {key : '1560342934', name : 'New Test Event 1', time : '12/06/2019 12:35', going : ['jill', 'john', 'amy', 'josh'], colour : 'red'},
            {key : '1560861334', name : 'Another New Test Event', time : '18/06/2019 12:35', going : ['gary', 'bill', 'amy'], colour : 'red'}
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

        firebase.database().ref('Events/').remove()
            .then(()=>{
                this.setState({firebaseArray: this.state.eventsArray})
                this.writeEventsData([]);
            })

        this.setState({isFetching : this.state.isFetching});
    };

    handleCancel = () => {
        this.hideDateTimePicker();
        this.setState({ eventName : "", eventTime: "", dateTime: "", dialogVisible: false });
    };

    handleDone = () => {
        var name = this.state.eventName;    
        if (name == "") {
            this.invalidNameAlert();
        } else {
        var newDateAndTime = this.state.eventTime;
        var events = this.state.eventsArray;
        var time = this.state.dateTime;
        var going = [this.state.account];
        var joined = [{key : newDateAndTime, name : name, time : time, going : going}].concat(events);
        this.setState({ eventsArray : joined.sort((a, b) => (a.key > b.key) ? 1 : -1)}); // In Unix Timestamp Mode so that sort works correctly
        this.writeEventsData(joined);
        this.hideDateTimePicker();
        this.setState({ eventName : "", eventTime: "", dateTime: "", dialogVisible: false });
        }
    };

    handleDatePicked = (dateTime) => {
        var unixDateAndTime = Math.floor(dateTime.getTime() / 1000);
        var currentTime = Math.round((new Date()).getTime() / 1000);
        if (unixDateAndTime < currentTime) {
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

    render() {
        return (
                <View style={styles.mainStyle}>
                        <View style={styles.container}>
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
                    <Dialog.Button label="Done" onPress={this.handleDone} />
                </Dialog.Container>
            </View>
            <View style = {{flexDirection: 'row', justifyContent: 'flex-end'}}>
                {/* Uncomment this for debugging <Button title="Set Firebase" onPress={this.setTestData} /> */}
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
        width : Dimensions.get('window').width},
})

export default EventsScreen