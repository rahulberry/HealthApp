// PersonalStats.js

import React from 'react';
import {
  LayoutAnimation,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createMaterialTopTabNavigator,
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
} from 'react-navigation';
import { Button } from '../commonComponents/ButtonWithMargin';
import firebase from "firebase";
import Fire from '../../components/PractitionerNav/Fire';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

export class PersonalStatsScreen extends React.Component<Props> {
  static navigationOptions = {
    tabBarLabel: 'Personal',
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
        name={focused ? 'ios-person' : 'ios-person'} // Change these to change the icons
        size={horizontal ? 20 : 26}
        style={{ color: tintColor }}
      />
    ),
  };

  state = {
    eventsArray: [],
    account: "",
    isFetching: false
  };

  constructor(props) {
    super(props);
    this.state = {
      //eventsArray: [
      //  {key : '1525966538', name : 'Afternoon Walk', time : '12/06/2019 12:35', going : ['amy', 'sam'], distance : 4.8},
      //  {key : '1525966538', name : 'Afternoon Walk 1', time : '12/06/2019 12:35', going : ['amy', 'sam', 'josh'], distance : 4.8},
      //  {key : '1525966538', name : 'Afternoon Walk 2', time : '12/06/2019 12:35', going : ['amy', 'sam'], distance : 4.8},],
      account: "josh",
      eventsArray: [],
      isFetching: false,
    };
    this.readEventData();
  };

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

  onPress = (item) => {
    this.props.navigation.navigate('EventsInformation', {item})
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


  onRefresh() {
    this.setState({ isFetching: true }, function() { this.refreshData });
  }

  filterGoing = (name, events) => {
    if (events != null) {
      var goingEvents = events.filter(item => item.going != null);
      goingEvents = goingEvents.filter(item => item.going.includes(name));
      return goingEvents;
    } else {
      return [];
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style = {{paddingTop: 10}}>
          <View style = {{alignItems : 'center', paddingBottom: 10}}>
            <View style={styles.statsView} >
              <Text>Stats here.</Text>
            </View>
          </View>
          <View style = {{alignItems : 'center'}}>
            <View style={styles.distanceView} >
              <Text style={styles.distanceText}>4.8 km</Text>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>Distance Today</Text>
            </View>
          </View>
          <FlatList
          onRefresh={() => this.refreshData()}
          refreshing={this.state.isFetching}
          data={this.filterOutCurrent(this.filterGoing(this.state.account, this.state.eventsArray))}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                style={styles.touchableCompleted}
                onPress={() => this.onPress(item)}>  
                <View style={styles.touchableCompletedTextView}>
                  <Text style={{fontSize : 18, color: 'black'}}>{item.name}</Text>
                  <Text style={{fontSize : 12, color: 'black'}}>{item.time}</Text>
                </View>
                  <Text style={{fontSize : 24, color: 'black'}}>{/*item.distance*/}4.8 km</Text>
              </TouchableOpacity>
            </View> 
          )}
        /> 
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  statsView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 0.95 * Dimensions.get('window').width, 
    height: 0.4 * Dimensions.get('window').width, 
    backgroundColor: '#f9f9f9',
    alignItems : 'center',
  },
  distanceView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width, 
    height: 0.275 * Dimensions.get('window').width, 
    backgroundColor: '#8ae2ad',
    alignItems : 'flex-start',
    paddingVertical : 10,
    paddingStart : 20
  },
  distanceText: {
    color : 'black',
    fontSize : 40, 
    fontWeight : 'bold', 
  },
  touchableCompleted: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    backgroundColor: 'transparent', 
    paddingStart: 20,
    paddingEnd: 20,
    paddingVertical: 10
  },
  touchableCompletedTextView: {
    flex: 1, 
    flexDirection: 'column', 
    width : Dimensions.get('window').width},  
})

export default PersonalStatsScreen