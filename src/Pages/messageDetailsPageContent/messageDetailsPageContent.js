import MessageDetailsCard from "../../components/messageDetailsCard/messageDetailsCard"
import axios from 'axios'
import io from "socket.io-client";
import { useState,useEffect } from "react";
import {View} from 'react-native'
import ScreenShotCapture from "../../components/screenshotCapture/screenshotCapture";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://apnapandatingbackend.onrender.com")
const MessageDetailsPageContent=({route})=>{
  const BASE_URL = "http://192.168.29.169:4000";
  // const BASE_URL = "https://apnapandatingbackend.onrender.com";
    const { formData,completeObj,onlineUsers } = route?.params;
    const [deactivateUserObj,setDeactivateUserObj]=useState({})
    const [notifyObj, setNotifyObj] = useState([]);
    const [filterNotify,setFilterNotify]=useState([])
    const [chatUsersArray, setChatUsersArray] = useState([])
    const [notifyChecks,setNotifyChecks]=useState(null)
    console.log('online users in details',onlineUsers)

    
    const completeLoginObjData=completeObj ||  {}
    const loginId=completeLoginObjData?.userId
  console.log('login id message',loginId)
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

  useEffect(() => {
    const getNotify = async () => {
      if (!loginId) return;
  
      const response = await axios.get(
        `${BASE_URL}/user/notifyUser/${loginId}`
      );
  
      setNotifyObj(response.data.notifyUser);
    };
  
    getNotify();
  }, [loginId]);
  
  useEffect(() => {
    socket.on("getNotifyId", (data) => {
      console.log("notify socket", data);
      setNotifyObj(data);
    });
  
    return () => {
      socket.off("getNotifyId");
    };
  }, []);
  console.log('notify onj',notifyObj)
  console.log('forms datas',formData)
  
  useEffect(() => {
    if (notifyObj?.length > 0 && formData?._id) {
      const user = notifyObj.filter(
        (item) => item?.loginId === formData?._id
      );
  
      setFilterNotify(user);
    } else {
      setFilterNotify([]);
    }
  }, [notifyObj, formData?._id]);
  console.log('arrays',filterNotify)

  useEffect(() => {
    // Mount hone par current array maang lo
    socket.emit('requestChatUsers');

    socket.on("getChatUsers", (data) => {
      console.log("getChatUsers socket data (array of obj):", data);
      setChatUsersArray(data || []);
    });

    return () => {
      socket.off("getChatUsers");
    };
  }, []);
  console.log('chatUsersArray from socket:', chatUsersArray)

  console.log('forms data in messafe contrn',formData)
  
  useEffect(() => {
    const checks = chatUsersArray.filter(
      (item) => item?.anotherId === loginId && item?.loginId === formData?._id
    );
    setNotifyChecks(checks);
  }, [chatUsersArray, loginId, formData?._id]);

  console.log('checks data',notifyChecks)
return (
    <>
    <ScreenShotCapture/>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <MessageDetailsCard messageDetails={formData} deactivateUserObj={deactivateUserObj}
     completeObj={completeObj} onlineUserArray={onlineUsers} notifyUser={filterNotify} notifyChecks={notifyChecks}/>
    </View>
    </>
)
}
export default MessageDetailsPageContent