import { Text, Button, TextInput, Card } from "react-native-paper";
import { View,  Pressable, ScrollView, Dimensions,KeyboardAvoidingView, Platform ,ActivityIndicator,Keyboard} from "react-native";
import back from "../../../assets/signUpFormIcon/back.png";
import dots from "../../../assets/chatIcons/dots.png";
import send from "../../../assets/chatIcons/sendIcon.png";
import unsend from "../../../assets/chatIcons/unsend.png";
import profile from "../../../assets/chatIcons/profile.png";
import block from "../../../assets/chatIcons/block.png";
import typingIcon from "../../../assets/chatIcons/chat.gif";
import guru from "../../../assets/chatIcons/guru.png";
import imageIcon from "../../../assets/chatIcons/gallery.png";
import cameraIcon from "../../../assets/chatIcons/camera.png";
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Image } from 'expo-image';
import io from "socket.io-client";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { moreChatActions } from "../../Redux/Slice/moreChatSlice/moreChatSlice";
import { dotsOpenModalToggleActions } from "../../Redux/Slice/dotsOpenModalSlice/dotsOpenModalSlice";
import { AlertNotificationRoot } from "react-native-alert-notification";
import Notification from "../notification/notification";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://apnapandatingbackend.onrender.com")
const MessageDetailsCard = ({ messageDetails,deactivateUserObj,completeObj,onlineUserArray,notifyUser,notifyChecks }) => {
  const BASE_URL = "http://192.168.29.169:4000";
  // const BASE_URL = "https://apnapandatingbackend.onrender.com";
  const [getChatDetailObj, setGetChatDetailObj] = useState({})
  const [messageText, setMessageText] = useState('')
console.log('complete obj',completeObj)
 console.log('notify users data',notifyUser)
 console.log('message details user',messageDetails)
  const [fetchMessages, setFetchMessages] = useState([])
  const [fetchTypingIdObj, setFetchTypingIdObj] = useState([])
  const [finalMessageArray, setFinalMessageArray] = useState([])
  const [showTypingResponse,setShowTypingResponse]=useState(false)
  const [activeLoginIdResponse,setActiveLoginIdResponse]=useState(false)
  const [notifyDeactivateObj,setNotifyDeactivateObj]=useState({})
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [openDailog,setOpenDialog]=useState(false)
  const [openIndex, setOpenIndex] = useState('')
 

  const [selectedImage, setSelectedImage] = useState(null);
const [showCamera, setShowCamera] = useState(false);
const [cameraPermission, requestCameraPermission] = useCameraPermissions();
const [cameraRef, setCameraRef] = useState(null);
const [sendingImage, setSendingImage] = useState(false);
const [cameraFacing, setCameraFacing] = useState("back");

  const windowHeight = Dimensions.get('window').height;
  // console.log('window heigth', windowHeight)
  const scrollBottomMargin = -windowHeight * 0.11;
  const navigation = useNavigation();
  const dispatch = useDispatch()
  // console.log("message details is", messageDetails);
 const loginId=completeObj?.userId
  // console.log('login otp reposne in message detail card',loginOtpResponse)
  const deleteChatSelector = useSelector((state) => state.moreChatData.moreChatToggle)
  const dotOpenHandler=useSelector((state)=>state.dotsOpenData.dotsOpenToggle)
  // console.log("dot open selector", dotOpenHandler);
  // console.log("delete chat selector", deleteChatSelector);

//   useEffect(()=>{

//     if(loginId){

//         socket.emit("registerUser",loginId);

//     }

// },[loginId]);

// useEffect(()=>{

//   socket.on("onlineUsers",(users)=>{

//       setOnlineUsers(users);

//   });

//   return ()=>{

//       socket.off("onlineUsers");

//   }

// },[]);

// console.log('online user array',onlineUsers)


  const backHandler = async() => {
    const deleteChatUserObj = {
      loginId: loginId,
      anotherId: messageDetails?._id
    };
    socket.emit('deleteChatUsers', deleteChatUserObj);
    console.log('emitted deleteChatUsers', deleteChatUserObj);
    const deleteAnotherRecordMessageIdObj={
      id:loginId,
      recieverId:messageDetails?._id
    }
    try {
      const deleteAnotherResponseIdObj = await axios.post(`${BASE_URL}/chat/deleteAnotherRecordMessage/${deleteAnotherRecordMessageIdObj.id}`,deleteAnotherRecordMessageIdObj);
      // console.log('response in another record message id user is',deleteAnotherResponseIdObj?.data?.anotherRecordMessageIdArray)
  } catch (error) {
      // console.error('Error sending in delete another response in another response id:', error);
  }
    navigation.goBack();
  };

  useEffect(() => {
    if (loginId) {
      const getActiveLoginId = onlineUserArray?.some(
        (item) => item === messageDetails?._id
      );
      setActiveLoginIdResponse(getActiveLoginId)
    }
  }, [loginId, onlineUserArray, messageDetails]);
console.log('login response',activeLoginIdResponse)

  useEffect(() => {
    const fetchChatId = async () => {
      try {
        if (loginId) {
          const response = await axios.get(
            `${BASE_URL}/chat/getChatId`, {
            params: { loginId: loginId, anotherId: messageDetails?._id } // Pass the object as query parameters
          }
          );
          // console.log('get chat id user is', response?.data?.chatIdUser)
          setGetChatDetailObj(response?.data?.chatIdUser);
        }
      } catch (error) {
        // console.error("Error fetching in chat id obj:", error);
      }
    };

    fetchChatId();

  }, [loginId]);

  // console.log('get chat details obj', getChatDetailObj)

  const messageTypingHandler = async (text) => {
    setMessageText(text);
    const postTypingObj = {
      loginId: loginId,
      senderId: loginId,
      recieverId: messageDetails?._id,
    };
  
    // console.log('text is', text);
    // console.log('post typing is', postTypingObj);
  
    try {
      if (text.length > messageText.length) {
        // Call the postTyping API when text is increasing
        const response = await axios.post(
          `${BASE_URL}/chat/postTyping/${postTypingObj.loginId}`,
          postTypingObj
        );
        // console.log('Send typing message of data is', response.data);
        socket.emit('postTyping', response.data);
      } else if (text.length <= messageText.length  ) {
        const response = await axios.post(
          `${BASE_URL}/chat/deleteTyping`,
          postTypingObj
        );
        // console.log('Delete typing message of data is', response.data);
      }
   
    } catch (error) {
      // console.error(
      //   'Error sending or deleting message:',
      //   error.response || error.message || error
      // );
    }
  };
  

useEffect(() => {

  const getMessageTyping = async () => {
    try {
      if (loginId) {
        const response = await axios.get(`${BASE_URL}/chat/getTyping/${loginId}`);
   setFetchTypingIdObj(response.data)
      }
    } catch (error) {
      // console.error("Error fetching messages:", error);
    }
  };
  getMessageTyping()
  socket.on('getTyping', (newTypingId) => {
    setFetchTypingIdObj(newTypingId)
  })
  socket.on('typingChatDeleted', (deleteTyping) => {
    setFetchTypingIdObj(deleteTyping)
  });

  return () => {
    socket.off('getTyping')
    socket.off('typingChatDeleted');
  }
}, [loginId])
// console.log('fetch typing id obj',fetchTypingIdObj)

useEffect(() => {
  if (loginId) {
    const getTypingIdResponse = fetchTypingIdObj?.data?.some(
      (item) => item === messageDetails?._id
    );
    setShowTypingResponse(getTypingIdResponse)
    // console.log('get typing id response:', getTypingIdResponse);
  }
}, [loginId, fetchTypingIdObj, messageDetails]);


const sendNotification = async () => {
  if (!notifyUser || notifyUser.length === 0) {
    console.log("Notification token not found");
    return;
  }
  try {
    const messages = notifyUser.map((user)=>({
      to: user.notifyToken,
      sound: "default",
      // title: "ApnaPan",
      body: `${completeObj?.name} messaged you`,
      data:{
        senderId: loginId,
        receiverId: messageDetails?._id,
        type:"Messages",
      }
    }));
    const response = await axios.post(
      "https://exp.host/--/api/v2/push/send",
      messages,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Push Response", response.data);
    const ticketMap = {};
    response.data.data.forEach((item,index)=>{

      if(item.status==="ok"){
        ticketMap[item.id] = notifyUser[index].notifyToken;
      }
    });

    const ticketIds = Object.keys(ticketMap);
    if(ticketIds.length > 0){
      // Receipt check
      const receiptRes = await axios.post(
        "https://exp.host/--/api/v2/push/getReceipts",
        {
          ids: ticketIds
        }
      );
      console.log("Receipt Response",receiptRes.data);

      const invalidTokens=[];
      Object.entries(receiptRes.data.data)
      .forEach(([ticketId,receipt])=>{
        if(receipt.status==="error" &&receipt.details?.error==="DeviceNotRegistered"){
          // yaha se actual token milega
          invalidTokens.push(
            ticketMap[ticketId]
          );
        }
      });
      console.log("Invalid Tokens",invalidTokens);
      // invalid token delete API call
      if(invalidTokens.length > 0){
        await axios.post(
          `${BASE_URL}/user/deleteMultipleVisitorNotify/${messageDetails?._id}`,
          {
           
              tokens:invalidTokens
            }
          
        );
        console.log("Invalid token deleted");
      }
    }
  } catch (error) {
    console.log(
      error.response?.data || error.message
    );
  }
};

const pickImageFromGallery = async () => {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    alert("Gallery permission required");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({

    mediaTypes: ImagePicker.MediaTypeOptions.Images,

    allowsEditing: true,

    quality: 0.8,

  });

  if (!result.canceled) {
    const image = result.assets[0];
    setSelectedImage(image);
  }
}

const openCamera = async () => {
  if (!cameraPermission?.granted) {
    const permission = await requestCameraPermission();
    if (!permission.granted) {
      alert("Camera permission required");
      return;
    }
  }
  setShowCamera(true);
};

const takePhoto = async () => {

  if (cameraRef) {
    const photo = await cameraRef.takePictureAsync({
      quality: 0.8,
    });

    setSelectedImage(photo);
    setShowCamera(false);

  }
};

const removeSelectedImage = () => {
  setSelectedImage(null);
};

//   const submitHandler = async () => {
//     if (messageText.trim()) {
//       const messageSubmitData = {
//         id: loginId,
//         senderId: loginId,
//         recieverId: messageDetails?._id,
//         message: messageText,
//         senderName: completeObj?.firstName,
//         images: completeObj?.image,
//       };
//       const deleteTypingObj = {
//         loginId: loginId,
//         senderId: loginId,
//         recieverId: messageDetails?._id,
//       };
//       const addRecordMessageObj = {
//         id: loginId,
//         recieverId: messageDetails?._id,
//       };
  
//       // console.log("Message sent:", messageSubmitData);
  
//       try {
//         // Call addSendMessage API
//         const response = await axios.post(
//           `${BASE_URL}/chat/addSendMessage/${messageSubmitData.id}`,
//           messageSubmitData
//         );
//         // console.log('Send message data:', response.data);
//         socket.emit('sendMessage', response.data.chatUser);
//         setMessageText('');
     
// if (notifyChecks.length===0) {
//   await sendNotification();
// }
//         // Call deleteTyping API
//         const responseData = await axios.post(
//           `${BASE_URL}/chat/deleteTyping`,
//           deleteTypingObj
//         );
//         // console.log('Delete typing message data:', responseData.data);
  
//         // Call addRecordMessage API
//         // console.log('About to call addRecordMessage API with:', addRecordMessageObj);
//         const recordResponseData = await axios.post(
//           `${BASE_URL}/chat/addRecordMessage/${addRecordMessageObj.id}`,
//           addRecordMessageObj
//         );
//         // console.log('Add record message ID array is:', recordResponseData.data);
//         socket.emit('addRecordMessageId', recordResponseData.data
//         );
//       } catch (error) {
//         // console.error(
//         //   'Error during API calls:',
//         //   error.response ? error.response.data : error.message
//         // );
//       }
//     } else {
//       // console.log("Message text is empty");
//     }
//   };

//new
const submitHandler = async () => {
  // Agar na text hai na image, to kuch mat karo
  if (!messageText.trim() && !selectedImage) {
    return;
  }

  const deleteTypingObj = {
    loginId: loginId,
    senderId: loginId,
    recieverId: messageDetails?._id,
  };

  const addRecordMessageObj = {
    id: loginId,
    recieverId: messageDetails?._id,
  };

  const isImageMessage = !!selectedImage;

if (isImageMessage) {
  setSendingImage(true);
}
  try {
    // ========== FormData banana (image + text dono ke liye) ==========
    const formData = new FormData();

    formData.append("id", loginId);
    formData.append("senderId", loginId);
    formData.append("recieverId", messageDetails?._id);
    formData.append("message", messageText.trim() || "");
    formData.append("senderName", completeObj?.firstName || "");
    
    // agar completeObj.image array hai to string bana ke bhejo, warna empty
    formData.append(
      "images",
      Array.isArray(completeObj?.image)
        ? JSON.stringify(completeObj.image)
        : completeObj?.image || ""
    );

    // ========== Real Image add karna ==========
    if (selectedImage) {
      // Expo ImagePicker / Camera se aane wala object
      const imageUri = selectedImage.uri;
      const fileName = imageUri.split("/").pop(); // last part of path
      const match = /\.(\w+)$/.exec(fileName);
      const fileType = match ? `image/${match[1]}` : `image/jpeg`;

      formData.append("image", {
        uri: imageUri,
        name: fileName || `photo_${Date.now()}.jpg`,
        type: fileType,
      });
    }
    // ========== API call (FormData ke saath) ==========
    const response = await axios.post(
      `${BASE_URL}/chat/addSendMessage/${loginId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // Socket emit
    socket.emit("sendMessage", response.data.chatUser);
    setMessageText("");
    setSelectedImage(null);
    setSendingImage(false);
    // Notification
    if (notifyChecks?.length === 0) {
      await sendNotification();
    }
    // Typing delete
    await axios.post(`${BASE_URL}/chat/deleteTyping`, deleteTypingObj);
    // Record message
    const recordResponseData = await axios.post(
      `${BASE_URL}/chat/addRecordMessage/${addRecordMessageObj.id}`,
      addRecordMessageObj
    );
    socket.emit("addRecordMessageId", recordResponseData.data);

  } catch (error) {
    setSendingImage(false);
    console.log(
      "Error sending message:",
      error?.response?.data || error.message
    );
  }
};

  useEffect(() => {

    const fetchMessage = async () => {
      try {
        if (loginId) {
          const response = await axios.get(`${BASE_URL}/chat/getMessage/${loginId}`);
          setFetchMessages(response.data.chatUserArray);

        }
      } catch (error) {
        // console.error("Error fetching messages:", error);
      }
    };
    fetchMessage()
    socket.on('recieveMessage', (newMessage) => {
      setFetchMessages(preMessages => [...preMessages, newMessage])
    })
    socket.on('messageDeleted', (deletedMessage) => {
      setFetchMessages((prevMessages) =>
        prevMessages.filter((msg) => msg?._id !== deletedMessage?._id)
      );
    });

    return () => {
      socket.off('recieveMessage')
      socket.off('messageDeleted');
    }
  }, [loginId])

  useEffect(() => {
    if (loginId) {
      const filterMessageArray = fetchMessages.filter((messageItem) => messageItem.chatId === getChatDetailObj?._id)
      setFinalMessageArray(filterMessageArray)

    }
  }, [loginId, fetchMessages, getChatDetailObj?._id])
  // console.log('final message array', finalMessageArray)

  const messageClickHandler = (finalMessage, index,isCallMessage) => {
    // console.log('final message', finalMessage)
    setOpenIndex(index)
  if(isCallMessage ){
    return
  }
    dispatch(moreChatActions.moreChatToggle())
  }

  const deleteChatHandler = async (deleteChatMessage) => {
    try {
      await axios.post(`${BASE_URL}/chat/deleteChat`, deleteChatMessage);

    } catch (error) {
      // console.error('Error sending message:', error);
    }
    dispatch(moreChatActions.moreChatToggle())
  }

  const messageDetailsProfileHandler = (messageDetailProfile) => {
    navigation.navigate('MessageProfilePage', { formData: messageDetailProfile });
  }

  const dotPressHandler = () => {
    // console.log('dot is pressed')
    dispatch(dotsOpenModalToggleActions.dotsOpenModalToggle())
  }

  const viewProfileHandler=(messageDetailProfile)=>{
    navigation.navigate('MessageProfilePage', { formData: messageDetailProfile,completeObj });
    dispatch(dotsOpenModalToggleActions.dotsOpenModalToggle())
  }

  const viewProfileBlockHandler=async(messageDetailProfile)=>{
    const blockChatIdObj={
    id:loginId,
    blockId:messageDetailProfile?._id
    }
    if(blockChatIdObj.id===deactivateUserObj.selfDeactivate){
      setOpenDialog(true)
      const obj={
        type:'WARNING',
        textBody:`You can't block ${messageDetails.firstName} profile untill you should activate yourself`
      }
      setNotifyDeactivateObj(obj)
      return
    }
    try {
      const response = await axios.post(`${BASE_URL}/user/addBlockChatIdUser/${blockChatIdObj.id}`,blockChatIdObj);
      // console.log('response in block chat user',response?.data)
      socket.emit('addBlockUser', response?.data)
  
  } catch (error) {
      // console.error('Error sending user in block', error);
  }
    dispatch(dotsOpenModalToggleActions.dotsOpenModalToggle())
    navigation.goBack();
  }
 
  const switchCamera = () => {
    setCameraFacing((current) =>
      current === "back" ? "front" : "back"
    );
  };


  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
  
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });
  
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const startCall =async (callType = "video") => {
    if (!loginId || !messageDetails?._id) return;
  
    const roomID = `room_${[String(loginId), String(messageDetails._id)]
      .sort()
      .join("_")}`;
  
    const callData = {
      roomID,
      callerId: String(loginId),
      callerName: completeObj?.name || "User",
      callerImage:completeObj?.image||'',
      receiverId: String(messageDetails._id),
      receiverName: messageDetails?.firstName || "User",
      recieverImage:messageDetails?.images[0]||'',
      callType,
    };
  
    socket.emit("callUser", callData);

    const callMessageObj = {
      id: loginId,
      senderId: loginId,
      recieverId: messageDetails?._id,
      message: "Audio call started",
      senderName: completeObj?.firstName || "",
    };
    try {

      const response = await axios.post(
        `${BASE_URL}/chat/addSendMessage/${loginId}`,
        callMessageObj
      );
    
      socket.emit("sendMessage", response.data.chatUser);
    
    } catch (error) {
    
      console.log(
        error?.response?.data || error.message
      );
    
    }
  
    navigation.navigate("CallScreenPage", {
      ...callData,
      isCaller: true,
    });
  };


  useEffect(() => {
    const onIncomingCall = (data) => {
      if (String(data.receiverId) === String(loginId)) {
        navigation.navigate("IncomingCallScreenPage", data);
      }
    };
  
    const onCallRejected = () => {
      // Caller ko reject mil gaya → CallScreen se wapas
      navigation.goBack();
    };
    const onCallEnded = () => {
      // Caller ko reject mil gaya → CallScreen se wapas
      navigation.goBack();
    };
  
    const onCallFailed = (data) => {
      // alert(data?.message || "User is offline");
      console.log('user is offline')
    };
  
    socket.on("incomingCall", onIncomingCall);
    socket.on("callRejected", onCallRejected);
    socket.on("callFailed", onCallFailed);
    socket.on("callEnded", onCallEnded);
  
    return () => {
      socket.off("incomingCall", onIncomingCall);
      socket.off("callRejected", onCallRejected);
      socket.off("callFailed", onCallFailed);
      socket.off("callEnded", onCallEnded);
    };
  }, [loginId]);

