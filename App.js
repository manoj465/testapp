import React, { useEffect } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  DeviceEventEmitter
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import RNEsptouch from 'react-native-esptouch2';
import Permissions, { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
/*  */



const App = () => {



  onPress = () => {
    console.log("now setting up ESPtouch")
    RNEsptouch.startSmartConfig("Ioplmkjnb@1", 1/* 1: broadcast;	0: multicast */).then((res) => {
      if (res.code == 200) {
        // ESPTouch success
        console.log(res)
      } else {
        // ESPTouch failed
        console.info(res.msg)
      }
    })
  }


  requestPermission = () => {
    console.log("requesting permission")
    //check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    Permissions.request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(response => {
        //returns once the user has chosen to 'allow' or to 'not allow' access
        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        console.log(response)
      });
  };


  useEffect(() => {
    requestPermission();

    RNEsptouch.initESPTouch();
    return () => {
      RNEsptouch.finish();

    }
  }, [])


  return (
    <View style={[{ flex: 1 }]}>
      <StatusBar />
      <Text style={{ flex: 0.5 }}>React native test App</Text>
      <Button
        title="Button"
        style={{ marginTop: 10 }}
        onPress={() => {
          onPress()
        }}
      />
    </View>
  )
}


export default App;
