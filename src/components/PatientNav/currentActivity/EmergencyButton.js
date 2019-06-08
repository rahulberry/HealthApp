import React, { Component } from 'react'
import { AppRegistry, Alert, Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'

import call from 'react-native-phone-call'

const args = {
    number: '999',
    prompt: false
}

export default class EmergencyButton extends Component {

    showAlert() {
        Alert.alert(
            "Call 999",
            "",
            [
                { text: "Cancel", onPress: () => console.log("Cancelled emergency alert") },
                { text: "Call", onPress: () => call(args).catch(console.error) }
            ],
        );
    }

    render() {
        return (
            
            <TouchableOpacity onPress={this.showAlert} style={styles.button}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={require('./emergencyImage/telephone.png')}
                        style={{width: 15, height: 16, marginTop: 4, marginRight: 5}}
                    />
                    <Text style={{ color: '#E47777', fontSize: 17, fontWeight: 'bold' }}>999</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff',
        width: 65,
        height: 28,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        //marginLeft: 'auto',
        marginLeft: 20,
        marginRight: 20,
        //marginTop: 0,
        marginTop: 20,
        marginBottom: 20
    }
})

AppRegistry.registerComponent('EmergencyButton', () => EmergencyButton)

