import React, { Component } from 'react';
import { Alert, AppRegistry, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

export default class StartButton extends Component {
    constructor(props) {
        super(props);
        this.state = { activityStarted: false };
        this._onPressButton = this._onPressButton.bind(this);
    }

    _onPressButton() {

        this.setState(previousState => (
            { activityStarted: !previousState.activityStarted }
        ))
    }
    
    render() {
        if (!this.state.activityStarted) {
            return (
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={this._onPressButton}>
                        <View style={styles.startActivitybutton}>
                            <Text style={styles.buttonText}>Start Activity</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );
        }

        else {
            return (
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={this._onPressButton}>
                        <View style={styles.endActivitybutton}>
                            <Text style={styles.buttonText}>End Activity</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );
        }

    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        alignItems: 'center'
    },

    startActivitybutton: {
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#8ae2ad',
        marginBottom: 30,
        width: 200,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },

    endActivitybutton: {
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#c60b0b',
        marginBottom: 30,
        width: 200,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },

    buttonText: {
        padding: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('StartButton', () => StartButton);
