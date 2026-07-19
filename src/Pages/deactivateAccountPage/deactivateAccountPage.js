import CommonHeader from "../../components/common/commonHeader/commonHeader";
import DeactivateAccount from "../../components/deactivateAccount/deactivateAccount"
import { useState,useEffect } from "react";

import { View } from "react-native";
import axios from 'axios'
import io from "socket.io-client";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://apnapandatingbackend.onrender.com")
const DeactivateAccountPage=({route})=>{
  const BASE_URL = "http://192.168.29.169:4000";
  // const BASE_URL = "https://apnapandatingbackend.onrender.com";
    const { formData} = route?.params;
    const [deactivateUserObj,setDeactivateUserObj]=useState({})
   console.log('forms datas',formData)
  
    const completeLoginObjData=formData?.loginDetails|| {}

   console.log('complete login obj data deactu',completeLoginObjData)
    
   
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
  //  console.log('get deactivate user obj',deactivateUserObj)
return (
    <>
    <View  style={{backgroundColor:`black`,height:"100%"}}>
    <CommonHeader commonHeaderName={formData.headerName} completeObj={completeLoginObjData}/>
    <DeactivateAccount loginId={loginId} deactivateObj={deactivateUserObj} completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default DeactivateAccountPage