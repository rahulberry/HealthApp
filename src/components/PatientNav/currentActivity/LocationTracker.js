import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    Platform,
    PermissionsAndroid
} from 'react-native'

import MapView, { AnimatedRegion, Polyline } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

import haversine from "haversine"

const LATITUDE= 51.499500;
const LONGITUDE= -0.174757;
/* delta values set the zoom along the lat and long directions */
const LATITUDEDELTA = 0.015;
const LONGITUDEDELTA = 0.0121;

export default class LocationTracker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDEDELTA,
                longitudeDelta: LONGITUDEDELTA
            })
        };
    }

    componentDidMount() {    
    
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                const { coordinate, routeCoordinates, distanceTravelled } = this.state;
                const { latitude, longitude } = position.coords;
                const newCoordinate = {
                    latitude,
                    longitude
                };

                if (Platform.OS === "android") {
                    if (this.marker) {
                        this.marker._component.animateMarkerToCoordinate(
                            newCoordinate,
                            500
                        );
                    }
                }
                else {
                    coordinate.timing(newCoordinate).start();
                }

                this.setState({
                    latitude,
                    longitude,
                    routeCoordinates: routeCoordinates.concat([newCoordinate]),
                    distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
                    prevLatLng: newCoordinate
                });

            },
                     

            error => console.log(error),
            { enableHighAccuracy: true }

        );
    }

    calcDistance = newLatLng => {
        const { prevLatLng } = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    };

    render() {  

        return (
            <View styles={{ alignItems: 'center' }}>
                <MapView
                    style={styles.map}
                    showsUserLocation
                    followsUserLocation
                    loadingEnabled
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.015
                    }}
                    >
                    <Polyline
                        coordinates={this.state.routeCoordinates}
                        strokeWidth={5}
                    />
                </MapView>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image
                        source={require('./images/shoe.png')}
                        style={styles.shoePicture}
                    />
                    <Text
                        style={styles.shoeDescriptorStyle}
                    >
                        Distance covered:
                </Text>
                    <Text style={styles.dataStyle}> {parseFloat(this.state.distanceTravelled).toFixed(2)} km </Text>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        width: 400,
        height: 600
    },
    bubble: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.7)",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20
    },
    latlng: {
        width: 200,
        alignItems: "stretch"
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: "center",
        marginHorizontal: 10
    },
    buttonContainer: {
        flexDirection: "row",
        marginVertical: 20,
        backgroundColor: "transparent"
    },
    shoeDescriptorStyle: {
        paddingTop: 20,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    dataStyle: {
        marginLeft: 'auto',
        marginRight: 15,
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    shoePicture: {
        width: 49,
        height: 40,
        marginLeft: 15,
        marginTop: 10
    },
});

AppRegistry.registerComponent('LocationTracker', () => LocationTracker);