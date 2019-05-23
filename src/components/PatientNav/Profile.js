// Profiles.js

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
import { Button } from '../commonComponents/ButtonWithMargin';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

class ProfileScreen extends React.Component<Props> {
  static navigationOptions = {
	title : 'Profile',
    tabBarLabel: 'Profile',
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
    )
  };
  render() {
    const { navigation } = this.props;
    return (
      <View forceInset={{ horizontal: 'always', top: 'always' }}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}

const ProfileTopTab = createMaterialTopTabNavigator({
  Home : ProfileScreen,
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

export class ProfileTopBarScreen extends React.Component<Props> {
  static router = ProfileTopTab.router;
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }
  static navigationOptions = {
	title : 'Profile',
    tabBarLabel: 'Profile',
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
        name={focused ? 'ios-person' : 'ios-person'}
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
            <ProfileTopTab navigation={navigation} />
          </View>
        </SafeAreaView>
        {bottom}
      </View>
    );
  }
}

export default ProfileTopBarScreen