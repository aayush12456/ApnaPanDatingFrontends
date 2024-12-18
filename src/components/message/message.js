
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
    const loginResponse=useSelector((state)=>state.loginData.loginData.token)
  useEffect(()=>{
    if(loginResponse){
      const getLoginId = async () => {
        const loginIdData = await SecureStore.getItemAsync('loginId');
        setLoginId(loginIdData)
      };
      getLoginId()
    }
},[loginResponse])

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

      const finalMessageArray = [
        ...(likeMatchUserObj?.matchLikes || []),
        ...(likeMatchUserObj?.anotherMatchLikes || [])
      ];
      console.log('final message array',finalMessageArray)                 
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