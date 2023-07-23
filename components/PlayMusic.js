import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, StyleSheet, Image, Slider, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
// or any pure javascript modules available in npm

const PlayMusic = ({navigation}) => {
  const [timestamp, setTimestamp] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

 useEffect(() => {
    // Xử lý logic để cập nhật time stamp và thời lượng khi nhạc được phát
    // Thay đổi giá trị của `timestamp` và `duration` dựa trên thời lượng của nhạc
    // Ví dụ: setTimestamp(30) và setDuration(120) cho một bài hát có thời lượng 120 giây và đã phát trong 30 giây
    setTimestamp(0);
    setDuration(120);
  }, []);

  useEffect(() => {
    let interval ;

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
    const formattedSeconds = remainingSeconds.toFixed(0); // Làm tròn giá trị số và loại bỏ phần thập phân
    return `${minutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}`;
  };
  

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Xử lý logic play/pause của âm nhạc ở đây
  };

  const handleNext = () => {
    // Xử lý logic next của âm nhạc ở đây
  };

  const handlePrevious = () => {
    // Xử lý logic previous của âm nhạc ở đây
  };

  const handleSliderChange = (value) => {
    setTimestamp(value);
    // Xử lý logic khi người dùng kéo thanh slider
  };

  return (
    <LinearGradient style={styles.container} colors={[ '#9896F0', '#FBC8D5']}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.cardImage}
          source={{
            uri: 'https://i.scdn.co/image/ab67616d00001e0229caad7badcaac6f395a77b2',
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>Name Song</Text>
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
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity>
          <FontAwesome name={'random'} size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePrevious}>  
          <FontAwesome5 name={'step-backward'} size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity  onPress={handlePlayPause}>
          {isPlaying ? (
            <FontAwesome name={'pause-circle'} size={60} color="white" />
          ) : (
            <FontAwesome name={'play-circle'} size={60} color="white" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <FontAwesome5 name={'step-forward'} size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name={'loop'} size={25} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EB9595',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  imageContainer: {
    width: '90%',
    height: '50%',
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'rgba(0,0,0,0.75)',
    shadowOpacity: 1,
    marginBottom: 120,
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',

  },
  textContainer: {
    position: 'absolute',
    width: '90%',
    height: '30%', // Tăng chiều cao của textContainer
    bottom: 10,
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20

  },
  cardTitle: {
    color: 'white',
    textAlign: 'center',
    marginTop: 7,
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
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
    margin: 5,
    padding: 10
  },
  iconBack: {
    position: 'relative',
    left: 0,
    right: 100,
  }
});

export default PlayMusic;
