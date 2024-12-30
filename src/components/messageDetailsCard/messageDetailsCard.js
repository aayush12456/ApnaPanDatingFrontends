import { Text, Button, TextInput, Card } from "react-native-paper";
import { View, Image, Pressable, ScrollView, Dimensions } from "react-native";
import back from "../../../assets/signUpFormIcon/back.png";
import dots from "../../../assets/chatIcons/dots.png";
import send from "../../../assets/chatIcons/sendIcon.png";
import unsend from "../../../assets/chatIcons/unsend.png";
import profile from "../../../assets/chatIcons/profile.png";
import block from "../../../assets/chatIcons/block.png";
import io from "socket.io-client";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState ,useRef} from 'react'
import { useSelector, useDispatch } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { moreChatActions } from "../../Redux/Slice/moreChatSlice/moreChatSlice";
import { dotsOpenModalToggleActions } from "../../Redux/Slice/dotsOpenModalSlice/dotsOpenModalSlice";
const socket = io.connect("http://192.168.29.169:4000")
const MessageDetailsCard = ({ messageDetails }) => {
  const [getChatDetailObj, setGetChatDetailObj] = useState({})
  const [messageText, setMessageText] = useState('')
  const [loginId, setLoginId] = useState('')
  const [loginObj, setLoginObj] = useState({})
  const [fetchMessages, setFetchMessages] = useState([])
  const [fetchTypingIdObj, setFetchTypingIdObj] = useState([])
  const [finalMessageArray, setFinalMessageArray] = useState([])
  const [loginIdUserArray, setLoginIdUserArray] = useState([])
  const [showTypingResponse,setShowTypingResponse]=useState(false)
  const [activeLoginIdResponse,setActiveLoginIdResponse]=useState(false)
  const [openIndex, setOpenIndex] = useState('')
  const previousTextRef = useRef("");
  const windowHeight = Dimensions.get('window').height;
  console.log('window heigth', windowHeight)
  const navigation = useNavigation();
  const dispatch = useDispatch()
  console.log("message details is", messageDetails);
  const loginResponse = useSelector((state) => state.loginData.loginData.token)
  const loginOtpResponse=useSelector((state)=>state?.finalLoginWithOtpData?.finalLoginWithOtpData?.token || '') // otp login token
  console.log('login otp reposne in message detail card',loginOtpResponse)
  const deleteChatSelector = useSelector((state) => state.moreChatData.moreChatToggle)
  const dotOpenHandler=useSelector((state)=>state.dotsOpenData.dotsOpenToggle)
  console.log("dot open selector", dotOpenHandler);
  console.log("delete chat selector", deleteChatSelector);
  const backHandler = () => {
    navigation.navigate("Messages");
  };
  useEffect(() => {
    if (loginResponse || loginOtpResponse) {
      const getLoginId = async () => {
        const loginIdData = await SecureStore.getItemAsync('loginId');
        setLoginId(loginIdData)
      };
      getLoginId()
    }
  }, [loginResponse,loginOtpResponse])

  useEffect(() => {
    if (loginResponse || loginOtpResponse) {
      const getLoginObj = async () => {
        try {
          const loginObjData = await SecureStore.getItemAsync('loginObj');
          if (loginObjData) {
            const parsedLoginObj = JSON.parse(loginObjData); // Parse the JSON string
            setLoginObj(parsedLoginObj); // Set the parsed object in state
          } else {
            console.error('No loginObj found in SecureStore');
          }
        } catch (error) {
          console.error('Error fetching loginObj from SecureStore:', error);
        }
      };
      getLoginObj();
    }
  }, [loginResponse,loginOtpResponse]);

  useEffect(()=>{
    const fetchAllLoginIdUser = async () => {
      try {
        if (loginId) {
          const response = await axios.get(
            `http://192.168.29.169:4000/user/getAllLoginIdUser/${loginId}`,
          );
          // setLikesArray(response?.data?.anotherMatchUser || []);
          console.log('get all login id user is', response?.data?.loginIdUserArray)
          setLoginIdUserArray(response?.data?.loginIdUserArray)
        }
      } catch (error) {
        console.error("Error fetching in chat id obj:", error);
      }
    };
    fetchAllLoginIdUser();
    socket.on("getLoginUser", (newUser) => {
  
      setLoginIdUserArray(newUser)
    });
    socket.on("deleteLoginIdUser", (newUser) => {
      setLoginIdUserArray(newUser)
    });
    return () => {
      socket.off("getLoginUser");
      socket.off("deleteLoginIdUser");
    };
   
  },[loginId])

  console.log('login id user array is',loginIdUserArray)
  useEffect(() => {
    if (loginId) {
      const getActiveLoginId = loginIdUserArray?.some(
        (item) => item === messageDetails?._id
      );
      setActiveLoginIdResponse(getActiveLoginId)
    }
  }, [loginId, loginIdUserArray, messageDetails]);

  useEffect(() => {
    const fetchChatId = async () => {
      try {
        if (loginId) {
          const response = await axios.get(
            `http://192.168.29.169:4000/chat/getChatId`, {
            params: { loginId: loginId, anotherId: messageDetails._id } // Pass the object as query parameters
          }
          );
          // setLikesArray(response?.data?.anotherMatchUser || []);
          console.log('get chat id user is', response?.data?.chatIdUser)
          setGetChatDetailObj(response?.data?.chatIdUser);
        }
      } catch (error) {
        console.error("Error fetching in chat id obj:", error);
      }
    };

    fetchChatId();

    // socket.on("getChatIdUser", (newUser) => {

    //   setGetChatDetailObj(newUser)
    // });

    // return () => {
    //   socket.off("getChatIdUser");
    // };
  }, [loginId]);

  console.log('get chat details obj', getChatDetailObj)
  // console.log('chat detail array',chatDetailArray)



  const messageTypingHandler = async (text) => {
    setMessageText(text);
    const postTypingObj = {
      loginId: loginId,
      senderId: loginId,
      recieverId: messageDetails._id,
    };
  
    console.log('text is', text);
    console.log('post typing is', postTypingObj);
  
    try {
      if (text.length > messageText.length) {
        // Call the postTyping API when text is increasing
        const response = await axios.post(
          `http://192.168.29.169:4000/chat/postTyping/${postTypingObj.loginId}`,
          postTypingObj
        );
        console.log('Send typing message of data is', response.data);
        socket.emit('postTyping', response.data);
      } else if (text.length <= messageText.length  ) {
        const response = await axios.post(
          `http://192.168.29.169:4000/chat/deleteTyping`,
          postTypingObj
        );
        console.log('Delete typing message of data is', response.data);
      }
   
    } catch (error) {
      console.error(
        'Error sending or deleting message:',
        error.response || error.message || error
      );
    }
  };
  


useEffect(() => {

  const getMessageTyping = async () => {
    try {
      if (loginId) {
        const response = await axios.get(`http://192.168.29.169:4000/chat/getTyping/${loginId}`);
        // const response = await axios.get(`https://apnapandaitingwebsitebackend.up.railway.app/chat/getMessage/${id}`);
        // console.log('fetch messages is', response.data.chatUserArray)
        // console.log('fetch message in reciever', response.data.recieverChatUserArray)
   setFetchTypingIdObj(response.data)

      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  getMessageTyping()
  socket.on('getTyping', (newTypingId) => {
    // setFetchTypingIdArray(preTypingId => [...preTypingId, newTypingId])
    setFetchTypingIdObj(newTypingId)
  })
  socket.on('typingChatDeleted', (deleteTyping) => {
    // setFetchMessages((prevMessages) =>
    //   prevMessages.filter((msg) => msg._id !== deletedMessage._id)
    // );
    setFetchTypingIdObj(deleteTyping)
  });

  return () => {
    socket.off('getTyping')
    socket.off('typingChatDeleted');
  }
}, [loginId])
console.log('fetch typing id obj',fetchTypingIdObj)

useEffect(() => {
  if (loginId) {
    const getTypingIdResponse = fetchTypingIdObj?.data?.some(
      (item) => item === messageDetails?._id
    );
    setShowTypingResponse(getTypingIdResponse)
    console.log('get typing id response:', getTypingIdResponse);
  }
}, [loginId, fetchTypingIdObj, messageDetails]);


  const submitHandler = async () => {
    if (messageText.trim()) {
      const messageSubmitData = {
        id: loginId,
        senderId: loginId,
        recieverId: messageDetails._id,
        message: messageText,
        senderName: loginObj?.firstName,
        images: loginObj?.image
      };
      const deleteTypingObj={
        loginId:loginId,
        senderId:loginId,
        recieverId:messageDetails._id
      }
      console.log("Message sent:", messageSubmitData);
      try {
        const response = await axios.post(`http://192.168.29.169:4000/chat/addSendMessage/${messageSubmitData.id}`, messageSubmitData);
        console.log(' send message of data is', response.data)
        socket.emit('sendMessage', response.data.chatUser)
        setMessageText('')
        const responseData = await axios.post(`http://192.168.29.169:4000/chat/deleteTyping`, deleteTypingObj);
        console.log('delete  typing message of data is', responseData.data);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      console.log("Message text is empty");
    }
  };

  useEffect(() => {

    const fetchMessage = async () => {
      try {
        if (loginId) {
          const response = await axios.get(`http://192.168.29.169:4000/chat/getMessage/${loginId}`);
          // const response = await axios.get(`https://apnapandaitingwebsitebackend.up.railway.app/chat/getMessage/${id}`);
          // console.log('fetch messages is', response.data.chatUserArray)
          // console.log('fetch message in reciever', response.data.recieverChatUserArray)
          setFetchMessages(response.data.chatUserArray);

        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessage()
    socket.on('recieveMessage', (newMessage) => {
      setFetchMessages(preMessages => [...preMessages, newMessage])
    })
    socket.on('messageDeleted', (deletedMessage) => {
      setFetchMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== deletedMessage._id)
      );
    });

    return () => {
      socket.off('recieveMessage')
      socket.off('messageDeleted');
    }
  }, [loginId])



  useEffect(() => {
    if (loginId) {
      const filterMessageArray = fetchMessages.filter((messageItem) => messageItem.chatId === getChatDetailObj._id)
      setFinalMessageArray(filterMessageArray)

    }
  }, [loginId, fetchMessages, getChatDetailObj?._id])
  console.log('final message array', finalMessageArray)

  const messageClickHandler = (finalMessage, index) => {
    console.log('final message', finalMessage)
    setOpenIndex(index)
    dispatch(moreChatActions.moreChatToggle())
  }

  const deleteChatHandler = async (deleteChatMessage) => {
    try {
      await axios.post(`http://192.168.29.169:4000/chat/deleteChat`, deleteChatMessage);

    } catch (error) {
      console.error('Error sending message:', error);
    }
    dispatch(moreChatActions.moreChatToggle())
  }
  const messageDetailsProfileHandler = (messageDetailProfile) => {
    navigation.navigate('MessageProfilePage', { formData: messageDetailProfile });
  }
  const dotPressHandler = () => {
    console.log('dot is pressed')
    dispatch(dotsOpenModalToggleActions.dotsOpenModalToggle())
  }
  const viewProfileHandler=(messageDetailProfile)=>{
    navigation.navigate('MessageProfilePage', { formData: messageDetailProfile });
    dispatch(dotsOpenModalToggleActions.dotsOpenModalToggle())
  }
  const viewProfileBlockHandler=async(messageDetailProfile)=>{
    // navigation.navigate('MessageProfilePage', { formData: messageDetailProfile });
    const blockChatIdObj={
    id:loginId,
    blockId:messageDetailProfile._id
    }
    try {
      const response = await axios.post(`http://192.168.29.169:4000/user/addBlockChatIdUser/${blockChatIdObj.id}`,blockChatIdObj);
      console.log('response in block chat user',response?.data)
      socket.emit('addBlockUser', response?.data)
      // socket.emit('addLikeMatchUser', response?.data)
  
  } catch (error) {
      console.error('Error sending user in block', error);
  }
    dispatch(dotsOpenModalToggleActions.dotsOpenModalToggle())
    navigation.navigate("Messages");
  
  }
  return (
    <>
      <View style={{ flex: 1 }}>
        {/* Header Section */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            marginTop: 40,
          }}
        >
          <View style={{ marginTop: 10 }}>
            <Button onPress={backHandler}>
              <Image source={back} style={{ width: 15, height: 15 }} />
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
                  color: "black",
                  fontWeight: "500",
                  paddingTop: `${showTypingResponse===true || activeLoginIdResponse===true ?8:14}`,
                }}
              >
                {messageDetails?.firstName}
              </Text>
              {showTypingResponse===true?<Text>typing...</Text>:null}
              {activeLoginIdResponse===true?<Text style={{color:'green'}}>Online</Text>:null}
              </View>
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
            </Card.Content>
          </Card>
        </View>}


        <View style={{ flex: 1, marginBottom: 100 }}>
          <ScrollView>
            {
              finalMessageArray.map((finalMessage, index) => {
                const uniqueKey = finalMessage._id || `${finalMessage.message}_${index}`;
                return (
                  <View key={uniqueKey} style={{
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
                    <View style={{
                      marginTop: 12,
                      backgroundColor: `${finalMessage.senderId === loginId ? 'blue' : '#dcdcdc'}`,
                      marginLeft: 10,
                      marginRight: 10,
                      borderRadius: 20,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      maxWidth: '80%', // Ensures the message doesn't stretch too far across the screen
                      flexShrink: 1, // Allows the message box to shrink and fit content size
                      minWidth: 50, // Minimum width to prevent the message from being too small
                    }}
                      onStartShouldSetResponder={() => true}
                      onResponderRelease={() => messageClickHandler(finalMessage, index)}
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          color: `${finalMessage.senderId === loginId ? 'white' : 'black'}`,
                          paddingTop: 3,
                          flexWrap: 'wrap', // Allow text to wrap if it exceeds the container's width
                          width: '100%', // Ensures the text takes up the full width of the container
                          paddingLeft: 6,
                          paddingRight: 6,
                          paddingBottom: 4
                        }}
                      >
                        {finalMessage.message}
                      </Text>
                      <Text style={{ fontSize: 10, textAlign: 'right', color: `${finalMessage.senderId === loginId ? '#dcdcdc' : 'black'}` }}>{new Date(finalMessage.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
                    </View>
                  </View>
                );
              })
            }
          </ScrollView>
        </View>

        {/* Message Input Section */}
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
            bottom: -6,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: "#ccc",
              paddingHorizontal: 10,
              borderRadius: 5,
              backgroundColor: "#fff",
              // marginLeft:-20
              marginRight: 12,
              height: 50
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
        </View>
      </View>
    </>
  );
};

export default MessageDetailsCard;
