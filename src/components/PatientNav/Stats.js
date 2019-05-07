// Stats.js

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

import PersonalStatsScreen from './PersonalStats';
import GroupStatsScreen from './GroupStats';

const SimpleTabs = createMaterialTopTabNavigator({
  Personal : PersonalStatsScreen,
  Group : GroupStatsScreen
},
{
    swipeEnabled: false,
	tabBarPosition: 'top',
	initialRouteName: 'Personal', //Default Tab Location
	tabBarOptions : {
		labelStyle: {
			fontSize: 14,
			fontWeight : "bold"
		},
		upperCaseLabel : true,
		showIcon : false,
		style: {
			backgroundColor : "#8ae2ad",
		}
	}
}
);

export class statsScreen extends React.Component<Props> {
  static router = SimpleTabs.router;
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }
  static navigationOptions = {
	title : 'Stats',
    tabBarLabel: 'Stats',
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
  render() {
    const { navigation } = this.props;
    const { routes, index } = navigation.state;
    const activeRoute = routes[index];
    let bottom = null;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" />
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ horizontal: 'always', top: 'always' }}
        >
          <SimpleTabs navigation={navigation} />
        </SafeAreaView>
        {bottom}
      </View>
    );
  }
}

export default statsScreen