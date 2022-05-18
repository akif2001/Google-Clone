import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const AraScreen = ({ navigation, style }: any) => {

    const [searchText, setSearchText] = useState('');

    useEffect(() => {

    }, []);

    return (
        <View style={[styles.container, {}]}>
            <View style={{ marginTop: '10%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableWithoutFeedback>
                        <Image source={require('../assets/google-logo.png')} style={{ width: 24, height: 24, margin: 10, marginLeft: 15 }} />
                    </TouchableWithoutFeedback>

                    <TextInput value={searchText} onChangeText={setSearchText} onSubmitEditing={() => navigation.navigate('Sonuc', { searchText })} placeholder='Arama yapın...' style={{ width: '70%', height: 50, padding: 10 }} />

                    <TouchableOpacity>
                        <Image source={require('../assets/google-voice-search.png')} style={{ width: 24, height: 24, margin: 10 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ width: '95%', height: 0.5, backgroundColor: '#999', alignSelf: 'center' }} />


            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default AraScreen;