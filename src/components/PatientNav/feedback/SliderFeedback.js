import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native-elements';

import SubmitButton from './SubmitButton'
import Slider from './Slider'

export default class SliderFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reachedTarget: false,
            pain: false,
            chestPain: false,
            fatigue: false,
            intense: false,
            mild: false,
            none: false
        };
    }

    checkReason = (reason) => {
        switch (reason) {
            case 'pain':
                this.setState(previousState => (
                    { pain: !previousState.pain }
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

            case 'reachedTarget':
                this.setState(previousState => (
                    { reachedTarget: !previousState.reachedTarget }
                ))
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.questionStyle}> Why did you end the activity? </Text>
                <Text style={styles.selectStyle}> Select all that apply </Text>

                <TouchableWithoutFeedback onPress={this.checkReason.bind(this, 'pain')}>
                    <View style={this.state.pain ? styles.selectedButton : styles.unselectedButton}>
                        <Image
                            style={styles.checkStyle}
                            source={this.state.pain ? require('./images/tickedCheckBox.png') : require('./images/emptyCheckBox.png')}
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

                <TouchableWithoutFeedback onPress={this.checkReason.bind(this, 'reachedTarget')}>
                    <View style={this.state.reachedTarget ? styles.selectedButton : styles.unselectedButton}>
                        <Image
                            style={styles.checkStyle}
                            source={this.state.reachedTarget ? require('./images/tickedCheckBox.png') : require('./images/emptyCheckBox.png')}
                        />
                        <Text style={styles.buttonText}>
                            Completed the activity
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <Text style={styles.questionStyle}> Rate the pain in your legs: </Text>

                <Slider />

                <SubmitButton />

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
    }

});

AppRegistry.registerComponent('SliderFeedback', () => SliderFeedback);