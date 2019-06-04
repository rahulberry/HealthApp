// EventsInformation.js

import React from 'react';
import {
    FlatList,
    Text,
    View,
    ScrollView,
    Dimensions,
    StyleSheet,
    Platform
} from 'react-native';
import {
    NavigationScreenProp,
    NavigationState,
} from 'react-navigation';
import { Button } from '../commonComponents/ButtonWithMargin';
import { Header } from './Header'

import MapView, { Marker, AnimatedRegion } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const LATITUDE= 51.499500;
const LONGITUDE= -0.174757;
/* delta values set the zoom along the lat and long directions */
const LATITUDEDELTA = 0.015;
const LONGITUDEDELTA = 0.015;


interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

export class EventInformationScreen extends React.Component<Props> {
    static navigationOptions = {
    title : 'Event Information',
	headerStyle: {
            backgroundColor: '#8ae2ad',
        },
    };

    constructor(props) {
        super(props);

        this.state = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            coords: {},
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDEDELTA,
                longitudeDelta: LONGITUDEDELTA
            }),
            markers: [{
                coordinates: {
                  latitude: LATITUDE,
                  longitude: LONGITUDE
                },
              }]
        };
    }

    wentOrGoing = (time) => {
        var currentTime = Math.round((new Date()).getTime() / 1000);
        if (time < currentTime) {
            return "Went: ";
        } else {
            return "Going: ";
        }
    }

    render() {
        const { navigation } = this.props;
        const test = navigation.getParam('item', {name : 'You should not see this'});
        const title = test.name;
        const time = test.time;
        const going = test.going;
        const unixTime = test.key;
        const coords = test.coords;
        const {goBack} = this.props.navigation;
        return (
            <View style={{paddingBottom: 0.25 * Dimensions.get('window').width}}>
            <Header title='Event Information' emergencyButton={false}/>
            <ScrollView>
                <View >
                    <Text style={styles.title} >{title}</Text>
                    <Text style={styles.timeHeader}>Time and Date:</Text>
                    <Text style={styles.time}>{time}</Text>
                    <Text style={styles.locationHeader}>Location: </Text>
                    <View style = {{alignItems : 'center'}}>
                        <View style={styles.locationView} >
                            <MapView
                                style={styles.map}
                                showsUserLocation = {false}
                                followsUserLocation = {false}
                                loadingEnabled
                                region={{
                                    latitude: coords.latitude,
                                    longitude: coords.longitude,
                                    latitudeDelta: 0.015,
                                    longitudeDelta: 0.015
                                }}
                                >
                                {this.state.markers.map(marker => (
                                    <Marker
                                    coordinate={coords}
                                    title={title}
                                    />
                                ))}
                            </MapView>
                        </View>
                    </View>
                    <Text style={styles.goingHeader}>{this.wentOrGoing(unixTime)}</Text>
                    <FlatList
                        data={going}
                        renderItem={({item}) => (
                            <View style={styles.goingListItem}>
                                <Text style={styles.goingListItem1}>{item}</Text>
                            </View> 
                        )} 
                    />
                </View>
                <Button
                    onPress={() => goBack()}
                    title="Back"/>
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize : 40, 
        fontWeight : 'bold', 
        padding : 20, 
        //backgroundColor : '#8ae2ad',
        //color : 'white', 
    },
    timeHeader: {
        fontSize : 28, 
        fontWeight : 'bold', 
        paddingLeft : 20 
    },
    time: {
        fontSize : 24, 
        paddingLeft : 20 
    },
    locationHeader: {
        fontSize : 28, 
        fontWeight : 'bold', 
        paddingTop : 20,    
        paddingLeft : 20 
    },
    locationView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 0.8 * Dimensions.get('window').width, 
        height: 0.8 * Dimensions.get('window').width, 
        backgroundColor: 'skyblue',
        alignItems : 'center'
    },
    goingHeader: {
        fontSize : 28, 
        fontWeight : 'bold', 
        paddingTop : 20, 
        paddingLeft : 20
    },
    goingListItem: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    goingListItem1: {
        fontSize : 24, 
        paddingLeft : 20
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 300,
        height: 300
},
})

export default EventInformationScreen