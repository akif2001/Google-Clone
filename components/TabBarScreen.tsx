import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

const TabBarScreen = ({ screenName }: any) => {

    const Screen = require(screenName);

    return(
        <View>
        <Fragment>
            <Screen />
        </Fragment>

        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default TabBarScreen;