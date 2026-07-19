import BlockProfile from "../../components/blockProfile/blockProfile";
import CommonHeader from "../../components/common/commonHeader/commonHeader";
import { useEffect, useState } from 'react'
import axios from "axios";
import io from "socket.io-client";
import { Text } from "react-native-paper";
import { View } from "react-native";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://apnapandatingbackend.onrender.com")
const BlockProfilePage=({route})=>{
  const BASE_URL = "http://192.168.29.169:4000";
  // const BASE_URL = "https://apnapandatingbackend.onrender.com";
    const { formData } = route?.params;
  

    const [blockUserObj,setBlockUserObj]=useState({})

    const completeLoginObjData=formData?.loginDetails ||{}
  

  

      const loginId=completeLoginObjData?.userId

      useEffect(() => {
        const fetchBlockProfileUser = async () => {
          try {
            if (loginId) {
              const response = await axios.get(
                `${BASE_URL}/user/getBlockChatIdUser/${loginId}`,
              );
              // console.log('get block user obj is block profile page', response?.data)
              setBlockUserObj(response?.data);
            }
          } catch (error) {
            // console.error("Error fetching in block user obj:", error);
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
      // console.log('block user obj',blockUserObj)
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <CommonHeader commonHeaderName={formData.headerName} completeLoginObj={completeLoginObjData}/>
        {
      blockUserObj?.blockUserArray?.length>0? blockUserObj?.blockUserArray?.map((blockUserData,index)=>{
            // console.log('block user data',blockUserData)
            return (
  
                <BlockProfile blockProfileUser={blockUserData} key={blockUserData?._id} loginId={loginId} completeObj={completeLoginObjData}/>
          
            )
        }):<Text  style={{textAlign:'center',fontSize:17,fontWeight:"600",position:'relative',top:'30%',
        color:`white` }}>No Block Profile is there</Text>
    }
    </View>
    </>
)
}
export default BlockProfilePage