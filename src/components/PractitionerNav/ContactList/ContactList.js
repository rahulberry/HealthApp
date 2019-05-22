import React, { Component } from 'react';
import { FlatList } from 'react-native';
import UserItem from './UserItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    NavigationScreenProp,
    NavigationState,
    SafeAreaView
  } from 'react-navigation';

export default class ContactList extends Component {
    static navigationOptions = {
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
      };

    renderItem = ({ item }) => {
        return <UserItem item={item} navigation={this.props.navigation} />;
    };

    render() {
        return (
            <SafeAreaView>
                <FlatList
                data={users.results}
                renderItem={this.renderItem}
                keyExtractor={item => item.login.uuid}
                />
            </SafeAreaView>
        );
    }
}
