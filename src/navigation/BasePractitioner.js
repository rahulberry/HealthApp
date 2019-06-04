// HomeDoctor.js

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

import MainChat from '../components/PractitionerNav/MainChat'
import EventNavigation from '../components/PractitionerNav/EventsDoctor'; //The thing that is actually imported is EventTopBarScreen
import MainPage from '../components/PractitionerNav/MainPage';

const SimpleTabs = createMaterialTopTabNavigator({
  Chat: MainChat,
  Home: MainPage,
  Events: EventNavigation,
  
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
  };
  render() {
    console.disableYellowBox = true;

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