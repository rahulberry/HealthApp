import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import Avatar from '../Avatar';
import styles from './styles';
import PropTypes from 'prop-types';

export default class GroupItem extends Component {
    onPress = (item) => {
        this.props.navigation.navigate("StatsNavigation", {
            name: item.name,
            uid: item.uid, 
          });
    };
    render() {
        const { item } = this.props;
        return (
            <Card style={styles.card} onPress={this.onPress}>
                <View style={styles.cardView}>
                    <View style={styles.nameView}>
                        <Avatar large uri={item.display_image} />
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
