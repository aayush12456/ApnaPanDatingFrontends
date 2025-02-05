import { Card } from "react-native-paper";
import {View,ScrollView,Image,StyleSheet,Dimensions,Text, Pressable} from 'react-native'
import { useState,useEffect } from "react";
import io from "socket.io-client";
import { useNavigation } from '@react-navigation/native';
import {useDispatch,useSelector} from 'react-redux'
import cross from '../../../assets/matchIcons/cross.png'
import crossTik from '../../../assets/matchIcons/crossTik.png'
import rightTik from '../../../assets/matchIcons/rightTiks.png'
import like from '../../../assets/matchIcons/right.png'
import upArrow from '../../../assets/matchIcons/upArrow.png'
import play from '../../../assets/matchIcons/playVideo.png'
import { passMatchDataSliceActions } from "../../Redux/Slice/passMatchDataSlice/passMatchDataSlice";
import PlayVideo from "../common/playVideo/playVideo";
import { passVideoDataSliceActions } from "../../Redux/Slice/passVideoSlice/passVideoSlice";
import { playVideoModalActions } from "../../Redux/Slice/playVideoModalSlice/playVideoModalSlice";
import { addCrossMatchAsync } from "../../Redux/Slice/addCrossMatchSlice/addCrossMatchSlice";
import { passDataSliceActions } from "../../Redux/Slice/passDataSlice/passDataSlice";
import * as SecureStore from 'expo-secure-store';

