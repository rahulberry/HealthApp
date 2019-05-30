import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'

import ProgressBar from './ProgressBar'

import MainPageStats from './MainPageStats'

import PatientPlaceHolder from './PatientPlaceHolder'

import PlacesVisitedPlaceHolder from './PlacesVisitedPlaceHolder'

const icons = {
    flag: require('./Images/Icons/flag.png'),
    pace: require('./Images/Icons/pace.png'),
    shoe: require('./Images/Icons/shoe.png'),
}

const testData = [
    {
        key: 1,
        amount: 50,
        svg: { fill: '#E28A8A' },
    },
    {
        key: 2,
        amount: 50,
        svg: { fill: '#E2D88A' }
    },
    {
        key: 3,
        amount: 40,
        svg: { fill: '#8AE2AD' }
    },
    {
        key: 4,
        amount: 95,
        svg: { fill: '#8AB6E2' }
    },
    {
        key: 5,
        amount: 35,
        svg: { fill: '#C78AE2' },
    }
];

const patientData = [
    {
        key: 1,
        name: "Fred",
        image: require('./Images/Profile/patient1.png'), 
        distanceTravelled: 20,
        svg: { fill: '#E28A8A' },
    },
    {
        key: 2,
        name: "Hannah",
        image: require('./Images/Profile/patient2.png'),
        distanceTravelled: 20,
        svg: { fill: '#E2D88A' },
    },
    {
        key: 3,
        name: "You",
        image: require('./Images/Profile/patient3.png'),
        distanceTravelled: 20,
        svg: { fill: '#8AE2AD' },
    },
    {
        key: 4,
        name: "David",
        image: require('./Images/Profile/patient4.png'),
        distanceTravelled: 20,
        svg: { fill: '#8AB6E2' },
    },
    {
        key: 5,
        name: "Reepicheep",
        image: require('./Images/Profile/patient5.png'),
        distanceTravelled: 20,
        svg: { fill: '#C78AE2' },
    },
];

const milestones = [
    {
        key: 1,
        destination: "Germany",
        image: require('./Images/Icons/destination/germany.png'),
        countryIcon: require('./Images/placesVisited/germany.png')
    },
    {
        key: 2,
        destination: "Austria",
        image: require('./Images/Icons/destination/austria.png'),
        countryIcon: require('./Images/placesVisited/austria.png')
    },
    {
        key: 3,
        destination: "Italy",
        image: require('./Images/Icons/destination/italy.png'),
        countryIcon: require('./Images/placesVisited/italy.png'),
    },
    {
        key: 4,
        destination: "France",
        image: require('./Images/Icons/destination/france.png'),
        countryIcon: require('./Images/placesVisited/france.png')
    },
    {
        key: 5,
        destination: "Spain",
        image: require('./Images/Icons/destination/spain.png'),
        countryIcon: require('./Images/placesVisited/spain.png')
    },
    {
        key: 6,
        destination: "Portugal",
        image: require('./Images/Icons/destination/portugal.png'),
        countryIcon: require('./Images/placesVisited/portugal.png')
    }
];

