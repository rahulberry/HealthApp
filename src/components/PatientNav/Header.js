// Import libraries for making a component 
import React from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    Dimensions
} from 'react-native';

import { Button } from '../commonComponents/ButtonWithMargin'

import EmergencyButton from '../PatientNav/currentActivity/EmergencyButton'

// Make a component 
const Header = (props) => {
    if (props.emergencyButton == true) {
        return (
            <View style={styles.headerStyle} >
                {/*<Button
                    onPress={() => goBack(null)}
                title="Back"/>*/}
                <View style ={{width: 105}} />
                <Text style={styles.titleStyle}>
                    {props.title}
                </Text>
                <EmergencyButton />
            </View>
        )
    } else {
        return (
            <View style={styles.headerStyle1} >
                {/*<Button
                    onPress={() => goBack(null)}
                title="Back"/>*/}
                <Text style={styles.titleStyle}>
                    {props.title}
                </Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width, 
        height: 0.15 * Dimensions.get('window').height, 
        backgroundColor: '#8ae2ad',
        alignItems : 'center'
    },
    headerStyle1: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: Dimensions.get('window').width, 
        height: 0.1 * Dimensions.get('window').height, 
        backgroundColor: '#8ae2ad',
        alignItems : 'center'
    },
    titleStyle: {
        marginTop: 35,
        fontSize : 30, 
        fontWeight : 'bold', 
        color: 'white'
    }
});
// Make the component available to other parts of the app 
export { Header };