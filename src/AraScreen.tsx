import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';

const AraScreen = ({ navigation }: any) => {

    useEffect(() => {
        navigation.setOptions({ tabBarVisible: false });
    }, []);

    return(
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/google-logo.png')} style={{ width: 24, height: 24 }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default AraScreen;