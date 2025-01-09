import CommonHeader from "../../components/common/commonHeader/commonHeader";
import DeactivateAccount from "../../components/deactivateAccount/deactivateAccount"
import { useState,useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import {useSelector} from 'react-redux'
import axios from 'axios'
import io from "socket.io-client";
const socket = io.connect("http://192.168.29.169:4000")
const DeactivateAccountPage=({route})=>{
    const { formData } = route?.params;
    const [loginId,setLoginId]=useState('')
    const [deactivateUserObj,setDeactivateUserObj]=useState({})
    const loginResponse=useSelector((state)=>state.loginData.loginData.token)// ye loginToken
    const loginOtpResponse=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.token) // ye loginOtpToken
    useEffect(()=>{
        if(loginResponse){
          const getLoginId = async () => {
            const loginIdData = await SecureStore.getItemAsync('loginId');
            setLoginId(loginIdData) 
          };
          getLoginId()
        }
    },[loginResponse,loginOtpResponse])
    useEffect(()=>{
      const fetchDeactivateUser = async () => {
        try {
          if (loginId) {
            const response = await axios.get(
              `http://192.168.29.169:4000/user/getDeactivateUser/${loginId}`,
            );
            // setLikesArray(response?.data?.anotherMatchUser || []);
            console.log('get deactivate user obj is', response?.data)
            setDeactivateUserObj(response?.data)
          }
        } catch (error) {
          console.error("Error fetching in chat id obj:", error);
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
   console.log('get deactivate user obj',deactivateUserObj)
return (
    <>
    <CommonHeader commonHeaderName={formData.headerName}/>
    <DeactivateAccount loginId={loginId} deactivateObj={deactivateUserObj}/>
    </>
)
}
export default DeactivateAccountPage