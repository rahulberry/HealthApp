import React, { Component } from 'react';
import { Alert, AppRegistry, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

export default class SubmitButton extends Component {
    constructor(props) {
        super(props);
        this._onPressButton = this._onPressButton.bind(this);
    }

    _onPressButton() {
        Alert.alert('Feedback submitted successfully');
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this._onPressButton}>
                    <View style={styles.submitbutton}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
         );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 65
    },

    submitbutton: {
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#8ae2ad',
        marginTop: 20,
        width: 184,
        height: 44,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },

    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 5
    }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('SubmitButton', () => SubmitButton);
