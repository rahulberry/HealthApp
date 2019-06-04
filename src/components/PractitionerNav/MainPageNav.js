import React, { Component } from 'react';
import { Animated, Easing, Platform } from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json

import StatsNavigation from '../../components/PatientNav/StatsNavigation'
import statsScreen from './PatientStats'
import GroupList from './GroupsList'
import Ionicons from 'react-native-vector-icons/Ionicons'
//import AddPatient from './AddPatient'

let SlideFromRight = (index, position, width) => {
    const inputRange = [index - 1, index, index + 1];
    const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, 0]
    })
    const slideFromRight = { transform: [{ translateX }] }
    return slideFromRight
};

const TransitionConfiguration = () => {
    return {
        transitionSpec: {
            duration: 200,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: (sceneProps) => {
            const { layout, position, scene } = sceneProps;
            const width = layout.initWidth;
            const { index, route } = scene
            const params = route.params || {}; // <- That's new
            const transition = params.transition || 'default'; // <- That's new
            return {
                default: SlideFromRight(index, position, width),
            }[transition];
        },
    }
}

export default App = createAppContainer(createStackNavigator(
    {
        MainPage: GroupList,
      //  AddPatient: AddPatient,
        StatsNavigation: statsScreen
    },
    {
        initialRouteName: 'MainPage',
        navigationOptions: {
            cardStack: {
                gesturesEnabled: false
            },
            gesturesEnabled: false,
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
                  name={focused ? 'ios-people' : 'ios-people'}
                  size={horizontal ? 20 : 26}
                  style={{ color: tintColor }}
                />
              ),
        },
        gesturesEnabled: false,
        transitionConfig: TransitionConfiguration,
    }
));