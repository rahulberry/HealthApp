import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Image,
  Button,
  TextInput
} from "react-native";
import firebase from "firebase";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
} from 'react-navigation';

var name, uid, email;


export default class PatientList extends Component {
  static navigationOptions = ({
    navigation,
  }: {
    navigation: NavigationScreenProp<NavigationState>;
  }) => ({
    title: 'Chats',
    headerStyle: {
      backgroundColor: '#8ae2ad',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24,
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
        name={focused ? 'ios-chat' : 'ios-chat'}
        size={horizontal ? 20 : 26}
        style={{ color: tintColor }}
      />
    ),
  });

  state = {
    name: "",
    uid: null,
    email: "",
    display: ''
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loading: true
    };
    
    this.PatientsRef = firebase.database().ref('/Doctors/' + firebase.auth().currentUser.uid + '/Patients/');
  } 

  listenForItems(PatientsRef) {
    PatientsRef.on("value", snap => {
      // get children as an array
      var items = [];
      snap.forEach(child => {
       // if (child.val().email != user.email)
          items.push({
            name: child.val().name,
            uid: child.val().uid,
            email: child.val().email,
            display: child.val().display_image
          });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        loading: false
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.PatientsRef);
  }

  renderRow = rowData => {
    return (
      <TouchableOpacity
        onPress={() => {
          name = rowData.name;
          email = rowData.email;
          uid = rowData.uid;
          this.props.navigation.navigate("ChatsDoctor", {
            name: name,
            email: email,
            uid: uid, 
          });
        }}
        style={{
          marginBottom: 10,
          borderBottomColor: '#d3d3d3',
          borderBottomWidth: 1,
          borderRadius: 5,
        }}
      >
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: rowData.display
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{rowData.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { navigation } = this.props;
    
    return (
      <SafeAreaView style={styles.container}> 
        <View>
          <Text>
            {this.state.email}
          </Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10
  },
  rightButton: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 10,
    padding: 0
  },
  topGroup: {
    flexDirection: "row",
    margin: 10
  },
  myFriends: {
    flex: 1,
    color: "#3A5BB1",
    //tintColor: "#fff",
    //secondaryColor: '#E9E9E9',
    //grayColor: '#A5A5A5',
    fontSize: 16,
    padding: 5
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 6,
    marginBottom: 10
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginLeft: 6
  },
  profileName: {
    flex: 1,
    textAlign: 'left',
    paddingLeft: 8,
    fontSize: 18
    
  },    
});
