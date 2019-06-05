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

import EventsScreen from './EventsDoctor';
import EventInformationScreen from '../PatientNav/EventInformation'

import { Header } from '../PatientNav/Header'

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}



const GroupPersonalTabs = createMaterialTopTabNavigator({
    //Personal : MyEventsScreen,
    Group : EventsScreen
    },
    {
        swipeEnabled: true,
        tabBarPosition: 'top',
        initialRouteName: 'Group', //Default Tab Location
        tabBarOptions : {
            labelStyle: {
                fontSize: 28,
                fontWeight : "bold",
            },
            indicatorStyle : {
                opacity : 0
            },
            activeTintColor    : "white",
            inactiveTintColor : "grey",
            upperCaseLabel : false,
            showIcon : false,
            style: {
                backgroundColor : "#8ae2ad",
            },
        }
    }
);



class GroupPersonalScreen extends React.Component<Props> {
    static router = GroupPersonalTabs.router;
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
                <View
                    style={{ flex: 1, backgroundColor: '#8ae2ad'}}
                    forceInset={{ horizontal: 'always', top: 'always' }}
                >
                    <View style={{flex:1, backgroundColor: 'white'}}>
                        <GroupPersonalTabs navigation={navigation} />
                    </View>
                </View>
                {bottom}
            </View>
        );
    }
}

/*

const EventsTopTab = createMaterialTopTabNavigator({
    Home : GrouPersonalScreen,
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
        activeTintColor    : "white",
        inactiveTintColor : "grey",
		upperCaseLabel : false,
		showIcon : false,
		style: {
            backgroundColor : "#8ae2ad",
        },
	}
}
);

class EventTopBarScreen extends React.Component<Props> {
    static router = EventsTopTab.router;
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
                        <EventsTopTab navigation={navigation} />
                    </View>
                </SafeAreaView>
                {bottom}
            </View>
        );
    }
}
*/

const MainNavigator = createStackNavigator(
    {
        Events: {screen: GroupPersonalScreen},
        EventsInformation: {screen: EventInformationScreen},
    },
    {
        headerMode: 'none'
    }
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