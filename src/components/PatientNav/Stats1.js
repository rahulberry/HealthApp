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

import statsScreen from './Stats';

const SimpleTabs = createMaterialTopTabNavigator({
    Home : statsScreen,
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

export class statsScreen1 extends React.Component<Props> {
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
                    style={{ flex: 1, backgroundColor: '#8ae2ad'}}
                    forceInset={{ horizontal: 'always', top: 'always' }}
                >
                    <View style={{flex:1, backgroundColor: 'white'}}>
                        <SimpleTabs navigation={navigation} />
                    </View>
                </SafeAreaView>
                {bottom}
            </View>
        );
    }
}

export default statsScreen1