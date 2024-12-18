import { Text, View, Image } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux'
import {useState,useEffect} from 'react'
import * as SecureStore from 'expo-secure-store';
import io from "socket.io-client";
import axios from "axios";
import FilteredChatMessage from "../filteredChatMessage/filteredChatMessage";
const socket = io.connect("http://192.168.29.169:4000")
const MessageCard=({finalMessageUser,index})=>{
    const [loginObj,setLoginObj]=useState({})
    const [chatIdArray, setChatIdArray] = useState([])
    const [filteredMessages, setFilteredMessages] = useState([])
    const [fetchMessages,setFetchMessages]=useState([])
    const [checkMessages, setCheckMessages] = useState(false)
    console.log('final message user in message card',finalMessageUser)
    const loginResponse=useSelector((state)=>state.loginData.loginData.token)
    const navigation = useNavigation();
    const getProfile = () => finalMessageUser;
    const dob = getProfile()?.DOB;
    const dobBreak = dob?.split("/");
    const year = dobBreak?.[2];
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    const age = year ? currentYear - parseInt(year) : "";
useEffect(() => {
  if (loginResponse) {
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
}, [loginResponse]);

  console.log('login obj',loginObj)
    const messageCardClickHandler=async(finalMessageUser)=>{
    console.log('final message user',finalMessageUser)
    if(finalMessageUser){
      const addChatIdObj={
     id:loginObj?._id,
     anotherId:finalMessageUser._id,
     loginName:loginObj.name,
     anotherName:finalMessageUser.firstName
      }
      try {
        const response = await axios.post(`http://192.168.29.169:4000/chat/addChatId`, addChatIdObj);
        console.log('response in add chat id user is',response?.data?.chatIdUser)
        // socket.emit('addChatIdUser', response?.data?.chatIdUser)
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
          if(loginObj._id){
            const response = await axios.get(`http://192.168.29.169:4000/chat/getMessage/${loginObj._id}`);
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
  }, [loginObj._id])
  
  

  useEffect(() => {
    if (fetchMessages.length && chatIdArray.length) {
        const currentTime = new Date();

        // Map through chatIdArray to find the closest message for each chatId
        const closestMessagesArray = chatIdArray.map(chatItem => {
            // Filter messages matching the current chatId
            const matchingMessages = fetchMessages.filter(messageItem => messageItem.chatId === chatItem._id);

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
      filterItem => filterItem.senderId === finalMessageUser._id && filterItem.recieverId === loginObj._id
  );
  const anotherCheckMessage = filteredMessages.some(
      filterItem => filterItem.senderId === loginObj._id && filterItem.recieverId === finalMessageUser._id
  );
  if (checkMessage || anotherCheckMessage) {
      setCheckMessages(true);
  }
}, [filteredMessages, finalMessageUser._id, loginObj._id]);

return (
    <>
      <Card
              key={finalMessageUser._id || index} 
              style={{
                marginLeft: 8,
                marginRight: 8,
                marginTop: 20,
                backgroundColor: "white",
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
                    <Image
                      source={{ uri: finalMessageUser?.images[0] }}
                      style={{ width: 65, height: 65, borderRadius: 70 }}
                    />
                    <View>
                    <View style={{ flexDirection:'row',gap:10,paddingTop:7 }}>
                    <Text style={{ color: "black", fontWeight: "500" }}>
                      {finalMessageUser?.firstName},
                    </Text>
                    <Text style={{ color: "black", fontWeight: "500" }}>
                      {age}
                    </Text>
                  </View>
                  <View>
                    {
                      filteredMessages.map((filterMessage,index)=>{
                        const messageUniqueKey = `${filterMessage._id}_${index}`;
                        return (
                          <>
                          <FilteredChatMessage key={messageUniqueKey} filterMessage={filterMessage} filterUser={finalMessageUser} loginObj={loginObj} index={index} />
                          </>
                        )
                      })
                    }
                 {checkMessages===false && <Text style={{ color: "black", fontWeight: "500",paddingTop:2 }}>
           You have both paired
                    </Text>}
                  </View>
                    </View>                     
                </View>
              </Card.Content>
            </Card>
    </>
)
}
export default MessageCard