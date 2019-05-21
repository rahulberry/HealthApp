// Events.js

// To Do:
// 
// Need to add a location picker modal and show location in view on the EventInformation page
// Need to save and initialise eventsArray, doneEvents, and account from a server or redux or whatever
// Need to send a notification 1 hour before an event
// Move completed events to stats and have current completed events in group, and a personal completed events in personal

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
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { createStore } from 'redux';
import { Button } from '../commonComponents/ButtonWithMargin';
import Dialog from "react-native-dialog";
import DateTimePicker from "react-native-modal-datetime-picker";
import Modal from 'react-native-modal'
import firebase from "firebase";
import Fire from '../../components/PractitionerNav/Fire';
//import { addEvents } from '../../actions';
//import EventsReducer from '../../reducers/EventsReducer.js'

//const store = createStore(EventsReducer);
//store.subscribe(() => console.log(store.getState().eventsArray))

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

var test = [];

export class MyEventsScreen extends React.Component<Props> {
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
    isModalVisible: false,
    eventsArray: [],
    dialogVisible: false,
    doneEventsArray: [],
    firebaseArray: [],
    firebaseDoneArray: [],
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
      eventsArray: [],
      //eventsArray: [{key : '1560342934', name : 'Test Event 1', time : '12/06/2019 12:35', going : ['gary', 'john', 'amy', 'josh'], colour : 'red'},
      //              {key : '1560861334', name : 'Another Test Event', time : '18/06/2019 12:35', going : ['gary', 'bill', 'amy'], colour : 'red'}],
      dialogVisible: false,
      firebaseArray: [],
      firebaseDoneArray: [],
      doneEventsArray: [{key : '1525966538', name : 'Test Old Event', time : '12/06/2019 12:35', going : ['amy', 'sam'], colour : 'red'}],
      eventName: "",
      eventTime: "",
      dateTime: "",
      currentItem: {},
      isFetching: false,
      account: "josh"
    };
    this.readEventData();
  }

  readEventData() {
    var firebaseRef = firebase.database().ref('Events/events');
    return firebaseRef.once('value')
      .then((dataSnapshot) => {
        console.log('test1', dataSnapshot.val());
        this.setState({ eventsArray: dataSnapshot.val() });
      }
    );
  };

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

  

  readDoneEventData() {
    var firebaseRef = firebase.database().ref('Events/done');
    return firebaseRef.once('value')
      .then((dataSnapshot) => {
        console.log('done', dataSnapshot.val());
        this.setState({
          firebaseDoneArray: dataSnapshot.val()
        });
      });
  }

  readEventData1() {
    var firebaseRef = firebase.database().ref('Events/events');
    firebaseRef.once('value')
      .then((dataSnapshot) => {
        var data = dataSnapshot.val();
        console.log('data', data)
        var currentTime = Math.round((new Date()).getTime() / 1000);

        var done = this.state.doneEventsArray;

        var allItems = data; //this.state.firebaseArray;
        
        let filteredItems = allItems.filter(item => item.key > currentTime);
        let doneItems = allItems.filter(item => item.key <= currentTime);
        var joined = done.concat(doneItems);
        this.setState({ eventsArray: filteredItems })
        var sortedJoined = joined.sort((a, b) => (a.key > b.key) ? 1 : -1)
        this.setState({doneEventsArray : sortedJoined})
        this.setState({isFetching : false})
      });
  }
  
  writeEventsData(events1){
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
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
  };

  writeDoneEventsData(events1){
    this.readDoneEventData();
    if (this.state.firebaseDoneArray == null) {
      var currentData = [];
    } else {
      var currentData = this.state.firebaseDoneArray;
      }
    console.log('test', currentData);
    var done = this.filterByKey(currentData.concat(events1))
    firebase.database().ref('DoneEvents/').set({
        done
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
  };

  filterByKey = (data) => {
    const result = [];
    const map = new Map();
    for (const item of data) {
      if(!map.has(item.key)){
        map.set(item.key, true);    // set any value to Map
        result.push(item);
      }
    }
    return result
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

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

  refreshData() {
    var firebaseRef = firebase.database().ref('Events/events');
    firebaseRef.once('value')
      .then((dataSnapshot) => {
        var data = dataSnapshot.val();
        var sorted = this.filterByKey(data.sort((a, b) => (a.key > b.key) ? 1 : -1))
        this.setState({ eventsArray: sorted })
        this.setState({isFetching : false})
      }
    );
  }

  onRefresh() {
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

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  loadModal = (item) => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.navigation.navigate('EventsInformation', {item})
  };

  deleteItem1 = (data) => {
    this.readEventData();
    let allItems = this.state.firebaseArray;
    let filteredItems = allItems.filter(item => item.key != data.key);
    this.setState({ eventsArray: filteredItems });

    firebase.database().ref('Events/').remove()
     
    this.setState({firebaseArray: filteredItems})
    this.setState({firebaseDoneArray: this.state.doneEventsArray})
    this.writeEventsData([]);
    this.writeDoneEventsData([]);
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
    console.log(this.props)

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

  filterGoing = (name, events) => {
    if (events == null) {
      return [];
    } else {
      var goingEvents = events.filter(item => item.going != null);
      goingEvents = goingEvents.filter(item => item.going.includes(name));
      return goingEvents;
    }
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

  filterByTime = () => {
    this.readEventData1();
    this.readDoneEventData();
    this.writeDoneEventsData(this.state.doneEventsArray);
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

//const mapStateToProps = state => {
//  return { eventsArray: test };
//};

//const mapDispatchToProps = dispatch => {
//  dispatch(addEvents)
//};

export default MyEventsScreen
//export default sts = connect(mapStateToProps)(MyEventsScreen)
