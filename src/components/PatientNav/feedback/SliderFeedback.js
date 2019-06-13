import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableWithoutFeedback, Alert, ScrollView } from 'react-native';
import { Image } from 'react-native-elements';

import SubmitButton from './SubmitButton'
import Slider from "react-native-slider";

import firebase from 'firebase'

import { Header } from '../Header'

const GREEN = '#4CD964'
const LIMEGREEN = '#A5EE00'
const YELLOW = '#FAEB00'
const ORANGE = '#FF8000'
const RED = '#FF3B30'

export default class SliderFeedback extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            completedActivity: false,
            legPain: false,
            chestPain: false,
            fatigue: false,

            sliderValue: 50,
            bgColour: YELLOW,
            image: require('./sliderImages/mild.png'),

            eventCounter: 0,
            timestamp: "0",

            lastupdate: 0,
            dataArray: [0],

        };

        this._onPressButton = this._onPressButton.bind(this);
        this.setBackgroundColor = this.setBackgroundColor.bind(this);
    }

    checkReason = (reason) => {
        switch (reason) {
            case 'legPain':
                this.setState(previousState => (
                    { legPain: !previousState.legPain }
                ))
                break;

            case 'chestPain':
                this.setState(previousState => (
                    { chestPain: !previousState.chestPain }
                ))
                break;

            case 'fatigue':
                this.setState(previousState => (
                    { fatigue: !previousState.fatigue }
                ))
                break;

            case 'completedActivity':
                this.setState(previousState => (
                    { completedActivity: !previousState.completedActivity }
                ))
        }
    }

    setBackgroundColor = (value) => {
        if (value >= 0 && value < 20) {
            this.setState({
                sliderValue: value,
                bgColour: GREEN,
                image: require('./sliderImages/none.png')
            });
        }
        else if (value >= 20 && value < 40) {
            this.setState({
                sliderValue: value,
                bgColour: LIMEGREEN,
                image: require('./sliderImages/slight.png')
            });
        }
        else if (value >= 40 && value < 60) {
            this.setState({
                sliderValue: value,
                bgColour: YELLOW,
                image: require('./sliderImages/mild.png')
            });
        }
        else if (value >= 60 && value < 80) {
            this.setState({
                sliderValue: value,
                bgColour: ORANGE,
                image: require('./sliderImages/painful.png')
            });
        }
        else if (value >= 80 && value <= 100) {
            this.setState({
                sliderValue: value,
                bgColour: RED,
                image: require('./sliderImages/intense.png')
            });
        }
    }


    _onPressButton() {
        Alert.alert('Feedback submitted successfully');

        let completedActivity = this.state.completedActivity;
        let legPain = this.state.legPain;
        let chestPain = this.state.chestPain;
        let fatigue = this.state.fatigue;
        let painIntensity = Math.floor(this.state.sliderValue);

        let counter = 0;


        //Updating arrays
        var currentTime = Math.round((new Date()).getTime() / 1000);
        var currentDay = currentTime - (currentTime % 86400);

        var firebaseRef = firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats/');
        firebaseRef.once('value')
          .then((dataSnapshot) => {

            this.setState({
                              dataArray: dataSnapshot.val().painArray,
                              lastupdate: dataSnapshot.val().lastupdate,
                          });
          }
        ).then( () => {
              var lastchange = this.state.lastupdate;
              var newpain = this.state.dataArray;
              var dayspassed = (currentDay - lastchange)/86400;

              newpain.splice(0,dayspassed);
              for (i = 0; i < dayspassed; i++) {
                newpain.push(dayspassed);
              }

              if (newpain[27] < painIntensity){
                newpain[27] = painIntensity;
              }

              firebase.database().ref("/Patients/" + firebase.auth().currentUser.uid + "/Stats/")
                .update({
                    'painArray': newpain,
                    'lastupdate': currentDay,
                });
          }
        )


        //finish updating arrays

        firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats/eventCounter').once('value', (snapshot) => {
            counter = snapshot.val();

            firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Stats/Event0' + counter + '/timestamp').once('value', (snapshot) => {
                let timestamp = snapshot.val();
                firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Feedback/Event' + counter).set({
                    completedActivity,
                    legPain,
                    chestPain,
                    fatigue,
                    painIntensity,
                    timestamp,
                }).then((data) => {
                }).catch((error) => {
                    //error callback
                })
            })

        })

        Alert.alert(
            'Feedback successfully submitted',
            '',
            [
                { text: 'OK', onPress: () => this.props.navigation.navigate('MainActivityPage') },
            ],
            { cancelable: false },
        );
    }

    render() {
        return (
            <View>
                <Header title='Feedback' emergencyButton={true} />
            <ScrollView style={{marginBottom: 75}}>
                <Text style={styles.questionStyle}> Why did you end the activity? </Text>
                <Text style={styles.selectStyle}> Select all that apply </Text>

                <TouchableWithoutFeedback onPress={this.checkReason.bind(this, 'legPain')}>
                    <View style={this.state.legPain ? styles.selectedButton : styles.unselectedButton}>
                        <Image
                            style={styles.checkStyle}
                            source={this.state.legPain ? require('./images/tickedCheckBox.png') : require('./images/emptyCheckBox.png')}
                        />
                        <Text style={styles.buttonText}>
                            Felt pain in legs
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.checkReason.bind(this, 'chestPain')}>
                    <View style={this.state.chestPain ? styles.selectedButton : styles.unselectedButton}>
                        <Image
                            style={styles.checkStyle}
                            source={this.state.chestPain ? require('./images/tickedCheckBox.png') : require('./images/emptyCheckBox.png')}
                        />
                        <Text style={styles.buttonText}>
                            Felt pain in chest
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.checkReason.bind(this, 'fatigue')}>
                    <View style={this.state.fatigue ? styles.selectedButton : styles.unselectedButton}>
                        <Image
                            style={styles.checkStyle}
                            source={this.state.fatigue ? require('./images/tickedCheckBox.png') : require('./images/emptyCheckBox.png')}
                        />
                        <Text style={styles.buttonText}>
                            Out of breath / tired
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.checkReason.bind(this, 'completedActivity')}>
                    <View style={this.state.completedActivity ? styles.selectedButton : styles.unselectedButton}>
                        <Image
                            style={styles.checkStyle}
                            source={this.state.completedActivity ? require('./images/tickedCheckBox.png') : require('./images/emptyCheckBox.png')}
                        />
                        <Text style={styles.buttonText}>
                            Completed the activity
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <Text style={styles.questionStyle}> Rate the pain in your legs: </Text>

                <Image
                    source={this.state.image}
                    style={styles.sliderImageStyle}
                />

                <View style={styles.sliderContainer}>
                    <Slider
                        value={this.state.sliderValue}
                        minimumValue={0}
                        maximumValue={100}
                        trackStyle={{ height: 15, borderRadius: 100 }}
                        thumbStyle={{ width: 30, height: 30, borderRadius: 100, backgroundColor: '#eaeaea' }}
                        minimumTrackTintColor={this.state.bgColour}
                        onValueChange={value => this.setBackgroundColor(value)}
                    />
                </View>

                <View style={styles.submitButtoncontainer}>
                    <TouchableWithoutFeedback onPress={this._onPressButton}>
                        <View style={styles.submitbutton}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        alignItems: 'center'
    },
    questionStyle: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666161'
    },
    selectStyle: {
        marginTop: 5,
        marginLeft: 12,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#666161'
    },
    selectedButton: {
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#8ae2ad',
        marginTop: 10,
        width: 330,
        height: 50,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    unselectedButton: {
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#979797',
        marginTop: 10,
        width: 330,
        height: 50,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    buttonText: {
        padding: 20,
        color: '#666161',
        fontWeight: 'bold',
        fontSize: 15
    },
    checkStyle: {
        width: 20,
        height: 21,
        marginLeft: 15
    },
    painContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 3,
        marginLeft: 30
    },
    painImageStyle: {
        marginTop: 15,
        marginLeft: 1,
        width: 60,
        height: 60,
    },
    painTextStyle: {
        marginTop: 15,
        marginLeft: 2,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666161'
    },
    painButtonselected: {
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#8ae2ad',
        marginTop: 5,
        width: 110,
        height: 130,
    },
    painButtonUnselected: {
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: 'transparent',
        marginTop: 5,
        width: 110,
        height: 130,
    },
    privacyStatement: {
        alignSelf: 'center',
        marginTop: 15,
        fontSize: 13,
        fontWeight: 'bold',
        color: '#666161'
    },

    submitButtoncontainer: {
        alignItems: 'center',
        marginTop: 20,
    },

    submitbutton: {
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#8ae2ad',
        marginTop: 10,
        width: 184,
        height: 44,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },

    submitButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 5
    },

    sliderContainer: {
        flex: 1,
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        width: 250,
        alignSelf: "center",
        //justifyContent: "center"
    },

    sliderImageStyle: {
        alignSelf: 'center',
        marginTop: 20,
        width: 100,
        height: 100
    },

});

AppRegistry.registerComponent('SliderFeedback', () => SliderFeedback);
