import AuthPatient from '../components/AuthPatient';
import AuthPractitioner from '../components/AuthPractitioner.js';
import BasePatient from './BasePatient'
import BasePractitioner from './BasePractitioner'
import ChatsDoctor from '../components/PractitionerNav/ChatsDoctor'
import StatsNavigation from '../components/PatientNav/StatsNavigation';
import {
createSwitchNavigator,
createAppContainer
} from 'react-navigation';


const AppNav = createAppContainer(createSwitchNavigator(
  {
    AuthPatient, 
    AuthPractitioner,
    BasePatient,
    BasePractitioner,
    StatsNavigation
  },
  {
    initialRouteName: 'AuthPatient'
  },

));

const AppNavigator = createAppContainer(AppNav);
export default AppNavigator;
