import MessageDetailsCard from "../../components/messageDetailsCard/messageDetailsCard"
import axios from 'axios'
import io from "socket.io-client";
import { useState,useEffect } from "react";
import {View} from 'react-native'
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://apnapandatingbackend.onrender.com")
const MessageDetailsPageContent=({route})=>{
  const BASE_URL = "http://192.168.29.169:4000";
  // const BASE_URL = "https://apnapandatingbackend.onrender.com";
    const { formData,completeObj,onlineUsers } = route?.params;
    const [deactivateUserObj,setDeactivateUserObj]=useState({})
    console.log('online users in details',onlineUsers)

    
    const completeLoginObjData=completeObj ||  {}
    const loginId=completeLoginObjData?.userId
  
    useEffect(()=>{
      const fetchDeactivateUser = async () => {
        try {
          if (loginId) {
            const response = await axios.get(
              `${BASE_URL}/user/getDeactivateUser/${loginId}`,
            );
            // console.log('get deactivate user obj is', response?.data)
            setDeactivateUserObj(response?.data)
          }
        } catch (error) {
          // console.error("Error fetching in chat id obj:", error);
        }
      };
      fetchDeactivateUser();
  
      socket.on("getDeactivateUser", (newUser) => {
  
        setDeactivateUserObj(newUser)
      });
      return () => {
        socket.off("getDeactivateUser");
      };
    },[loginId])
  //  console.log('get deactivate user obj in like page',deactivateUserObj)
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <MessageDetailsCard messageDetails={formData} deactivateUserObj={deactivateUserObj} completeObj={completeObj} onlineUserArray={onlineUsers}/>
    </View>
    </>
)
}
export default MessageDetailsPageContent