import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import Avatar from '../Avatar';
import styles from './styles';
import PropTypes from 'prop-types';

export default class GroupItem extends Component {
    onPress = () => {
        this.props.navigation.navigate('StatsNavigation');
    };
    render() {
        const { item } = this.props;
        return (
            <Card style={styles.card} onPress={this.onPress}>
                <View style={styles.cardView}>
                    <View style={styles.nameView}>
                        <Avatar large uri={'https://cdn4.iconfinder.com/data/icons/avatars-circle-2/72/142-512.png'} />
                        <Text style={styles.nameText}>{item.name}</Text>
                    </View>
                    <View style={styles.footer}>
                        <Text numberOflines={2} style={styles.members}>
                            {item.members}
                        </Text>
                    </View>
                </View>
            </Card>
        );
    }
}

GroupItem.propTypes = {
    item: PropTypes.object
};
