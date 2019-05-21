// Home.js

import React from 'react';
import {
  LayoutAnimation,
  StatusBar,
  View,
} from 'react-native';
import {
  createMaterialTopTabNavigator,
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

import EventNavigation from '../components/PatientNav/EventNavigation'; //The thing that is actually imported is EventTopBarScreen
import ActivityScreen1 from '../components/PatientNav/Activities1';
import ChatsScreen from '../components/PatientNav/Chats';
import ProfileScreen from '../components/PatientNav/Profile';
import StatsNavigation from '../components/PatientNav/StatsNavigation';

const SimpleTabs = createMaterialTopTabNavigator({
  Stats: StatsNavigation,
  Events: EventNavigation,
  Home: ActivityScreen1,
  Chats: ChatsScreen,
  Profile: ProfileScreen
},
{
  swipeEnabled: true,
	tabBarPosition: 'bottom',
	initialRouteName: 'Home', //Default Tab Location
	tabBarOptions : {
		labelStyle: {
			fontSize: 11,
      fontWeight: "bold",
    },
    indicatorStyle: {
      opacity: 0
    },
    activeTintColor  : "#8ae2ad",
    inactiveTintColor : "grey",
		upperCaseLabel : false,
		showIcon : true,
		style: {
			backgroundColor : "#f9f9f9",
		}
	}
},
);

class TabNavigator extends React.Component<Props> {
  static router = SimpleTabs.router;
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }
  static navigationOptions = {
	title: "Patient Screen",
    headerStyle: {
      backgroundColor: "#8ae2ad"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },
  };
  render() {
    console.disableYellowBox = true;

    const { navigation } = this.props;
    const { routes, index } = navigation.state;
    const activeRoute = routes[index];
    let bottom = null;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar 
          barStyle="default" 
          backgroundColor="#7ccc9c" />
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#8ae2ad"}}
          forceInset={{ horizontal: 'always', top: 'never' }}
        >
          <View style={{flex:1, backgroundColor:'#fff'}}> 
          <SimpleTabs navigation={navigation} />

          </View>
        </SafeAreaView>
        {bottom}
      </View>
    );
  }
}

export default TabNavigator;