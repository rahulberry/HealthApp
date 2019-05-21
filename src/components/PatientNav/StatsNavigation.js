// StatsNavigation.js

import React from 'react';
import {
  createStackNavigator, 
  createAppContainer
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EventInformationScreen from './EventInformation'
import StatsScreen1 from './Stats1' 

const MainNavigator = createStackNavigator(
  {
    Stats: {screen: StatsScreen1},
    EventsInformation: {screen: EventInformationScreen},
  },
  {
    headerMode: 'none'
  }
);

const EventNavigator = createAppContainer(MainNavigator);

export class StatsNavigation extends React.Component<Props> {
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
          style={{ color: tintColor }} />
      ),
    };
    render() {
      return <EventNavigator />;    
    }
  }

export default StatsNavigation;