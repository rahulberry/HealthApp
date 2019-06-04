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

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

import PersonalStatsScreen from '../PatientNav/PersonalStats';
import GroupStatsScreen from '../PatientNav/GroupStats';

const SimpleTabs = createMaterialTopTabNavigator({
    Personal : PersonalStatsScreen,
    Group : GroupStatsScreen
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
        activeTintColor    : "#8ae2ad",
        inactiveTintColor : "grey",
		upperCaseLabel : false,
		showIcon : false,
		style: {
            backgroundColor : "#f9f9f9",
        },
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
        headerStyle: {
            backgroundColor: '#8ae2ad',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
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
                    <View style={{flex:1, backgroundColor: 'white'}}>
                        <SimpleTabs navigation={navigation} />
                    </View>
                {bottom}
            </View>
        );
    }
}

export default statsScreen