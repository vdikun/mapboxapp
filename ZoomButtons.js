import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

class ZoomButtons extends React.Component {

    render () {
        return (
            <View style={ styles.zoomContainer }>
                <TouchableOpacity style={styles.zoomButton}
                                  onPress={() => {
                                      this.props.zoomIn();
                                  }}>
                    <Text>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.zoomButton}
                                  onPress={() => {
                                      this.props.zoomOut();
                                  }}>
                    <Text>-</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    zoomButton: {
        borderRadius: 15,
        margin: 5,
        borderWidth: 1,
        borderColor: '#bbbbbb',
        width: 30,
        height: 30,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    zoomContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'absolute',
        bottom: 0,
        right: 0
    },
});

export default ZoomButtons;