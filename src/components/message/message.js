
import {  ScrollView,Text,RefreshControl } from "react-native";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import io from "socket.io-client";
import axios from "axios";
import MessageCard from "../messageCard/messageCard";
// const socket = io.connect("http://192.168.29.169:4000")
const socket = io.connect("https://apnapandatingbackend.onrender.com")
const Message=({completeObj})=>{
    // const BASE_URL = "http://192.168.29.169:4000";
    const BASE_URL = "https://apnapandatingbackend.onrender.com";
    const [loginId,setLoginId]=useState('')
    const [likeMatchUserObj,setLikeMatchUserObj]=useState({})
    const [blockUserObj,setBlockUserObj]=useState({})
    const [deactivateUserObj,setDeactivateUserObj]=useState({})
    const [refreshing, setRefreshing] = useState(false); 
    const loginResponse=useSelector((state)=>state.loginData.loginData.token)
    const loginOtpResponse=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.token) // otp login token
  useEffect(()=>{
    if(loginResponse || loginOtpResponse){
      const getLoginId = async () => {
        const loginIdData = await SecureStore.getItemAsync('loginId');
        setLoginId(loginIdData)
      };
      getLoginId()
    }
},[loginResponse,loginOtpResponse])

    useEffect(() => {
        const fetchLikeMatchUsers = async () => {
          try {
            if (loginId) {
              const response = await axios.get(
                `${BASE_URL}/user/getLikeMatchUser/${loginId}`
              );
              // console.log('get like match user is',response?.data)
              setLikeMatchUserObj(response?.data );
            }
          } catch (error) {
            // console.error("Error fetching matches:", error);
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
      // console.log('like match user obj in message',likeMatchUserObj)

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
      // console.log('get deactivate user obj in message',deactivateUserObj)

      const blockUserIds = [
        ...(blockUserObj?.blockUserArray || []),
        ...(blockUserObj?.anotherBlockUserArray || [])
      ].map(user => user?._id); // Extract block user IDs
    
      const filteredMatchLikes = (likeMatchUserObj?.matchLikes || []).filter(
        (user) => !blockUserIds.includes(user?._id)
      );
    
      const filteredAnotherMatchLikes = (likeMatchUserObj?.anotherMatchLikes || []).filter(
        (user) => !blockUserIds.includes(user?._id)
      );
    let finalMessageArray
     finalMessageArray = blockUserIds.length
        ? [...filteredMatchLikes, ...filteredAnotherMatchLikes]
        : [
            ...(likeMatchUserObj?.matchLikes || []),
            ...(likeMatchUserObj?.anotherMatchLikes || []),
          ];
      // console.log('final message array',finalMessageArray)
       
      finalMessageArray = finalMessageArray.filter(
        (user) => user?._id !== loginId &&
        !deactivateUserObj?.deactivatedIdArray?.includes(user?._id) 
      );    
          
      finalMessageArray = finalMessageArray.filter(
        (user) => user?._id !== deactivateUserObj.selfDeactivate
      );
      
      const handleRefresh = async () => {
        setRefreshing(true); // Start loading
        // console.log("Refreshing Data...");
    
        try {
            if (loginId) {
                // Manually fetching data again
                const [likeMatchResponse, blockUserResponse, deactivateUserResponse] = await Promise.all([
                    axios.get(`${BASE_URL}/user/getLikeMatchUser/${loginId}`),
                    axios.get(`${BASE_URL}/user/getBlockChatIdUser/${loginId}`),
                    axios.get(`${BASE_URL}/user/getDeactivateUser/${loginId}`)
                ]);
    
                // console.log("New Like Match Data:", likeMatchResponse?.data);
                // console.log("New Block User Data:", blockUserResponse?.data);
                // console.log("New Deactivate User Data:", deactivateUserResponse?.data);
    
                // Updating the states with new fetched data
                setLikeMatchUserObj(likeMatchResponse?.data);
                setBlockUserObj(blockUserResponse?.data);
                setDeactivateUserObj(deactivateUserResponse?.data);
            }
        } catch (error) {
            // console.error("Error refreshing data:", error);
        }
    
        setRefreshing(false); // Stop loading
    };
      
return (
    <>
    <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
    {finalMessageArray && finalMessageArray.length>0? finalMessageArray?.map((finalMessageUser) => {
        return (
         
         <MessageCard key={finalMessageUser?._id} finalMessageUser={finalMessageUser} completeObj={completeObj} />
        );
      }):<Text style={{textAlign:'center',fontSize:17,fontWeight:"400",position:'relative',top:200,
      color:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>No Message Profile is there</Text>}
    </ScrollView>
    </>
)
}
export default Message