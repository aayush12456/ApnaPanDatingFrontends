// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   Dimensions,
//   ActivityIndicator,
//   Platform,
// } from "react-native";
// import ZegoExpressEngine, {
//   ZegoTextureView,
//   ZegoScenario,
//   ZegoViewMode,
// } from "zego-express-engine-reactnative";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { ZegoAppID, ZegoAppSign } from "../zego/keyCenter";
// import { Image } from "expo-image";
// import { Audio } from "expo-av";
// import axios from "axios";

// // ✅ Shared socket use karo (naya io.connect mat banao)
// // Agar shared socket file nahi banayi to temporary yeh rakh sakte ho
// import io from "socket.io-client";
// const BASE_URL = "http://192.168.29.169:4000";
// const socket = io.connect(BASE_URL, { transports: ["websocket"] });

// const { width, height } = Dimensions.get("window");

// export default function CallScreen() {
//   const navigation = useNavigation();
//   const route = useRoute();

//   const {
//     roomID,
//     callerId,
//     callerName,
//     receiverId,
//     receiverName,
//     callType = "video",
//     isCaller = false,
//     callerImage,
//     recieverImage
//   } = route.params || {};

//   const topImage = isCaller ? callerImage : recieverImage;
//   const bottomImage = isCaller ? recieverImage : callerImage;
//   const topName = isCaller ? callerName : receiverName;
//   const bottomName = isCaller ? receiverName : callerName;

//   const myUserID = isCaller ? String(callerId) : String(receiverId);
//   const myUserName = isCaller ? callerName : receiverName;
//   const otherUserID = isCaller ? String(receiverId) : String(callerId);
//   const otherUserName = isCaller ? receiverName : callerName;

//   const [isReady, setIsReady] = useState(false);
//   const [statusText, setStatusText] = useState("Connecting...");
//   const [callConnected, setCallConnected] = useState(false);

//   const localViewRef = useRef(null);
//   const remoteViewRef = useRef(null);
//   const engineRef = useRef(null);
//   const ringbackRef = useRef(null);
//   const isMounted = useRef(true);

//   const localStreamID = `${myUserID}_stream`;

//   useEffect(() => {
//     isMounted.current = true;
//     // Thoda delay do taaki views mount ho jayein
//     const timer = setTimeout(() => {
//       startCall();
//     }, 500);

//     return () => {
//       isMounted.current = false;
//       clearTimeout(timer);
//       cleanup();
//     };
//   }, []);

//   // Dusra banda call end kare
//   useEffect(() => {
//     const onCallEnded = (data) => {
//       if (data?.roomID === roomID) {
//         setStatusText("Call Ended");
//         cleanup();
//         setTimeout(() => {
//           if (isMounted.current) navigation.goBack();
//         }, 300);
//       }
//     };
//     socket.on("callEnded", onCallEnded);
//     return () => socket.off("callEnded", onCallEnded);
//   }, [roomID]);


//   const startCall = async () => {
//     try {
//       if (isCaller) {
//         await playRingback();
//       }
//       setStatusText("Creating engine...");

//       // Purana engine ho to destroy
//       try {
//         await ZegoExpressEngine.destroyEngine();
//       } catch (e) {}

//       const engine = await ZegoExpressEngine.createEngineWithProfile({
//         appID: Number(ZegoAppID),
//         appSign: ZegoAppSign,
//         scenario: ZegoScenario.General,
//       });

//       if (!isMounted.current) return;
//       engineRef.current = engine;

//       await engine.enableAEC(true);     // Echo hatane ke liye
// await engine.enableAGC(true);     // Volume auto adjust
// await engine.enableANS(true);     // Background noise kam karne ke liye


//       // Events
//       engine.on("roomStateUpdate", (roomId, state, errorCode) => {
//         console.log("roomStateUpdate:", state, errorCode);
//         if (errorCode !== 0) {
//           setStatusText(`Room error: ${errorCode}`);
//         }
//       });

//       engine.on("publisherStateUpdate", (streamID, state, errorCode) => {
//         console.log("publisherStateUpdate:", streamID, state, errorCode);
//       });

