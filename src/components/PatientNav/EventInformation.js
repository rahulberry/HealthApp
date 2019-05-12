// Chats.js

import React from 'react';
import {
  FlatList,
  Text,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { Button } from '../commonComponents/ButtonWithMargin';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

export class EventInformationScreen extends React.Component<Props> {
  static navigationOptions = {
  title : 'Event Information',
	headerStyle: {
      backgroundColor: '#8ae2ad',
    },
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    const test = navigation.getParam('item', {name : 'You should not see this'});
    const title = test.name;
    const time = test.time;
    const going = test.going;
    const {goBack} = this.props.navigation;
    return (
      <ScrollView>
        <View >
          <Text style={{fontSize : 40, fontWeight : 'bold', padding : 20, backgroundColor : '#f9f9f9' }} >{title}</Text>
          <Text style={{fontSize : 28, fontWeight : 'bold', paddingLeft : 20 }}>Time and Date:</Text>
          <Text style={{fontSize : 24, paddingLeft : 20 }}>{time}</Text>
          <Text style={{fontSize : 28, fontWeight : 'bold', paddingTop : 20,  paddingLeft : 20 }}>Location: </Text>
          <View style = {{alignItems : 'center'}}>
            <View style={{width: 0.8 * Dimensions.get('window').width, height: 0.8 * Dimensions.get('window').width, backgroundColor: 'skyblue'}} >
            <Text>Map view here</Text>
            </View>
          </View>
          <Text style={{fontSize : 28, fontWeight : 'bold', paddingTop : 20, paddingLeft : 20 }}>Going: </Text>
          <FlatList
            data={going}
            renderItem={({item}) => (
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize : 24, paddingLeft : 20}}>{item}</Text>
              </View> )} />
        </View>
        <Button
          onPress={() => goBack()}
          title="Back"/>
      </ScrollView>
    );
  }
}

export default EventInformationScreen