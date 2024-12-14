import { View, Image, Text,Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { useState,useEffect } from 'react';
import io from "socket.io-client";
const socket = io.connect("http://192.168.29.169:4000")
const SmallCard = ({ likesData,visitorData }) => {
  console.log('visitor data',visitorData)
    const navigation = useNavigation();
    const [loginId,setLoginId]=useState('')
    const [commonVisitorLikeSkipUser,setCommonVisitorLikeSkipUser]=useState([])
    const [likeSkip,setLikeSkip]=useState(true)
    const [visitorSkip,setVisitorSkip]=useState(true)
    const [likeMatch,setLikeMatch]=useState(true)
    const [matchLikes,setMatchLikes]=useState(true)
    const [likeMatchUser,setLikeMatchUser]=useState({})
    const [visitorLikeUserObj,setVisitorLikeUserObj]=useState({})
    const [selfVisitorLikeMatch,setSelfVisitorLikeMatch]=useState(true)
    const loginResponse=useSelector((state)=>state.loginData.loginData.token)
    console.log('likes image obj', likesData?.images?.[0]); // Safer logging

    const getProfile = () => likesData || visitorData?.visitor || {}; // Fallback to an empty object
    const dob = getProfile()?.DOB || ""; // Fallback to an empty string
    const dobBreak = dob?.split("/") || []; // Avoid errors with split
    const year = dobBreak?.[2];
    const currentYear = new Date().getFullYear();
    const age = year ? currentYear - parseInt(year) : ""; // Ensure safe calculation
    
    const imagePressHandler=(likeData,visitorData)=>{
        console.log('image is pressed')
        if(likeData){
          navigation.navigate('LikePageContent', { formData:likeData })
        }
        else if(visitorData){
          navigation.navigate('VisitorPageContent', { formData:visitorData?.visitor })
        }
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
        const fetchCommonVisitorLikeSkipUsers = async () => {
          try {
            if (loginId) {
              const response = await axios.get(
                `http://192.168.29.169:4000/user/getCommonVisitorLikeSkipUser/${loginId}`
              );
              // setLikesArray(response?.data?.anotherMatchUser || []);
              console.log('get like skip user is',response?.data?.likeSkipUserArray)
              setCommonVisitorLikeSkipUser(response?.data?.likeSkipUserArray || []);
            }
          } catch (error) {
            console.error("Error fetching matches:", error);
          }
        };
      
        fetchCommonVisitorLikeSkipUsers();
      
        socket.on("getCommonVisitorLikeSkipUser", (newUser) => {
      
          setCommonVisitorLikeSkipUser(newUser)
        });
      
        return () => {
          socket.off("getCommonVisitorLikeSkipUser");
        };
      }, [loginId]);
      console.log('get like skip user array',commonVisitorLikeSkipUser)
      useEffect(()=>{
        const likeSkipData= commonVisitorLikeSkipUser?.some((likeSkip)=>likeSkip?.firstName===likesData?.firstName)
        if(likeSkipData){
         setLikeSkip(false)
        }
         },[commonVisitorLikeSkipUser,likesData])

         useEffect(()=>{
          const visitorSkipData= commonVisitorLikeSkipUser?.some((likeSkip)=>likeSkip?.firstName===visitorData?.visitor?.firstName)
          if(visitorSkipData){
           setVisitorSkip(false)
          }
           },[commonVisitorLikeSkipUser,visitorData])
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
        
          const anotherLikeMatchData= likeMatchUser?.anotherMatchLikes?.some((anotherLikeMatch)=>anotherLikeMatch?.firstName===likesData?.firstName)
          if( anotherLikeMatchData){
           setLikeMatch(false)
          }
           },[likesData,likeMatchUser?.anotherMatchLikes])
           
         useEffect(()=>{
          const likeMatchData= likeMatchUser?.matchLikes?.some((likeMatch)=>likeMatch?.firstName===likesData?.firstName)
          if(likeMatchData){
           setMatchLikes(false)
          }
           },[likeMatchUser?.matchLikes,likesData])


           useEffect(() => {
            const fetchVisitorLikeUsers = async () => {
              try {
                if (loginId) {
                  const response = await axios.get(
                    `http://192.168.29.169:4000/user/getVisitorLikeUser/${loginId}`
                  );
                  // setLikesArray(response?.data?.anotherMatchUser || []);
                  console.log('get visitor user is',response?.data)
                  setVisitorLikeUserObj(response?.data);
                }
              } catch (error) {
                console.error("Error fetching visitor like user:", error);
              }
            };
          
            fetchVisitorLikeUsers();
          
            socket.on("getVisitorLikeUser", (newUser) => {
          
              setVisitorLikeUserObj(newUser)
            });
          
            return () => {
              socket.off("getVisitorLikeUser");
            };
          }, [loginId]);
          console.log('visitor like user obj in small card',visitorLikeUserObj)

          useEffect(()=>{
            const selfVisitorLike= visitorLikeUserObj?.visitorLikes?.some((visitorLike)=>visitorLike?.firstName===visitorData?.visitor?.firstName)
            if(selfVisitorLike){
              setSelfVisitorLikeMatch(false)
            }
             },[visitorLikeUserObj?.visitorLikes,visitorData])
           console.log('visitor like in small card',selfVisitorLikeMatch)
    return (
        <View>
            <Pressable onPress={()=>imagePressHandler(likesData,visitorData)}>
            <Image
                source={{ uri: likesData?.images?.[0] || visitorData?.visitor?.images[0] || 'default_image_url' }} // Provide a default URI
                style={{ width: "100%", height:300, borderRadius: 10 }}
            />
            </Pressable>
            <View style={{ flexDirection: 'row', gap: 7, position: 'relative', top:`${visitorSkip===false || selfVisitorLikeMatch===false?-70:-53}`, paddingLeft: 20 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>{likesData?.firstName || visitorData?.visitor?.firstName || "Unknown"}</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{age || "N/A"}</Text>
            </View>
           {visitorData? <View style={{position: 'relative', top:`${visitorSkip===false || selfVisitorLikeMatch===false?-69:-52}`}}>
            <Text style={{ color: 'white', fontSize: 15,paddingLeft:18 }}>{visitorData?.visitedAt}</Text>
            </View>:null}
            {likeSkip===false? <View style={{position: 'relative', top: -54 , bottom:20, paddingLeft: 20}}>
                <Text style={{ color: 'white', fontSize: 16 }}>Skipped</Text>
            </View>:null}
            {visitorSkip===false? <View style={{position: 'relative', top: -68 , bottom:20, paddingLeft: 20}}>
                <Text style={{ color: 'white', fontSize: 16 }}>Skipped</Text>
            </View>:null}
            
            {likeMatch===false || matchLikes===false? <View style={{position: 'relative', top: -54 , bottom:20, paddingLeft: 20}}>
                <Text style={{ color: 'white', fontSize: 16 }}>Paired</Text>
            </View>:null}
            {selfVisitorLikeMatch===false? <View style={{position: 'relative', top:-68 , bottom:20, paddingLeft: 20}}>
                <Text style={{ color: 'white', fontSize: 16 }}>Liked</Text>
            </View>:null}
        </View>
    );
};

export default SmallCard;
