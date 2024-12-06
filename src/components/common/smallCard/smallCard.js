import { View, Image, Text,Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { useState,useEffect } from 'react';
import io from "socket.io-client";
const socket = io.connect("http://192.168.29.169:4000")
const SmallCard = ({ likesData }) => {
    const navigation = useNavigation();
    const [loginId,setLoginId]=useState('')
    const [likeSkipUser,setLikeSkipUser]=useState([])
    const [likeSkip,setLikeSkip]=useState(true)
    const [likeMatch,setLikeMatch]=useState(true)
    const [likeMatchUser,setLikeMatchUser]=useState({})
    const loginResponse=useSelector((state)=>state.loginData.loginData.token)
    console.log('likes image obj', likesData?.images?.[0]); // Safer logging

    const getProfile = () => likesData || {}; // Fallback to an empty object
    const dob = getProfile()?.DOB || ""; // Fallback to an empty string
    const dobBreak = dob?.split("/") || []; // Avoid errors with split
    const year = dobBreak?.[2];
    const currentYear = new Date().getFullYear();
    const age = year ? currentYear - parseInt(year) : ""; // Ensure safe calculation
    
    const imagePressHandler=(likeData)=>{
        console.log('image is pressed')
        navigation.navigate('LikePageContent', { formData:likeData });
    }
    
    useEffect(()=>{
        if(loginResponse){
          const getLoginId = async () => {
            const loginIdData = await SecureStore.getItemAsync('loginId');
            setLoginId(loginIdData)
          };
          getLoginId()
        }
    },[loginResponse])


    useEffect(() => {
        const fetchLikeSkipUsers = async () => {
          try {
            if (loginId) {
              const response = await axios.get(
                `http://192.168.29.169:4000/user/getLikeSkipUser/${loginId}`
              );
              // setLikesArray(response?.data?.anotherMatchUser || []);
              console.log('get like skip user is',response?.data?.likeSkipUserArray)
              setLikeSkipUser(response?.data?.likeSkipUserArray || []);
            }
          } catch (error) {
            console.error("Error fetching matches:", error);
          }
        };
      
        fetchLikeSkipUsers();
      
        socket.on("getLikeSkipUser", (newUser) => {
      
          setLikeSkipUser(newUser)
        });
      
        return () => {
          socket.off("getLikeSkipUser");
        };
      }, [loginId]);
      console.log('get like skip user array',likeSkipUser)
      useEffect(()=>{
        const likeSkipData= likeSkipUser?.some((likeSkip)=>likeSkip?.firstName===likesData?.firstName)
        if(likeSkipData){
         setLikeSkip(false)
        }
         },[likeSkipUser,likesData])

         
   useEffect(() => {
    const fetchLikeMatchUsers = async () => {
      try {
        if (loginId) {
          const response = await axios.get(
            `http://192.168.29.169:4000/user/getLikeMatchUser/${loginId}`
          );
          // setLikesArray(response?.data?.anotherMatchUser || []);
          console.log('get like match user is',response?.data)
          setLikeMatchUser(response?.data);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };
  
    fetchLikeMatchUsers();
  
    socket.on("getLikeMatchUser", (newUser) => {
  
      setLikeMatchUser(newUser)
    });
  
    return () => {
      socket.off("getLikeMatchUser");
    };
  }, [loginId]);
  console.log('get like match user obj',likeMatchUser)


         useEffect(()=>{
          const likeMatchData= likeMatchUser?.matchLikes?.some((likeMatch)=>likeMatch?.firstName===likesData?.firstName)
          const anotherLikeMatchData= likeMatchUser?.anotherMatchLikes?.some((anotherLikeMatch)=>anotherLikeMatch?.firstName===likesData?.firstName)
          if(likeMatchData || anotherLikeMatchData){
           setLikeMatch(false)
          }
           },[likeMatchUser?.matchLikes,likesData,likeMatchUser?.anotherMatchLikes])
           
    return (
        <View>
            <Pressable onPress={()=>imagePressHandler(likesData)}>
            <Image
                source={{ uri: likesData?.images?.[0] || 'default_image_url' }} // Provide a default URI
                style={{ width: "100%", height:300, borderRadius: 10 }}
            />
            </Pressable>
            <View style={{ flexDirection: 'row', gap: 7, position: 'relative', top: -53, paddingLeft: 20 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>{likesData?.firstName || "Unknown"}</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{age || "N/A"}</Text>
            </View>
            {likeSkip===false? <View style={{position: 'relative', top: -54 , bottom:20, paddingLeft: 20}}>
                <Text style={{ color: 'white', fontSize: 16 }}>Skipped</Text>
            </View>:null}
            {likeMatch===false? <View style={{position: 'relative', top: -54 , bottom:20, paddingLeft: 20}}>
                <Text style={{ color: 'white', fontSize: 16 }}>Paired</Text>
            </View>:null}
        </View>
    );
};

export default SmallCard;
