import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'

import ProgressBar from './ProgressBar'

import MainPageStats from './MainPageStats'

import PatientPlaceHolder from './PatientPlaceHolder'

import Modal from './Modal'
import LandmarksReachedLondon from './LandnmarksReachedLondon'
import LandmarksReachedBerlin from './LandmarkReachedBerlin'

import firebase from 'firebase'

import { Header } from '../Header'

const icons = {
    flag: require('./Images/Icons/flag.png'),
    pace: require('./Images/Icons/pace.png'),
    shoe: require('./Images/Icons/shoe.png'),
}

var LondonData = [
    {
        key: 1,
        amount: 0,
        name: "",
        svg: { fill: '#E28A8A' },
    },
    {
        key: 2,
        amount: 0,
        name: "",
        svg: { fill: '#E2D88A' }
    },
    {
        key: 3,
        amount: 0,
        name: "",
        svg: { fill: '#8AE2AD' }
    },
    {
        key: 4,
        amount: 0,
        name: "",
        svg: { fill: '#8AB6E2' }
    },
    {
        key: 5,
        amount: 0,
        name: "",
        svg: { fill: '#C78AE2' },
    },
    {
        key: 6,
        amount: 8370,
        name: "distanceLeft",
        svg: { fill: '#ECECEC' },
    },
];

var BerlinData = [
    {
        key: 1,
        amount: 0,
        name: "",
        svg: { fill: '#E28A8A' },
    },
    {
        key: 2,
        amount: 0,
        name: "",
        svg: { fill: '#E2D88A' }
    },
    {
        key: 3,
        amount: 0,
        name: "",
        svg: { fill: '#8AE2AD' }
    },
    {
        key: 4,
        amount: 0,
        name: "",
        svg: { fill: '#8AB6E2' }
    },
    {
        key: 5,
        amount: 0,
        name: "",
        svg: { fill: '#C78AE2' },
    },
    {
        key: 6,
        amount: 13300,
        name: "distanceLeft",
        svg: { fill: '#ECECEC' },
    },
];

var RomeData = [
    {
        key: 1,
        amount: 0,
        name: "",
        svg: { fill: '#E28A8A' },
    },
    {
        key: 2,
        amount: 0,
        name: "",
        svg: { fill: '#E2D88A' }
    },
    {
        key: 3,
        amount: 0,
        name: "",
        svg: { fill: '#8AE2AD' }
    },
    {
        key: 4,
        amount: 0,
        name: "",
        svg: { fill: '#8AB6E2' }
    },
    {
        key: 5,
        amount: 0,
        name: "",
        svg: { fill: '#C78AE2' },
    },
    {
        key: 6,
        amount: 14000,
        name: "distanceLeft",
        svg: { fill: '#ECECEC' },
    },
];

var ParisData = [
    {
        key: 1,
        amount: 0,
        name: "",
        svg: { fill: '#E28A8A' },
    },
    {
        key: 2,
        amount: 0,
        name: "",
        svg: { fill: '#E2D88A' }
    },
    {
        key: 3,
        amount: 0,
        name: "",
        svg: { fill: '#8AE2AD' }
    },
    {
        key: 4,
        amount: 0,
        name: "",
        svg: { fill: '#8AB6E2' }
    },
    {
        key: 5,
        amount: 0,
        name: "",
        svg: { fill: '#C78AE2' },
    },
    {
        key: 6,
        amount: 15000,
        name: "distanceLeft",
        svg: { fill: '#ECECEC' },
    },
];

var MadridData = [
    {
        key: 1,
        amount: 0,
        name: "",
        svg: { fill: '#E28A8A' },
    },
    {
        key: 2,
        amount: 0,
        name: "",
        svg: { fill: '#E2D88A' }
    },
    {
        key: 3,
        amount: 0,
        name: "",
        svg: { fill: '#8AE2AD' }
    },
    {
        key: 4,
        amount: 0,
        name: "",
        svg: { fill: '#8AB6E2' }
    },
    {
        key: 5,
        amount: 0,
        name: "",
        svg: { fill: '#C78AE2' },
    },
    {
        key: 6,
        amount: 16000,
        name: "distanceLeft",
        svg: { fill: '#ECECEC' },
    },
];

