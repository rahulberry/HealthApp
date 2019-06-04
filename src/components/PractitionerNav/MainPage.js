import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
    NavigationScreenProp,
    NavigationState,
} from 'react-navigation';

import MainPageNav from './MainPageNav'

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

export class MainPage extends React.Component<Props> {
    static navigationOptions = ({
        navigation,
    }: {
        navigation: NavigationScreenProp<NavigationState>;
    }) => ({
        title: "Patients",
        headerStyle: {
            backgroundColor: "#007AFF"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontWeight: "bold"
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
                name={focused ? 'ios-people' : 'ios-people'}
                size={horizontal ? 20 : 26}
                style={{ color: tintColor }}
          />
        )	
    });

    
    render() {
        const { navigation } = this.props; 
        return (
            <MainPageNav />
        );
    }
}

export default MainPage