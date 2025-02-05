import CommonHeader from "../../components/common/commonHeader/commonHeader";
import DeactivateAccount from "../../components/deactivateAccount/deactivateAccount"
import { useState,useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import {useSelector} from 'react-redux'
import { View } from "react-native";
import axios from 'axios'
import io from "socket.io-client";
// const socket = io.connect("http://192.168.29.169:4000")
const socket = io.connect("https://apnapandatingbackend.onrender.com")
const DeactivateAccountPage=({route})=>{
  // const BASE_URL = "http://192.168.29.169:4000";
  const BASE_URL = "https://apnapandatingbackend.onrender.com";
    const { formData } = route?.params;
    const [loginId,setLoginId]=useState('')
    const [deactivateUserObj,setDeactivateUserObj]=useState({})
    const loginResponse=useSelector((state)=>state.loginData.loginData.token)// ye loginToken
    const loginOtpResponse=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.token) // ye loginOtpToken
    const [completeObj,setCompleteObj]=useState({})
    const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
    const completeLoginObj = useSelector(
      (state) => state.loginData.loginData.completeLoginData
    );
    const completeLoginObjData=completeLoginObj || completeLoginObjForOtp || {}
    const appearModeSelector=useSelector((state)=>state?.appearMode?.appearModeData?.loginUpdateUser)

    useEffect(()=>{
      if(appearModeSelector){
      setCompleteObj(appearModeSelector)
      }
      else{
          setCompleteObj(completeLoginObjData)
      }
      },[appearModeSelector,completeLoginObjData])
    useEffect(()=>{
        if(loginResponse || loginOtpResponse){
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
  //  console.log('get deactivate user obj',deactivateUserObj)
return (
    <>
    <View  style={{backgroundColor:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'black':''}`,height:"100%"}}>
    <CommonHeader commonHeaderName={formData.headerName} completeObj={completeObj}/>
    <DeactivateAccount loginId={loginId} deactivateObj={deactivateUserObj} completeObj={completeObj}/>
    </View>
    </>
)
}
export default DeactivateAccountPage