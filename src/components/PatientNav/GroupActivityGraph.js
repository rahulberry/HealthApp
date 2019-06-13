

import React from 'react'
import { BarChart, XAxis, Grid } from 'react-native-svg-charts'
import { View, ScrollView, Dimensions, Text } from 'react-native';
import * as scale from 'd3-scale'
import firebase from "firebase";

class ActivityGraph extends React.PureComponent {

    constructor(props){
      super(props);
      this.state = {
        data: [ 10, 10, 28, 60, 75, 68, 69, 24, 18, 28, 60, 75, 68, 69, 24, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 ],
        info: 25,
        eventsArray: [],
      }
      this.props.callbackFromParent(27);
      this.getdata()
    }

    getdata(){
      var uID = this.props.id;
      var firebaseRef = firebase.database().ref('/Patients/' + uID + '/Stats');
      return firebaseRef.once('value')
        .then((dataSnapshot) => {
          console.log('getting data', dataSnapshot.val().distanceArray);
          this.setState({ data: dataSnapshot.val().distanceArray });
        }
      ).then( () => {
        var firebaseRef = firebase.database().ref('Events/events');
        return firebaseRef.once('value')
            .then((dataSnapshot) => {
                console.log('test1', dataSnapshot.val());
                this.setState({ eventsArray: dataSnapshot.val() });
            }
        )
      })


    }

    componentDidMount(){
      //this.getdata()
    }

