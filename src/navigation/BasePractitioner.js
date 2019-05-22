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

import ChatsDoctor from '../components/PractitionerNav/ChatsDoctor';
import ContactList from '../components/PractitionerNav/ContactList';
import GroupsList from '../components/PractitionerNav/GroupsList';
import EventsScreen from '../components/PractitionerNav/EventsDoctor';

const SimpleTabs = createMaterialTopTabNavigator({
  Chats: ContactList,
  Home: GroupsList,
  Events: EventsScreen,
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
  }
  static navigationOptions = {
	title: "Health Practitioner Screen",
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