//       engine.on("roomStreamUpdate", async (roomId, updateType, streamList) => {
//         console.log("roomStreamUpdate:", updateType, streamList);
//         if (updateType === 0 && streamList?.length > 0) {
//           for (const stream of streamList) {
//             if (stream.streamID !== localStreamID) {
//               try {
//                 if (callType === "video" && remoteViewRef.current) {
//                   await engine.startPlayingStream(stream.streamID, {
//                     reactTag: remoteViewRef.current,
//                     viewMode: ZegoViewMode.AspectFill,
//                   });
//                 } else {
//                   // Audio only
//                   await engine.startPlayingStream(stream.streamID);
//                 }
//                 if (isMounted.current) {
//                   setIsReady(true);
//                   await stopRingback();
//                   setStatusText("Connected");
//                   setCallConnected(true);
//                 }
//               } catch (err) {
//                 console.log("startPlayingStream error:", err);
//               }
//             }
//           }
//         }
//       });

//       setStatusText("Joining room...");

//       // Login Room
//       await engine.loginRoom(roomID, {
//         userID: myUserID,
//         userName: myUserName || "User",
//       });

//       // Camera / Preview
//       if (callType === "video") {
//         // Views ready hone ka wait
//         await new Promise((r) => setTimeout(r, 300));

//         if (localViewRef.current) {
//           await engine.startPreview({
//             reactTag: localViewRef.current,
//             viewMode: ZegoViewMode.AspectFill,
//           });
//         }
//         await engine.enableCamera(true);
//       } else {
//         await engine.enableCamera(false);
//       }

//       // Mic on
//       await engine.muteMicrophone(false);
//       await engine.muteSpeaker(false);

//       setStatusText("Publishing...");

//       // Publish
//       await engine.startPublishingStream(localStreamID);

//       if (isMounted.current) {
//         setIsReady(true);
//         setStatusText(callType === "audio" ? "Audio Connected" : "Connected");
//       }
//     } catch (err) {
//       console.log("Zego startCall error:", err);
//       if (isMounted.current) {
//         setStatusText("Connection failed");
//       }
//     }
//   };

//   const playRingback = async () => {
//     try {
//       const { sound } = await Audio.Sound.createAsync(
//         require("../../../assets/ringtone/callerringtone.mp3"),
//         {
//           shouldPlay: true,
//           isLooping: true,
//         }
//       );
  
