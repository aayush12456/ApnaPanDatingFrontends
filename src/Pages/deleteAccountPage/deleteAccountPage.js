import CommonHeader from "../../components/common/commonHeader/commonHeader"
import DeleteAccount from "../../components/deleteAccount/deleteAccount"
import { useState,useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import {useSelector} from 'react-redux'
import { View } from "react-native";
const DeleteAccountPage=({route})=>{
    const { formData } = route?.params;
    const [loginId,setLoginId]=useState('')
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
return (
    <>
    <View style={{backgroundColor:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'black':''}`,height:"100%"}}>
    <CommonHeader commonHeaderName={formData.headerName} completeObj={completeObj}/>
    <DeleteAccount loginId={loginId} completeObj={completeObj}/>
    </View>
    </>
)
}
export default DeleteAccountPage