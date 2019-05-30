import React, { Component } from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

export default class ProgressBarExperiments extends Component {

    render() {

        const data = [
            {
                key: 1,
                amount: 50,
                svg: { fill: '#600080', strokeLinecap: 'round' },
            },
            {
                key: 2,
                amount: 50,
                svg: { fill: '#9900cc', strokeLinecap: 'round' }
            },
            {
                key: 3,
                amount: 40,
                svg: { fill: '#c61aff', strokeLinecap: 'round' }
            },
            {
                key: 4,
                amount: 95,
                svg: { fill: '#d966ff', strokeLinecap: 'round' }
            },
            {
                key: 5,
                amount: 35,
                svg: { fill: '#ecb3ff', strokeLinecap: 'round' }
            }
        ]

        return (
            <PieChart
                style={{ height: 100, width: 100 }}
                valueAccessor={({ item }) => item.amount}
                data={data}
                spacing={0}
                innerRadius={'80%'}
            >
            </PieChart>
        )
    }

}
