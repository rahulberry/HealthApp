import AuthPatient from '../components/AuthPatient';
import AuthPractitioner from '../components/AuthPractitioner.js';
import BasePatient from './BasePatient'
import BasePractitioner from './BasePractitioner'
import {
createSwitchNavigator,
createAppContainer
} from 'react-navigation';


const AppNav = createAppContainer(createSwitchNavigator(
  {
    AuthPatient, 
    AuthPractitioner,
    BasePatient,
    BasePractitioner
  },
  {
    initialRouteName: 'BasePractitioner'
  },

));

const AppNavigator = createAppContainer(AppNav);
export default AppNavigator;
