import React, { Component } from 'react';
import { Animated, Easing, Platform } from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json

import ChatsDoctor from './ChatsDoctor'
import PatientList from './PatientList'

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
        PatientList: PatientList,
        ChatsDoctor: ChatsDoctor,
    },
    {
        initialRouteName: 'PatientList',
        navigationOptions: {
            title: 'Chat',
            headerStyle: {
              backgroundColor: '#8ae2ad',
            },
            headerTintColor: '#8ae2ad',
            headerTitleStyle: {
              fontWeight: 'bold',
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
                name={focused ? 'ios-chatboxes' : 'ios-chatboxes'}
                size={horizontal ? 20 : 26}
                style={{ color: tintColor }}
              />
            ),
            cardStack: {
                gesturesEnabled: false
            },
            gesturesEnabled: false
        },
        gesturesEnabled: false,
        transitionConfig: TransitionConfiguration,
    }
));