import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import TorontoData from './TorontoData.js';

Mapbox.setAccessToken('pk.eyJ1IjoidmRpa291biIsImEiOiJjamF5ams2bTgwZXk3MnFxcWFnMXVxMGl5In0.ZdESaIlfduaPM0CNqdr5Ug');

export default class App extends Component<{}> {
    constructor (props) {
        super(props);

        this.state = {
            zoomLevel: 10
        };
    }

    zoomIn() {
        let nextZoomLevel = this.state.zoomLevel + 1;
        if (nextZoomLevel > 15) {
            nextZoomLevel = 15;
        }
        this.setState({ zoomLevel: nextZoomLevel });
        //this.map.zoomTo(nextZoomLevel, 400);
    }

    zoomOut() {
        let nextZoomLevel = this.state.zoomLevel - 1;
        if (nextZoomLevel < 1) {
            nextZoomLevel = 1;
        }
        this.setState({ zoomLevel: nextZoomLevel });
        //this.map.zoomTo(nextZoomLevel, 400);
    }

    renderAnnotations(data) {
        return (
            <View>
                { data.map((marker, i) => (
                    <Mapbox.PointAnnotation
                        key={i.toString()}
                        id={i.toString()}
                        coordinate={[marker.longitude, marker.latitude]}>
                        <View style={styles.annotationContainer}>
                            <View style={styles.annotationFill} />
                        </View>
                        <Mapbox.Callout title={marker.storeName} />
                    </Mapbox.PointAnnotation>
                ))}
            </View>
        )
    }

    render() {
        //const data = TorontoData.slice(0,4);
        const data = TorontoData.slice(0,160);
        const center = data[0];
        return (
            <View style={styles.container}>
                <Mapbox.MapView
                    ref={(ref) => this.map = ref}
                    zoomLevel={this.state.zoomLevel}
                    centerCoordinate={[center.longitude, center.latitude]}
                    style={styles.container}
                    showUserLocation={true}>
                    {this.renderAnnotations(data)}
                </Mapbox.MapView>
                <View style={ styles.zoomContainer }>
                    <TouchableOpacity style={styles.zoomButton}
                                      onPress={() => {
                                          this.zoomIn();
                                      }}>
                        <Text>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.zoomButton}
                                      onPress={() => {
                                          this.zoomOut();
                                      }}>
                        <Text>-</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    annotationContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
    },
    annotationFill: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'orange',
        transform: [{ scale: 0.6 }],
    },
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