import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import TorontoData from './TorontoData.js';

Mapbox.setAccessToken('pk.eyJ1IjoidmRpa291biIsImEiOiJjamF5ams2bTgwZXk3MnFxcWFnMXVxMGl5In0.ZdESaIlfduaPM0CNqdr5Ug');

export default class App extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
              <Mapbox.MapView
                  styleURL={Mapbox.StyleURL.Street}
                  zoomLevel={15}
                  centerCoordinate={[11.256, 43.770]}
                  style={styles.container}>
              </Mapbox.MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});