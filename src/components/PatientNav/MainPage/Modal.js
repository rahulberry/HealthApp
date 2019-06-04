import React, { Component } from 'react';

import { StyleSheet, View, Modal, Text, Platform, TouchableOpacity, Image, AppRegistry } from 'react-native';

import { PieChart } from 'react-native-svg-charts'

export default class Mynewproject extends Component {

    constructor(props) {

        super(props);

        this.state = {

            ModalVisibleStatus: false
        };

    }

    ShowModalFunction(visible) {

        if (this.props.showModal) {
            this.setState({ ModalVisibleStatus: visible });
        }

    }



    render() {

        const data = [
            {
                key: 1,
                amount: 50,
                svg: { fill: '#600080' },
            },
            {
                key: 2,
                amount: 50,
                svg: { fill: '#9900cc' }
            },
            {
                key: 3,
                amount: 40,
                svg: { fill: '#c61aff' }
            },
            {
                key: 4,
                amount: 95,
                svg: { fill: '#d966ff' }
            },
            {
                key: 5,
                amount: 35,
                svg: { fill: '#ecb3ff' }
            }
        ]

        const citiesReached = this.props.data;

        return (

            <View>

                <Modal
                    transparent={true}

                    animationType={"slide"}

                    visible={this.state.ModalVisibleStatus}

                    onRequestClose={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }} >


                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>


                        <View style={styles.ModalInsideView}>


                            {/* Components displayed Inside The Modal. */}

                            <TouchableOpacity
                                onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }}
                                style={{marginTop: '-20%', marginLeft: '100%'}}
                            >
                                <Image
                                    source={require('../MainPage/Images/ModalAssets/close.png')}
                                    style={styles.closeStyle}
                                />
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>{this.props.greeting}</Text>

                            <View style={{marginTop: 20}}>
                                <PieChart
                                    style={{ height: 80, width: 80 }}
                                    valueAccessor={({ item }) => item.amount}
                                    data={citiesReached}
                                    innerRadius={"85%"}
                                    padAngle={0}
                                />

                                <TouchableOpacity
                                    onPress={() => { this.ShowModalFunction(true) }}
                                    style={{ marginTop: -73.5, marginLeft: 6.5 }}
                                >
                                    <Image
                                        source={this.props.countryFlag}
                                        style={styles.destinationPicStyle}
                                    />
                                </TouchableOpacity>

                                <Text style={styles.destinationNameStyle}>{this.props.city}</Text>
                            </View>

                            <Text style={styles.modalSubtitle}>Did you know?</Text>

                            <Text style={styles.TextStyle}>{this.props.fact}</Text>

                            {/* Components Here, Which You Want To Show Inside The Modal. */}


                        </View>

                    </View>

                </Modal>

                <View>
                    <PieChart
                        style={{ height: 80, width: 80 }}
                        valueAccessor={({ item }) => item.amount}
                        data={citiesReached}
                        innerRadius={"85%"}
                        padAngle={0}
                    />

                    <TouchableOpacity
                        onPress={() => { this.ShowModalFunction(true) }}
                        style={{ marginTop: -73.5, marginLeft: 6.5 }}
                        activeOpacity={this.props.showModal? 0.2 : 1}
                    >
                        <Image
                            source={this.props.countryFlag}
                            style={styles.destinationPicStyle}
                        />
                    </TouchableOpacity>

                    <Text style={styles.destinationNameStyle}>{this.props.city}</Text>
                </View>

            </View>


        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: (Platform.OS == 'ios') ? 20 : 0

    },

    ModalInsideView: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ECECEC",
        height: 400,
        width: '90%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#979797'

    },

    modalTitle: {
        fontWeight: 'bold',
        fontSize: 30
    },

    modalSubtitle: {
        marginTop: 20,
        marginLeft: 20,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 20
    },

    closeStyle: {
        width: 37,
        height: 37
    },

    TextStyle: {

        fontSize: 20,
        marginBottom: 20,
        marginLeft: 22,
        textAlign: 'left'

    },

    button: {
        borderRadius: 100,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2196F3'
    },

    buttonText: {
        fontSize: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        color: 'white'
    },

    destinationPicStyle: {
        width: 67,
        height: 67,
    },

    destinationNameStyle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#979797',
        alignSelf: 'center',
        marginTop: 5
    }

});

AppRegistry.registerComponent('Mynewproject', () => Mynewproject)