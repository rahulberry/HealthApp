// ChatsPatient.js
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createMaterialTopTabNavigator,
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
} from 'react-navigation';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import Fire from '../PractitionerNav/Fire';

interface Props {
    name?: 'string',
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

    state = {
        messages: [],
      };

        get user() {
        return {
          name: 'john',
          _id: Fire.shared.uid,
        };
      }
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
      render() {
        const { navigation } = this.props;
        return (
          <GiftedChat messages={this.state.messages}
          onSend={Fire.shared.send}
          user={this.user}
          renderBubble={this.renderBubble}
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

export default ChatsPatientScreen