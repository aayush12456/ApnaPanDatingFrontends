import { Text, Card ,Button} from "react-native-paper";
import { ScrollView, View, Dimensions, Image,StyleSheet,Pressable,Animated} from "react-native";
import { useState,useEffect,useRef } from "react";
import { useDispatch,useSelector } from "react-redux";
import io from "socket.io-client";
import like from '../../../../assets/matchIcons/rightTiks.png'
import dislike from '../../../../assets/matchIcons/crossTik.png'
import play from '../../../../assets/myProfileIcons/play.png'
import { passVideoDataSliceActions } from "../../../Redux/Slice/passVideoSlice/passVideoSlice";
import PlayVideo from "../playVideo/playVideo";
import { playVideoModalActions } from "../../../Redux/Slice/playVideoModalSlice/playVideoModalSlice";
import back from '../../../../assets/signUpFormIcon/back.png'
import { useNavigation } from "@react-navigation/native";
import { anotherPassDataSliceActions } from "../../../Redux/Slice/anotherPassDataSlice/anotherPassDataSlice";
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import { addOnlineSkipUserAsync } from "../../../Redux/Slice/addOnlineSkipUserSlice/addOnlineSkipUserSlice";
import { getBollywoodSongAsync } from "../../../Redux/Slice/getBollyWoodSongSlice/getBollywoodSongSlice";
import Notification from "../../notification/notification";
import { AlertNotificationRoot } from "react-native-alert-notification";
import pause from '../../../../assets/myProfileIcons/pause.png'
import { Audio } from 'expo-av';

