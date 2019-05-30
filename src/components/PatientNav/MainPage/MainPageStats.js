import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export default class MainPageStats extends Component {

    render() {
        return (
            <View style={{marginTop: 15}}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image
                        source={this.props.icon}
                        style={this.props.iconStyle}
                    /> 
                    <Text
                        style={styles.DescriptorStyle}
                    >
                        {this.props.dataContext}
                    </Text>
                    <Text style={styles.dataStyle}> {this.props.data} {this.props.metric} </Text>
                
                </View>

                <View style={this.props.showBorder ? [styles.container, styles.borderStyle] : styles.container}>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: 265,
        marginLeft: 77,
    },
    borderStyle: {
        borderColor: '#979797',
        borderBottomWidth: 1,
    },

    DescriptorStyle: {
        marginTop: 5,
        marginBottom: 20,
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    dataStyle: {
        marginLeft: 'auto',
        marginRight: 15,
        marginTop: 5,
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 'bold'
    },
})

AppRegistry.registerComponent('MainPageStats', () => MainPageStats);
 