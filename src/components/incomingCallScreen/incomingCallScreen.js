import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import io from "socket.io-client";
import { Image } from "expo-image";

const BASE_URL = "http://192.168.29.169:4000";
const socket = io.connect(BASE_URL);

export default function IncomingCallScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params || {};

  const accept = () => {
    socket.emit("acceptCall", {
      roomID: data.roomID,
      callerId: data.callerId,
      receiverId: data.receiverId,
      callType: data.callType,
    });

    navigation.replace("CallScreenPage", {
      ...data,
      isCaller: false,
    });
  };

  const reject = () => {
    socket.emit("rejectCall", {
      roomID: data.roomID,
      callerId: data.callerId,
      receiverId: data.receiverId,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
   <Text style={styles.title}>
    Incoming {data.callType === "video" ? "Video" : "Audio"} Call
</Text>

<Image
    source={{ uri: data.callerImage }}
    style={styles.profileImage}
    contentFit="cover"
/>

<Text style={styles.name}>
    {data.callerName || "Someone"}
</Text>

<Text style={styles.callingText}>
    Calling...
</Text>

<View style={styles.ring} />
      <View style={styles.row}>
        <Pressable onPress={reject} style={[styles.btn, styles.reject]}>
        <Text style={styles.btnIcon}>❌</Text>
<Text style={styles.btnLabel}>Reject</Text>
        </Pressable>

        <Pressable onPress={accept} style={[styles.btn, styles.accept]}>
        <Text style={styles.btnIcon}>📞</Text>
<Text style={styles.btnLabel}>Accept</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 12,
  },
  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 60,
  },
  row: {
    flexDirection: "row",
    gap: 40,
  },
  btn: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  reject: {
    backgroundColor: "#ff3b30",
  },
  accept: {
    backgroundColor: "#34c759",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  profileImage:{
    width:160,
    height:160,
    borderRadius:80,
    borderWidth:5,
    borderColor:"#fff",
    marginTop:25,
},

callingText:{
    color:"#22C55E",
    fontSize:18,
    marginTop:15,
    marginBottom:40,
    fontWeight:"600",
},

ring:{
    width:2,
    height:60,
    backgroundColor:"rgba(255,255,255,0.35)",
    marginBottom:35,
},

btnIcon:{
  fontSize:28,
},

btnLabel:{
  color:"#fff",
  marginTop:8,
  fontWeight:"600",
},
});