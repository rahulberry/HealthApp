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

var data = [
  
];
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
      loading: true
    };

    this.PatientsRef = firebase.database().ref('/Doctors/' + firebase.auth().currentUser.uid + '/Patients/')

    this.listenForItems(this.PatientsRef);
    console.log(this.PatientsRef);

  }

  listenForItems(PatientsRef) {
    PatientsRef.once("value", snap => {
      // get children as an array
      var items = [];
      snap.forEach(child => {
       // if (child.val().email != user.email)
          data.push({
            name: child.val().name,
          });
      });
      console.log(items)
    });
  }
  componentDidMount() {
    this.listenForItems(this.PatientsRef);
  }
  
    renderItem = ({ item }) => {
        return <GroupsItem item={item} navigation={this.props.navigation}  />;
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
                data={data}
                contentContainerStyle={styles.list}
                renderItem={this.renderItem}
                showsVerticalScrollIndicator={false}
            />
          </SafeAreaView>
        );
    }
}
