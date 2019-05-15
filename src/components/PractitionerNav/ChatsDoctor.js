// ChatsDoctor.js

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
import { GiftedChat } from "react-native-gifted-chat";
import firebase from 'firebase'

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

export class PatientsChatScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'Chat',
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
  state = {
    messages: []
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }
  render() {
    const { navigation } = this.props;
    return (
      <GiftedChat
      messages={this.state.messages}
      onSend={messages => this.onSend(messages)}
      user={{
        _id: 1
      }}
    />
    );
  }
  //componentWillUnmount() {
    //Backend.closeChat();
  //}
}

export default PatientsChatScreen