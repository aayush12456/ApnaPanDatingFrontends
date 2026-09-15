import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  StatusBar,
  Easing,
} from "react-native";
import splashScreenImg from '../../../assets/splash.png'

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const moveUp = useRef(new Animated.Value(40)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),

      Animated.timing(moveUp, {
        toValue: 0,
        duration: 900,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();

    // Splash ke baad yahan apna normal navigation/state logic rakho
    const timer = setTimeout(() => {
      console.log("Splash finished");
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#090116",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#090116"
      />

      <Animated.View
        style={{
          alignItems: "center",
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { translateY: moveUp },
          ],
        }}
      >
        <Image
          source={splashScreenImg}
          style={{
            width: width * 0.42,
            height: width * 0.42,
            resizeMode: "contain",
          }}
        />

        <Text
          style={{
            marginTop: 25,
            color: "#FFFFFF",
            fontSize: 30,
            fontWeight: "700",
            letterSpacing: 1,
          }}
        >
          ApnaPan
        </Text>

        <Text
          style={{
            marginTop: 8,
            color: "#B8AFC7",
            fontSize: 14,
            letterSpacing: 2,
          }}
        >
          FIND YOUR CONNECTION
        </Text>
      </Animated.View>

      {/* Progress Bar */}
      <View
        style={{
          position: "absolute",
          bottom: height * 0.13,
          width: width * 0.65,
          height: 4,
          borderRadius: 10,
          backgroundColor: "#2A2435",
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
            height: "100%",
            backgroundColor: "#D347FF",
          }}
        />
      </View>

    
    </View>
  );
}