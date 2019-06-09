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



    render() {
        let bottom = null;
        const { navigation } = this.props;
        const itemname = navigation.getParam('name', 'shiet')

        return (
          <ScrollView>
              <View>
                  <View>
                      <View style={styles.subTitleView} >
                        <Text style={styles.distanceText}> {itemname}</Text>
                      </View>
                  </View>
                  <View>
                      <PainGraph id = 'Graphdata' />
                  </View>
                  <View>
                      <View style={styles.distanceView} >
                          <Text style={styles.distanceText}> 4.8 km</Text>
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
