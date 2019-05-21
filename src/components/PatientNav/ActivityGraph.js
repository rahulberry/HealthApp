

import React from 'react'
import { BarChart, XAxis, Grid } from 'react-native-svg-charts'
import { View, ScrollView, Dimensions } from 'react-native';
import * as scale from 'd3-scale'

class ActivityGraph extends React.PureComponent {

    constructor(props){
      super(props);
      this.scrollref = React.createRef();
      this.startScroll = this.startScroll.bind(this);
    }

    startScroll() {
      // Explicitly focus the text input using the raw DOM API
      // Note: we're accessing "current" to get the DOM node
      this.scrollref.current.scrollToEnd();
    }

    render() {

        var d = new Date();
        var n = d.getDay();

        const day = [ 'Mon', 'Tue','Wed','Thu','Fri','Sat','Sun' ]
        const dataset = [ 24, 15, 28, 60, 75, 68, 69, 24, 15, 28, 60, 75, 68, 69, 24, 15, 28, 60, 75, 68, 69, 24, 15, 28, 60, 75, 68, 69 ]


        var colour = ['rgb(138,226,173)']

        for(var i = 1; i < 28; i++){
          if (dataset[i] > dataset[i-1]){
            colour.push('rgb(69, 204, 122)')
          } else {
            colour.push('rgb(138,226,173)')
          }
        }


        // if (2 > 1) {
        //   colour = ['rgb(138,226,173)']
        // } else {
        //   colour = ['rgb(138,126,173)']
        // }

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
                },
            },
            {
                data: data2,
                svg: {
                    fill: colour[1],
                },
            },
            {
                data: data3,
                svg: {
                    fill: colour[2],
                },
            },
            {
                data: data4,
                svg: {
                    fill: colour[3],
                },
            },
            {
                data: data5,
                svg: {
                    fill: colour[4],
                },
            },
            {
                data: data6,
                svg: {
                    fill: colour[5],
                },
            },
            {
                data: data7,
                svg: {
                    fill: colour[6],
                },
            },
            {
                data: data8,
                svg: {
                    fill: colour[7],
                },
            },
            {
                data: data9,
                svg: {
                    fill: colour[8],
                },
            },
            {
                data: data10,
                svg: {
                    fill: colour[9],
                },
            },
            {
                data: data11,
                svg: {
                    fill: colour[10],
                },
            },
            {
                data: data12,
                svg: {
                    fill: colour[11],
                },
            },
            {
                data: data13,
                svg: {
                    fill: colour[12],
                },
            },
            {
                data: data14,
                svg: {
                    fill: colour[13],
                },
            },
            {
                data: data15,
                svg: {
                    fill: colour[14],
                },
            },
            {
                data: data16,
                svg: {
                    fill: colour[15],
                },
            },
            {
                data: data17,
                svg: {
                    fill: colour[16],
                },
            },
            {
                data: data18,
                svg: {
                    fill: colour[17],
                },
            },
            {
                data: data19,
                svg: {
                    fill: colour[18],
                },
            },
            {
                data: data20,
                svg: {
                    fill: colour[19],
                },
            },
            {
                data: data21,
                svg: {
                    fill: colour[20],
                },
            },
            {
                data: data22,
                svg: {
                    fill: colour[21],
                },
            },
            {
                data: data23,
                svg: {
                    fill: colour[22],
                },
            },
            {
                data: data24,
                svg: {
                    fill: colour[23],
                },
            },
            {
                data: data25,
                svg: {
                    fill: colour[24],
                },
            },
            {
                data: data26,
                svg: {
                    fill: colour[25],
                },
            },
            {
                data: data27,
                svg: {
                    fill: colour[26],
                },
            },
            {
                data: data28,
                svg: {
                    fill: colour[27],
                },
            },
        ]

        return (
            <ScrollView horizontal={true}
                        snapToAlignment = 'end'
                        ref={this.scrollref} >
                <BarChart
                    style={ { height: 200, width: (Dimensions.get('window').width)*4, } }
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
        )
    }



}

export default ActivityGraph
