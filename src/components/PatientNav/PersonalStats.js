// PersonalStats.js
import firebase from "firebase";
import React from 'react';
import {
  LayoutAnimation,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createMaterialTopTabNavigator,
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
} from 'react-navigation';
import { Button } from '../commonComponents/ButtonWithMargin';

import ActivityGraph from './ActivityGraph'

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
  render() {
    if (firebase.auth().currentUser){
        test = "How";
    } else {
        test = "No one home";
    }
    const { navigation } = this.props;
    return (
      <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
        <Text>Personal Stats Screen {test}</Text>
        <ActivityGraph/>
      </SafeAreaView>
    );
  }
}

export default PersonalStatsScreen
