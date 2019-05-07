import React, { Component} from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions } from 'react-native'
import { Text, View } from 'react-native-animatable'

import CustomButton from './components/CustomButton'
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default class Opening extends Component {
  // static propTypes = {
  //   onCreateAccountPress: PropTypes.func.isRequired,
  //   onSignInPress: PropTypes.func.isRequired
  // }

  render () {
    return (
      <View style={styles.container}>
        <View animation={'zoomIn'} delay={600} duration={400}>
          <CustomButton
            text={'Create Account'}
            onPress={this.props.onCreateAccountPress}
            buttonStyle={styles.createAccountButton}
            textStyle={styles.createAccountButtonText}
          />
        </View>
        <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{'Or'}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View animation={'zoomIn'} delay={800} duration={400}>
          <CustomButton
            text={'Sign In'}
            onPress={this.props.onSignInPress}
            buttonStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
          />
        </View>
        <View style={styles.practitionerContainer} animation={'zoomIn'} delay={700} duration={400}>
        <View style={styles.separatorLineGreen} />
            <Text style={styles.PractitionerLoginText}
                  onPress={this.props.onHealthPractitionerPress}>
                  {this.props.switchUserText}
            </Text>
        <View style={styles.separatorLineGreen} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: WIDTH * 0.1,
    justifyContent: 'center',
  },
  createAccountButton: {
    borderColor: '#8ae2ad',
    borderWidth: 3,
    borderRadius: 10
  },
  createAccountButtonText: {
    color: '#8ae2ad',
    fontFamily: 'Comfortaa'
  },
  separatorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: '#9B9FA4'
  },
  separatorOr: {
    color: '#9B9FA4',
    marginHorizontal: 8,
    fontFamily: 'Comfortaa'
  },
  signInButton: {
    backgroundColor: '#8ae2ad',
    borderColor: '#8ae2ad',
    borderWidth: 3,
    borderRadius: 10,
  },
  signInButtonText: {
    color: '#FFF',
    fontFamily: 'Comfortaa',
    fontWeight:'bold'
  },
  practitionerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },
  PractitionerLoginText: {
    color: '#8ae2ad',
    marginHorizontal: 8,
    fontFamily: 'Comfortaa'
  },
  separatorLineGreen: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: '#8ae2ad'
  },
})
