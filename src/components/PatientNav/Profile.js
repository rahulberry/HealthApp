// Profiles.js

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

import { Button } from '../commonComponents/ButtonWithMargin';
import Profile from './Profile/Profile'

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

export class ProfileScreen extends React.Component<Props> {
    static navigationOptions = {
	title : 'Profile',
        tabBarLabel: 'Profile',
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
                name={focused ? 'ios-person' : 'ios-person'} // Change these to change the icons
                size={horizontal ? 20 : 26}
                style={{ color: tintColor }}
            />
        )
    };
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
                <Profile />
            </SafeAreaView>
        );
    }
}

export default ProfileScreen