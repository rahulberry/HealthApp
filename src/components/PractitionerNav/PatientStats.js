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
        this.state = {
            account: this.getUser(),
            eventsArray: [],
            isFetching: false,
            day: 27,
            wording: 'Today',
            dataArray: [ 10, 10, 28, 60, 75, 68, 69, 24, 18, 28, 60, 75, 68, 69, 24, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 ],
        };
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


    getUser = () => {
        console.log('User (current screen \'Events\'):', firebase.auth().currentUser.displayName)
        return firebase.auth().currentUser.displayName;
    }

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
