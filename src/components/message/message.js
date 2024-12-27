
import {  ScrollView } from "react-native";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import io from "socket.io-client";
import axios from "axios";
import MessageCard from "../messageCard/messageCard";
const socket = io.connect("http://192.168.29.169:4000")
const Message=()=>{
    const [loginId,setLoginId]=useState('')
    const [likeMatchUserObj,setLikeMatchUserObj]=useState({})
    const [blockUserObj,setBlockUserObj]=useState({})
    const loginResponse=useSelector((state)=>state.loginData.loginData.token)
    const loginOtpResponse=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.token) // otp login token
  useEffect(()=>{
    if(loginResponse || loginOtpResponse){
      const getLoginId = async () => {
        const loginIdData = await SecureStore.getItemAsync('loginId');
        setLoginId(loginIdData)
      };
      getLoginId()
    }
},[loginResponse,loginOtpResponse])

    useEffect(() => {
        const fetchLikeMatchUsers = async () => {
          try {
            if (loginId) {
              const response = await axios.get(
                `http://192.168.29.169:4000/user/getLikeMatchUser/${loginId}`
              );
              // setLikesArray(response?.data?.anotherMatchUser || []);
              console.log('get like match user is',response?.data)
              setLikeMatchUserObj(response?.data );
            }
          } catch (error) {
            console.error("Error fetching matches:", error);
          }
        };
      
        fetchLikeMatchUsers();
      
        socket.on("getLikeMatchUser", (newUser) => {
      
          setLikeMatchUserObj(newUser)
        });
      
        return () => {
          socket.off("getLikeMatchUser");
        };
      }, [loginId]);
      console.log('like match user obj in message',likeMatchUserObj)

      useEffect(() => {
        const fetchBlockProfileUser = async () => {
          try {
            if (loginId) {
              const response = await axios.get(
                `http://192.168.29.169:4000/user/getBlockChatIdUser/${loginId}`,
              );
              // setLikesArray(response?.data?.anotherMatchUser || []);
              console.log('get block user obj is block profile page', response?.data)
              setBlockUserObj(response?.data);
            }
          } catch (error) {
            console.error("Error fetching in block user obj:", error);
          }
        };
    
        fetchBlockProfileUser();
    
        socket.on("getBlockUser", (newUser) => {
    
            setBlockUserObj(newUser)
        });
    
        return () => {
          socket.off("getBlockUser");
        };
      }, [loginId]);     
       
      // const finalMessageArray = [
      //   ...(likeMatchUserObj?.matchLikes || []),
      //   ...(likeMatchUserObj?.anotherMatchLikes || [])
      // ];
      const blockUserIds = [
        ...(blockUserObj?.blockUserArray || []),
        ...(blockUserObj?.anotherBlockUserArray || [])
      ].map(user => user._id); // Extract block user IDs
    
      const filteredMatchLikes = (likeMatchUserObj?.matchLikes || []).filter(
        (user) => !blockUserIds.includes(user._id)
      );
    
      const filteredAnotherMatchLikes = (likeMatchUserObj?.anotherMatchLikes || []).filter(
        (user) => !blockUserIds.includes(user._id)
      );
    let finalMessageArray
     finalMessageArray = blockUserIds.length
        ? [...filteredMatchLikes, ...filteredAnotherMatchLikes]
        : [
            ...(likeMatchUserObj?.matchLikes || []),
            ...(likeMatchUserObj?.anotherMatchLikes || []),
          ];
      console.log('final message array',finalMessageArray)
       
      finalMessageArray = finalMessageArray.filter(
        (user) => user._id !== loginId
      );    
return (
    <>
    <ScrollView>
    {finalMessageArray?.map((finalMessageUser, index) => {
          const uniqueKey = finalMessageUser._id || `${finalMessageUser._id}_${index}`;
        return (
         
         <MessageCard key={uniqueKey} finalMessageUser={finalMessageUser} index={index}/>
        );
      })}
    </ScrollView>
    </>
)
}
export default Message