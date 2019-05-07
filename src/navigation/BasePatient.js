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

import StatsScreen from '../components/PatientNav/Stats';
import EventsScreen from '../components/PatientNav/Events';
import ActivityScreen from '../components/PatientNav/Activities';
import ChatsScreen from '../components/PatientNav/Chats';
import ProfileScreen from '../components/PatientNav/Profile';

const SimpleTabs = createMaterialTopTabNavigator({
  Stats: StatsScreen,
  Events: EventsScreen,
  Home: ActivityScreen,
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
			fontWeight: "bold"
		},
		upperCaseLabel : false,
		showIcon : true,
		style: {
			backgroundColor : "#8ae2ad",
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
    const { navigation } = this.props;
    const { routes, index } = navigation.state;
    const activeRoute = routes[index];
    let bottom = null;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" />
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