var LisbonData = [
    {
        key: 1,
        amount: 0,
        name: "",
        svg: { fill: '#E28A8A' },
    },
    {
        key: 2,
        amount: 0,
        name: "",
        svg: { fill: '#E2D88A' }
    },
    {
        key: 3,
        amount: 0,
        name: "",
        svg: { fill: '#8AE2AD' }
    },
    {
        key: 4,
        amount: 0,
        name: "",
        svg: { fill: '#8AB6E2' }
    },
    {
        key: 5,
        amount: 0,
        name: "",
        svg: { fill: '#C78AE2' },
    },
    {
        key: 6, amount: 17000, name: "distanceLeft", svg: { fill: '#ECECEC' },
    },
];

var patientData = [
    {
        key: 1,
        image: '',
        showPlaceHolder: true,
        svg: { fill: '#E28A8A' },
    },
    {
        key: 2,
        image: '',
        showPlaceHolder: true,
        svg: { fill: '#E2D88A' },
    },
    {
        key: 3,
        image: '',
        showPlaceHolder: true,
        svg: { fill: '#8AE2AD' },
    },
    {
        key: 4,
        image: '',
        showPlaceHolder: true,
        svg: { fill: '#8AB6E2' },
    },
    {
        key: 5,
        image: '',
        showPlaceHolder: false,
        svg: { fill: '#C78AE2' },
    },
];

const milestones = [
    {
        key: 1,
        destination: "London",
        currentCityImage: require('./Images/targets/London.png'),
        image: require('./Images/currentCity/London.png'),
        cityIcon: require('./Images/ModalAssets/citiesReached/London.png'),
        greyScaleCity: require('./Images/ModalAssets/citiesReached/London.png')
    },
    {
        key: 2,
        destination: "Berlin",
        currentCityImage: require('./Images/targets/Berlin.png'),
        image: require('./Images/currentCity/Berlin.png'),
        cityIcon: require('./Images/ModalAssets/citiesReached/Berlin.png'),
        greyScaleCity: require('./Images/ModalAssets/greyScaleCities/GermanyGrayscale.png')
    },
    {
        key: 3,
        destination: "Rome",
        currentCityImage: require('./Images/targets/Rome.png'),
        image: require('./Images/currentCity/Rome.png'),
        cityIcon: require('./Images/ModalAssets/citiesReached/Rome.png'),
        greyScaleCity: require('./Images/ModalAssets/greyScaleCities/ItalyGrayscale.png'),
    },
    {
        key: 4,
        destination: "Paris",
        currentCityImage: require('./Images/targets/Paris.png'),
        image: require('./Images/currentCity/Paris.png'),
        cityIcon: require('./Images/ModalAssets/citiesReached/Paris.png'),
        greyScaleCity: require('./Images/ModalAssets/greyScaleCities/FranceGrayscale.png')
    },
    {
        key: 5,
        destination: "Madrid",
        currentCityImage: require('./Images/targets/Madrid.png'),
        image: require('./Images/currentCity/Madrid.png'),
        cityIcon: require('./Images/ModalAssets/citiesReached/Madrid.png'),
        greyScaleCity: require('./Images/ModalAssets/greyScaleCities/SpainGrayscale.png')
    },
    {
        key: 6,
        destination: "Lisbon",
        currentCityImage: require('./Images/targets/Lisbon.png'),
        image: require('./Images/currentCity/Lisbon.png'),
        cityIcon: require('./Images/ModalAssets/citiesReached/Lisbon.png'),
        greyScaleCity: require('./Images/ModalAssets/greyScaleCities/PortugalGrayscale.png')
    },
    {
        key: 7,
        destination: "Moon",
        currentCityImage: require('./Images/targets/Lisbon.png'),
        image: require('./Images/currentCity/Lisbon.png'),
        cityIcon: require('./Images/ModalAssets/citiesReached/Lisbon.png'),
        greyScaleCity: require('./Images/ModalAssets/greyScaleCities/MoonGrayscale.png')
    }
];

