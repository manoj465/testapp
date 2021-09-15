import React, { useEffect } from 'react';
import {
  Button, SafeAreaView, StatusBar, Text,
  useColorScheme
} from 'react-native';
import Animated, {
  Easing, useAnimatedStyle, useSharedValue, withTiming
} from 'react-native-reanimated';
import RNSoundLevel from 'react-native-sound-level';
import { Colors } from 'react-native/Libraries/NewAppScreen';
/*  */
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  let soundArray = [0, 0, 0, 0, 0]
  let soundGapArray = [0, 0, 0, 0, 0]
  let mean = 0
  let lastMean = 0
  let colors = [16711680]
  const width = useSharedValue(50);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(width.value, {
        duration: 300,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  }, []);



  RNSoundLevel.onNewFrame = (data) => {
    // see "Returned data" section below
    let value = 100 + data.value
    //console.log(-data.value)
    if (soundArray.length < 5) {
      soundArray.push(value)
    }
    else {
      soundArray[0] = soundArray[1]
      soundArray[1] = soundArray[2]
      soundArray[2] = soundArray[3]
      soundArray[3] = soundArray[4]
      soundArray[4] = value
    }
    mean = (soundArray[0] + soundArray[1] + soundArray[2] + soundArray[3] + soundArray[4]) / 5
    let temp = lastMean - value

    if (soundGapArray.length < 5) {
      soundGapArray.push(temp)
    }
    else {
      soundGapArray[0] = soundGapArray[1]
      soundGapArray[1] = soundGapArray[2]
      soundGapArray[2] = soundGapArray[3]
      soundGapArray[3] = soundGapArray[4]
      soundGapArray[4] = temp
    }
    let soundGapMean = (soundGapArray[0] + soundGapArray[1] + soundGapArray[2] + soundGapArray[3] + soundGapArray[4]) / 5



    let temp2 = soundGapMean - temp


    if (temp2 < 0)
      temp2 = -temp2

    //console.log("= " + value + " > " + mean)


    if (value > mean) {
      console.log(value - mean)
      //change color on this beat
      width.value = 1000 * ((value - mean) / 100)
    }
    else {
      width.value = 300 * (value / 100)
    }
    lastMean = mean



  }





  useEffect(() => {
    console.log("===============================")
    RNSoundLevel.start()

    return () => {
      RNSoundLevel.stop()
    }
  }, [])
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>React native test App</Text>


      <Animated.View style={[{ height: 100, marginTop: 100, backgroundColor: "red" }, style]}></Animated.View>

      <Button title="Button" style={{ marginTop: 10 }} onPress={() => (width.value = Math.random() * 300)} />
    </SafeAreaView>
  );
};

export default App;
