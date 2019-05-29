import React, { Component } from 'react';
import Slider from "react-native-slider";
import { AppRegistry, StyleSheet, View, Text, Alert, Image } from "react-native";

const GREEN = '#4CD964'
const LIMEGREEN = '#A5EE00'
const YELLOW = '#FAEB00'
const ORANGE = '#FF8000'
const RED = '#FF3B30'

export default class DiscreteSlider extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            sliderValue: 50,
            bgColour: YELLOW,
            image: require('./sliderImages/mild.png')
        });

        this.setBackgroundColor = this.setBackgroundColor.bind(this);
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

    render() {

        return (
            <View style={styles.sliderContainer}>

                <Image
                    source={this.state.image}
                    style={styles.sliderImageStyle}
                />


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
        );
    }
}

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        marginTop: 90,
        marginLeft: 10,
        marginRight: 10,
        width: 250,
        alignSelf: "center",
        justifyContent: "center"
    },
    sliderImageStyle: {
        alignSelf: 'center',
        marginBottom: 5,
        width: 100,
        height: 100
    },
});

AppRegistry.registerComponent('DiscreteSlider', () => DiscreteSlider);