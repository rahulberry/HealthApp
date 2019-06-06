

import React from 'react'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import { LineChart, Grid } from 'react-native-svg-charts'
import { View, ScrollView, Dimensions, Text } from 'react-native';
import * as scale from 'd3-scale';
import firebase from "firebase";
import * as shape from 'd3-shape';

class PainGraph extends React.PureComponent {

    constructor(props){
      super(props);
      this.state = {
        data: [ 10, 10, 28, 60, 75, 68, 69, 24, 18, 28, 60, 75, 68, 69, 24, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 ],
      }
      this.getdata()
    }

    getdata(){
      var userId = this.props.id;
      var firebaseRef = firebase.database().ref('/Patients/Testing/' + userId);
      return firebaseRef.once('value')
        .then((dataSnapshot) => {
          console.log('getting data', dataSnapshot.val());
          this.setState({ data: dataSnapshot.val().data });
        }
      );
    }

    componentDidMount(){
      //this.getdata()
    }

    render() {

          const data1 = this.state.data

          const Gradient = () => (
              <Defs key={'gradient'}>
                  <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                      <Stop offset={'0%'} stopColor={'rgb(240, 50, 50)'}/>
                      <Stop offset={'50%'} stopColor = {"#FFFF00"}/>
                      <Stop offset={'100%'} stopColor={"#7ccc9c"}/>
                  </LinearGradient>
              </Defs>
          )

          return (
            <ScrollView horizontal={true}
                        snapToAlignment = 'end'
                        ref= "scrollref"
                        onContentSizeChange={()=> this.refs.scrollref.scrollToEnd()}>
              <LineChart
                  style={ { height: 0.4 * Dimensions.get('window').width, width: (Dimensions.get('window').width)*4, } }
                  data={ data1 }
                  contentInset={ { top: 20, bottom: 20 } }
                  curve={ shape.curveNatural }
                  svg={{
                      strokeWidth: 2,
                      stroke: 'url(#gradient)',
                  }}
              >
                  <Grid/>
                  <Gradient/>
              </LineChart>
            </ScrollView>
          )
    }
}

export default PainGraph
