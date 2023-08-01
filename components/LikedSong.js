import React, { useContext, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomModal } from 'react-native-modals';
import { ModalContent } from 'react-native-modals';
import SavedSongs from './SavedSongs';
import { Player } from './PlayerContext';
import Slider from '@react-native-community/slider';
import TrackPlayer from 'react-native-track-player';

function LikedSong() {
    const navigation = useNavigation();
    const [find, setFind] = useState('');
    const [saved, setSaved] = useState([]);
    const { currentTrack, setCurrentTrack } = useContext(Player);
    const [modalVisible, setModalVisible] = useState(false);
    // const [currentSound, setCurrentSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timestamp, setTimestamp] = useState(0);
    const [duration, setDuration] = useState(0);

    TrackPlayer.setupPlayer()


    async function getSavedTracks() {
        const accessToken = await AsyncStorage.getItem("token");
        const response = await fetch(
            "https://api.spotify.com/v1/me/tracks?offset=0&limit=50",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    limit: 50,
                },
            }
        );

        if (!response.ok) {
            throw new Error("failed to fetch the tracks");
        }
        const data = await response.json();
        setSaved(data.items);
    }

    useEffect(() => {
        getSavedTracks();
    }, []);




    const playMusic = async () => {
        if (saved.length > 0) {
            setCurrentTrack(saved[0]);
        }
        await play(saved[0])
    }

    const play = async (nextTrack) => {
        const preview = nextTrack?.track?.preview_url;


        // Kiểm tra nếu có bài hát đang chạy thì dừng bài hát đó trước
        await TrackPlayer.stop();

        await TrackPlayer.add({
            url: preview,
        });

        // Phát nhạc
        setIsPlaying(isPlaying)
        await TrackPlayer.play();
    };

    // const stopMusic = async () => {
    //     await TrackPlayer.stop();
    // };

    // const getPlaybackState = async () => {
    //     const state = await TrackPlayer.getState();
    //     const position = await TrackPlayer.getPosition();
    //     const duration = await TrackPlayer.getDuration(nextTrack?.duration_ms);
    //     // Cập nhật state và duration ở đây
    //     setTimestamp(position); // Cập nhật thời gian hiện tại khi phát nhạc
    //     setDuration(duration); // Cập nhật tổng thời lượng bài hát
    // };

    // useEffect(() => {
    //     // Lắng nghe sự kiện khi trạng thái phát nhạc thay đổi
    //     const onPlaybackStateChange = async (state) => {
    //         console.log(state)
    //         getPlaybackState();
    //     };
    //     TrackPlayer.addEventListener('playback-state', onPlaybackStateChange);

    //     // Bỏ lắng nghe sự kiện khi component unmount
    // }, []);

    useEffect(() => {
        // Xử lý logic để cập nhật time stamp và thời lượng khi nhạc được phát
        // Thay đổi giá trị của `timestamp` và `duration` dựa trên thời lượng của nhạc
        // Ví dụ: setTimestamp(30) và setDuration(120) cho một bài hát có thời lượng 120 giây và đã phát trong 30 giây
        setTimestamp(0);
        setDuration(120);
    }, []);

    useEffect(() => {
        let interval;

        if (isPlaying) {
            interval = setInterval(() => {
                setTimestamp((prevTimestamp) => {
                    const newTimestamp = prevTimestamp + 1;
                    if (newTimestamp >= duration) {
                        clearInterval(interval);
                        setIsPlaying(false);
                        return duration;
                    }
                    return newTimestamp;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isPlaying, duration]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedSeconds = remainingSeconds.toFixed(0);
        return `${minutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}`;
    };

    const handleSliderChange = (value) => {
        // Xử lý logic khi người dùng kéo thanh slider
        setTimestamp(value);
    };


    return (
        <>
            <LinearGradient colors={['#9896F0', '#FBC8D5']} style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, marginTop: 40 }}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name='arrow-back' size={30} color='white' marginBottom={5} />
                        <View style={styles.containerHeader}>
                            <Text style={[styles.headerText]}>My Favorite <Text style={{ color: '#FBC8D5', fontWeight: 'bold' }}>Playlist</Text></Text>
                        </View>
                    </Pressable>

                    <Pressable>
                        <Pressable style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                            backgroundColor: '#F0FFF0',
                            flex: 1,
                            borderRadius: 3,
                            width: 400,
                            marginLeft: 5,
                            borderRadius: 10,

                        }}>
                            <FontAwesome name='search' size={24} marginLeft={15} />
                            <TextInput
                                value={find}
                                onChangeText={(text) => setFind(text)}
                                placeholder='How about some music?'
                                style={{
                                    width: 300,
                                    borderRadius: 15,
                                    marginHorizontal: 10,
                                    marginRight: 20,
                                    height: 50,
                                    fontFamily: 'georgia',
                                    textAlign: 'center',
                                    color: 'black',
                                    backgroundColor: '#F0FFF0',
                                    alignContent: 'center',
                                    fontSize: 18,
                                    fontWeight: '700'
                                }}
                            />
                        </Pressable>
                    </Pressable>
                    <View style={{ height: 50 }} />
                    <View>
                        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', marginLeft: 10, marginTop: 5, }}>Liked Song</Text>
                        <Text style={{ fontSize: 20, color: 'white', marginTop: 5, marginLeft: 10 }}>500 Song</Text>
                    </View>
                    <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'space-between', marginHorizontal: 15 }}>
                        <Pressable>
                            <Ionicons name='arrow-down-circle-outline' size={40} color={'#a366ff'} marginTop={6} marginLeft={15} />
                        </Pressable>
                        <View>
                            <Pressable onPress={playMusic}>
                                <FontAwesome name='play-circle' size={70} color={'#8080ff'} marginRight={8} />
                            </Pressable>
                        </View>
                    </Pressable>
                    <FlatList showsVerticalScrollIndicator={false} data={saved} renderItem={({ item }) => (
                        <SavedSongs item={item} />
                    )} />
                </ScrollView>
            </LinearGradient>

            {currentTrack && (
                <Pressable onPress={() => setModalVisible(!modalVisible)} style={{ backgroundColor: '#EE82EE', width: "90%", padding: 10, marginLeft: "auto", marginRight: "auto", marginBottom: 15, position: 'absolute', borderRadius: 6, left: 20, bottom: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image style={{ width: 40, height: 40 }} source={{ uri: currentTrack?.track?.album?.images[0].url }} />
                        <Text numberOfLines={2} style={{ fontWeight: 'bold', maxWidth: 220 }}>
                            {currentTrack?.track?.name} •{" "}
                            {currentTrack?.track?.artists[0].name}
                        </Text>
                    </View>
                    <View>
                        <Pressable>
                            <FontAwesome name={'play'} size={24} color="white" />
                        </Pressable>
                    </View>
                </Pressable>
            )}
            <BottomModal visible={modalVisible} onHardwareBackPress={() => setModalVisible(false)} swipeDirection={["up", "down"]} swipeThreshold={200} onSwipeOut={() => setModalVisible(false)}>
                <ModalContent style={{ width: "100%", height: "100%", backgroundColor: "#FBC8D5" }}>

                    <View style={{ width: "100%", height: "100%", marginTop: 40 }}>
                        <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <FontAwesome name='angle-down' size={30} color='black' onPress={() => setModalVisible(!modalVisible)} />
                            <Text style={{ color: 'black', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', fontSize: 15, fontWeight: 'bold' }}>{currentTrack?.track?.name}</Text>
                        </Pressable>
                        <View style={{ height: 70 }} />
                        <View>
                            <Image style={{ width: "100%", height: 350, borderRadius: 8 }} source={{ uri: currentTrack?.track?.album?.images[0].url }} />
                        </View>
                        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ color: 'black', alignItems: 'center', fontSize: 20, fontWeight: 'bold' }}>
                                    {currentTrack?.track?.name}
                                </Text>
                                <Text style={{ color: 'black', alignItems: 'center', fontSize: 15, marginTop: 4 }}>
                                    {currentTrack?.track?.artists[0].name}
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <View style={styles.progressContainer}>
                                <Text style={styles.timestamp}>{formatTime(timestamp)}</Text>
                                <Slider
                                    style={styles.slider}
                                    value={timestamp}
                                    minimumValue={0}
                                    maximumValue={duration}
                                    minimumTrackTintColor="#EB9595"
                                    maximumTrackTintColor="#000000"
                                    thumbTintColor="#EB9595"
                                    onValueChange={handleSliderChange}
                                    onSlidingComplete={handleSliderChange} // Xử lý khi người dùng kết thúc kéo thanh slider
                                />
                                <Text style={styles.duration}>{formatTime(duration)}</Text>
                            </View>
                            <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                            <Pressable>
                                <FontAwesome name='random' size={30} />
                            </Pressable>
                            <Pressable>
                                <Ionicons name='play-skip-back' size={30} />
                            </Pressable>
                            <Pressable onPress={play}>
                                {isPlaying ? (
                                    <Ionicons name={'pause-circle'} size={60} color="white" />
                                ) : (
                                    <Ionicons name={'play-circle'} size={60} color="white" />
                                )}
                            </Pressable>
                            <Pressable>
                                <Ionicons name='play-skip-forward' size={30} />
                            </Pressable>
                            <Pressable>
                                <MaterialIcons name='repeat' size={30} />
                            </Pressable>
                        </View>
                    </View>



                </ModalContent>
            </BottomModal>
        </>
    );
}
const styles = StyleSheet.create({
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'cursive',
        fontSize: 40,
        marginRight: 10,
        textAlign: 'center',
        marginBottom: 10,
    },
    searchBar: {
        width: 390,
        borderRadius: 30,
        marginHorizontal: 10,
        height: 40,
        fontFamily: 'tahoma',
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#F0FFF0',
        alignContent: 'center',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    timestamp: {
        color: 'white',
        fontSize: 12,
        marginRight: 5,
    },
    slider: {
        flex: 1,
    },
    duration: {
        color: 'white',
        fontSize: 12,
        marginLeft: 5,
    },

});

export default LikedSong;