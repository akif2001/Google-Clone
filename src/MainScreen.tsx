import React, { Component, useState, useMemo, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity, Text, BackHandler, ViewStyle } from 'react-native';
import { Gesture, GestureHandlerRootView, GestureDetector } from 'react-native-gesture-handler';
import Animated, { AnimatedStyleProp, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { CommonActions } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DiscoverScreen from './DiscoverScreen';
import AraScreen from './AraScreen';

import { useUndo, getUndo } from '../components/Memory';

const TAnimated = Animated.View as any;

const NewOcticons = Octicons as any;
const NewIonicons = Ionicons as any;
const NewMaterialCommunityIcons = MaterialCommunityIcons as any;

const TDiscoverScreen = DiscoverScreen as any;
const TAraScreen = AraScreen as any;

const MainScreen = ({ navigation }: any) => {

    const isSelectedDiscover = useSharedValue(true);
    const isSelectedAra = useSharedValue(false);
    const isSelectedKoleksiyonlar = useSharedValue(false);

    const [tabBarHeight, setTabBarHeight] = useState(75);
    const translateX = useSharedValue([{ x: 0 }]);
    const [pageFlex, setPageFlex] = useState(10);
    const [tabFlex, setTabFlex] = useState(1);

    const historyStep = useSharedValue(0);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            //console.log(getUndo(undoTranslateX));
            if (historyStep.value === 0) {
                console.log("historyStep.value değeri", historyStep.value, "olduğu için uygulamadan çıkışınız gerçekleştirildi!");
                navigation.dispatch(CommonActions.goBack());
                return true;
            }

            historyStep.value -= 1;
            //Animated.timing(translateX, translateX[historyStep]);
            //translateX.value[historyStep.value];
            return true;
        });

        return () => backHandler.remove();
    }, []);

    const tap = Gesture.Tap()
        .onTouchesDown(() => {
            if (isSelectedDiscover.value) {
                if (translateX.value[historyStep.value - 1]?.x == 0) return console.log("Aynı değerleri içerdiği için bu istek geri çevrilmiştir!")
                isSelectedDiscover.value = true;
                isSelectedAra.value = false;
                isSelectedKoleksiyonlar.value = false;

                //setTabBarHeight(75);
                //setTranslateX([{x: 0}]);
                historyStep.value += 1;
                translateX.value.push({ x: 0 });
                //translateX[historyStep].x = 0;
                //setPageFlex(10);
                //setTabFlex(1);
                console.log("translateX:", translateX.value[historyStep.value - 1].x, "historyStep:", historyStep.value);
            }

            if (isSelectedAra.value) {
                if (translateX.value[historyStep.value - 1]?.x == -362.5) return console.log("Aynı değerleri içerdiği için bu istek geri çevrilmiştir!")
                isSelectedDiscover.value = false;
                isSelectedAra.value = true;
                isSelectedKoleksiyonlar.value = false;

                //setTabBarHeight(0);
                //setTranslateX(-362.5);
                //setTranslateX([{x: -362.5}]);
                historyStep.value += 1;
                translateX.value.push({ x: -362.5 });
                //translateX[historyStep].x = -362.5;
                //setPageFlex(1);
                //setTabFlex(0);
                console.log("translateX:", translateX.value[historyStep.value - 1].x, "historyStep:", historyStep.value);
            }

            if (isSelectedKoleksiyonlar.value) {
                if (translateX.value[historyStep.value - 1]?.x == -725) return console.log("Aynı değerleri içerdiği için bu istek geri çevrilmiştir!")

                isSelectedDiscover.value = false;
                isSelectedAra.value = false;
                isSelectedKoleksiyonlar.value = true;

                //setTabBarHeight(75);
                //setTranslateX(-725);
                //setTranslateX([{x: -725}]);
                historyStep.value = translateX.value.length + 1;
                translateX.value.push({ x: -725 });
                //translateX[historyStep].x = -725;
                //setPageFlex(10);
                //setTabFlex(1);
                console.log("translateX:", translateX.value[historyStep.value - 1]?.x, "historyStep:", historyStep.value, "length:", translateX.value.length);
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value[historyStep.value - 1]?.x | 0 }
            ],
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[animatedStyle, { flex: pageFlex, flexDirection: 'row' }]}>
                <View style={{ width: '100%', height: 675 }}>
                    <TDiscoverScreen navigation={navigation} />
                </View>

                <View style={{ width: '100%', height: 675 }}>
                    <TAraScreen style={{ width: 1000, height: 675 }} />
                </View>
            </Animated.View>


            {isSelectedAra.value === true &&
                <View style={{ flex: tabFlex, alignSelf: 'flex-end', backgroundColor: '#fff', width: '100%', height: 100, display: isSelectedAra.value === true ? 'none' : 'flex' }}>
                    <GestureHandlerRootView>
                        <GestureDetector gesture={tap}>
                            <View>
                                <View style={{ width: '100%', height: 0.5, backgroundColor: '#999' }} />

                                <View style={{ flexDirection: 'row', backgroundColor: '#fff', width: '100%' }}>
                                    <TouchableOpacity onPress={() => {
                                        isSelectedDiscover.value = true;
                                        isSelectedAra.value = false;
                                        isSelectedKoleksiyonlar.value = false;
                                    }} style={{ width: '33%', alignItems: 'center' }}>
                                        <View style={{ width: '33%', alignItems: 'center' }}>
                                            <NewOcticons name="north-star" size={25} color={isSelectedDiscover.value ? '#11f' : '#999'} />
                                            <Text style={{ fontSize: 12.5, color: isSelectedDiscover.value ? '#11f' : '#999' }}>Discover</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {
                                        isSelectedDiscover.value = false;
                                        isSelectedAra.value = true;
                                        isSelectedKoleksiyonlar.value = false;
                                    }} style={{ width: '33%', alignItems: 'center' }}>
                                        <View style={{ width: '33%', alignItems: 'center' }}>
                                            <NewIonicons name="search" size={25} color={isSelectedAra.value ? '#11f' : '#999'} />
                                            <Text style={{ fontSize: 12.5, color: isSelectedAra.value ? '#11f' : '#999' }}>Ara</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {
                                        isSelectedDiscover.value = false;
                                        isSelectedAra.value = false;
                                        isSelectedKoleksiyonlar.value = true;
                                    }} style={{ width: '33%', alignItems: 'center' }}>
                                        <View style={{ width: '33%', alignItems: 'center' }}>
                                            <NewMaterialCommunityIcons name="content-copy" size={25} color={isSelectedKoleksiyonlar.value ? '#11f' : '#999'} />
                                            <Text style={{ fontSize: 12.5, color: isSelectedKoleksiyonlar.value ? '#11f' : '#999' }}>Koleksiyonlar</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </GestureDetector>
                    </GestureHandlerRootView>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default MainScreen;