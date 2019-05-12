// EventsInformation.js

import React from 'react';
import {
  FlatList,
  Text,
  View,
  ScrollView,
  Dimensions,
  StyleSheet
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
          <Text style={styles.title} >{title}</Text>
          <Text style={styles.timeHeader}>Time and Date:</Text>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.locationHeader}>Location: </Text>
          <View style = {{alignItems : 'center'}}>
            <View style={styles.locationView} >
              <Text>Map view here</Text>
            </View>
          </View>
          <Text style={styles.goingHeader}>Going: </Text>
          <FlatList
            data={going}
            renderItem={({item}) => (
              <View style={styles.goingListItem}>
                <Text style={styles.goingListItem1}>{item}</Text>
              </View> )} />
        </View>
        <Button
          onPress={() => goBack()}
          title="Back"/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize : 40, 
    fontWeight : 'bold', 
    padding : 20, 
    backgroundColor : '#f9f9f9' 
  },
  timeHeader: {
    fontSize : 28, 
    fontWeight : 'bold', 
    paddingLeft : 20 
  },
  time: {
    fontSize : 24, 
    paddingLeft : 20 
  },
  locationHeader: {
    fontSize : 28, 
    fontWeight : 'bold', 
    paddingTop : 20,  
    paddingLeft : 20 
  },
  locationView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 0.8 * Dimensions.get('window').width, 
    height: 0.8 * Dimensions.get('window').width, 
    backgroundColor: 'skyblue',
    alignItems : 'center'
  },
  goingHeader: {
    fontSize : 28, 
    fontWeight : 'bold', 
    paddingTop : 20, 
    paddingLeft : 20
  },
  goingListItem: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  goingListItem1: {
    fontSize : 24, 
    paddingLeft : 20
  }
})

export default EventInformationScreen