import axios from 'axios'
import Notification from "../notification/notification";
import { AlertNotificationRoot } from "react-native-alert-notification";
// const socket = io.connect("http://192.168.29.169:4000")
const socket = io.connect("https://apnapandatingbackend.onrender.com")
const MatchCard=({matchObj,completeObj})=>{
  // const BASE_URL = "http://192.168.29.169:4000";
  const BASE_URL = "https://apnapandatingbackend.onrender.com";
  const [loginId,setLoginId]=useState('')
  const [activeLoginIdResponse,setActiveLoginIdResponse]=useState(false)
  const [loginIdUserArray, setLoginIdUserArray] = useState([])
  const [deactivateUserObj,setDeactivateUserObj]=useState({})
  const [notifyDeactivateObj,setNotifyDeactivateObj]=useState({})
  const [openDialog,setOpenDialog]=useState(false)
  const [crosses, setCrosses] = useState(false);
  const [liked, setLiked] = useState(false);
    const navigation = useNavigation();
    const dispatch=useDispatch()
    const loginResponse=useSelector((state)=>state?.loginData?.loginData?.token)// ye loginToken
    const loginOtpResponse=useSelector((state)=>state?.finalLoginWithOtpData?.finalLoginWithOtpData?.token) // ye loginOtpToken
   

    useEffect(()=>{
      if(loginResponse || loginOtpResponse){
        const getLoginId = async () => {
          const loginIdData = await SecureStore.getItemAsync('loginId');
          setLoginId(loginIdData) 
        };
        getLoginId()
      }
  },[loginResponse,loginOtpResponse])

  // console.log('login id in match card',loginId)

  useEffect(()=>{
    const fetchAllLoginIdUser = async () => {
      try {
        if (loginId) {
          const response = await axios.get(
            `${BASE_URL}/user/getAllLoginIdUser/${loginId}`,
          );
          // console.log('get all login id user is', response?.data?.loginIdUserArray)
          setLoginIdUserArray(response?.data?.loginIdUserArray)
        }
      } catch (error) {
        // console.error("Error fetching in login id obj:", error);
      }
    };
    fetchAllLoginIdUser();

    socket.on("getLoginUser", (newUser) => {

      setLoginIdUserArray(newUser)
    });
    socket.on("deleteLoginIdUser", (newUser) => {
      setLoginIdUserArray(newUser)
    });
    return () => {
      socket.off("getLoginUser");
      socket.off("deleteLoginIdUser");
    };
  },[loginId])

  // console.log('login id user array is',loginIdUserArray)
  useEffect(() => {
    if (loginId) {
      const getActiveLoginId = loginIdUserArray?.some(
        (item) => item === matchObj?._id
      );
      setActiveLoginIdResponse(getActiveLoginId)
    }
  }, [loginId, loginIdUserArray, matchObj]);


    const [active, setActive] = useState(0); 
    const width = Dimensions.get('window').width - 50;
    // console.log('width is',width)
    const height = width===334?width*1.2:width*1.8
    // console.log('height is',height)
    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
          setActive(slide);
        }
      };
      const getProfile = () =>matchObj
      const dob = getProfile()?.DOB;
      const dobBreak = dob?.split("/");
      const year = dobBreak?.[2];
      let currentDate = new Date();
      let currentYear = currentDate.getFullYear();
      const age = year ? currentYear - parseInt(year) : "";

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
            // console.error("Error fetching in deactivate user id obj:", error);
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
      const upArrowClickHandler=()=>{
        // console.log('another match data ardcae')
        navigation.navigate('AnotherMatchCardPage',{formData:matchObj})
      }
      const openImageHandler=(image)=>{
        const imageObj={
          name:matchObj?.firstName,
          images:image
        }
        navigation.navigate('MyPhotoPage',{formData:imageObj})
        dispatch(passMatchDataSliceActions.passMatchDatas(matchObj))
       }
       const playVideoHandler=()=>{
        dispatch(passVideoDataSliceActions.passVideoDatas(matchObj))
        dispatch(playVideoModalActions.playVideoModalToggle())
        }
        const addCrossMatchHandler=(id)=>{
          const addCrossObj={
            id:loginId,
            userId:id
          }
          // console.log('add cross obj',addCrossObj)
          if(addCrossObj.id===deactivateUserObj?.selfDeactivate){
            setOpenDialog(true)
            const obj={
              type:'WARNING',
              textBody:`You can't skip ${matchObj.firstName} profile untill you should activate yourself`
            }
            setNotifyDeactivateObj(obj) 
           
            return
          }
          setCrosses(true);
          dispatch(passDataSliceActions.passDatas(id))
       setTimeout(() => {
        dispatch(addCrossMatchAsync(addCrossObj))
        setCrosses(false); // Set crosses back to false after a delay
      }, 700);
        }
        const addLikeMatchHandler=async(id)=>{
          const addLikeObj={
            id:loginId,
            matchLikeId:id
          }
          if(addLikeObj.id===deactivateUserObj?.selfDeactivate){
            setOpenDialog(true)
            const obj={
              type:'WARNING',
              textBody:`You can't like ${matchObj.firstName} profile untill you should activate yourself`
            }
            setNotifyDeactivateObj(obj)
            return
          }
  setLiked(true)
       dispatch(passDataSliceActions.passDatas(id))
      setTimeout(() => {
        setLiked(false); // Set crosses back to false after a delay
      }, 700);
       try {
        const response = await axios.post(`${BASE_URL}/user/addMatchUser/${addLikeObj.id}`, addLikeObj);
        // console.log('response in match card is',response?.data?.likesArray)
        socket.emit('addMatchUser', response?.data?.likesArray)
    } catch (error) {
        // console.error('Error match response', error);
    }

    try {
      const response = await axios.post(`${BASE_URL}/user/addLikeCount/${addLikeObj.id}`, addLikeObj);
      // console.log('response in add like count user',response?.data?.userObj)
      socket.emit('addLikeCountUser', response?.data?.userObj)

  } catch (error) {
      // console.error('Error like count', error);
  }
        }
return (
    <>
    <AlertNotificationRoot>
      <View style={{position:'relative'}}>
      {crosses && (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#4b5563',
        zIndex: 10, 
        top: 0, 
        left: 0, 
        width:'96%',
        height:'96%',
        marginLeft: 8, marginRight: 8,marginTop:20,marginBottom:10,
        borderRadius:12
      }}
    >
      <View style={{flexDirection:"row",justifyContent:'center'}} >
      <Image source={crossTik} style={{ width:50, height:50,tintColor:'white',position:'relative',marginTop:'90%' }} />
      </View>
    </View>
  )}

