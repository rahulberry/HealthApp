import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, StyleSheet } from 'react-native';

export default class Stats extends Component {

    constructor(props) {
        super(props);

        this.state = {
            distance: 1.6,
            minutes: 45,
        };
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image
                    source={this.props.isShoe ? require('./images/shoe.jpg') : require('./images/clock.jpg')}
                    style={{ width: 50, height: 50, marginLeft: 15, marginTop: 10 }}
                /> 
                <Text style={styles.descriptorStyle}> {this.props.title} </Text>
                <Text style={styles.dataStyle}> {this.state.distance} {this.props.metric} </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    descriptorStyle: {
        paddingTop: 20,
        marginLeft: 10,
        fontSize: 23,
        fontWeight: 'bold',
    },
    dataStyle: {
        marginLeft: 'auto',
        marginRight: 15,
        marginTop: 20,
        fontSize: 23,
        fontWeight: 'bold'
    }
})

AppRegistry.registerComponent('Stats', () => Stats);
 