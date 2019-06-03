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
import firebase from 'firebase';

/*var data = [
    {
      name: 'test'
    },
    {
      name: 'test'
    },
    {
      name: 'test'
    },
    {
      name: 'test'
    },
    {
      name: 'test'
    },
    {
      name: 'test'
    },
    {
      name: 'test'
    },
    {
      name: 'test'
    },
    {
      name: 'test'
    },
    {
      name: 'test'
    },
  ];*/

var name, members, last_active
interface Props {
    navigation: NavigationScreenProp<NavigationState>;
  }


export default class GroupsList extends React.Component<Props>{
  
 state = {
    name: "",
    last_active: "",
    members: ""
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      selected: (new Map(): Map<string, boolean>)
  };
}

  listenForItems() {
    firebase.database().ref('/Doctors/' + firebase.auth().currentUser.uid + '/Patients/')
    .once("value", snap => {
      var items = [];
      // get children as an array
      snap.forEach(child => {
       // if (child.val().email != user.email)
          items.push({
            name: child.val().name,
            display_image: child.val().display_image
          });
      });
      items.push({
        name: 'Add Patient',
        display_image: 'https://cdn4.iconfinder.com/data/icons/avatars-circle-2/72/142-512.png'
      })
      this.setState({
        data: items,
        loading: false
      });
    });
  }
  componentDidMount() {
    this.listenForItems();
  }
  
    renderItem = ({ item }) => {
        return <GroupsItem 
        item={item} navigation={this.props.navigation} 
        id={item.name}   
        selected={!!this.state.selected.get(item.id)}
        />;
    };
    static navigationOptions = ({
        navigation,
      }: {
        navigation: NavigationScreenProp<NavigationState>;
      }) => ({
        title: 'Patients',
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
                data={this.state.data}
                contentContainerStyle={styles.list}
                renderItem={this.renderItem}
                keyExtractor={item=>item.name}
                showsVerticalScrollIndicator={false}
            />
          </SafeAreaView>
        );
    }
}