export default class MainActivityPage extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = { activityStarted: true };
        this._onPressButton = this._onPressButton.bind(this);
    }

    _onPressButton() {

        this.setState(previousState => (
            { activityStarted: !previousState.activityStarted }
        ))

        this.props.navigation.navigate('ActivityPage')

    }

    render() {
        return (
            <ScrollView>
                <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <ProgressBar data={patientData} />
                    <Image
                        source={require('./Images/targets/France.png')}
                        style={styles.flagContainer}
                    />
                    <Text style={styles.percentText}>73%</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableWithoutFeedback onPress={this._onPressButton}>
                        <View style={styles.startActivitybutton}>
                            <Text style={styles.buttonText}>{"Start Walking"} </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <MainPageStats
                    icon={milestones[3].image}
                    iconStyle={iconstyles.destination}
                    dataContext={"Destination"}
                    metric={milestones[3].destination}
                    showBorder={true}
                />
                <MainPageStats
                    icon={icons.shoe}
                    iconStyle={iconstyles.shoe}
                    dataContext={"Distance covered"}
                    data={250}
                    metric={"km"}
                    showBorder={true}
                />
                <MainPageStats
                    icon={icons.flag}
                    iconStyle={iconstyles.flag}
                    dataContext={"Distance left"}
                    data={100}
                    metric={"km"}
                    showBorder={false}
                />
                
                <Text style={styles.subheadingStyles}>Group Members</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: 5 }}>
                    <PatientPlaceHolder
                        profileBorder={borderStyles.patient1}
                        profilePicture={patientData[0].image}
                        patientName={patientData[0].name}
                    />
                    <PatientPlaceHolder
                        profileBorder={borderStyles.patient2}
                        profilePicture={patientData[1].image}
                        patientName={patientData[1].name}
                    />
                    <PatientPlaceHolder
                        profileBorder={borderStyles.patient3}
                        profilePicture={patientData[2].image}
                        patientName={patientData[2].name}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginLeft: 5, marginBottom: 5 }}>
                    <PatientPlaceHolder
                        profileBorder={borderStyles.patient4}
                        profilePicture={patientData[3].image}
                        patientName={patientData[3].name}
                    />
                    <PatientPlaceHolder
                        profileBorder={borderStyles.patient5}
                        profilePicture={patientData[4].image}
                        patientName={patientData[4].name}
                    />
                    <PatientPlaceHolder
                    />
                </View>

                <Text style={styles.subheadingStyles}>Places Visited</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: 5, marginBottom: 5 }}>
                    <PlacesVisitedPlaceHolder
                        countryFlag={milestones[0].countryIcon}
                        data={testData}
                        destination={milestones[0].destination}/>
                    <PlacesVisitedPlaceHolder
                        countryFlag={milestones[1].countryIcon}
                        data={testData}
                        destination={milestones[1].destination} />
                    <PlacesVisitedPlaceHolder
                        countryFlag={milestones[2].countryIcon}
                        data={testData}
                        destination={milestones[2].destination} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop:15, marginLeft: 5, marginBottom: 5 }}>
                    <PlacesVisitedPlaceHolder
                        countryFlag={milestones[3].countryIcon}
                        data={testData}
                        destination={milestones[3].destination} />
                    <PlacesVisitedPlaceHolder
                        countryFlag={milestones[4].countryIcon}
                        data={testData}
                        destination={milestones[4].destination} />
                    <PlacesVisitedPlaceHolder
                        countryFlag={milestones[5].countryIcon}
                        data={testData}
                        destination={milestones[5].destination} />
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    flagContainer: {
        marginTop: 15,
        width: 271,
        height: 271,
        position: 'absolute',
        alignSelf: 'center'
    },
    percentText: {
        position: 'absolute',
        fontSize: 50,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 110
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    startActivitybutton: {
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#8ae2ad',
        marginBottom: 20,
        width: 184,
        height: 44,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    endActivitybutton: {
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#c60b0b',
        marginBottom: 20,
        width: 184,
        height: 44,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    buttonText: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginTop: 3,
        fontWeight: 'bold',
        fontSize: 22,
    },
    subheadingStyles: {
        marginTop: 15,
        marginBottom: 20,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
    }
});

const iconstyles = {
    shoe: {
        width: 50,
        height: 41,
        marginLeft: 15,
        marginTop: 2
    },
    flag: {
        width: 32,
        height: 43,
        marginLeft: 23,
        marginTop: 0,
        marginRight: 10
    },
    destination: {
        width: 40,
        height: 40,
        marginLeft: 20,
        marginTop: 0,
        marginRight: 5
    },
};

const borderStyles = {
    patient1: {
        borderColor: '#E28A8A'
    },
    patient2: {
        borderColor: '#E2DB8A',
    },
    patient3: {
        borderColor: '#8AE2AD'
    },
    patient4: {
        borderColor: '#8AB6E2'
    },
    patient5: {
        borderColor: '#DE8AE2'
    },
};

AppRegistry.registerComponent('MainActivityPage', () => MainActivityPage);