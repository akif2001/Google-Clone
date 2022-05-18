import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'

const SonucScreen = ({ route }: any) => {

    const { searchText } = route.params;

    const [searchDatas, setSearchDatas] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState(searchText);

    const NewEvilIcons = EvilIcons as any;

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'google-search1.p.rapidapi.com',
                'X-RapidAPI-Key': '3cd89df95bmsh295021dfafc3581p14a8c2jsn9c34bbeec0e0'
            }
        };

        fetch('https://google-search1.p.rapidapi.com/google-search?hl=en&q=' + searchText + '&gl=us', options)
            .then(response => response.json())
            .then(data => {
                setSearchDatas([data as never]);
                setSearchKeyword(data.keyword)
            })
            .catch(err => console.error(err));
    }, []);

    const searchDatasMap = () => {
        return searchDatas.map((x, i) => {
            return (
                <View key={i}>
                    {(x as any).organic.map((organicItem: any, organicIndex: any) => console.log('organicMap:', organicItem))}
                </View>
            )
        });
    }

    return (
        <View style={styles.container}>
            <View style={{ marginTop: '10%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View />

                    <TouchableWithoutFeedback>
                        <Image source={require('../assets/google-yazisi.png')} style={{ width: 100, height: 50 }} />
                    </TouchableWithoutFeedback>

                    <TouchableOpacity>
                        <Image source={require('../assets/profile-picture.bmp')} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => null} style={{ borderWidth: 2.5, borderColor: '#f5f5f5', borderRadius: 25, margin: 25 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <NewEvilIcons name='search' size={30} color='black' style={{ padding: 10 }} />

                        <TextInput value={searchKeyword} onChangeText={setSearchKeyword} placeholder='Ara...' style={{ width: 200, height: 50 }} />

                        <TouchableOpacity style={{ padding: 10 }}>
                            <Image source={require('../assets/google-voice-search.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>

                </View>

                <View>
                    {searchDatasMap() as any}
                </View>
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

export default SonucScreen;