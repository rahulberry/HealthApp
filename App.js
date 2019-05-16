import React, { Component } from "react";
import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from "redux";
import reducers from "./src/reducers";
import firebase from "firebase";
import ReduxThunk from "redux-thunk";
import  AppNavigator  from "./src/navigation/AppNavigator";

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {
  componentWillMount() {
    /*var config = {
      apiKey: "AIzaSyBFyNmEephAMQy6v-4-U_w7WNnXzgHdyws",
      authDomain: "healthapp-e61b2.firebaseapp.com",
      databaseURL: "https://healthapp-e61b2.firebaseio.com",
      projectId: "healthapp-e61b2",
      storageBucket: "healthapp-e61b2.appspot.com",
      messagingSenderId: "613572931536"
    };
    firebase.initializeApp(config);*/
    
  state = {
    isReady: false
  };
}

  render() {

    return (
      <Provider store={store}>
        <AppNavigator  />
      </Provider>
    );
  }
}

export default App; 
