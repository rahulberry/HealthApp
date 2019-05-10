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
        style={{ color: tintColor }}
      />
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
    isFetching: false  
    };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isDateTimePickerVisible: false,
      eventsArray: [{key : '1560342934', name : 'Test Event 1', time : '12/06/2019 12:35'},
                    {key : '1560861334', name : 'Another Test Event', time : '18/06/2019 12:35'}],
      dialogVisible: false,
      doneEventsArray: [{key : '1525966538', name : 'Test Old Event', time : '12/06/2019 12:35'}],
      eventName: "",
      eventTime: "",
      dateTime: "",
      currentItem: {},
      isFetching: false
    };
  }

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

  handleDelete = item => {
    this.setState({currentItem : item});
    this.deleteItemAlert(item);
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
  }

  loadModal = (item) => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.navigation.navigate('EventsInformation', {item})
  }

  onPress = (item) => {
    this.props.navigation.navigate('EventsInformation', {item})
  }

  onLongPress = (item) => {
    this.handleDelete(item)
  }

  render() { //Turn info and Delete buttons into a dropdown that contains: info, mark as done, delete
    return (
      <View style={{ 
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        }}>
        <Modal 
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
          onBackButtonPress={() => this.setState({ isVisible: false })}
          backdropOpacity = {1}
          backdropColor = {'white'}
          coverScreen = {true}
          >
          <View style={{ flex: 1 }}>
          <Text style={{width : Dimensions.get('window').width, fontSize : 28, fontWeight : 'bold', paddingTop : 20, paddingLeft : 10 }} >Completed Events:</Text>
          <FlatList
            data={this.state.doneEventsArray}
            renderItem={({item}) => (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TouchableOpacity
                  style={{alignItems: 'center', backgroundColor: 'transparent', padding: 10}}
                  onPress={() => this.loadModal(item)}
                  onLongPress={() => this.handleDelete(item)}
                >
                <View style={{flex: 1, flexDirection: 'column', paddingTop: 20, width : Dimensions.get('window').width}}>
                  <Text style={{fontSize : 18}}>{item.name}</Text>
                  <Text style={{fontSize : 12}}>{item.time}</Text>
                </View>
                </TouchableOpacity>
            </View> )}
          />  
          <Button title="Back" onPress={this.toggleModal} />
      </View>
        </Modal>
        <Text style={{fontSize : 40, fontWeight : 'bold', paddingTop : 20, paddingBottom : 20, paddingLeft : 20, backgroundColor : '#f9f9f9' }} >Upcoming Events:</Text>
        <View style={styles.container}>
        <FlatList
          onRefresh={() => this.filterByTime()}
          refreshing={this.state.isFetching}
          data={this.state.eventsArray}
          renderItem={({item}) => (
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                
                <TouchableOpacity
                  style={{alignItems: 'center', backgroundColor: 'transparent', paddingBottom: 20}}
                  onPress={() => this.onPress(item)}
                  onLongPress={() => this.onLongPress(item)}
                >
                <View style={{flex: 1, flexDirection: 'column', paddingLeft: 18, width : Dimensions.get('window').width}}>
                  <Text style={{fontSize : 18}}>{item.name}</Text>
                  <Text style={{fontSize : 12}}>{item.time}</Text>
                </View>
                </TouchableOpacity>

                
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
  item1: {
    padding: 20,
    fontSize: 16,
    height: 44,
  },
})

// To Do:
// 
// Add a location picker modal and show location in view on the EventInfo page
// Need to save and initialise eventsArray from a server
// Need to send a notification 1 hour before an event
// Make it pretty

export default EventsScreen