// const socket = io.connect("http://192.168.29.169:4000")
const socket = io.connect("https://apnapandatingbackend.onrender.com")
const LargeCard = ({ newAndOnlineContent,likeContent,visitorContent,deactivateUserObj,completeObj }) => {
  // const BASE_URL = "http://192.168.29.169:4000";
  const BASE_URL = "https://apnapandatingbackend.onrender.com";
  const dispatch = useDispatch()
  const navigation=useNavigation()
  const [active, setActive] = useState(0); // Move useState outside of change function
  const [loginId,setLoginId]=useState('')
  const [commonVisitorLikeSkipUser,setCommonVisitorLikeSkipUser]=useState([])
  const [commonVisitorLikeSkip,setCommonVisitorLikeSkip]=useState(true)
  const [likeMatch,setLikeMatch]=useState(true)
  const [likeMatchUser,setLikeMatchUser]=useState({})
  const [onlineLikeUserObj,setOnlineLikeUserObj]=useState({})
  const [visitorLikeUserObj,setVisitorLikeUserObj]=useState({})
  const [selfLikeMatch,setSelfLikeMatch]=useState(true)
  const [selfVisitorLikeMatch,setSelfVisitorLikeMatch]=useState(true)
  const [notifyDeactivateObj,setNotifyDeactivateObj]=useState({})
  const [openDailog,setOpenDialog]=useState(false)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [sound, setSound] = useState(null);
  const [songObj,setSongObj]=useState(null)
  const [animate,setAnimate]=useState(false)
  const [animateObj,setAnimateObj]=useState({})
  const loginResponse=useSelector((state)=>state.loginData.loginData.token)// ye loginToken'
  const loginOtpResponse=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.token)//ye otp loginToken
  const completeLoginObj = useSelector(
    (state) => state.loginData.loginData.completeLoginData
  );
  const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
  
  const completeLoginObjData=completeLoginObj || completeLoginObjForOtp || {}
  const getAllSongsSelector=useSelector((state)=>state?.getBollyWoodSong?.getBollywoodSongUserObj?.uploadSongsData)
  const width = Dimensions.get('window').width - 50;
  const height = width * 1.2;

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== active) {
      setActive(slide);
    }
  };

  const getProfile = () =>newAndOnlineContent || likeContent || visitorContent
    const dob = getProfile()?.DOB;
  const dobBreak = dob?.split("/");
  const year = dobBreak?.[2];
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const age = year ? currentYear - parseInt(year) : "";

  const number=newAndOnlineContent?.phone || likeContent?.phone || visitorContent?.phone
  const mainNumber = number.substring(0, 4) + 'X'.repeat(number.length - 4);
  const allImages = [...(newAndOnlineContent?.images || []), ...(likeContent?.images || []),...(visitorContent?.images || [])];
  const rows=[]
  const likeRows=[]
  const visitorRows=[]
  for(let i=0;i<newAndOnlineContent?.interest?.length;i+=2){
    rows.push(newAndOnlineContent.interest.slice(i,i+2))
  }
  for(let i=0;i<likeContent?.interest?.length;i+=2){
    likeRows.push(likeContent.interest.slice(i,i+2))
  }
  for(let i=0;i<visitorContent?.interest?.length;i+=2){
    visitorRows.push(visitorContent.interest.slice(i,i+2))
  }
  const playVideoHandler=()=>{
    if(newAndOnlineContent){
      dispatch(passVideoDataSliceActions.passVideoDatas(newAndOnlineContent))
      dispatch(playVideoModalActions.playVideoModalToggle())
    }
    else if(likeContent){
      dispatch(passVideoDataSliceActions.passVideoDatas(likeContent))
      dispatch(playVideoModalActions.playVideoModalToggle())
    }
    else if(visitorContent){
      dispatch(passVideoDataSliceActions.passVideoDatas(visitorContent))
      dispatch(playVideoModalActions.playVideoModalToggle())
    }
  }
  const backHandler=()=>{
    if(newAndOnlineContent){
      navigation.navigate('New And Online')
    }
    else if(likeContent){
      navigation.navigate('Likes')
    }
    else if(visitorContent){
      navigation.navigate('Visitors')
    }
  }

  const openImageHandler=(image)=>{
    const imageObj={
      name:newAndOnlineContent?.firstName || likeContent?.firstName || visitorContent?.firstName,
      images:image
    }
    navigation.navigate('MyPhotoPage',{formData:imageObj})
    if(newAndOnlineContent){
      dispatch(anotherPassDataSliceActions.anotherPassDatas(newAndOnlineContent))
    }
    else if(likeContent){
      dispatch(anotherPassDataSliceActions.anotherPassDatas(likeContent))
    }
    else if(visitorContent){
      dispatch(anotherPassDataSliceActions.anotherPassDatas(visitorContent))
    }
    
   }


   useEffect(()=>{
    if(loginResponse || loginOtpResponse){
      const getLoginId = async () => {
        const loginIdData = await SecureStore.getItemAsync('loginId');
        setLoginId(loginIdData)
      };
      getLoginId()
    }
},[loginResponse,loginOtpResponse])


   const skipUserHandler=async(likeContent,newOnline,visitorContent)=>{
    // console.log('user is skipped',likeContent)
    if(likeContent){
      const likeSkipUserObj={
        id:loginId,
        likeSkipUserId:likeContent?._id
      }
      if(likeSkipUserObj.id===deactivateUserObj.selfDeactivate){
        setOpenDialog(true)
        const obj={
          type:'WARNING',
          textBody:`You can't skip ${likeContent.firstName} profile untill you should activate yourself`
        }
        setNotifyDeactivateObj(obj)
        return
      }
      try {
        const response = await axios.post(`${BASE_URL}/user/addCommonVisitorLikeSkipUser/${likeSkipUserObj.id}`, likeSkipUserObj);
        // console.log('response in like skip user is',response?.data?.likeSkip)
        socket.emit('addCommonVisitorLikeSkipUser', response?.data?.likeSkip)
    } catch (error) {
        // console.error('Error sending message:', error);
    }
    // console.log('like skip user is',likeSkipUserObj)
    }
    else if(newOnline){
      const onlineSkipUserObj={
        id:loginId,
        onlinePersonSkipUserId:newAndOnlineContent?._id
      }
      dispatch(addOnlineSkipUserAsync(onlineSkipUserObj))
      navigation.navigate('New And Online',{formData:onlineSkipUserObj})
    }
    else if(visitorContent){
      const visitorSkipUserObj={
        id:loginId,
        likeSkipUserId:visitorContent?._id
      }
      if(visitorSkipUserObj.id===deactivateUserObj.selfDeactivate){
        setOpenDialog(true)
        const obj={
          type:'WARNING',
          textBody:`You can't skip ${visitorContent.firstName} profile untill you should activate yourself`
        }
        setNotifyDeactivateObj(obj)
        return
      }
      try {
        const response = await axios.post(`${BASE_URL}/user/addCommonVisitorLikeSkipUser/${visitorSkipUserObj.id}`, visitorSkipUserObj);
        // console.log('response in like skip user is',response?.data?.likeSkip)
        socket.emit('addCommonVisitorLikeSkipUser', response?.data?.likeSkip)
    } catch (error) {
        // console.error('Error sending message:', error);
    }
    }
   }


   useEffect(() => {
    const fetchCommonVisitorLikeSkipUsers = async () => {
      try {
        if (loginId) {
          const response = await axios.get(
            `${BASE_URL}/user/getCommonVisitorLikeSkipUser/${loginId}`
          );
          // console.log('get like skip user is',response?.data?.likeSkipUserArray)
          setCommonVisitorLikeSkipUser(response?.data?.likeSkipUserArray || []);
        }
      } catch (error) {
        // console.error("Error fetching matches:", error);
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
  // console.log('get like skip user array',commonVisitorLikeSkipUser)


  useEffect(()=>{
    const likeSkipData= commonVisitorLikeSkipUser?.some((likeSkip)=>likeSkip?.firstName===likeContent?.firstName)
    if(likeSkipData){
     setCommonVisitorLikeSkip(false)
    }
     },[commonVisitorLikeSkipUser,likeContent])

     useEffect(()=>{
      const visitorSkipData= commonVisitorLikeSkipUser?.some((likeSkip)=>likeSkip?.firstName===visitorContent?.firstName)
      if(visitorSkipData){
       setCommonVisitorLikeSkip(false)
      }
       },[commonVisitorLikeSkipUser,visitorContent])
       
   const likeUserHandler=async(likeUser,newOnline,visitorContent)=>{
    // console.log('new user handler',newOnline)
    if(likeUser){
      const likeMatchUserObj={
        id:loginId,
        likeMatchId:likeUser?._id
      }
      if(likeMatchUserObj.id===deactivateUserObj.selfDeactivate){
        setOpenDialog(true)
        const obj={
          type:'WARNING',
          textBody:`You can't like ${likeUser.firstName} profile untill you should activate yourself`
        }
        setNotifyDeactivateObj(obj)
        return
      }
      try {
        const response = await axios.post(`${BASE_URL}/user/addLikeMatchUser/${likeMatchUserObj.id}`, likeMatchUserObj);
        // console.log('response in like match user is',response?.data)
        socket.emit('addLikeMatchUser', response?.data)
        if(response){
          startAnimation()
          setAnimateObj(response?.data)
        }
    } catch (error) {
        // console.error('Error sending message:', error);
    }
      const likeMatchCountObj={
        id:loginId,
        matchLikeId:likeUser?._id
      }
      try {
        const response = await axios.post(`${BASE_URL}/user/addLikeCount/${likeMatchCountObj.id}`,likeMatchCountObj);
        // console.log('response in add like count user',response?.data?.userObj)
        socket.emit('addLikeCountUser', response?.data?.userObj)
    
    } catch (error) {
        // console.error('Error sending message:', error);
    }
    }
    else if(newOnline){
      const onlineLikeUserObj={
        id:loginId,
        onlinePersonLikeUserId:newOnline?._id
      }
      // console.log("Online like user in new", onlineLikeUserObj);
          try {
        const response = await axios.post(`${BASE_URL}/user/addOnlineLikeUser/${onlineLikeUserObj.id}`,onlineLikeUserObj);
        // console.log('response in online like user',response?.data)
        socket.emit('addOnlineLikeUser', response?.data)
    
    } catch (error) {
        // console.error('Error sending message:', error);
    }
    const onlineLikeCountObj={
      id:loginId,
      matchLikeId:newOnline?._id
    }
    try {
      const response = await axios.post(`${BASE_URL}/user/addLikeCount/${onlineLikeCountObj.id}`,onlineLikeCountObj);
      // console.log('response in online like count user',response?.data?.userObj)
      socket.emit('addLikeCountUser', response?.data?.userObj)
  
  } catch (error) {
      // console.error('Error sending message:', error);
  }
    }
    else if(visitorContent){
     const visitorLikeUserObj={
      id:loginId,
      visitorPlusLikeUserId:visitorContent?._id
     }
     if(visitorLikeUserObj.id===deactivateUserObj.selfDeactivate){
      setOpenDialog(true)
      const obj={
        type:'WARNING',
        textBody:`You can't like ${visitorContent.firstName} profile untill you should activate yourself`
      }
      setNotifyDeactivateObj(obj)
      return
    }
     const visitorLikeCountObj={
      id:loginId,
      matchLikeId:visitorContent?._id
    }
     try {
      const response = await axios.post(`${BASE_URL}/user/addVisitorLikeUser/${visitorLikeUserObj.id}`,visitorLikeUserObj);
      // console.log('response in visitor like  user',response?.data)
      socket.emit('addVisitorLikeUser', response?.data)
  
  } catch (error) {
      // console.error('Error sending message:', error);
  }

  try {
    const response = await axios.post(`${BASE_URL}/user/addLikeCount/${visitorLikeCountObj.id}`,visitorLikeCountObj);
    // console.log('response in add like count user',response?.data?.userObj)
    socket.emit('addLikeCountUser', response?.data?.userObj)

} catch (error) {
    // console.error('Error sending message:', error);
}
    }
   }

   useEffect(() => {
    const fetchLikeMatchUsers = async () => {
      try {
        if (loginId) {
          const response = await axios.get(
            `${BASE_URL}/user/getLikeMatchUser/${loginId}`
          );
          // console.log('get like match user is',response?.data)
          setLikeMatchUser(response?.data);
        }
      } catch (error) {
        // console.error("Error fetching matches:", error);
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
  // console.log('get like match user obj',likeMatchUser)


  useEffect(()=>{
    const likeMatchData= likeMatchUser?.matchLikes?.some((likeMatch)=>likeMatch?.firstName===likeContent?.firstName)
    const anotherLikeMatchData= likeMatchUser?.anotherMatchLikes?.some((anotherLikeMatch)=>anotherLikeMatch?.firstName===likeContent?.firstName)
    if(likeMatchData || anotherLikeMatchData){
     setLikeMatch(false)
    }
     },[likeMatchUser?.matchLikes,likeContent,likeMatchUser?.anotherMatchLikes])

      useEffect(() => {
    const fetchLikeMatchUsers = async () => {
      try {
        if (loginId) {
          const response = await axios.get(
            `${BASE_URL}/user/getLikeMatchUser/${loginId}`
          );
          // console.log('get like match user is',response?.data)
          setLikeMatchUser(response?.data);
        }
      } catch (error) {
        // console.error("Error fetching matches:", error);
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

  useEffect(() => {
    const fetchOnlineLikeUsers = async () => {
      try {
        if (loginId) {
          const response = await axios.get(
            `${BASE_URL}/user/getOnlineLikeUser/${loginId}`
          );
          // console.log('get online like user is',response?.data)
          setOnlineLikeUserObj(response?.data );
        }
      } catch (error) {
        // console.error("Error fetching matches:", error);
      }
    };
  
    fetchOnlineLikeUsers();
  
    socket.on("getOnlineLikeUser", (newUser) => {
  
      setOnlineLikeUserObj(newUser)
    });
  
    return () => {
      socket.off("getOnlineLikeUser");
    };
  }, [loginId]);

  useEffect(()=>{
    const selfOnlineLike= onlineLikeUserObj?.selfOnlineLikeUser?.some((onlineLike)=>onlineLike?.firstName===newAndOnlineContent?.firstName)
    if(selfOnlineLike){
      setSelfLikeMatch(false)
    }
     },[onlineLikeUserObj?.selfOnlineLikeUser,newAndOnlineContent])

     useEffect(() => {
      const fetchVisitorLikeUsers = async () => {
        try {
          if (loginId) {
            const response = await axios.get(
              `${BASE_URL}/user/getVisitorLikeUser/${loginId}`
            );
            // console.log('get visitor user is',response?.data)
            setVisitorLikeUserObj(response?.data);
          }
        } catch (error) {
          // console.error("Error fetching visitor like user:", error);
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
    // console.log('visitor like user obj',visitorLikeUserObj)

    useEffect(()=>{
      const selfVisitorLike= visitorLikeUserObj?.visitorLikes?.some((visitorLike)=>visitorLike?.firstName===visitorContent?.firstName)
      if(selfVisitorLike){
        setSelfVisitorLikeMatch(false)
      }
       },[visitorLikeUserObj?.visitorLikes,visitorContent])

       useEffect(()=>{
        if(completeLoginObjData?._id){
            dispatch(getBollywoodSongAsync(completeLoginObjData?._id))
        }
    
          },[dispatch,completeLoginObjData?._id])
          const finalContent=newAndOnlineContent || likeContent || visitorContent
          // console.log('get all songs',getAllSongsSelector)
          // console.log('finalContent',finalContent.songId)
          useEffect(() => {
            if (finalContent && getAllSongsSelector?.length > 0) {
              const foundSong = getAllSongsSelector.find(
                (song) => song?._id === finalContent?.songId
              );
              setSongObj(foundSong || null);
            }
          }, [getAllSongsSelector, finalContent]);
          // console.log('get song large card',songObj)
          const playSongHandler = async (songUrl) => {
            try {
                if (sound && currentSongUrl === songUrl) {
                    if (isPlaying) {
                        // Pause the current song
                        await sound.pauseAsync();
                        setIsPlaying(false);
                    } else {
                        // Resume playing the song from where it was paused
                        await sound.playAsync();
                        setIsPlaying(true);
                    }
                    return;
                }
        
                // Stop and unload the previous sound if a different song is clicked
                if (sound) {
                    await sound.stopAsync();
                    await sound.unloadAsync();
                }
        
                // Load and play the new song
                const { sound: newSound } = await Audio.Sound.createAsync({ uri: songUrl });
                setSound(newSound);
                setCurrentSongUrl(songUrl);
        
                await newSound.playAsync();
                setIsPlaying(true);
            } catch (error) {
                // console.error("Error playing sound:", error);
            }
        };
        const leftImagePosition = useRef(new Animated.Value(-width)).current; // Start from left
        const rightImagePosition = useRef(new Animated.Value(width)).current; 
        const startAnimation = () => {
          setAnimate(true)
          Animated.parallel([
            Animated.timing(leftImagePosition, {
              toValue: width / 6 - 100, // Move to center
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(rightImagePosition, {
              toValue: width / 2 - 100, // Move to center
              duration: 1500,
              useNativeDriver: true,
            }),
          ]).start();
        };
        const keepMatchHandler=()=>{
          setAnimate(false)
        }
  return (
    <>
     <AlertNotificationRoot>
    {animate && <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'black',
      zIndex: 10,
    }}>
     <View
      style={{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
            }}
    >
      {/* Left Image */}
      <Animated.Image
        source={{ uri: animateObj?.loginUser?.images[0] }}
        style={{
          position: "absolute",
          width: 100,
          height: 100,
          borderRadius: 60,
          transform: [{ translateX: leftImagePosition }], // Inline animated style
        }}
      />

      {/* Right Image */}
      <Animated.Image
        source={{ uri: animateObj?.anotherLoginUser?.images[0] }}
        style={{
          position: "absolute",
          width: 100,
          height: 100,
          borderRadius: 60,
          transform: [{ translateX: rightImagePosition }], // Inline animated style
        }}
      />       
      </View>
      <View style={{position:'relative',top:'-30%'}}>
      <Text style={{color:'white',textAlign:'center',fontSize:17}}>{animateObj?.loginUser?.firstName} & {animateObj?.anotherLoginUser?.firstName}</Text>
      <Text style={{color:'white',textAlign:'center',paddingTop:10,fontSize:15}}>{animateObj?.loginUser?.firstName} Yay! You're now paired.Let's get to know each other please go to message section & enjoy the company with {animateObj?.anotherLoginUser?.firstName}</Text>
                    <Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:11,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         marginTop: 20,
                         marginLeft: 12,
                         marginRight: 20,
                      }}
                      buttonColor="#6495ed"
                      onPress={keepMatchHandler}
                    >
                    KEEP MATCHING
                    </Button>
      </View>
      
     </View>}
     <Card style={{ marginLeft: 8, marginRight: 8, marginTop:45, marginBottom:10, 
      backgroundColor: `${completeObj?.appearanceMode==='Dark Mode'?'#343434':'white'}` }}>
        <Card.Content style={{height:'100%'}}>
        <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
          <Button onPress={backHandler}><Image source={back}   style={{ width:15, height:15,
            tintColor:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}/></Button>
              </View>
          <ScrollView style={{ flexGrow: 1 }}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{ overflow: 'scroll' }}>
              <ScrollView
                pagingEnabled
                horizontal
                onScroll={change}
                showsHorizontalScrollIndicator={false}
                onTouchEnd={()=>openImageHandler(newAndOnlineContent?.images || likeContent?.images || visitorContent?.images)}
              >
                {allImages.map((image, index) => {
                  return (
                    <Image
                      key={index}
                      source={{ uri: image }}
                      style={{ width, height, resizeMode:'cover'}}
                    />
                  );
                })}
                     
              </ScrollView>
              <View style={styles.pagination}>
              {allImages.map((_, index) => (
              <Text key={index} style={index === active ? styles.activeDot : styles.dot}>•</Text>
            ))}
                </View>
            </View>

            <View style={{marginLeft:-105,marginTop:11,marginRight:30}}>
  <Pressable onPress={playVideoHandler}>
  <View style={{width:95,height:40,borderRadius:20,backgroundColor:'rgba(34, 197, 94, 2)'}}>
    <View style={{flexDirection:'row',marginTop:8,marginLeft:20}}>
  <Image source={play} style={{ width: 20, height:20, tintColor: 'white'}} />
  <Text style={{color:'white'}}>Play</Text>
    </View>
  </View>
  </Pressable>
            </View>
            </View>
            <View style={{flexDirection:'row',gap:12, paddingLeft:10,paddingTop:16}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`}}>{newAndOnlineContent?.firstName || likeContent?.firstName || visitorContent?.firstName}</Text>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`}}>{age}</Text>
        <Text style={{fontSize:16,fontWeight:'semibold',color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`}}>{newAndOnlineContent?.city || likeContent?.city || visitorContent?.city}</Text>
      </View>

      <View style={{paddingLeft:10,paddingTop:3}}>
<Text style={{color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>Working as {newAndOnlineContent?.profession || likeContent?.profession || visitorContent?.profession} </Text>
<Text style={{paddingTop:2,color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>Studied {newAndOnlineContent?.education || likeContent?.education || visitorContent?.profession} </Text>
      </View>
      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Mobile Number</Text>
        <Text style={{fontSize:16 ,paddingTop:2, color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}>{mainNumber}</Text>
      </View>

            
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Relationship status</Text>
        <Text style={{fontSize:16 ,paddingTop:2, color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}>{newAndOnlineContent?.relationship || likeContent?.relationship || visitorContent?.relationship}</Text>
      </View>

      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>I'm looking for</Text>
        <Text style={{fontSize:16 ,paddingTop:2, color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}>{newAndOnlineContent?.looking || likeContent?.looking || visitorContent?.looking}</Text>
      </View>

      <View style={{paddingLeft:10,paddingTop:18}}>
      <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Interest</Text>
      <View>
       {
  rows.map((row, rowIndex) => (
    <View key={rowIndex} style={{ flexDirection: "row", gap: 12, paddingTop: 10 }}>
      {
        row.map((rowItem, itemIndex) => (
          <View  key={`${rowIndex}-${itemIndex}`} style={{ backgroundColor: 'rgba(226, 232, 240, 0.5)', width: 130, height: rowItem === "Charitable activities" ? 60 : 40 }}>
            <Text style={{ fontSize: 16, textAlign: 'center', paddingTop: 6,
           color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}>{rowItem}</Text>
          </View>
        ))
      }
      
    </View>
  ))
}
{
  likeRows.map((likeRow, rowIndex) => (
    <View key={rowIndex} style={{ flexDirection: "row", gap: 12, paddingTop: 10 }}>
      {
        likeRow.map((rowItem, itemIndex) => (
          <View  key={`${rowIndex}-${itemIndex}`} style={{ backgroundColor: 'rgba(226, 232, 240, 0.5)', width: 130,height: rowItem === "Charitable activities" ? 60 : 40 }}>
            <Text style={{ fontSize: 16, textAlign: 'center', paddingTop: 6,
           color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}>{rowItem}</Text>
          </View>
        ))
      }
      
    </View>
  ))
}
{
  visitorRows.map((likeRow, rowIndex) => (
    <View key={rowIndex} style={{ flexDirection: "row", gap: 12, paddingTop: 10 }}>
      {
        likeRow.map((rowItem, itemIndex) => (
          <View  key={`${rowIndex}-${itemIndex}`} style={{ backgroundColor: 'rgba(226, 232, 240, 0.5)', width: 130, height: rowItem === "Charitable activities" ? 60 : 40 }}>
            <Text style={{ fontSize: 16, textAlign: 'center', paddingTop: 6,
           color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}>{rowItem}</Text>
          </View>
        ))
      }
      
    </View>
  ))
}
 
       </View>
      </View>

      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Education</Text>
        <Text style={{fontSize:16 ,paddingTop:2, color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}>{newAndOnlineContent?.education || likeContent?.education || visitorContent?.education}</Text>
      </View>

      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Profession</Text>
        <Text style={{fontSize:16 ,paddingTop:2, color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}>{newAndOnlineContent?.profession || likeContent?.profession || visitorContent?.profession}</Text>
      </View>

      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Drinking</Text>
        <Text style={{fontSize:16 ,paddingTop:2, color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}>{newAndOnlineContent?.drinking || likeContent?.drinking || visitorContent?.drinking}</Text>
      </View>

      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Smoking</Text>
        <Text style={{fontSize:16 ,paddingTop:2, color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}>{newAndOnlineContent?.smoking || likeContent?.smoking || visitorContent?.smoking}</Text>
      </View>

      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Eating</Text>
        <Text style={{fontSize:16 ,paddingTop:2, color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}>{newAndOnlineContent?.eating || likeContent?.eating || visitorContent?.eating}</Text>
      </View>
      { finalContent?.songId ==='none'|| !finalContent.songId?null:<View style={{paddingLeft:10,paddingTop:18}}>
      <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Bio Track</Text>
        <View style={{flexDirection:'row',marginTop:8,gap:8}}>
          <Image source={{uri:songObj &&songObj.songImage}} style={{width:50,height:50,borderRadius:25}}/>
          <Text style={{fontSize:16 ,fontWeight:'semibold', color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`,paddingTop:6}}>{songObj && songObj.songName}</Text>
          <Pressable  onPress={() => playSongHandler(songObj.songUrl)}> 
          <Image  source={isPlaying && currentSongUrl === songObj.songUrl? pause: play}  style={{ width: 27, height: 27, marginTop: 6, marginRight: 20,
            tintColor:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}/>
          </Pressable>
        </View>
      </View>}
          </ScrollView>
          {commonVisitorLikeSkip===false  &&<Text style={{ color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'rgba(117, 117, 117, 0.5)'}`
          ,fontSize:16,textAlign:'center',paddingTop:18,paddingBottom:8}}>
            You skipped this profile</Text>}

            {likeMatch===false  &&<Text style={{ color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'rgba(117, 117, 117, 0.5)'}`,
            fontSize:16,textAlign:'center',paddingTop:18,paddingBottom:8}}>
            You've both paired</Text>}

            {selfLikeMatch===false  &&<Text style={{ color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'rgba(117, 117, 117, 0.5)'}`,
            fontSize:16,textAlign:'center',paddingTop:18,paddingBottom:8}}>
            You Like this profile</Text>}
           
            {selfVisitorLikeMatch===false  &&<Text style={{ color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'rgba(117, 117, 117, 0.5)'}`
            ,fontSize:16,textAlign:'center',paddingTop:18,paddingBottom:8}}>
            You Like this profile</Text>}

       {commonVisitorLikeSkip===false || likeMatch===false ||
       selfLikeMatch===false || selfVisitorLikeMatch===false  ?null:<View style={{flexDirection:"row",justifyContent:'space-between',position:'fixed',marginTop:12,marginLeft:8}} >
            <Pressable onPress={()=>skipUserHandler(likeContent,newAndOnlineContent,visitorContent)}>
            <View style={{flexDirection:"row",gap:12,marginLeft:25}} >
                <View style={{width:47 ,height:47,borderRadius:30,backgroundColor:'grey'}}>
          <Image source={dislike} style={{ width: 20, height:30,marginLeft:14,marginTop:6,tintColor:'white' }} />
                </View>
          <Text style={{fontSize:15,paddingTop:10,color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'grey'}`}}>SKIP</Text>
            </View>
            </Pressable>
            <Pressable onPress={()=>likeUserHandler(likeContent, newAndOnlineContent,visitorContent)}>
            <View style={{flexDirection:"row",gap:12,marginRight:25}}>
            <View style={{width:47 ,height:47,borderRadius:30,backgroundColor:'rgba(37, 99, 235, 1)'}}>
            <Image source={like} style={{ width:20, height: 30,marginLeft:14,marginTop:6 }} />
            </View>
          <Text style={{fontSize:15,paddingTop:10,color: 'rgba(2, 113, 254, 0.8)'}}>LIKE</Text>
            </View>
            </Pressable>
        </View>}
        </Card.Content>
      </Card>
      <PlayVideo/>
      {openDailog===true && <Notification dialog={notifyDeactivateObj}/>}
     </AlertNotificationRoot>
     {/* <Button   onPress={startAnimation}>Start Animation</Button> */}
    
  
    </>
  );
};
const styles=StyleSheet.create({
    pagination: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: -15,
      alignSelf: 'center',
    },
    dot: {
      color: '#888',
      fontSize: 50,
    },
    activeDot: {
      color: '#FFF',
      fontSize: 50,
    },
    
  })
export default LargeCard;
