// ChatsDoctor.js

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  NavigationScreenProp,
  NavigationState,
  SafeAreaView
} from 'react-navigation';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import Fire from './Fire';

interface Props {
  name?: 'string',
  navigation: NavigationScreenProp<NavigationState>;
}

export class ChatsDoctor extends React.Component<Props> {
 
  renderBubble (props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#8ae2ad'
          }
        }}
      />
    )
  }

  static navigationOptions = {
    title: 'Chat',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
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
  state = {
    messages: [],
  };

  get user() {
    return {
      name: 'john',
      _id: Fire.shared.uid,
    };
  }

  render() {
    return (
          <GiftedChat
          renderBubble={this.renderBubble}
          messages={this.state.messages}
          onSend={Fire.shared.send}
          user={this.user}
        />
    );
  }

  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
}


export default ChatsDoctor