{liked && (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#6495ed',
        zIndex: 10, 
        top: 0, 
        left: 0, 
        width:'96%',
        height:'96%',
        marginLeft: 8, marginRight: 8,marginTop:20,marginBottom:10,
        borderRadius:12
      }}
    >
      <View style={{flexDirection:"row",justifyContent:'center'}} >
      <Image source={rightTik} style={{ width:50, height:50,position:'relative',marginTop:'90%' }} />
      </View>
    </View>
  )}
      <Card style={{ marginLeft: 8, marginRight: 8,marginTop:20,marginBottom:10,
        backgroundColor: `${completeObj?.appearanceMode==='Dark Mode'?'#343434':'white'}`}}>
    <Card.Content>
      <View style={{flexDirection:"row",justifyContent:'space-between'}}>
      <View style={{flexDirection:'row' ,gap:6,position:'absolute',top:15,zIndex:10,left:16}} >
        <Pressable onPress={playVideoHandler}>
        <Image source={play} style={{width:16,height:16,marginTop:3,tintColor:'white'}}/>
        <Text style={{color:'white',paddingLeft:20,marginTop:-18}}>Watch Video</Text>
        </Pressable>
        </View>
        {activeLoginIdResponse===true?<View style={{ backgroundColor:'#32cd32',borderRadius:15, width:80,position:'absolute',top:15,zIndex:10,right:8}}>
        <Text style={{textAlign:'center',color:'white',paddingTop:6,paddingBottom:6}}>Online</Text>
      </View>:null}
      </View>
    <View style={{ overflow: 'scroll' }}>
              <ScrollView
                pagingEnabled
                horizontal
                onScroll={change}
                showsHorizontalScrollIndicator={false}
                onTouchEnd={()=>openImageHandler(matchObj?.images)}
              >
                {matchObj?.images?.map((image, index) => {
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
                  {matchObj?.images?.map((_, k) => (
                    <Text key={k} style={k === active ? styles.activeDot : styles.dot}>•</Text>
                  ))}
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between', gap:26,position:'relative',top:-88}}>
              <View>
              <View style={{flexDirection:'row',gap:9,marginLeft:110}}>
              <Text style={{fontSize:25,color:'white',fontWeight:'700'}}>{matchObj?.firstName}</Text>
              <Text style={{fontSize:25,color:'white',fontWeight:'700'}}>{age}</Text>
              </View>
              <View style={{flexDirection:"row",justifyContent:'center',marginLeft:90}}>
              <Text style={{fontSize:17,color:'white',fontWeight:'700'}}>{matchObj?.city}</Text>
              </View>
              </View>
              <View style={{width:30,height:30,borderRadius:16,backgroundColor:'white',marginRight:22}}>
                <Pressable  onPress={upArrowClickHandler}>
                <Image source={upArrow} style={{width:13,height:13,marginLeft:8,marginTop:7}} />
                </Pressable>
              </View>
            </View>
            <View> 
                <View style={{flexDirection:'row',gap:40,marginTop:-20,marginBottom:0,justifyContent:'center'}}>
                  <Pressable onPress={()=>addCrossMatchHandler(matchObj?._id)}>
                  <Image source={cross} style={{width:60,height:60}}/>
                    </Pressable>
                    <Pressable onPress={()=>addLikeMatchHandler(matchObj?._id)}>
                    <Image source={like} style={{width:60,height:60}}/>
                    </Pressable>
                </View>
            </View>
    </Card.Content>
    </Card>
      </View>
     
    
    <PlayVideo/>
 {openDialog===true && <Notification dialog={notifyDeactivateObj}  />}
    </AlertNotificationRoot>
    
    </>
)
}
export default MatchCard
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