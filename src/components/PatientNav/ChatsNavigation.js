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

import ChatsPatientScreen from './ChatsPatient';
import ChatsDoctorScreen from './ChatsDoctor';
import EventInformationScreen from './EventInformation'

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const DoctorPatientChatTabs = createMaterialTopTabNavigator({
  Personal : ChatsPatientScreen,
  Group : ChatsDoctorScreen
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

class DoctorPatientScreen extends React.Component<Props> {
  static router = DoctorPatientChatTabs.router;
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }
  static navigationOptions = {
	title : 'Chats',
    tabBarLabel: 'Chats',
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
            <DoctorPatientChatTabs navigation={navigation} />
          </View>
        </SafeAreaView>
        {bottom}
      </View>
    );
  }
}


const ChatsTopTab = createMaterialTopTabNavigator({
  Home : DoctorPatientScreen,
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

export class ChatsTopBarScreen extends React.Component<Props> {
  static router = ChatsTopTab.router;
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }
  static navigationOptions = {
	title : 'Chats',
    tabBarLabel: 'Chats',
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
        name={focused ? 'ios-chatboxes' : 'ios-chatboxes'}
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
        <View
          style={{ flex: 1, backgroundColor: '#8ae2ad'}}
          forceInset={{ horizontal: 'always', top: 'always' }}
        >
          <View style={{flex:1, backgroundColor: 'white'}}>
            <ChatsTopTab navigation={navigation} />
          </View>
        </View>
        {bottom}
      </View>
    );
  }
}

export default ChatsTopBarScreen