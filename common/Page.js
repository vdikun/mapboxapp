import React from 'react';
import { View } from 'react-native';

import BaseExamplePropTypes from './BaseExamplePropTypes';
import MapHeader from './MapHeader';

import sheet from '../styles/sheet';
import colors from '../styles/colors';

class Page extends React.Component {
    static propTypes = {
        ...BaseExamplePropTypes,
    };

    render () {
        return (
            <View style={sheet.matchParent}>
                {this.props.children}
            </View>
        );
    }
}

export default Page;