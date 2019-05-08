// Events.js

import React from 'react';
import {
  Alert,
  FlatList,
  LayoutAnimation,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createMaterialTopTabNavigator,
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
} from 'react-navigation';
import { Button } from '../commonComponents/ButtonWithMargin';
//import Modal from "react-native-modal";
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
    eventsArray: []
  };

  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      eventsArray: []
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
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
      var newDateAndTime = unixDateAndTime.toString();
      var events = this.state.eventsArray;
      var joined = [{key : newDateAndTime}].concat(events);
      this.setState({ eventsArray : joined.sort()}); // In Unix Timestamp Mode so that sort works correctly
      this.hideDateTimePicker();
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
        <Text>Note, these times are in Unix time:</Text>

        <View style={styles.container}>
        <FlatList
          data={this.state.eventsArray}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.item}>{item.key}</Text>
              <Button title="Delete" onPress={() => this.deleteItemAlert(item)} /> 
          </View> )}
        />
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

// Need to save and initialise eventsArray from a server - Also need to account for multiple people using it at the same time?
// Need to send a notification 1 hour before an event

export default EventsScreen
