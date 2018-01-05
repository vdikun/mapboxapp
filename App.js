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

        this.data = TorontoData;
    }

    zoomIn() {
        let nextZoomLevel = this.state.zoomLevel + 1;
        if (nextZoomLevel > 15) {
            nextZoomLevel = 15;
        }
        this.setState({ zoomLevel: nextZoomLevel });
        this.componentDidMount();
    }

    zoomOut() {
        let nextZoomLevel = this.state.zoomLevel - 1;
        if (nextZoomLevel < 1) {
            nextZoomLevel = 1;
        }
        this.setState({ zoomLevel: nextZoomLevel });
        this.componentDidMount();
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

    componentDidMount() {
        let bounds = this.getBounds(this.data);
        this.map.fitBounds(bounds[0], bounds[1], [10,10,10,10]);
    }

    getBounds(data) {
        let minLat = data[0].latitude;
        let maxLat = data[0].latitude;
        let minLong = data[0].longitude;
        let maxLong = data[0].longitude;
        for (var i=1; i<data.length; i++) {
            let p = data[i];
            if (p.latitude < minLat) {
                minLat = p.latitude;
            }
            if (p.latitude > maxLat) {
                maxLat = p.latitude;
            }
            if (p.longitude < minLong) {
                minLong = p.longitude;
            }
            if (p.longitude > minLong) {
                maxLong = p.longitude;
            }
        }
        return [
            [ maxLong, maxLat ],
            [ minLong, minLat ]
        ];
    }

    render() {
        return (
            <View style={styles.container}>
                <Mapbox.MapView
                    ref={(ref) => this.map = ref}
                    style={styles.container}
                    showUserLocation={true}>
                    {this.renderAnnotations(this.data)}
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