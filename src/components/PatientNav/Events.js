// Events.js

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
import {
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { Button } from '../commonComponents/ButtonWithMargin';
import Dialog from "react-native-dialog";
import DateTimePicker from "react-native-modal-datetime-picker";
import Modal from 'react-native-modal'

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
        style={{ color: tintColor }}/>
    ),
    
  };
  state = {
    isModalVisible: false,
    eventsArray: [],
    dialogVisible: false,
    doneEventsArray: [],
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
      isModalVisible: false,
      isDateTimePickerVisible: false,
      eventsArray: [{key : '1560342934', name : 'Test Event 1', time : '12/06/2019 12:35', going : ['gary', 'john', 'amy'], colour : 'red'},
                    {key : '1560861334', name : 'Another Test Event', time : '18/06/2019 12:35', going : ['gary', 'bill', 'amy'], colour : 'red'}],
      dialogVisible: false,
      doneEventsArray: [{key : '1525966538', name : 'Test Old Event', time : '12/06/2019 12:35', going : ['amy', 'sam'], colour : 'red'}],
      eventName: "",
      eventTime: "",
      dateTime: "",
      currentItem: {},
      isFetching: false,
      account: "josh"
    };
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
  };

  onRefresh() {
    this.setState({ isFetching: true }, function() { this.filterByTime });
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

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  loadModal = (item) => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.navigation.navigate('EventsInformation', {item})
  };

  deleteItem = data => {
    let allItems = this.state.eventsArray;
    let filteredItems = allItems.filter(item => item.key != data.key);
    this.setState({ eventsArray: filteredItems })
  };

  handleDelete = item => {
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
    var goingArray = item.going;
    var name = this.state.account;
    if (goingArray.includes(name) == true) {
      let filteredItems = goingArray.filter(item => item != name);
      item.going = filteredItems;
    } else {
      var joined = goingArray.concat(name);
      item.going = joined;
    }
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
    var joined = [{key : newDateAndTime, name : name, time : time, going : []}].concat(events);
    this.setState({ eventsArray : joined.sort((a, b) => (a.key > b.key) ? 1 : -1)}); // In Unix Timestamp Mode so that sort works correctly
    this.hideDateTimePicker();
    this.setState({ eventName : "", eventTime: "", dateTime: "", dialogVisible: false });
    }
  };

  handleDatePicked = dateTime => {
    console.log("A date has been picked: ", dateTime);
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

  filterByTime = () => {
    var currentTime = Math.round((new Date()).getTime() / 1000);
    var done = this.state.doneEventsArray;
    let allItems = this.state.eventsArray;
    let filteredItems = allItems.filter(item => item.key > currentTime);
    let doneItems = allItems.filter(item => item.key <= currentTime);
    var joined = done.concat(doneItems);
    this.setState({ eventsArray: filteredItems })
    this.setState({doneEventsArray : joined.sort((a, b) => (a.key > b.key) ? 1 : -1)})
    this.setState({isFetching : false})
  };

  changeButtonColour = (item) => {
    var goingArray = item.going;
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
        <Modal 
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
          onBackButtonPress={() => this.setState({ isVisible: false })}
          backdropOpacity = {1}
          backdropColor = {'white'}
          coverScreen = {true}>
          <View style={{ flex: 1 }}>
            <Text style={styles.completed} >Completed Events:</Text>
            <FlatList
              data={this.state.doneEventsArray}
              renderItem={({item}) => (
                <View style={styles.touchableCompleted}>
                  <TouchableOpacity
                  style={styles.touchableCompleted1}
                  onPress={() => this.loadModal(item)}>
                    <View style={styles.touchableCompletedTextView}>
                      <Text style={{fontSize : 18}}>{item.name}</Text>
                      <Text style={{fontSize : 12}}>{item.time}</Text>
                    </View>
                  </TouchableOpacity>
                </View> 
              )}
            />  
            <Button title="Back" onPress={this.toggleModal} />
          </View>
        </Modal>
        <Text style={styles.upcoming} >Upcoming Events:</Text>
        <View style={styles.container}>
        < FlatList
          onRefresh={() => this.filterByTime()}
          refreshing={this.state.isFetching}
          data={this.state.eventsArray}
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
      <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button title="Completed" onPress={this.toggleModal} />
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
    fontSize : 40, 
    fontWeight : 'bold', 
    paddingTop : 20, 
    paddingBottom : 20, 
    paddingLeft : 20, 
    backgroundColor : '#f9f9f9' },
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

// To Do:
// 
// Add a location picker modal and show location in view on the EventInfo page
// Need to save and initialise eventsArray from a server
// Need to send a notification 1 hour before an event
// Make it pretty

export default EventsScreen
