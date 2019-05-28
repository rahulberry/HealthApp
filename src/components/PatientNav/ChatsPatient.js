// ChatsPatient.js

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

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

export class ChatsPatientScreen extends React.Component<Props> {
    static navigationOptions = {
	title : 'My Group',
	headerStyle: {
            backgroundColor: '#f4511e',
        },
        tabBarLabel: 'My Group',
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
                name={focused ? 'ios-chatboxes' : 'ios-chatboxes'} // Change these to change the icons
                size={horizontal ? 20 : 26}
                style={{ color: tintColor }}
            />
        )
    };
    render() {
        const { navigation } = this.props;
        return (
            <View forceInset={{ horizontal: 'always', top: 'always' }}>
                <Text>Group Chat Screen</Text>
            </View>
        );
    }
}

export default ChatsPatientScreen