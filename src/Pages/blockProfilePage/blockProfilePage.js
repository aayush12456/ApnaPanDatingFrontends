import BlockProfile from "../../components/blockProfile/blockProfile";
import CommonHeader from "../../components/common/commonHeader/commonHeader";
import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import { Text } from "react-native-paper";
const socket = io.connect("http://192.168.29.169:4000")
const BlockProfilePage=({route})=>{
    const { formData } = route?.params;
    const loginResponse = useSelector((state) => state.loginData.loginData.token)
    const [loginId, setLoginId] = useState('')
    const [blockUserObj,setBlockUserObj]=useState({})
    useEffect(() => {
        if (loginResponse) {
          const getLoginId = async () => {
            const loginIdData = await SecureStore.getItemAsync('loginId');
            setLoginId(loginIdData)
          };
          getLoginId()
        }
      }, [loginResponse])
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
      console.log('block user obj',blockUserObj)
return (
    <>
        <CommonHeader skipProfileName={formData.headerName}/>
        {
      blockUserObj?.blockUserArray?.length>0? blockUserObj?.blockUserArray?.map((blockUserData,index)=>{
            console.log('block user data',blockUserData)
            return (
                <>
                <BlockProfile blockProfileUser={blockUserData} loginId={loginId}/>
                </>
            )
        }):<Text>no block User is there</Text>
    }
    </>
)
}
export default BlockProfilePage