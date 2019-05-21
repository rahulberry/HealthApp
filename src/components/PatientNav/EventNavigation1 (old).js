// EventNavigation.js

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
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

//import EventNavigation from './EventNavigation';

//////////////////////////////////////////////////////////

//import EventsNavigation2 from './EventNavigation2'

//#######################################################

import MyEventsScreen from './MyEvents';
import EventsScreen from './Events';

const SimpleTabs1 = createMaterialTopTabNavigator({
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

class EventsNavigation2 extends React.Component<Props> {
  static router = SimpleTabs1.router;
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
            <SimpleTabs1 navigation={navigation} />
          </View>
        </SafeAreaView>
        {bottom}
      </View>
    );
  }
}


//######################################################

import EventInformationScreen from './EventInformation'

const MainNavigator = createStackNavigator(
  {
    Events: {screen: EventsNavigation2},
    EventsInformation: {screen: EventInformationScreen},
  },
  {
    headerMode: 'none'
  }
);

const EventNavigator = createAppContainer(MainNavigator);


class EventNavigation extends React.Component<Props> {
  static navigationOptions = {
    title : 'Events',
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
          style={{ color: tintColor }} />
      ),
    };
    render() {
      return <EventNavigator />;    
    }
  }

////////////////////////////////////////////////////////////


const SimpleTabs = createMaterialTopTabNavigator({
  Home : EventNavigation,
},
{
  swipeEnabled: false,
	tabBarPosition: 'top',
	initialRouteName: 'Home', //Default Tab Location
	tabBarOptions : {
		labelStyle: {
			fontSize: 28,
      fontWeight : "bold",
    },
    indicatorStyle : {
      opacity : 0
    },
    activeTintColor  : "white",
    inactiveTintColor : "grey",
		upperCaseLabel : false,
		showIcon : false,
		style: {
      backgroundColor : "#8ae2ad",
    },
	}
}
);

export class EventNavigation1 extends React.Component<Props> {
  static router = SimpleTabs.router;
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }
  static navigationOptions = {
	title : 'Events',
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

export default EventNavigation1