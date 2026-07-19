import LargeCard from "../../components/common/largeCard/largeCard"
import axios from 'axios'
import io from "socket.io-client";
import * as SecureStore from 'expo-secure-store';
import {useSelector} from 'react-redux'
import { useState,useEffect } from "react";
import { View } from "react-native";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://apnapandatingbackend.onrender.com")
const LikePageContent=({route})=>{
  const BASE_URL = "http://192.168.29.169:4000";
  // const BASE_URL = "https://apnapandatingbackend.onrender.com";
    const { formData,completeObj } = route?.params;
    // console.log('form in likePage',formData)

    const [deactivateUserObj,setDeactivateUserObj]=useState({})

    
    const completeLoginObjData=completeObj || {}
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
    <LargeCard likeContent={formData} deactivateUserObj={deactivateUserObj} completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default LikePageContent