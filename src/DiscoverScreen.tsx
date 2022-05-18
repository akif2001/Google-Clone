import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Image, PermissionsAndroid, ImageURISource, ImageSourcePropType, TextInput } from 'react-native';
import * as Location from 'expo-location';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const DiscoverScreen = ({ navigation, style }: any) => {

    const [dereceHavaTahmini, setDereceHavaTahmini] = useState(0);
    const [resimHavaTahmini, setResimHavaTahmini] = useState('');
    const [haberDizisi, setHaberDizisi] = useState([]);

    const NewEvilIcons = EvilIcons as any;
    const NewFeather = Feather as any;
    const NewAntDesign = AntDesign as any;
    const NewEntypo = Entypo as any;

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Lokasyon izni reddedildi!");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + location.coords.latitude + "&lon=" + location.coords.longitude + "&limit=1&units=metric&appid=1ac26f8a3662fd59808a6ba9cb1591ee")
                .then(response => response.json())
                .then(data => {
                    setDereceHavaTahmini(Math.floor(data.main.temp));

                    data.weather.forEach((e: any) => {
                        setResimHavaTahmini('https://openweathermap.org/img/wn/' + e.icon + '@2x.png');
                    });
                }).catch(err => {
                    console.log(err.message);
                });
        })();

        fetch('https://newsapi.org/v2/everything?q=haberler&apiKey=591fc810e1cc4e199fd3e867f78aa67c')
            .then(response => response.json())
            .then(data => {
                data.articles.forEach((element: any) => {
                    setHaberDizisi([data as never]);
                });
            }).catch(err => {
                console.log(err.message);
            });
    }, []);

    const haberlerMap = () => {
        return haberDizisi.map((item, index) => {
            return (item as any).articles.map((element: any, id: any) => {
                let date = new Date(element.publishedAt).getDate() - new Date().getDate()
                return (
                    <View key={id}>
                        <TouchableOpacity>
                            <View style={{ margin: 10 }}>
                                <Image source={{ uri: element.urlToImage }} style={{ width: '100%', height: 250, borderRadius: 15 }} />

                                <Text style={{ fontSize: 20, margin: 5 }}>{element.title}</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', padding: 5 }}>
                                        <Text style={{ color: '#a5a5a5' }}>{element.author}</Text>

                                        <Text style={{ color: '#a5a5a5' }}> • </Text>

                                        <Text style={{ color: '#a5a5a5' }}>{date} g.</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', padding: 5 }}>
                                        <NewFeather name="heart" size={17.5} color="gray" style={{ margin: 7.5 }} />

                                        <NewAntDesign name="sharealt" size={17.5} color="gray" style={{ margin: 7.5 }} />

                                        <NewEntypo name="dots-three-vertical" size={17.5} color="gray" style={{ margin: 7.5 }} />
                                    </View>
                                </View>

                            </View>

                            <View style={{ width: '100%', height: 0.5, backgroundColor: '#999' }} />
                        </TouchableOpacity>
                    </View>
                );
            });
        });
    }

    return (
        <ScrollView style={[styles.container, {  }]}>
            <View style={{ marginTop: '5%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10, marginTop: 15 }}>
                    <TouchableOpacity style={{ borderWidth: 0.5, borderColor: '#999', borderRadius: 17.5, padding: 2.5 }}>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                            <Image source={{ uri: resimHavaTahmini } as any} style={{ width: 30, height: 30 }} />
                            <Text style={{ fontSize: 12.5, fontWeight: '500' }}>{dereceHavaTahmini}° C</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image source={require('../assets/profile-picture.bmp')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>

                <Image source={require('../assets/google-yazisi.png')} style={{ width: 175, height: 75, alignSelf: 'center' }} />

                <TouchableOpacity onPress={() => navigation.navigate('Ara')} style={{ borderWidth: 2.5, borderColor: '#f5f5f5', borderRadius: 25, margin: 25 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <NewEvilIcons name='search' size={30} color='black' style={{ padding: 10 }} />

                        <TextInput placeholder='Ara...' style={{ width: 150, height: 50 }} />

                        <TouchableOpacity style={{ padding: 10 }}>
                            <Image source={require('../assets/google-voice-search.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ padding: 10 }}>
                            <Image source={require('../assets/google-camera-search.webp')} style={{ width: 22.5, height: 22.5 }} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

                <View>
                    {haberlerMap() as any}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});

export default DiscoverScreen;