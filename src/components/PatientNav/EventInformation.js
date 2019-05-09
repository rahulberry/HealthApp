// Chats.js

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

export class EventInformationScreen extends React.Component<Props> {
  static navigationOptions = {
  title : 'Event Information',
  header : null,
	headerStyle: {
      backgroundColor: '#f4511e',
    },
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
        name={focused ? 'ios-chatboxes' : 'ios-chatboxes'} // Change these to change the icons
        size={horizontal ? 20 : 26}
        style={{ color: tintColor }}
      />
    )
  };
  render() {
    const { navigation } = this.props;
    const test = navigation.getParam('item', {name : 'You should not see this'});
    const title = test.name;
    const time = test.time;
    return (
      <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
        <Text>{title}</Text>
        <Text>{time}</Text>
      </SafeAreaView>
    );
  }
}

export default EventInformationScreen