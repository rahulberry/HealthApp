import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export default class Stats extends Component {

    constructor(props) {
        super(props);

        this.state = {
            statistic: this.props.stats,
        };
    }

    render() {
        return (
            <View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image
                        source={require('./images/shoe.png')}
                        style={styles.shoePicture}
                    /> 
                    <Text
                        style={styles.shoeDescriptorStyle}
                    >
                        Distance covered:
                    </Text>
                    <Text style={styles.dataStyle}> {this.state.statistic} m </Text>
                
                </View>

                <View style={styles.container}>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: 265,
        marginTop: 5,
        marginLeft: 81,
        borderBottomWidth: 1,
        borderColor: '#979797'
    },
    shoeDescriptorStyle: {
        marginTop: 17,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    dataStyle: {
        marginLeft: 'auto',
        marginRight: 15,
        marginTop: 17,
        fontSize: 20,
        fontWeight: 'bold'
    },
    shoePicture: {
        width: 50,
        height: 41,
        marginLeft: 15,
        marginTop: 20
    },
})

AppRegistry.registerComponent('Stats', () => Stats);
 