// App.js / Navigation level pe
useEffect(() => {
  if (!loginId) return;

  socket.emit("registerUser", String(loginId));

  const onIncomingCall = (data) => {
    console.log("📞 Incoming Call received on frontend:", data);
    navigation.navigate("IncomingCallScreenPage", data);
  };

  socket.on("incomingCall", onIncomingCall);

  return () => {
    socket.off("incomingCall", onIncomingCall);
  };
}, [loginId]);


  return (
    <>
    <AlertNotificationRoot>
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : undefined}   // Android me thoda adjust kar sakte ho
      >
    <View style={{ flex: 1 }}>
        {/* Header Section */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: `#343434`,
            marginTop: 40,
          }}
        >
          <View style={{ marginTop: 10 }}>
            <Button onPress={backHandler}>
              <Image source={back} style={{ width: 15, height: 15,tintColor:`white` }} />
            </Button>
          </View>
          <Pressable onPress={() => messageDetailsProfileHandler(messageDetails)}>
            <View
              style={{
                flexDirection: "row",
                gap: 12,
                marginRight: 130,
              }}
            >
              <Image
                source={{ uri: messageDetails?.images[0] }}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 70,
                  marginTop: 6,
                  marginBottom: 6,
                }}
              />
              <View>
              <Text
                style={{
                  color:`white`,
                  fontWeight: "500",
                  paddingTop: `${showTypingResponse===true || activeLoginIdResponse===true ?8:14}`,
                }}
              >
                {messageDetails?.firstName}
              </Text>
             {showTypingResponse===true? <View style={{flexDirection:'row',gap:3}}>
              <Image source={typingIcon} style={{width:15}}/>
              <Text style={{ color:`#32cd32`}}>typing</Text>
              </View>:null}
              {activeLoginIdResponse===true && !showTypingResponse===true?<Text style={{color:'#32cd32'}}>Online</Text>:null}
              </View>
            </View>
{/* Header ke andar, dots se pehle yeh View daalo */}
<View
  style={{
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    gap: 18,
  }}
