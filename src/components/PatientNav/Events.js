// Events.js

import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
	tabBarLabel: 'Events',
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
        style={{ color: tintColor }}
      />
    ),
    
  };
  state = {
    isModalVisible: false,
    eventsArray: [],
    dialogVisible: false,
    eventName: "",
    eventTime: "",
    dateTime: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      eventsArray: [],
      dialogVisible: false,
      eventName: "",
      eventTime: "",
      dateTime: ""
    };
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
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleInput = (input) => {
    this.setState({eventName : input.toString()});
  }
 
  handleDone = () => {
    var name = this.state.eventName;  
    if (name == "") {
      Alert.alert(
        'Invalid name',
        'You cannot make an event without a name.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      ); 
    } else {
    var newDateAndTime = this.state.eventTime;
    var events = this.state.eventsArray;
    var time = this.state.dateTime;
    var joined = [{key : newDateAndTime, name : name, time : time}].concat(events);
    this.setState({ eventsArray : joined.sort()}); // In Unix Timestamp Mode so that sort works correctly
    this.hideDateTimePicker();

    this.setState({ eventName : "", eventTime: "", dateTime: "", dialogVisible: false });
    }
  };

  handleDatePicked = dateTime => {
    console.log("A date has been picked: ", dateTime);
    var unixDateAndTime = Math.floor(dateTime.getTime() / 1000);
    var currentTime = Math.round((new Date()).getTime() / 1000);
    if (unixDateAndTime < currentTime) {
      Alert.alert(
        'Invalid time and date',
        'You cannot make an event in the past.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      ); 
      this.hideDateTimePicker();
    } else {

      var today = dateTime;
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!

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

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  deleteItem = data => {
    let allItems = this.state.eventsArray;
    let filteredItems = allItems.filter(item => item.key != data.key);
    this.setState({ eventsArray: filteredItems })
  }

  deleteItemAlert = item => {
    Alert.alert(
      'Warning',
      'Are you sure you would like to delete that event?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.deleteItem(item)},
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View style={{ 
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        }}>
        <Text>Events:</Text>

        <View style={styles.container}>
        <FlatList
          data={this.state.eventsArray}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.item}>{item.name} at {item.time}</Text>
              <Button title="Delete" onPress={() => this.deleteItemAlert(item)} /> 
          </View> )}
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

        <Button title="Add Event" onPress={this.showDateTimePicker} />
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              mode={'datetime'}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

// To Do:
// Add location to create event so that when you click on an event, there is a pop up with a map telling you where the event is at
// Need to save and initialise eventsArray from a server - Also need to account for multiple people using it at the same time?
// Need to send a notification 1 hour before an event
// Make it pretty

export default EventsScreen
