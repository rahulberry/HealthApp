import React, { Component } from 'react';
import { FlatList } from 'react-native';
import GroupsItem from './GroupItem';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
} from 'react-navigation';

const data = [
    {
        name: 'React Native Community',
        last_active: '15 days ago',
        members: 'Vicky, Alex Jacob, Bob, William + 320'
    },
    {
        name: 'Android Developers Forum',
        last_active: '30 days ago',
        members: 'Vicky, Alex, Bob, William + 256'
    },
    {
        name: 'iOs Developers',
        last_active: '30 days ago',
        members: 'Tom Jacob, Alex Jacob,Thomas Paul + 400'
    },
    {
        name: 'Buddies',
        last_active: '10 days ago',
        members: 'Vicky, Alex, Bob, William + 356'
    },
    {
        name: 'Birthday Celebration',
        last_active: '5 days ago',
        members: 'Tom Alex, Jacob Samuel, Sam, +12'
    },
    {
        name: 'College Buddies',
        last_active: '24 days ago',
        members: 'Vicky, Alex, Bob, William + 10'
    },
    {
        name: 'Memories',
        last_active: '1 day ago',
        members: 'Tom Manuel, Jacob Augustin,Sam TOny +2'
    },
    {
        name: 'Secret Group',
        last_active: '28 days ago',
        members: 'Tom Alex,Jacob Mathews,Sam Tony'
    }
];
interface Props {
    navigation: NavigationScreenProp<NavigationState>;
  }

export default class GroupsList extends React.Component<Props>{
    renderItem = ({ item }) => {
        return <GroupsItem item={item} navigation={this.props.navigation}  />;
    };
    static navigationOptions = ({
        navigation,
      }: {
        navigation: NavigationScreenProp<NavigationState>;
      }) => ({
        title: 'Groups',
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
      });
    render() {
        return (
          <SafeAreaView>
            <FlatList
                data={data}
                contentContainerStyle={styles.list}
                renderItem={this.renderItem}
                showsVerticalScrollIndicator={false}
            />
          </SafeAreaView>
        );
    }
}
