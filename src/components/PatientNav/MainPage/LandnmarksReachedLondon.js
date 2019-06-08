import React, { Component } from 'react';
import { View, Text, AppRegistry, StyleSheet,Image } from 'react-native';

import * as Progress from 'react-native-progress';

const isLandmarkReached = {
    reached: require('./Images/landmarks/landmarkReached.png'),
    notReached: require('./Images/landmarks/landmarkNotReached.png')
}

const landmarkImages = {
    imperialCollegeLondon: require('./Images/landmarks/ImperialCollegeLondon.png'),
    hydePark: require('./Images/landmarks/HydePark.png'),
    buckinghamPalace: require('./Images/landmarks/buckinghamPalace.png'),
    londonEye: require('./Images/landmarks/LondonEye.png'),
    bigBen: require('./Images/landmarks/BigBen.png'),
    londonBridge: require('./Images/landmarks/londonBridge.png')
}

export default class LandmarksReachedLondon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progressValue: 0,
            reachedLandmark1: false,
            reachedLandmark2: false,
            reachedLandmark3: false,
            reachedLandmark4: false,
            reachedLandmark5: false,
            distanceToLandmark1: 480,
            distanceToLandmark2: 970,
            distanceToLandmark3: 1450,
            distanceToLandmark4: 1930,
            distanceToLandmark5: 3540,
            displayDistancetoLandmark1: true,
            displayDistancetoLandmark2: false,
            displayDistancetoLandmark3: false,
            displayDistancetoLandmark4: false,
            displayDistancetoLandmark5: false,
        };

        this.checkLandmarkReached = this.checkLandmarkReached.bind(this);
    }

    checkLandmarkReached = (value) => {

        if (value >= 0 && value < 480) {
            this.setState({
                progressValue: (value) / 2400,
                distanceToLandmark1: 480-value
            });
        }
        
        else if (value >= 480 && value < 1450) {
            this.setState({
                reachedLandmark1: true,
                progressValue: 0.2 + ((value - 480) / 4850),
                distanceToLandmark2: 1450-value,
                displayDistancetoLandmark1: false,
                displayDistancetoLandmark2: true,
                displayDistancetoLandmark3: false,
                displayDistancetoLandmark4: false,
                displayDistancetoLandmark5: false,
            });
        }
        else if (value >= 1450 && value < 2900) {
            this.setState({
                reachedLandmark1: true,
                reachedLandmark2: true,
                progressValue: 0.4 + ((value - 1450) / 7250),
                distanceToLandmark3: 2900 - value,
                displayDistancetoLandmark1: false,
                displayDistancetoLandmark2: false,
                displayDistancetoLandmark3: true,
                displayDistancetoLandmark4: false,
                displayDistancetoLandmark5: false,
            });
        }
        else if (value >= 2900 && value < 4830) {
            this.setState({
                reachedLandmark1: true,
                reachedLandmark2: true,
                reachedLandmark3: true,
                progressValue: 0.6 + ((value - 2900) / 9650),
                distanceToLandmark4: 4830 - value,
                displayDistancetoLandmark1: false,
                displayDistancetoLandmark2: false,
                displayDistancetoLandmark3: false,
                displayDistancetoLandmark4: true,
                displayDistancetoLandmark5: false,
            });
        }
        else if (value >= 4830 && value < 8370) {
            this.setState({
                reachedLandmark1: true,
                reachedLandmark2: true,
                reachedLandmark3: true,
                reachedLandmark4: true,
                progressValue: 0.8 + ((value - 4830) / 17700),
                distanceToLandmark5: 8370 - value,
                displayDistancetoLandmark1: false,
                displayDistancetoLandmark2: false,
                displayDistancetoLandmark3: false,
                displayDistancetoLandmark4: false,
                displayDistancetoLandmark5: true,
            });
        }
        else if (value === 8370) {
            this.setState({
                reachedLandmark1: true,
                reachedLandmark2: true,
                reachedLandmark3: true,
                reachedLandmark4: true,
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
            <View style={{marginTop: 210}}>
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
                        style={[styles.landmarkSpots, {marginTop: -200}]}
                    />
                    <Image
                        source={this.state.reachedLandmark1 ? isLandmarkReached.reached : isLandmarkReached.notReached }
                        style={[styles.landmarkSpots, { marginTop: -120 }]}
                    />
                    <Image
                        source={this.state.reachedLandmark2 ? isLandmarkReached.reached : isLandmarkReached.notReached }
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

                <Text style={[styles.landmarkText, { marginTop: -215 }]}>Imperial College London</Text>

                <Image
                    source={landmarkImages.imperialCollegeLondon}
                    style={[styles.landmarkIcon, { width: 60, height: 37, marginTop: -205 }]}
                />

                <Text style={[styles.landmarkText, { marginTop: -125 }]}>Hyde Park</Text>
                <Text style={[styles.landmarkSubText, { marginTop: -100 }]}>
                    {this.state.displayDistancetoLandmark1 ? (this.state.distanceToLandmark1).toFixed(0) + " metres to go" : ""}
                </Text>

                <Image
                    source={landmarkImages.hydePark}
                    style={[styles.landmarkIcon, { width: 66, height: 66, marginTop: -145 }]}
                />

                <Text style={[styles.landmarkText, { marginTop: -45 }]}>Buckingham Palace</Text>
                <Text style={[styles.landmarkSubText, { marginTop: -20 }]}>
                    {this.state.displayDistancetoLandmark2 ? this.state.distanceToLandmark2.toFixed(0) + " metres to go" : ""}
                </Text>

                <Image
                    source={landmarkImages.buckinghamPalace}
                    style={[styles.landmarkIcon, { width: 61, height: 59, marginTop: -58 }]}
                />

                <Text style={[styles.landmarkText, { marginTop: 35 }]}>London Eye</Text>
                <Text style={[styles.landmarkSubText, { marginTop: 60 }]}>
                    {this.state.displayDistancetoLandmark3 ? this.state.distanceToLandmark3.toFixed(0) + " metres to go" : ""}
                </Text>

                <Image
                    source={landmarkImages.londonEye}
                    style={[styles.landmarkIcon, { width: 60, height: 65, marginTop: 20 }]}
                />

                <Text style={[styles.landmarkText, { marginTop: 115 }]}>Big Ben</Text>
                <Text style={[styles.landmarkSubText, { marginTop: 140 }]}>
                    {this.state.displayDistancetoLandmark4 ? this.state.distanceToLandmark4.toFixed(0) + " metres to go" : ""}
                </Text>

                <Image
                    source={landmarkImages.bigBen}
                    style={[styles.landmarkIcon, { width: 35, height: 75, marginTop: 97, marginLeft: 43 }]}
                />

                <Text style={[styles.landmarkText, { marginTop: 195 }]}>London Bridge</Text>
                <Text style={[styles.landmarkSubText, { marginTop: 220 }]}>
                    {this.state.displayDistancetoLandmark5 ? this.state.distanceToLandmark5.toFixed(0) + " metres to go" : ""}
                </Text>

                <Image
                    source={landmarkImages.londonBridge}
                    style={[styles.landmarkIcon, { width: 67, height: 49, marginTop: 185, marginLeft: 27 }]}
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

AppRegistry.registerComponent('LandmarksReachedLondon', () => LandmarksReachedLondon);