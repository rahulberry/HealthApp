import React, { Component } from 'react';
import { View, Text, AppRegistry, StyleSheet, Image, Alert } from 'react-native';

import * as Progress from 'react-native-progress';

const DISTANCE_TO_LM1 = 800;
const DISTANCE_TO_LM2 = 600;
const DISTANCE_TO_LM3 = 1800;
const DISTANCE_TO_LM4 = 500;
const DISTANCE_TO_LM5 = 9600;


const isLandmarkReached = {
    reached: require('./Images/landmarks/landmarkReached.png'),
    notReached: require('./Images/landmarks/landmarkNotReached.png')
}

const landmarkImages = {
    fernsehturm: require('./Images/landmarksBerlin/fernsehturm.png'),
    berlinCathedral: require('./Images/landmarksBerlin/berlinCathedral.png'),
    pergamonMuseum: require('./Images/landmarksBerlin/pergamonMuseum.png'),
    reichstag: require('./Images/landmarksBerlin/Reichstag.png'),
    brandenburgGate: require('./Images/landmarksBerlin/brandenburGate.png'),
    berlinBotanicalGarden: require('./Images/landmarksBerlin/berlinBotanicalGarden.png')
}

export default class LandmarksReachedBerlin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progressValue: 0,
            reachedLandmark1: false,
            reachedLandmark2: false,
            reachedLandmark3: false,
            reachedLandmark4: false,
            reachedLandmark5: false,
            distanceToLandmark1: DISTANCE_TO_LM1,
            distanceToLandmark2: DISTANCE_TO_LM2,
            distanceToLandmark3: DISTANCE_TO_LM3,
            distanceToLandmark4: DISTANCE_TO_LM4,
            distanceToLandmark5: DISTANCE_TO_LM5,
            displayDistancetoLandmark1: true,
            displayDistancetoLandmark2: false,
            displayDistancetoLandmark3: false,
            displayDistancetoLandmark4: false,
            displayDistancetoLandmark5: false,
        };

        this.checkLandmarkReached = this.checkLandmarkReached.bind(this);
    }

    checkLandmarkReached = (value) => {

        if (value >= 0 && value < 800) {
            this.setState({
                progressValue: (value) / 4000,
                distanceToLandmark1: 800 - value
            });
        }

        else if (value >= 800 && value < 1400) {
            this.setState({
                reachedLandmark1: true,
                progressValue: 0.2 + ((value - 800) / 3000),
                distanceToLandmark2: 1400 - value,
                displayDistancetoLandmark1: false,
                displayDistancetoLandmark2: true,
                displayDistancetoLandmark3: false,
                displayDistancetoLandmark4: false,
                displayDistancetoLandmark5: false,
            });
        }
        else if (value >= 1400 && value < 3200) {
            this.setState({
                reachedLandmark2: true,
                progressValue: 0.4 + ((value - 1400) / 9000),
                distanceToLandmark3: 3200 - value,
                displayDistancetoLandmark1: false,
                displayDistancetoLandmark2: false,
                displayDistancetoLandmark3: true,
                displayDistancetoLandmark4: false,
                displayDistancetoLandmark5: false,
            });
        }
        else if (value >= 3200 && value < 3700) {
            this.setState({
                reachedLandmark3: true,
                progressValue: 0.6 + ((value - 3200) / 2500),
                distanceToLandmark4: 3700 - value,
                displayDistancetoLandmark1: false,
                displayDistancetoLandmark2: false,
                displayDistancetoLandmark3: false,
                displayDistancetoLandmark4: true,
                displayDistancetoLandmark5: false,
            });
        }
        else if (value >= 3700 && value < 13300) {
            this.setState({
                reachedLandmark4: true,
                progressValue: 0.8 + ((value - 3700) / 48000),
                distanceToLandmark5: 13300 - value,
                displayDistancetoLandmark1: false,
                displayDistancetoLandmark2: false,
                displayDistancetoLandmark3: false,
                displayDistancetoLandmark4: false,
                displayDistancetoLandmark5: true,
            });

        }
        else if (value === 13300) {
            this.setState({
                reachedLandmark5: true,
                progressValue: 1.0,
                displayDistancetoLandmark1: false,
                displayDistancetoLandmark2: false,
                displayDistancetoLandmark3: false,
                displayDistancetoLandmark4: false,
                displayDistancetoLandmark5: false,
            });

        }
    }

    componentWillMount() {
        this.checkLandmarkReached(this.props.progressValue);
    }

    componentWillReceiveProps(newProps) {

        if (newProps.progressValue !== this.state.progressValue) {
            this.checkLandmarkReached(newProps.progressValue);
        }
    }

    render() {
        return (
            <View style={{ marginTop: 210 }}>
                <View style={{ marginLeft: -75 }}>
                    <Progress.Bar
                        progress={this.state.progressValue}
                        borderWidth={2}
                        width={400}
                        color={'#0E5DAC'}
                        borderColor={'#979797'}
                        style={{ transform: [{ rotate: '90deg' }] }}
                    />
                    <Image
                        source={require('./Images/landmarks/landmarkReached.png')}
                        style={[styles.landmarkSpots, { marginTop: -200 }]}
                    />
                    <Image
                        source={this.state.reachedLandmark1 ? isLandmarkReached.reached : isLandmarkReached.notReached}
                        style={[styles.landmarkSpots, { marginTop: -120 }]}
                    />
                    <Image
                        source={this.state.reachedLandmark2 ? isLandmarkReached.reached : isLandmarkReached.notReached}
                        style={[styles.landmarkSpots, { marginTop: -40 }]}
                    />
                    <Image
                        source={this.state.reachedLandmark3 ? isLandmarkReached.reached : isLandmarkReached.notReached}
                        style={[styles.landmarkSpots, { marginTop: 40 }]}
                    />
                    <Image
                        source={this.state.reachedLandmark4 ? isLandmarkReached.reached : isLandmarkReached.notReached}
                        style={[styles.landmarkSpots, { marginTop: 120 }]}
                    />
                    <Image
                        source={this.state.reachedLandmark5 ? isLandmarkReached.reached : isLandmarkReached.notReached}
                        style={[styles.landmarkSpots, { marginTop: 200 }]}
                    />
                </View>

                <Text style={[styles.landmarkText, { marginTop: -205 }]}>Fernsehturm</Text>

                <Image
                    source={landmarkImages.fernsehturm}
                    style={[styles.landmarkIcon, { width: 28, height: 72, marginTop: -220, marginLeft: 50 }]}
                />

                <Text style={[styles.landmarkText, { marginTop: -125 }]}>Berlin Cathedral</Text>
                <Text style={[styles.landmarkSubText, { marginTop: -100 }]}>
                    {this.state.displayDistancetoLandmark1 ? (this.state.distanceToLandmark1).toFixed(0) + " metres to go" : ""}
                </Text>

                <Image
                    source={landmarkImages.berlinCathedral}
                    style={[styles.landmarkIcon, { width: 62, height: 60, marginTop: -135 }]}
                />

                <Text style={[styles.landmarkText, { marginTop: -45 }]}>Pergamon Museum</Text>
                <Text style={[styles.landmarkSubText, { marginTop: -20 }]}>
                    {this.state.displayDistancetoLandmark2 ? this.state.distanceToLandmark2.toFixed(0) + " metres to go" : ""}
                </Text>

                <Image
                    source={landmarkImages.pergamonMuseum}
                    style={[styles.landmarkIcon, { width: 64, height: 54, marginTop: -58 }]}
                />

                <Text style={[styles.landmarkText, { marginTop: 35 }]}>Reichstag</Text>
                <Text style={[styles.landmarkSubText, { marginTop: 60 }]}>
                    {this.state.displayDistancetoLandmark3 ? this.state.distanceToLandmark3.toFixed(0) + " metres to go" : ""}
                </Text>

                <Image
                    source={landmarkImages.reichstag}
                    style={[styles.landmarkIcon, { width: 77, height: 43, marginTop: 25, marginLeft: 25 }]}
                />

                <Text style={[styles.landmarkText, { marginTop: 115 }]}>Brandenburg gate</Text>
                <Text style={[styles.landmarkSubText, { marginTop: 140 }]}>
                    {this.state.displayDistancetoLandmark4 ? this.state.distanceToLandmark4.toFixed(0) + " metres to go" : ""}
                </Text>

                <Image
                    source={landmarkImages.brandenburgGate}
                    style={[styles.landmarkIcon, { width: 68, height: 54, marginTop: 97, marginLeft: 30 }]}
                />

                <Text style={[styles.landmarkText, { marginTop: 195 }]}>Berlin Botanical Gardens</Text>
                <Text style={[styles.landmarkSubText, { marginTop: 244 }]}>
                    {this.state.displayDistancetoLandmark5 ? this.state.distanceToLandmark5.toFixed(0) + " metres to go" : ""}
                </Text>

                <Image
                    source={landmarkImages.berlinBotanicalGarden}
                    style={[styles.landmarkIcon, { width: 62, height: 62, marginTop: 180, marginLeft: 35 }]}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    landmarkSpots: {
        position: 'absolute',
        width: 20,
        height: 20,
        marginLeft: 189.5
    },
    landmarkText: {
        position: 'absolute',
        fontSize: 20,
        marginLeft: 145,
        fontWeight: 'bold'
    },
    landmarkSubText: {
        position: 'absolute',
        fontSize: 16,
        marginLeft: 150
    },
    landmarkIcon: {
        position: 'absolute',
        marginLeft: 30
    }
});

AppRegistry.registerComponent('LandmarksReachedBerlin', () => LandmarksReachedBerlin);