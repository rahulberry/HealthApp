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
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

import EventsScreen from './EventsDoctor';
import EventInformationScreen from '../PatientNav/EventInformation'

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

const MainNavigator = createStackNavigator(
    {
        Events: {screen: EventsScreen},
        EventsInformation: {screen: EventInformationScreen},
    },
);

const EventNavigator = createAppContainer(MainNavigator);


export class EventNavigatorScreen extends React.Component<Props> {
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

export default EventNavigatorScreen