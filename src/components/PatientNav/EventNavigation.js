import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';


import {createStackNavigator, createAppContainer} from 'react-navigation';

import EventInformationScreen from './EventInformation'
import EventsScreen from './Events' 

const MainNavigator = createStackNavigator(
  {
    Events: {screen: EventsScreen},
    EventsInformation: {screen: EventInformationScreen},
  },
  {
    headerMode: 'none'
  }
);

const EventNavigator = createAppContainer(MainNavigator);

export class EventNavigation extends React.Component<Props> {
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

export default EventNavigation;