//       ringbackRef.current = sound;
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const stopRingback = async () => {
//     if (ringbackRef.current) {
//       await ringbackRef.current.stopAsync();
//       await ringbackRef.current.unloadAsync();
//       ringbackRef.current = null;
//     }
//   };


//   const cleanup = async () => {
//     try {
//       const engine = engineRef.current;
//       if (engine) {
//         try {
//           await engine.stopPublishingStream();
//         } catch (e) {}
//         try {
//           if (callType === "video") {
//             await engine.stopPreview();
//           }
//         } catch (e) {}
//         try {
//           await engine.logoutRoom(roomID);
//         } catch (e) {}
//         try {
//           await ZegoExpressEngine.destroyEngine();
//         } catch (e) {}
//         engineRef.current = null;
//       }
//     } catch (e) {
//       console.log("cleanup error:", e);
//     }
//   };

//   const endCall = async () => {
//     const endcallMessageObj = {
//       id:  callerId,
//       senderId:  callerId,
//       recieverId:receiverId,
//       message: "Audio call ended",
//       senderName: callerName || "",
//     };
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/chat/addSendMessage/${callerId}`,
//         endcallMessageObj
//       );
      
//       socket.emit("sendMessage", response.data.chatUser);


//       socket.emit("endCall", {
//         roomID,
//         userId: myUserID,
//         targetId: otherUserID,
//       });
//     } catch (e) {}
//     await stopRingback();
//     await cleanup();
//     if (isMounted.current) {
//       navigation.goBack();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Remote Video - hamesha mount rakho (ref ke liye) */}
//       <ZegoTextureView
//         ref={remoteViewRef}
//         style={callType === "video" ? styles.remoteView : styles.hiddenView}
//       />

//       {/* Local preview */}
//       {callType === "video" && (
//         <ZegoTextureView ref={localViewRef} style={styles.localView} />
//       )}

//       {/* Status overlay */}
//      {/* Premium Calling Screen */}
// {
//   <View style={styles.loading}>

//     <Image
//       source={{ uri: topImage }}
//       style={styles.profileImage}
//       contentFit="cover"
//     />

//     <Text style={styles.userName}>
//       {topName}
//     </Text>

//     <View style={styles.verticalLine} />

//     <View style={styles.callCircle}>
//       <Text style={styles.callIcon}>📞</Text>
//     </View>

//     <View style={styles.verticalLine} />

//     <Image
//       source={{ uri: bottomImage }}
//       style={styles.profileImage}
//       contentFit="cover"
//     />

//     <Text style={styles.userName}>
//       {bottomName}
//     </Text>

//     {
//   callConnected ? (
//     <Text style={styles.statusText}>
//       Connected
//     </Text>
//   ) : (
//     <ActivityIndicator
//       size="large"
//       color="#22C55E"
//       style={{ marginTop: 35 }}
//     />
//   )
// }

//   </View>
//   }

// {callType === "video" && (
//   <>
//     <Text style={styles.name}>{otherUserName}</Text>

//     <Text style={styles.callType}>
//       Video Call
//     </Text>
//   </>
// )}


//       <View style={styles.controls}>
//         <Pressable onPress={endCall} style={styles.endBtn}>
//           <Text style={styles.endText}>End Call</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
//   remoteView: {
//     width,
//     height,
//   },
//   hiddenView: {
//     width: 1,
//     height: 1,
//     opacity: 0,
//     position: "absolute",
//   },
//   localView: {
//     position: "absolute",
//     top: 50,
//     right: 20,
//     width: 110,
//     height: 160,
//     borderRadius: 12,
//     overflow: "hidden",
//     zIndex: 10,
//     backgroundColor: "#333",
//   },
//   loading: {
//     position: "absolute",
//     top: 80,
//     left: 0,
//     right: 0,
//     alignItems: "center",
//     zIndex: 5,
// },

//   profileImage:{
//     width:120,
//     height:120,
//     borderRadius:60,
//     borderWidth:4,
//     borderColor:"#ffffff",
// },

// userName:{
//     color:"#fff",
//     fontSize:22,
//     fontWeight:"700",
//     marginTop:12,
//     marginBottom:12,
// },

// verticalLine:{
//     width:2,
//     height:40,
//     backgroundColor:"rgba(255,255,255,0.35)",
// },

// callCircle:{
//     width:82,
//     height:82,
//     borderRadius:41,
//     backgroundColor:"#22C55E",
//     justifyContent:"center",
//     alignItems:"center",
//     marginVertical:18,

//     shadowColor:"#22C55E",
//     shadowOpacity:1,
//     shadowRadius:18,
//     shadowOffset:{
//         width:0,
//         height:0
//     },

//     elevation:20,
// },

// callIcon:{
//     fontSize:38,
//     color:"#fff",
// },

//   statusText: {
//     color: "#fff",
//     marginTop: 12,
//     fontSize: 16,
//   },
//   name: {
//     position: "absolute",
//     top: 50,
//     alignSelf: "center",
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "600",
//     zIndex: 15,
//   },
//   callType: {
//     position: "absolute",
//     top: 80,
//     alignSelf: "center",
//     color: "#aaa",
//     fontSize: 14,
//     zIndex: 15,
//   },
//   controls:{
//     position:"absolute",
//     bottom:45,
//     left:0,
//     right:0,
//     alignItems:"center",
//     zIndex:999,
//     elevation:999,
// },
//   endBtn: {
//     backgroundColor: "#ff3b30",
//     paddingHorizontal: 40,
//     paddingVertical: 14,
//     borderRadius: 30,
//   },
//   endText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });