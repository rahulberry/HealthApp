import React, { Component } from 'react';
import Slider from "react-native-slider";
import { AppRegistry, StyleSheet, View, Text, Alert, Image } from "react-native";

const LIMEGREEN = '#A5EE00'
const YELLOW = '#FAEB00'
const ORANGE = '#FF8000'
const RED = '#FF3B30'

export default class DiscreteSlider extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            sliderValue: 1,
            bgColour: LIMEGREEN,
            image: require('./sliderImages/none.png')
        });

        this.setBackgroundColor = this.setBackgroundColor.bind(this);
    }

    setBackgroundColor = (value) => {
        switch (value) {
            case 1:
                this.setState({
                    sliderValue: value,
                    bgColour: LIMEGREEN,
                    image: require('./sliderImages/none.png')
                });
                break;
            case 2:
                this.setState({
                    sliderValue: value,
                    bgColour: LIMEGREEN,
                    image: require('./sliderImages/slight.png')
                });
                break;
            case 3:
                this.setState({
                    sliderValue: value,
                    bgColour: YELLOW,
                    image: require('./sliderImages/mild.png')
                });
                break;
            case 4:
                this.setState({
                    sliderValue: value,
                    bgColour: ORANGE,
                    image: require('./sliderImages/painful.png')
                });
                break;
            case 5:
                this.setState({
                    sliderValue: value,
                    bgColour: RED,
                    image: require('./sliderImages/intense.png')
                });
                break;
        }        
    }

    render() {

        return (
            <View style={styles.container}>

                <Image
                    source={this.state.image}
                    style={styles.imageStyle}
                />


                <Slider
                    value={this.state.sliderValue}
                    minimumValue={1}
                    maximumValue={5}
                    trackStyle={{ height: 15, borderRadius: 100 }}
                    thumbStyle={{ width: 30, height: 30, borderRadius: 100, backgroundColor: '#eaeaea' }}
                    minimumTrackTintColor={this.state.bgColour}
                    onValueChange={value => this.setBackgroundColor(value)}
                    step={1}
                />

                <Image
                    source={require('./sliderImages/progressNotch.png')}
                    style={styles.progressNotch}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 90,
        marginLeft: 10,
        marginRight: 10,
        width: 250,
        alignSelf: "center",
        justifyContent: "center"
    },
    imageStyle: {
        alignSelf: 'center',
        marginBottom: 5,
        width: 100,
        height: 100
    },
    progressNotch: {
        alignSelf: 'center',
        width: 230,
        height: 7
    }
});

AppRegistry.registerComponent('DiscreteSlider', () => DiscreteSlider);