>
  <Pressable onPress={() => startCall("audio")}>
    <Text style={{ color: "white", fontSize: 22 }}>📞</Text>
  </Pressable>

  <Pressable onPress={() => startCall("video")}>
    <Text style={{ color: "white", fontSize: 22 }}>📹</Text>
  </Pressable>
</View>

          </Pressable>
          <Pressable onPress={dotPressHandler}>
            <Image
              source={dots}
              style={{
                width: 20,
                height: 20,
                marginRight: 20,
                marginTop: 15,
                tintColor:`white`
              }}
            />
          </Pressable>
        </View>
        {dotOpenHandler &&<View style={{flexDirection:'row',justifyContent:'flex-end'}}>
          <Card style={{width:150,marginRight:2}}>
            <Card.Content>
              <Pressable onPress={()=>viewProfileHandler(messageDetails)}>
              <View style={{flexDirection:"row", gap:8}}>
              <Image source={profile} style={{width:30,height:30}}/>
              <Text style={{paddingTop:4}}>View profile</Text>
            </View>
              </Pressable>
              <Pressable onPress={()=>viewProfileBlockHandler(messageDetails)}>
              <View style={{flexDirection:"row", gap:8,marginTop:9}}>
              <Image source={block} style={{width:30,height:30}}/>
              <Text style={{paddingTop:4}}>Block</Text>
            </View>
              </Pressable>
              {/* <Pressable onPress={()=>viewExpertChatHandler(messageDetails)}>
              <View style={{flexDirection:"row", gap:8,marginTop:9}}>
              <Image source={guru} style={{width:30,height:30}}/>
              <Text style={{paddingTop:4}}>Expert Chat</Text>
            </View>
              </Pressable> */}
            </Card.Content>
          </Card>
        </View>}

        <View style={{ flex: 1, marginBottom: `${deactivateUserObj.selfDeactivate!==null?0:100}` }}>
          <ScrollView
           keyboardShouldPersistTaps="handled"
           contentContainerStyle={{ flexGrow: 1 }}
           style={{ marginBottom: scrollBottomMargin }}
          >
            {
              finalMessageArray.map((finalMessage,index) => {
                const isCallMessage =
                finalMessage.message === "Audio call started" ||
                finalMessage.message === "Audio call ended";
                return (
                  <View key={finalMessage?._id} style={{
                    flexDirection: 'row',
                    justifyContent: `${finalMessage.senderId === loginId ? 'flex-end' : 'flex-start'}`,
                    marginBottom: 10,
                    flexWrap: 'wrap', // Allow wrapping if needed
                    alignItems: 'flex-start' // Align items at the start for consistent vertical alignment
                  }}>
                    {finalMessage.recieverId === loginId ? <Image source={{ uri: messageDetails.images[0] }} style={{
                      width: 35,
                      height: 35,
                      borderRadius: 70,
                      marginTop: 6,
                      marginBottom: 6,
                      marginLeft: 15
                    }} /> : null}

                    {deleteChatSelector && finalMessage?.senderId === loginId && openIndex === index ? <Card>
                      <Card.Content>
                        <Pressable onPress={() => deleteChatHandler(finalMessage)}>
                          <View style={{ flexDirection: 'row', gap: 5 }}>
                            <Text style={{ color: 'red' }}>Unsend</Text>
                            <Image source={unsend} style={{ width: 15, height: 15, marginTop: 2 }} />
                          </View>
                        </Pressable>
                      </Card.Content>
                    </Card> : null}
                    <View
  style={{
    marginTop: 12,
    marginLeft: 10,
    marginRight: 10,
    maxWidth: "80%",
    flexShrink: 1,
    alignItems:
      finalMessage.senderId === loginId ? "flex-end" : "flex-start",
  }}
  onStartShouldSetResponder={() => true}
  onResponderRelease={() => messageClickHandler(finalMessage, index,isCallMessage)}
>
  {/* Image (Bubble ke bahar) */}
 
  {finalMessage.image ? (
  <View
    style={{
      alignItems:
        finalMessage.senderId === loginId
          ? "flex-end"
          : "flex-start",
    }}
  >
    <Image
      source={{ uri: finalMessage.image }}
      style={{
        width: 180,
        height: 180,
        borderRadius: 12,
      }}
      contentFit="cover"
    />

    <Text
      style={{
        marginTop: 4,
        fontSize: 11,
        color: "white",
      }}
    >
        {new Date(finalMessage.timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}
    </Text>
  </View>
) : null}

  {/* Text Bubble */}

  {!isCallMessage? (
  <View
    style={{
      backgroundColor:
        finalMessage.senderId === loginId ? "#1E3AFF" : "#E5E5EA",
      borderRadius: 22,
      paddingHorizontal: 12,
      paddingTop: 8,
      paddingBottom: 6,
      minWidth: 70,
      maxWidth: "100%",
    }}
  >
  <Text
      style={{
        color:
          finalMessage.senderId === loginId ? "#fff" : "#000",
        fontSize: 14,
      }}
    >
      {finalMessage.message}
    </Text>

    <Text
      style={{
        alignSelf: "flex-end",
        fontSize: 11,
        marginTop: 4,
        color:
          finalMessage.senderId === loginId
            ? "rgba(255,255,255,0.8)"
            : "#666",
      }}
    >
    {new Date(finalMessage.timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}
    </Text>
  </View>
) : null}



{isCallMessage? (
  <View
    style={{
      backgroundColor:"#F3F3F3",
      borderRadius: 22,
      paddingHorizontal: 12,
      paddingTop: 8,
      paddingBottom: 6,
      minWidth: 70,
      maxWidth: "100%",
    }}
  >
  <Text
      style={{
        color:'black',
        fontSize: 14,
      }}
    >
    📞 {finalMessage.message}
    </Text>

    <Text
      style={{
        alignSelf: "flex-end",
        fontSize: 11,
        marginTop: 4,
        color:'black',
      }}
    >
    {new Date(finalMessage.timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}
    </Text>
  </View>
) : null}

  {/* Time */}
  {/* <Text
    style={{
      fontSize: 10,
      marginTop: 3,
      alignSelf: "flex-end",
      color:
        finalMessage.senderId === loginId ? "#888" : "black",
    }}
  >
    {new Date(finalMessage.timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}
  </Text> */}
</View>
                  </View>
                );
              })
            }
          </ScrollView>
        </View>

        {/* Message Input Section */}
       {/* {deactivateUserObj.selfDeactivate!==null && deactivateUserObj.selfDeactivate===loginId?
       <View style={{
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 10,
      }}>
       <Text>You can't message {messageDetails.firstName}  untill you should activate yourself</Text>
       </View>
       : <View
          style={{
            position: "absolute",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            width:'100%',
            bottom:1,
          }}
        >
          
          <TextInput
            style={{
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              backgroundColor: "#fff",
              // marginLeft:-20
              height: 50,
              paddingRight: 50, // Space for the image
              textAlignVertical: "top", // Align text properly
            }}
            placeholder="Message"
            onChangeText={(text) => messageTypingHandler(text)}
            onSubmitEditing={submitHandler}
            value={messageText}
        
          />
          <Pressable onPress={submitHandler}>
            <Image
              source={send}
              style={{
                width: 20,
                height: 20,
                marginLeft: -30,
                position: 'relative',
                right: 20

              }}
            />
          </Pressable>
        </View>} */}

        {/* Message Input Section */}
        {/* new */}
{deactivateUserObj.selfDeactivate !== null &&
deactivateUserObj.selfDeactivate === loginId ? (
  <View
    style={{
      position: "absolute",
      bottom: 0,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      width: "100%",
      paddingVertical: 10,
      paddingHorizontal: 10,
    }}
  >
    <Text>
      You can't message {messageDetails.firstName} untill you should activate
      yourself
    </Text>
  </View>
) : (
  <View
   
  >
    {/* Selected Image Preview */}
    {selectedImage && (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 8,
          paddingHorizontal: 4,
        }}
      >
        <Image
          source={{ uri: selectedImage.uri }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 10,
            marginRight: 10,
          }}
        />
        <Pressable onPress={removeSelectedImage}>
          <Text style={{ color: "red", fontWeight: "600" }}>Remove</Text>
        </Pressable>
      </View>
    )}

    {/* Input Row - Instagram style */}
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 25,
        paddingHorizontal: 6,
        paddingVertical: 2,
        minHeight: 40,
        paddingBottom: Platform.OS === "android" ? keyboardHeight : 0,
      }}
    >
      {/* Camera Icon (left side - blue circle) */}
     {selectedImage?null: <Pressable
        onPress={openCamera}
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: "#0095f6",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 6,
        }}
      >
        <Image
          source={cameraIcon}
          style={{ width: 20, height: 20, tintColor: "white" }}
        />
      </Pressable>}

      {/* Text Input */}
      <TextInput
        style={{
          flex: 1,
          backgroundColor: "transparent",
          fontSize: 15,
          paddingVertical: 2,
          paddingHorizontal: 4,
          minHeight: 36,
          maxHeight: 80,
        
        }}
        placeholder="Message..."
        placeholderTextColor="#8e8e8e"
        multiline
        value={messageText}
        onChangeText={messageTypingHandler}
        onSubmitEditing={submitHandler}
      />

      {/* Right side icons */}
      <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingRight: 6,
  }}
