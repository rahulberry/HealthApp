// Stats.js

import React from 'react';
import {
    LayoutAnimation,
    StatusBar,
    StyleSheet,
    ScrollView,
    Text,
    Dimensions,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    createMaterialTopTabNavigator,
    NavigationScreenProp,
    NavigationState,
    SafeAreaView,
} from 'react-navigation';

import firebase from "firebase";
import Fire from '../../components/PractitionerNav/Fire';

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

import ActivityGraph from '../../components/PatientNav/ActivityGraph'
import PainGraph from '../../components/PatientNav/PainGraph'


export class statsScreen extends React.Component<Props> {
    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    };

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            account: navigation.getParam('name', 'shiet'),
            eventsArray: [],
            isFetching: false,
            day: 27,
            wording: 'Today',
            dataArray: [ 10, 10, 28, 60, 75, 68, 69, 24, 18, 28, 60, 75, 68, 69, 24, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 ],
        };
        this.readEventData();
    };


    static navigationOptions = {
	      title : 'Stats',
        tabBarLabel: 'Stats',
        headerStyle: {
            backgroundColor: '#8ae2ad',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
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
                name={focused ? 'ios-stats' : 'ios-stats'}
                size={horizontal ? 20 : 26}
                style={{ color: tintColor }}
            />
        ),
    };

    readEventData() {
        var firebaseRef = firebase.database().ref('Events/events');
        return firebaseRef.once('value')
            .then((dataSnapshot) => {
                console.log('test1', dataSnapshot.val());
                this.setState({ eventsArray: dataSnapshot.val() });
            }
        )
    };


    getUser = () => {
        console.log('User (current screen \'Events\'):', firebase.auth().currentUser.displayName)
        return firebase.auth().currentUser.displayName;
    }

    filterOutCurrent = (data) => {
        if (data != [] && data != null) {
            var currentTime = Math.round((new Date()).getTime() / 1000);
            let filteredItems = data.filter(item => item.key <= currentTime);
            var currentDay = currentTime - (currentTime % 86400);
            currentDay = currentDay - (86400 * (27 - this.state.day))
            var currentTommorrow = currentDay + 86400;
            filteredItems = filteredItems.filter(item => (item.key < currentTommorrow) && (item.key > currentDay))
            return filteredItems.reverse();
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
                map.set(item.key, true);        // set any value to Map
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

    myCallback = (dataFromChild) => {

      var firebaseRef = firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats/');
      firebaseRef.once('value')
        .then((dataSnapshot) => {

          this.setState({
                            dataArray: dataSnapshot.val().distanceArray,
                        });
        }
      )

        const { navigation } = this.props;
        const uid = navigation.getParam('uid', 69)


        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear();

        if ((this.state.day > dataFromChild) || (this.state.day < dataFromChild)){
          this.setState({ day: dataFromChild })
          if (dataFromChild == 27){
              this.setState({ wording: 'Today' })
          }
          else if (dataFromChild == 26) {
              this.setState({ wording: 'Yesterday' })
          }

          else {
            var x = 27 - dataFromChild;
            var temp_date = 0
            var temp_month = 0
            if (date <= x){
              temp_date = 31 - (x - date);
              temp_month = month - 1;
            }
            else {
              temp_date = date - x;
              temp_month = month;
            }
            var fulldate = ('on ' + temp_date + '/' + temp_month + '/' + year)
            this.setState({ wording: fulldate })
          }
        }
    };

    render() {
        let bottom = null;
        const { navigation } = this.props;
        const itemname = navigation.getParam('name', 'shiet')
        const uid = navigation.getParam('uid', 69)


        return (
          <ScrollView>
              <View>
                  <View>
                      <View style={styles.subTitleView} >
                        <Text style={styles.distanceText}> {itemname}</Text>
                      </View>
                  </View>
                  <View>
                      <PainGraph id = {uid} callbackFromParent={this.myCallback} currentday = {this.state.day}/>
                      { this.myCallback() }
                  </View>
                  <View>
                      <View style={styles.distanceView} >
                          <Text style={styles.distanceText}>{this.state.dataArray[this.state.day]} km</Text>
                          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>Distance {this.props.name} {this.state.wording}</Text>
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
                                  <Text style={{fontSize : 24, color: 'black'}}>{/*item.distance*/} </Text>
                          </TouchableOpacity>
                      </View>
                  )}
              />
              </View>
          </ScrollView>
          );
      }
};

const styles = StyleSheet.create({
    subTitleView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        height: 0.18 * Dimensions.get('window').width,
        backgroundColor: '#8ae2ad',
        alignItems : 'flex-start',
        paddingVertical : 10,
        paddingStart : 20
    },
    statsView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width,
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

export default statsScreen
