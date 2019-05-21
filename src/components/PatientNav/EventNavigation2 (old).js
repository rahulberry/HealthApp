// EventNavigation2.js

import React from 'react';
import {
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

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

//import EventsReducer from '../../reducers/EventsReducer.js'
import { connect } from 'react-redux';
import { addEvents } from '../../actions';
import { createStore } from 'redux';

//const store = createStore(EventsReducer);
//store.subscribe(() => console.log(store.getState().eventsArray))

import MyEventsScreen from './MyEvents';
import EventsScreen from './Events';

const SimpleTabs = createMaterialTopTabNavigator({
  Personal : MyEventsScreen,
  Group : EventsScreen
},
{
  swipeEnabled: true,
	tabBarPosition: 'top',
	initialRouteName: 'Personal', //Default Tab Location
	tabBarOptions : {
		labelStyle: {
			fontSize: 20,
      fontWeight : "bold",
    },
    indicatorStyle : {
      opacity : 0
    },
    activeTintColor  : "#8ae2ad",
    inactiveTintColor : "grey",
		upperCaseLabel : false,
		showIcon : false,
		style: {
      backgroundColor : "#f9f9f9",
    },
	}
}
);

export class EventNavigation2 extends React.Component<Props> {
  static router = SimpleTabs.router;
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }
  static navigationOptions = {
	title : 'Upcoming Events',
    tabBarLabel: 'Upcoming Events',
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
  render() {
    const { navigation } = this.props;
    const { routes, index } = navigation.state;
    const activeRoute = routes[index];
    let bottom = null;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" />
        <SafeAreaView
          style={{ flex: 1, backgroundColor: '#8ae2ad'}}
          forceInset={{ horizontal: 'always', top: 'always' }}
        >
          <View style={{flex:1, backgroundColor: 'white'}}>
            <SimpleTabs navigation={navigation} />
          </View>
        </SafeAreaView>
        {bottom}
      </View>
    );
  }
}

export default EventNavigation2