>
  {(messageText.trim().length > 0 || selectedImage) ? (

    sendingImage ? (
      <ActivityIndicator
        size="small"
        color="#0095f6"
      />
    ) : (
      <Pressable onPress={submitHandler}>
        <Image
          source={send}
          style={{
            width: 24,
            height: 24,
            tintColor: "#0095f6",
          }}
        />
      </Pressable>
    )

  ) : (
    <Pressable onPress={pickImageFromGallery}>
      <Image
        source={imageIcon}
        style={{
          width: 24,
          height: 24,
          tintColor: "#262626",
        }}
      />
    </Pressable>
  )}
</View>
    </View>
  </View>
)}

      </View>
      {openDailog===true && <Notification dialog={notifyDeactivateObj}/>}


{/* new */}
{/* Full Screen Camera */}
{showCamera && (
  <View
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "black",
      zIndex: 999,
    }}
  >
    <CameraView
      style={{ flex: 1 }}
      facing={cameraFacing}
      ref={(ref) => setCameraRef(ref)}
    >
     <View
  style={{
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
  }}
>
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "90%",
    }}
  >
    <Pressable onPress={() => setShowCamera(false)}>
      <Text style={{ color: "white", fontSize: 18 }}>
        Cancel
      </Text>
    </Pressable>

    <Pressable
      onPress={takePhoto}
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "white",
        borderWidth: 4,
        borderColor: "#ccc",
      }}
    />

    <Pressable onPress={switchCamera}>
      <Text style={{ color: "white", fontSize: 18 }}>
        Flip
      </Text>
    </Pressable>
  </View>
</View>
    </CameraView>
  </View>
)}
</KeyboardAvoidingView>
    </AlertNotificationRoot>
     
      
    </>
  );
};

export default MessageDetailsCard;
