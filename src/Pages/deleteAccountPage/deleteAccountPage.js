import CommonHeader from "../../components/common/commonHeader/commonHeader"
import DeleteAccount from "../../components/deleteAccount/deleteAccount"
import { useState,useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import {useSelector} from 'react-redux'
const DeleteAccountPage=({route})=>{
    const { formData } = route?.params;
    const [loginId,setLoginId]=useState('')
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
return (
    <>
        <CommonHeader commonHeaderName={formData.headerName}/>
    <DeleteAccount loginId={loginId}/>
    </>
)
}
export default DeleteAccountPage