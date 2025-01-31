import BlockProfile from "../../components/blockProfile/blockProfile";
import CommonHeader from "../../components/common/commonHeader/commonHeader";
import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import { useSelector } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import { Text } from "react-native-paper";
import { View } from "react-native";
const socket = io.connect("http://192.168.29.169:4000")
const BlockProfilePage=({route})=>{
  const BASE_URL = "http://192.168.29.169:4000";
    const { formData } = route?.params;
    const loginResponse = useSelector((state) => state.loginData.loginData.token)
    const loginOtpResponse=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.token) // otp login token
    
    const [loginId, setLoginId] = useState('')
    const [blockUserObj,setBlockUserObj]=useState({})
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
    useEffect(() => {
        if (loginResponse || loginOtpResponse) {
          const getLoginId = async () => {
            const loginIdData = await SecureStore.getItemAsync('loginId');
            setLoginId(loginIdData)
          };
          getLoginId()
        }
      }, [loginResponse,loginOtpResponse])
      useEffect(() => {
        const fetchBlockProfileUser = async () => {
          try {
            if (loginId) {
              const response = await axios.get(
                `${BASE_URL}/user/getBlockChatIdUser/${loginId}`,
              );
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
      console.log('block user obj',blockUserObj)
return (
    <>
    <View style={{backgroundColor:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'black':''}`,height:"100%"}}>
    <CommonHeader commonHeaderName={formData.headerName}/>
        {
      blockUserObj?.blockUserArray?.length>0? blockUserObj?.blockUserArray?.map((blockUserData,index)=>{
            console.log('block user data',blockUserData)
            return (
  
                <BlockProfile blockProfileUser={blockUserData} key={blockUserData?._id} loginId={loginId} completeObj={completeObj}/>
          
            )
        }):<Text  style={{textAlign:'center',fontSize:17,fontWeight:"600",position:'relative',top:'30%',
        color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}>No Block Profile is there</Text>
    }
    </View>
    </>
)
}
export default BlockProfilePage