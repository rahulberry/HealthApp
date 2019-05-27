# Orbis Health App

[//]: # (Include an image of the logo here.)

The Orbis Health App is an application created using react native that is designed to help improve quality of life for patients that are suffering from Intermittent Claudation. 

A common treatment for this disease is surgery but research shows that changes in lifestyle and exercise habits can help without requring surgery. An issue that can occur is that patients aren't motivated to exercise and therefore choose not to. In an attempt to counter this, this application provides a social platform that allows groups of patients to do exercise together. It includes a messaging system; a system for keeping track of and creating new events; detailed statistics that can be viewed and monitored by a health practitioner.

## Contents
- [Orbis Health App](#orbis-health-app)
  - [Contents](#contents)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Screenshots](#screenshots)
  - [Credits](#credits)
  - [License](#license)


## Requirements

[Node.js](https://nodejs.org/en/) is required to install packages. Alternatively, [Yarn](https://yarnpkg.com/en/docs/install#windows-stable) can be used.

This application requires [react native](https://github.com/facebook/react-native) to be installed. Android Studio or the Android SDK (API 16 or newer) is required to run the android version, and XCode with macOS is required to run the iOS version.

## Installation

To run this application:
- Clone this repository and navigate into the the directory using the terminal. 
- Run the command `npm install` (or `yarn` if using yarn) to install the necessary packages.
- Run the command `react-native run-android` or `react-native run-ios` to launch the app. Make sure that a device with USB debugging is connected or that a [device emulator is running](https://developer.android.com/studio/run/managing-avds.html#viewing).

## Usage

To use this application, first create an account and log into the patient of health practitioner section of the application. Note that messages, events, account information, and statistics are stored on a Firebase server meaning that the mobile device must be connected to the internet in order to function correctly.

From the patient side of the application, the following pages are available:
- **Activites:** This page allows the user to track their walking or running. It monitors distance travelled, time, and pace. If the users pace falls below a certain threshold then the phone will vibrate letting them know they should up their pace. After an activity is completed, the user can provide feedback on how on how hard or painful the exercide was using a slider. This is tracked and allows the health practitioner to check for improvements.
- **Events:** This page allows any user to create events and let other users know if they are going to an event or not. This page is split into 'My Events' which shows only events you are going to, and 'All Events' which lists all events that people in the group have made. Events can be tapped on and will load a page with information about that event. If an event is long pressed, then a popup will come up asking if the user would like to delete it.
- **Stats:** This page shows all completed events and each events various statistics such as time, distance, and map information. This page, like the Events page, is split into Personal and Group section and each event can be tapped on to bring up more information. This page also has a chart that shows the trends of the exercise over the past four weeks.
- **Chats:** This page has a group messaging section that allows users to talk to other members of their group, as well as a section that allows the user to directly message their health practitioner privately.
- **Profile:** This page includes profile information and acheivements. The acheivements can be worked towards by finishing activities.

From the health practitioner side of the application, the following pages are available:
- **Events:** This page lets the health practitioner monitor all the events that are going on without having to talk to patients directly. It is similar to the patients events list but without the ability to create or delete events.
- **Chats:** This page contains all the personal chats with each patient. If a patient is not making progress as expected, this allows the health practitioner to find out why without having to bring the patient in for a formal doctors appointment.
- **Groups:** This page contains a list of all the groups that a health practitioner is monitoring. The information such as pain trends and how much exercise a group is doing are shown in this section. This part of the application is designed to reduce the work of the health practitioner by providing detailed information and feedback for each group in one central location. This is better than asking the group directly about how they felt since the patient may not remember the details of an activity. 

## Screenshots

[//]: # (get more screenshots and maybe a gif.)

![activities](https://raw.githubusercontent.com/rahulberry/HealthApp/master/assets/activities.jpg)

![events](https://raw.githubusercontent.com/rahulberry/HealthApp/master/assets/events.jpg)

![profile](https://raw.githubusercontent.com/rahulberry/HealthApp/master/assets/profile.jpg)

## Credits

This application was developed as a third year Electrical and Electronic engineering group project at Imperial College London by:
- Josh Jennings
- Rahul Berry
- Enda Mulville
- Low Yee Hong
- Alorika Chakravorty
- Paul Pranav

## License

This application is MIT Licensed which is found in the [LICENSE file](https://github.com/rahulberry/HealthApp/blob/master/LICENSE).


