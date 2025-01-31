import { Text, View } from "react-native";
import { Image } from 'expo-image';
import { Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux'
import {useState,useEffect} from 'react'
import * as SecureStore from 'expo-secure-store';
import io from "socket.io-client";
import axios from "axios";
import FilteredChatMessage from "../filteredChatMessage/filteredChatMessage";
import typingIcon from "../../../assets/chatIcons/chat.gif";
const socket = io.connect("http://192.168.29.169:4000")
const MessageCard=({finalMessageUser,completeObj})=>{
    const [loginObj,setLoginObj]=useState({})
    const [chatIdArray, setChatIdArray] = useState([])
    const [filteredMessages, setFilteredMessages] = useState([])
    const [fetchMessages,setFetchMessages]=useState([])
    const [loginIdUserArray, setLoginIdUserArray] = useState([])
    const [fetchTypingIdObj, setFetchTypingIdObj] = useState([])
    const [recordMessage, setRecordMessage] = useState([])
    const [checkMessages, setCheckMessages] = useState(false)
    const [activeLoginIdResponse,setActiveLoginIdResponse]=useState(false)
    const [showTypingResponse,setShowTypingResponse]=useState(false)
    const [recordMessageId,setRecordMessageId]=useState(false)
    console.log('final message user in message card',finalMessageUser)
    const loginResponse=useSelector((state)=>state.loginData.loginData.token)
    const loginOtpResponse=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.token) // otp login token
    const navigation = useNavigation();
    const getProfile = () => finalMessageUser;
    const dob = getProfile()?.DOB;
    const dobBreak = dob?.split("/");
    const year = dobBreak?.[2];
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    const age = year ? currentYear - parseInt(year) : "";
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

  console.log('login obj',loginObj)

  useEffect(()=>{
    const fetchAllLoginIdUser = async () => {
      try {
        if (loginObj?._id) {
          const response = await axios.get(
            `http://192.168.29.169:4000/user/getAllLoginIdUser/${loginObj?._id}`,
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
       console.log('on get login user array',newUser)
      setLoginIdUserArray(newUser)
    });

    socket.on("deleteLoginIdUser", (newUser) => {
     setLoginIdUserArray(newUser)
   });

    return () => {
      socket.off("getLoginUser");
      socket.off("deleteLoginIdUser");
    };
  },[loginObj?._id])

  console.log('login id user array is',loginIdUserArray)
  useEffect(() => {
    if (loginObj?._id) {
      const getActiveLoginId = loginIdUserArray?.some(
        (item) => item === finalMessageUser?._id
      );
      setActiveLoginIdResponse(getActiveLoginId)
    }
  }, [loginObj?._id, loginIdUserArray, finalMessageUser]);

  
useEffect(() => {

  const getMessageTyping = async () => {
    try {
      if (loginObj?._id) {
        const response = await axios.get(`http://192.168.29.169:4000/chat/getTyping/${loginObj?._id}`);
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
}, [loginObj?._id])
console.log('fetch typing id obj',fetchTypingIdObj)

useEffect(() => {
  if (loginObj?._id) {
    const getTypingIdResponse = fetchTypingIdObj?.data?.some(
      (item) => item === finalMessageUser?._id
    );
    setShowTypingResponse(getTypingIdResponse)
    console.log('get typing id response:', getTypingIdResponse);
  }
}, [loginObj?._id, fetchTypingIdObj, finalMessageUser]);


    const messageCardClickHandler=async(finalMessageUser)=>{
    console.log('final message user',finalMessageUser)
    if(finalMessageUser){
      const addChatIdObj={
     id:loginObj?._id,
     anotherId:finalMessageUser?._id,
     loginName:loginObj.name,
     anotherName:finalMessageUser.firstName
      }
      const deleteRecordMessageIdObj={
        id:loginObj?._id,
        recieverId:finalMessageUser?._id
      }
      const anotherRecordMessageIdObj={
        id:loginObj?._id,
        recieverId:finalMessageUser?._id
      }
      try {
        const deleteResponseIdObj = await axios.post(`http://192.168.29.169:4000/chat/deleteRecordMessage/${deleteRecordMessageIdObj.id}`,deleteRecordMessageIdObj);
        console.log('response in delete recoird id user is',deleteResponseIdObj?.data)
            //  socket.emit('deleteRecordMessageId', deleteResponseIdObj?.data?.recordMessageIdArray)
            socket.emit('deleteRecordMessageId', deleteResponseIdObj?.data)
    } catch (error) {
        console.error('Error sending message in delete id:', error);
    }
    try {
      const anotherResponseIdObj = await axios.post(`http://192.168.29.169:4000/chat/addAnotherRecordMessage/${anotherRecordMessageIdObj.id}`,anotherRecordMessageIdObj);
      console.log('response in another record message id user is',anotherResponseIdObj?.data?.anotherRecordMessageIdArray)
  } catch (error) {
      console.error('Error sending another response in another response id:', error);
  }
      try {
        const response = await axios.post(`http://192.168.29.169:4000/chat/addChatId`, addChatIdObj);
        console.log('response in add chat id user is',response?.data?.chatIdUser)
        navigation.navigate('MessageDetailsPageContent', {
          formData: finalMessageUser,
        });
    } catch (error) {
        console.error('Error sending message in add chat id:', error);
    }
    }
    }
    useEffect(() => {
      const fetchAllChatId = async () => {
          try {
              const response = await axios.get(`http://192.168.29.169:4000/chat/getAllChatId`);
              // const response = await axios.get(`https://apnapandaitingwebsitebackend.up.railway.app/chat/getAllChatId`);
              console.log('fetch chat id messages is',response.data)
              setChatIdArray(response.data.chatIdArray)

          } catch (error) {
              console.error("Error fetching messages:", error);
          }
      };
      fetchAllChatId()
  }, [])

  useEffect(() => {

    const fetchMessage = async () => {
        try {
          if(loginObj?._id){
            const response = await axios.get(`http://192.168.29.169:4000/chat/getMessage/${loginObj?._id}`);
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
            prevMessages.filter((msg) => msg?._id !== deletedMessage?._id)
        );
    });
  
    return () => {
        socket.off('recieveMessage')
        socket.off('messageDeleted');
    }
  }, [loginObj?._id])
  
  

  useEffect(() => {
    if (fetchMessages.length && chatIdArray.length) {
        const currentTime = new Date();

        // Map through chatIdArray to find the closest message for each chatId
        const closestMessagesArray = chatIdArray.map(chatItem => {
            // Filter messages matching the current chatId
            const matchingMessages = fetchMessages.filter(messageItem => messageItem.chatId === chatItem?._id);

            // Find the message with the closest timestamp to the current time
            if (matchingMessages.length > 0) {
                return matchingMessages.reduce((closest, currentMessage) => {
                    const currentMessageTime = new Date(currentMessage.timestamp);
                    const closestMessageTime = new Date(closest.timestamp);

                    // Calculate time differences
                    const currentTimeDiff = Math.abs(currentTime - currentMessageTime);
                    const closestTimeDiff = Math.abs(currentTime - closestMessageTime);

                    // Return the message with the smaller time difference
                    return currentTimeDiff < closestTimeDiff ? currentMessage : closest;
                }, matchingMessages[0]);
                
            }
            return null;
        }).filter(message => message !== null); // Filter out any nulls

        // console.log('Array of closest messages for each chatId:', closestMessagesArray);
        setFilteredMessages(closestMessagesArray)
    }
}, [fetchMessages, chatIdArray]);
console.log('fetch message in message card',filteredMessages)





useEffect(() => {
  const checkMessage = filteredMessages.some(
      filterItem => filterItem.senderId === finalMessageUser?._id && filterItem.recieverId === loginObj?._id
  );
  const anotherCheckMessage = filteredMessages.some(
      filterItem => filterItem.senderId === loginObj?._id && filterItem.recieverId === finalMessageUser?._id
  );
  if (checkMessage || anotherCheckMessage) {
      setCheckMessages(true);
  }
}, [filteredMessages, finalMessageUser?._id, loginObj?._id]);

useEffect(() => {

  const fetchRecordMessage = async () => {
      try {
        if(loginObj?._id){
          const response = await axios.get(`http://192.168.29.169:4000/chat/getRecordMessage/${loginObj?._id}`);
          // const response = await axios.get(`https://apnapandaitingwebsitebackend.up.railway.app/chat/getMessage/${id}`);
          // console.log('fetch messages is', response.data.chatUserArray)
          // console.log('fetch message in reciever', response.data.recieverChatUserArray)
          // setRecordMessage(response.data.recordMessageIdArray);
          setRecordMessage(response.data);

        }
      } catch (error) {
          console.error("Error fetching messages:", error);
      }
  };
  fetchRecordMessage()
  socket.on('recieveRecordMessageId', (newMessage) => {
    setRecordMessage(newMessage);
  })
  // socket.on('recordMessageIdDeleted', (newMessage) => {
  //   setRecordMessage(newMessage);
  // })
  return () => {
      socket.off('recieveRecordMessageId')
      // socket.off('recordMessageIdDeleted')
  }
}, [loginObj?._id])

console.log('record message array',recordMessage)

useEffect(() => {
  const checkRecordMessageId = recordMessage?.recordMessageIdArray?.some(
      recordId => recordId === finalMessageUser?._id 
  );
  setRecordMessageId(checkRecordMessageId)
}, [ recordMessage, finalMessageUser?._id]);
console.log('record message id response',recordMessageId)
return (
    <>
      <Card
              style={{
                marginLeft: 8,
                marginRight: 8,
                marginTop: 20,
                backgroundColor:`${completeObj?.appearanceMode==='Dark Mode'?'#343434':'white'}`
              }}
              onPress={()=>messageCardClickHandler(finalMessageUser)}
            >
              <Card.Content>
                <View
                  style={{
                    flexDirection: "row",
                    gap:30
                  }}
                >
                  <View style={{flexDirection:'row'}}>
                  <Image
                      source={{ uri: finalMessageUser?.images[0] }}
                      style={{ width: 65, height: 65, borderRadius: 70 }}
                    />
               {activeLoginIdResponse===true?<View
      style={{
        width: 15, 
        height: 15,
        backgroundColor: 'rgba(74, 222, 128,1)',
        borderRadius: 15 / 2,
        position: 'absolute',
        bottom: 5, 
        right: 0, 
        borderWidth: 2,
        borderColor: 'white',
      }}
    />:null}
                  </View>
                    <View>
                    <View style={{ flexDirection:'row',gap:10,paddingTop:7 }}>
                    <Text style={{ color: "black", fontWeight: "500",color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}>
                      {finalMessageUser?.firstName},
                    </Text>
                    <Text style={{ color: "black", fontWeight: "500",color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}>
                      {age}
                    </Text>
                  </View>
                  <View>
                    {showTypingResponse===true?null:
                      filteredMessages.map((filterMessage)=>{
                    
                        return (
               
                          <FilteredChatMessage key={filterMessage?._id} filterMessage={filterMessage} filterUser={finalMessageUser} loginObj={loginObj}
                           recordMessageId={recordMessageId} completeObj={completeObj} />
                    
                        )
                      })
                    }
                 {checkMessages===false && <Text style={{ color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`,
                  fontWeight: "500",paddingTop:2 }}>
           You have both paired
                    </Text>}
                    {showTypingResponse===true &&
                    <View style={{flexDirection:'row',gap:0}}>
          <Image source={typingIcon} style={{width:17,marginTop:6}}/>
          <Text style={{ color: "#32cd32",paddingTop:2 }}>
                    Typing
                    </Text>
                    </View>
       }
                  </View>
                    </View> 
                    {recordMessageId===true?<View
      style={{
        width: 15, 
        height: 15,
        backgroundColor: 'blue',
        borderRadius: 15 / 2,
        position: 'absolute',
        bottom: 25, 
        right: 0, 
        borderWidth: 2,
        borderColor: 'white',
      }}
    />:null }                   
                </View>
              </Card.Content>
            </Card>
    </>
)
}
export default MessageCard