    render() {
        var d = new Date();
        var n = d.getDay();

        events = this.state.eventsArray;

        var currentTime = Math.round((new Date()).getTime() / 1000);
        let filteredItems = events.filter(item => item.key <= currentTime);
        var currentDay = currentTime - (currentTime % 86400);




        const day = [ 'Mon', 'Tue','Wed','Thu','Fri','Sat','Sun' ]
        var dataset = this.state.data

        for(var i = 0; i < 28; i++){

          var temp = 2;

          var currentDay1 = currentDay - (86400 * (27 - i))
          var currentTommorrow = currentDay1 + 86400;
          var filteredItems1 = filteredItems.filter(item => (item.key < currentTommorrow) && (item.key > currentDay1));


          for (var j = 0; j < filteredItems1.length; j++) {
	              temp += filteredItems1[j].going.length * filteredItems1[j].distance;
          }

          dataset[i] = temp;
        }


        var colour = ["#7ccc9c"]

        for(var i = 1; i < 28; i++){
          if (this.props.currentday == i){
            colour.push('rgb(240, 64, 122)')
          }
          else if (dataset[i] > dataset[i-1]){
            colour.push('rgb(69, 204, 122)')
          } else {
            colour.push("#7ccc9c")
          }
        }

        const data1 = [ dataset[0] ]
          .map((value) => ({ value }))
        const data2 = [ dataset[1] ]
          .map((value) => ({ value }))
        const data3 = [ dataset[2] ]
          .map((value) => ({ value }))
        const data4 = [ dataset[3] ]
          .map((value) => ({ value }))
        const data5 = [ dataset[4] ]
          .map((value) => ({ value }))
        const data6 = [ dataset[5] ]
          .map((value) => ({ value }))
        const data7 = [ dataset[6] ]
          .map((value) => ({ value }))
        const data8 = [ dataset[7] ]
          .map((value) => ({ value }))
        const data9 = [ dataset[8] ]
          .map((value) => ({ value }))
        const data10 = [ dataset[9] ]
          .map((value) => ({ value }))
        const data11 = [ dataset[10] ]
          .map((value) => ({ value }))
        const data12 = [ dataset[11] ]
          .map((value) => ({ value }))
        const data13 = [ dataset[12] ]
          .map((value) => ({ value }))
        const data14 = [ dataset[13] ]
          .map((value) => ({ value }))
        const data15 = [ dataset[14] ]
          .map((value) => ({ value }))
        const data16 = [ dataset[15] ]
          .map((value) => ({ value }))
        const data17 = [ dataset[16] ]
          .map((value) => ({ value }))
        const data18 = [ dataset[17] ]
          .map((value) => ({ value }))
        const data19 = [ dataset[18] ]
          .map((value) => ({ value }))
        const data20 = [ dataset[19] ]
          .map((value) => ({ value }))
        const data21 = [ dataset[20] ]
          .map((value) => ({ value }))
        const data22 = [ dataset[21] ]
          .map((value) => ({ value }))
        const data23 = [ dataset[22] ]
          .map((value) => ({ value }))
        const data24 = [ dataset[23] ]
          .map((value) => ({ value }))
        const data25 = [ dataset[24] ]
          .map((value) => ({ value }))
        const data26 = [ dataset[25] ]
          .map((value) => ({ value }))
        const data27 = [ dataset[26] ]
          .map((value) => ({ value }))
        const data28 = [ dataset[27] ]
          .map((value) => ({ value }))



        const barData = [
            {
                data: data1,
                svg: {
                    fill: colour[0],
                    onPress: () => this.props.callbackFromParent('0'),
                },
            },
            {
                data: data2,
                svg: {
                    fill: colour[1],
                    onPress: () => this.props.callbackFromParent('1'),
                },
            },
            {
                data: data3,
                svg: {
                    fill: colour[2],
                    onPress: () => this.props.callbackFromParent('2'),
                },
            },
            {
                data: data4,
                svg: {
                    fill: colour[3],
                    onPress: () => this.props.callbackFromParent(3),
                },
            },
            {
                data: data5,
                svg: {
                    fill: colour[4],
                    onPress: () => this.props.callbackFromParent(4),
                },
            },
            {
                data: data6,
                svg: {
                    fill: colour[5],
                    onPress: () => this.props.callbackFromParent(5),
                },
            },
            {
                data: data7,
                svg: {
                    fill: colour[6],
                    onPress: () => this.props.callbackFromParent(6),
                },
            },
            {
                data: data8,
                svg: {
                    fill: colour[7],
                    onPress: () => this.props.callbackFromParent('7'),
                },
            },
            {
                data: data9,
                svg: {
                    fill: colour[8],
                    onPress: () => this.props.callbackFromParent('8'),
                },
            },
            {
                data: data10,
                svg: {
                    fill: colour[9],
                    onPress: () => this.props.callbackFromParent(9),
                },
            },
            {
                data: data11,
                svg: {
                    fill: colour[10],
                    onPress: () => this.props.callbackFromParent(10),
                },
            },
            {
                data: data12,
                svg: {
                    fill: colour[11],
                    onPress: () => this.props.callbackFromParent(11),
                },
            },
            {
                data: data13,
                svg: {
                    fill: colour[12],
                    onPress: () => this.props.callbackFromParent(12),
                },
            },
            {
                data: data14,
                svg: {
                    fill: colour[13],
                    onPress: () => this.props.callbackFromParent('13'),
                },
            },
            {
                data: data15,
                svg: {
                    fill: colour[14],
                    onPress: () => this.props.callbackFromParent('14'),
                },
            },
            {
                data: data16,
                svg: {
                    fill: colour[15],
                    onPress: () => this.props.callbackFromParent('15'),
                },
            },
            {
                data: data17,
                svg: {
                    fill: colour[16],
                    onPress: () => this.props.callbackFromParent('16'),
                },
            },
            {
                data: data18,
                svg: {
                    fill: colour[17],
                    onPress: () => this.props.callbackFromParent('17'),
                },
            },
            {
                data: data19,
                svg: {
                    fill: colour[18],
                    onPress: () => this.props.callbackFromParent('18'),
                },
            },
            {
                data: data20,
                svg: {
                    fill: colour[19],
                    onPress: () => this.props.callbackFromParent('19'),
                },
            },
            {
                data: data21,
                svg: {
                    fill: colour[20],
                    onPress: () => this.props.callbackFromParent('20'),
                },
            },
            {
                data: data22,
                svg: {
                    fill: colour[21],
                    onPress: () => this.props.callbackFromParent('21'),
                },
            },
            {
                data: data23,
                svg: {
                    fill: colour[22],
                    onPress: () => this.props.callbackFromParent('22'),
                },
            },
            {
                data: data24,
                svg: {
                    fill: colour[23],
                    onPress: () => this.props.callbackFromParent('23'),
                },
            },
            {
                data: data25,
                svg: {
                    fill: colour[24],
                    onPress: () => this.props.callbackFromParent('24'),
                },
            },
            {
                data: data26,
                svg: {
                    fill: colour[25],
                    onPress: () => this.props.callbackFromParent('25'),
                },
            },
            {
                data: data27,
                svg: {
                    fill: colour[26],
                    onPress: () => this.props.callbackFromParent('26'),
                },
            },
            {
                data: data28,
                svg: {
                    fill: colour[27],
                    onPress: () => this.props.callbackFromParent('27'),
                },
            },
        ]

        return (
          <View>
            <ScrollView horizontal={true}
                        snapToAlignment = 'end'
                        ref= "scrollref"
                        onContentSizeChange={()=> this.refs.scrollref.scrollToEnd()}>
                <BarChart
                    style={ { height: 0.4 * Dimensions.get('window').width, width: (Dimensions.get('window').width)*4, } }
                    data={ barData }
                    yAccessor={({ item }) => item.value}
                    svg={{
                        fill: 'green',
                    }}
                    contentInset={ { top: 30, bottom: 30 } }
                    { ...this.props }
                    spacingInner = { 0.00 }
                    spacingOuter = { 0.00 }
                >
                <XAxis
                    style={{ marginTop: 10 }}
                    data={ barData }
                    scale={ scale.scaleBand }
                    formatLabel={ (value, index) => day[(index + n) % 7] }
                    labelStyle={ { color: 'black' } }
                />
                </BarChart>

              </ScrollView>
            </View>
        )
    }



}

export default ActivityGraph