export default class MainActivityPage extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            activityStarted: true,
            destination: 0,
            patientDistances: {
                patient1: 0,
                patient2: 0,
                patient3: 0,
                patient4: 0,
                patient5: 0
            },
            distanceCovered: 0,
            distanceLeft: 0,
            reachedBerlin: false,
            reachedRome: false,
            reachedParis: false,
            reachedMadrid: false,
            reachedLisbon: false,
            percentageCompleted: 0,
            patientNames: [],
            patientInfo: [...patientData],
            LondonData: [...LondonData],
            BerlinData: [...BerlinData],
            RomeData: [...RomeData],
            ParisData: [...ParisData],
            MadridData: [...MadridData],
            LisbonData: [...LisbonData],
        };
        this._onPressButton = this._onPressButton.bind(this);
        this.setCurrentCity = this.setCurrentCity.bind(this);
        this.renderLandmarks = this.renderLandmarks.bind(this);
        this.setDestinationArray = this.setDestinationArray.bind(this);
        this.fetchPatientData = this.fetchPatientData.bind(this);
        this.fetchPatientNames = this.fetchPatientNames.bind(this);
        this.populateLondonDistanceArray = this.populateLondonDistanceArray.bind(this);
        this.populateBerlinDistanceArray = this.populateBerlinDistanceArray.bind(this);
        this.populateNameFieldOfArray = this.populateNameFieldOfArray.bind(this);
        this.updateDisplayImage = this.updateDisplayImage.bind(this);
    } 

    populateLondonDistanceArray = (distanceTravelledCity) => {

        let distanceAccumulated = 0;
        let tmpArrayLondon = [...this.state.LondonData];

        tmpArrayLondon[5].amount = 8370;

        for (let i = 0; i < distanceTravelledCity.length; i++) {
            console.log('Distance Travelled London: ' + distanceTravelledCity[i]);
            console.log('tmpArrayLondon: ' + tmpArrayLondon[i].amount);
        }

        for (let i = 0; i < distanceTravelledCity.length; i++) {
            //tmpArrayLondon[i].name = this.state.patientNames[i];
            tmpArrayLondon[i].amount = distanceTravelledCity[i];
            distanceAccumulated += distanceTravelledCity[i];
        }

        tmpArrayLondon[5].amount = tmpArrayLondon[5].amount - distanceAccumulated;

        console.log(tmpArrayLondon);

        this.setState({
            LondonData: tmpArrayLondon
        })    
    }

    populateBerlinDistanceArray = (distanceTravelledCity) => {

        let distanceAccumulated = 0;
        let tmpArrayBerlin = [...this.state.BerlinData];
        tmpArrayBerlin[5].amount = 13300;

        for (let i = 0; i < distanceTravelledCity.length; i++) {
            tmpArrayBerlin[i].amount = distanceTravelledCity[i];
            distanceAccumulated += distanceTravelledCity[i];
        }

        tmpArrayBerlin[5].amount = tmpArrayBerlin[5].amount - distanceAccumulated;

        console.log(tmpArrayBerlin);

        this.setState({
            BerlinData: tmpArrayBerlin
        })
    }

    populateNameFieldOfArray = (namesArray) => {
        let tmpArrayLondon = [...this.state.LondonData];
        let tmpArrayBerlin = [...this.state.BerlinData];

        for (let i = 0; i < namesArray.length; i++) {
            tmpArrayLondon[i].name = namesArray[i];
            tmpArrayBerlin[i].name = namesArray[i];
        }

        for (let i = 4; i > namesArray.length - 1; i--) {
            tmpArrayLondon[i].name = "";
            tmpArrayBerlin[i].name = "";
        }
        
        this.setState({
            LondonData: tmpArrayLondon,
            BerlinData: tmpArrayBerlin
        })
    }


    updateDisplayImage = (patientUID) => {

        let displayImageOfPatient = ""
        let displayImages = [...this.state.patientInfo];

        for (let i = 0; i < patientUID.length; i++) {

            var firebaseRef = firebase.database().ref('/Patients/' + patientUID[i] + '/Account Details/display_image');
            firebaseRef.on('value', (snapshot) => {
                displayImageOfPatient = snapshot.val();
                //console.log(displayImageOfPatient);

                displayImages[i].image = displayImageOfPatient;
                displayImages[i].showPlaceHolder = true;

                if (i === patientUID.length - 1) {

                    for (let i = displayImages.length - 1; i > patientUID.length - 1; i--) {
                        displayImages[i].showPlaceHolder = false;
                    }

                    this.setState({
                        patientInfo: displayImages
                    })
                }

            })

        }

    }

    fetchPatientNames = (patientUID) => {

        var patientNameArray = [];
        let nameOfIndividualPatient = ""
         
        for (let i = 0; i < patientUID.length; i++) {

            var firebaseRef = firebase.database().ref('/Patients/' + patientUID[i] + '/Account Details/name');
            firebaseRef.on('value', (snapshot) => {
                if (patientUID[i] === firebase.auth().currentUser.uid) {
                    nameOfIndividualPatient = "You";
                }
                else {
                    nameOfIndividualPatient = snapshot.val();
                }

                patientNameArray.push(nameOfIndividualPatient);
                
                if (i === patientUID.length-1) {

                    this.populateNameFieldOfArray(patientNameArray);

                }
            })

        }

    }
      
    fetchPatientData() {

        let groupIndex = 0;
        let cityIndex = 0;
        let individualPatient;
        var patientUID = [];
        var distanceTravelledBerlinArray = [];
        var distanceTravelledLondonArray = [];
        let patientData = {};
        //let distanceTravelled = this.props.distanceTravelled;

        let distanceTravelled = 0;

        var firebaseRef = firebase.database().ref('/Patients/' + firebase.auth().currentUser.uid + '/Account Details/group');
        firebaseRef.on('value', (snapshot) => {
            groupIndex = snapshot.val();

            var patientDataRef = firebase.database().ref('/Groups/' + groupIndex + '/Patients')
            patientDataRef.on('value', (snapshot) => {
                patientData = snapshot.val();

                console.log(patientData);

                for (var key in patientData) {
                    patientUID.push(key);
                    distanceTravelledLondonArray.push(patientData[key].distanceTravelledLondon);
                    distanceTravelledBerlinArray.push(patientData[key].distanceTravelledBerlin);
                }

                this.fetchPatientNames(patientUID);
                this.updateDisplayImage(patientUID);
                this.populateLondonDistanceArray(distanceTravelledLondonArray);
                this.populateBerlinDistanceArray(distanceTravelledBerlinArray);

                patientUID = [];
                distanceTravelledLondonArray = [];
                distanceTravelledBerlinArray = [];
                    
            });

            var groupAccumulatedDistanceRef = firebase.database().ref('/Groups/' + groupIndex + '/totalDistanceTravelled');
            groupAccumulatedDistanceRef.on('value', (snapshot) => {
                distanceTravelled = snapshot.val()
                this.setCurrentCity(distanceTravelled);

            })

        });

    }

    setDestinationArray = (value) => {
        switch (value) {
            case 0:
                return this.state.LondonData;
                break;
            case 1:
                return this.state.BerlinData;
                break;
            case 2:
                return this.state.RomeData;
                break;
            case 3:
                return this.state.ParisData;
                break;
            case 4:
                return this.state.MadridData;
                break;
            case 5:
                return this.state.LisbonData;
                break;
        }

    }

    setCurrentCity = (totalDistanceTravelled) => {

        if (totalDistanceTravelled >= 0 && totalDistanceTravelled <= 8370) {

            this.setState({
                destination: 0,
                distanceCovered: totalDistanceTravelled,
                distanceLeft: 8370 - totalDistanceTravelled,
                percentageCompleted: (totalDistanceTravelled / 8370) * 100,
            })
        }
        else if (totalDistanceTravelled > 8370 && totalDistanceTravelled <= 21670) {
            this.setState({
                destination: 1,
                distanceCovered: totalDistanceTravelled - 8370,
                distanceLeft: 21670 - totalDistanceTravelled,
                reachedBerlin: true,
                percentageCompleted: ((totalDistanceTravelled - 8370) / 13300) * 100
            })
        }
        else if (totalDistanceTravelled > 21670 && totalDistanceTravelled <= 35670) {
            this.setState({
                destination: 2,
                distanceCovered: totalDistanceTravelled - 21670,
                distanceLeft: 35670 - totalDistanceTravelled,
                reachedBerlin: true,
                reachedRome: true,
                percentageCompleted: ((totalDistanceTravelled - 21670) / 14000) * 100
            })
        }
        else if (totalDistanceTravelled > 35670 && totalDistanceTravelled <= 50670) {
            this.setState({
                destination: 3,
                distanceCovered: totalDistanceTravelled - 35670,
                distanceLeft: 50670 - totalDistanceTravelled,
                reachedBerlin: true,
                reachedRome: true,
                reachedParis: true,
                percentageCompleted: ((totalDistanceTravelled - 35670) / 15000) * 100
            })
        }
        else if (totalDistanceTravelled > 50670 && totalDistanceTravelled <= 66670) {
            this.setState({
                destination: 4,
                distanceCovered: totalDistanceTravelled - 50670,
                distanceLeft: 66670 - totalDistanceTravelled,
                reachedBerlin: true,
                reachedRome: true,
                reachedParis: true,
                reachedMadrid: true,
                percentageCompleted: ((totalDistanceTravelled - 50670) / 16000) * 100
            })
        }
        else if (totalDistanceTravelled > 66670) {
            this.setState({
                destination: 5,
                distanceCovered: totalDistanceTravelled - 66670,
                distanceLeft: 83670 - totalDistanceTravelled,
                reachedBerlin: true,
                reachedRome: true,
                reachedParis: true,
                reachedMadrid: true,
                reachedLisbon: true,
                percentageCompleted: ((totalDistanceTravelled - 66670) / 17000) * 100
            })
        }
    }

    renderLandmarks = (destinationIndex) => {
        switch (destinationIndex) {
            case 0:
                return <LandmarksReachedLondon progressValue={this.state.distanceCovered} />
                break;
            case 1:
                return <LandmarksReachedBerlin progressValue={this.state.distanceCovered} />
                break;
            case 2:
                return <LandmarksReachedLondon progressValue={this.state.distanceCovered} />
                break;
            case 3:
                return <LandmarksReachedBerlin progressValue={this.state.distanceCovered} />
                break;
            case 4:
                return <LandmarksReachedLondon progressValue={this.state.distanceCovered} />
                break;
            case 5:
                return <LandmarksReachedBerlin progressValue={this.state.distanceCovered} />
                break;

        }
    }

    componentDidMount() {
        this.fetchPatientData();
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
                <Header 
                    title="Activities" 
                    emergencyButton= {true}
                    />

                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <ProgressBar
                        data={this.setDestinationArray(this.state.destination)}
                    />
                        <Image
                            source={milestones[this.state.destination].currentCityImage}
                            style={styles.flagContainer}
                        />
                        <Text style={styles.percentText}>{parseFloat(this.state.percentageCompleted).toFixed(0)}%</Text>
                    </View>

                    <View
                        style={styles.startActivitybutton}
                        elevation={1}
                    >
                        <TouchableOpacity onPress={this._onPressButton}>
                            <Text style={styles.buttonText}>{"Start activity"} </Text>
                        </TouchableOpacity>
                    </View>

                    <MainPageStats
                        icon={milestones[this.state.destination].image}
                        iconStyle={iconstyles.destination}
                        dataContext={"City"}
                        metric={milestones[this.state.destination].destination}
                        showBorder={true}
                    />
                    <MainPageStats
                        icon={icons.shoe}
                        iconStyle={iconstyles.shoe}
                        dataContext={"Distance covered"}
                        data={parseFloat(this.state.distanceCovered).toFixed(0)}
                        metric={"m"}
                        showBorder={true}
                    />
                    <MainPageStats
                        icon={icons.flag}
                        iconStyle={iconstyles.flag}
                        dataContext={"Distance left"}
                        data={parseFloat(this.state.distanceLeft).toFixed(0)}
                        metric={"m"}
                        showBorder={false}
                    />

                    <Text style={styles.subheadingStyles}>Group Members</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: 5 }}>
                        <PatientPlaceHolder
                            profileBorder={this.state.patientInfo[0].showPlaceHolder ? borderStyles.patient1 : {}}
                            profilePicture={{ uri: this.state.patientInfo[0].image }}
                            patientName={this.setDestinationArray(this.state.destination)[0].name}
                        />
                        <PatientPlaceHolder
                            profileBorder={this.state.patientInfo[1].showPlaceHolder ? borderStyles.patient2 : {}}
                            profilePicture={{ uri: this.state.patientInfo[1].image }}
                            patientName={this.setDestinationArray(this.state.destination)[1].name}
                        />
                        <PatientPlaceHolder
                            profileBorder={this.state.patientInfo[2].showPlaceHolder ? borderStyles.patient3 : {}}
                            profilePicture={{ uri: this.state.patientInfo[2].image }}
                            patientName={this.setDestinationArray(this.state.destination)[2].name}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginLeft: 5, marginBottom: 5 }}>
                        <PatientPlaceHolder
                            profileBorder={this.state.patientInfo[3].showPlaceHolder ? borderStyles.patient4 : {}}
                            profilePicture={{ uri: this.state.patientInfo[3].image }}
                            patientName={this.setDestinationArray(this.state.destination)[3].name}
                        />
                        <PatientPlaceHolder
                            profileBorder={this.state.patientInfo[4].showPlaceHolder ? borderStyles.patient5 : {} }
                            profilePicture={{ uri: this.state.patientInfo[4].image }}
                            patientName={this.setDestinationArray(this.state.destination)[4].name}
                        />
                        <PatientPlaceHolder
                        />
                    </View>

                    <Text style={styles.subheadingStyles}>Landmarks</Text>

                    <View>
                        {this.renderLandmarks(this.state.destination)}
                    </View>

                    <Text style={[styles.subheadingStyles, { marginTop: 250 }]}>Cities reached</Text>

                    <View style={{ justifyContent: 'space-around', marginLeft: 5, marginBottom: 5, marginRight: 5 }}>
                        <ScrollView horizontal={true}>
                            <Modal
                                countryFlag={milestones[0].cityIcon}
                                data={this.setDestinationArray(0)}
                                city={milestones[0].destination}
                                showModal={true}
                                greeting={"Hello!"}
                                fact={"With over 4,000 trees, a large lake, a meadow and ornamental flower gardens, Hyde Park is the largest park in London."}
                            />
                            <Modal
                                countryFlag={this.state.reachedBerlin ? milestones[1].cityIcon : milestones[1].greyScaleCity}
                                data={this.setDestinationArray(1)}
                                city={milestones[1].destination}
                                showModal={this.state.reachedBerlin}
                                greeting={"Hallo!"}
                                fact={"Founded in the 17th century, Berlin's Botanical Garden spans 42 hectares of land and contains over 18,000 species of plants."}
                            />
                            <Modal
                                countryFlag={this.state.reachedRome ? milestones[2].cityIcon : milestones[2].greyScaleCity}
                                data={this.setDestinationArray(2)}
                                city={milestones[2].destination}
                                showModal={this.state.reachedRome}
                            />
                            <Modal
                                countryFlag={this.state.reachedParis ? milestones[3].cityIcon : milestones[3].greyScaleCity}
                                data={this.setDestinationArray(3)}
                                city={milestones[3].destination}
                                showModal={this.state.reachedParis}
                            />
                            <Modal
                                countryFlag={this.state.reachedMadrid ? milestones[4].cityIcon : milestones[4].greyScaleCity}
                                data={this.setDestinationArray(4)}
                                city={milestones[4].destination}
                                showModal={this.state.Madrid}
                            />
                            <Modal
                                countryFlag={this.state.reachedLisbon ? milestones[5].cityIcon : milestones[5].greyScaleCity}
                                data={this.setDestinationArray(5)}
                                city={milestones[5].destination}
                                showModal={this.state.reachedLisbon}
                            />
                            <Modal
                                countryFlag={milestones[6].greyScaleCity}
                                data={this.setDestinationArray(5)}
                                city={milestones[6].destination}
                                showModal={false}
                            />
                        </ScrollView>
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
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
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