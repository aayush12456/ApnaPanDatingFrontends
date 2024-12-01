import { Card, Button } from "react-native-paper";
import {View,ScrollView,Image,StyleSheet,Dimensions,Text, Pressable} from 'react-native'
import { useState,useEffect } from "react";
import io from "socket.io-client";
import { useNavigation } from '@react-navigation/native';
import {useDispatch,useSelector} from 'react-redux'
import cross from '../../../assets/matchIcons/cross.png'
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
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { addMatchUserAsync } from "../../Redux/Slice/addMatchUserSlice/addMatchUserSlice";
import axios from 'axios'
const socket = io.connect("http://192.168.29.169:4000")
const MatchCard=({matchObj})=>{
  const [loginData, setLoginData] = useState(null);
  const [loginId,setLoginId]=useState('')
    const navigation = useNavigation();
    const dispatch=useDispatch()
    const completeLoginObj=useSelector((state)=>state.loginData.loginData.completeLoginData)
    const loginResponse=useSelector((state)=>state.loginData.loginData.token)// ye loginToken
    // const addMatchUserData=useSelector((state)=>state.addMatchUserData.addMatchUserData.anotherMatchUser)
    // console.log('add match user in match card',addMatchUserData)
    // useEffect(() => {
    //   const fetchLoginId = async () => {
    //     try {
    //      const loginId=await AsyncStorage.getItem('loginId')
    //      setLoginId(loginId)
    //     } catch (error) {
    //       console.error('Error retrieving login data:', error);
    //     }
    //   };
    
    //   fetchLoginId();
    // }, []);

    useEffect(()=>{
      if(loginResponse){
        const getLoginId = async () => {
          const loginIdData = await SecureStore.getItemAsync('loginId');
          setLoginId(loginIdData)
        };
        getLoginId()
      }
  },[loginResponse])
  console.log('login id in match card',loginId)
    const [active, setActive] = useState(0); 
    const width = Dimensions.get('window').width - 50;
    console.log('width is',width)
    const height = width===334?width*1.2:width*1.8
    console.log('height is',height)
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

      const upArrowClickHandler=()=>{
        console.log('another match data ardcae')
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
       dispatch(addCrossMatchAsync(addCrossObj))
       dispatch(passDataSliceActions.passDatas(id))

        }

        const addLikeMatchHandler=async(id)=>{
          const addLikeObj={
            id:loginId,
            matchLikeId:id
          }
  //  dispatch(addMatchUserAsync(addLikeObj))
       dispatch(passDataSliceActions.passDatas(id))
       try {
        const response = await axios.post(`http://192.168.29.169:4000/user/addMatchUser/${addLikeObj.id}`, addLikeObj);
        console.log('response in match card is',response?.data?.anotherMatchUser)
        socket.emit('addMatchUser', response?.data?.anotherMatchUser)
    } catch (error) {
        console.error('Error sending message:', error);
    }
        }
return (
    <>
    <Card style={{ marginLeft: 8, marginRight: 8,marginTop:20,marginBottom:10, backgroundColor: 'white' }}>
    <Card.Content>
      <View style={{flexDirection:'row' ,gap:6,position:'absolute',top:30,zIndex:10,left:30}} >
        <Pressable onPress={playVideoHandler}>
        <Image source={play} style={{width:16,height:16,marginTop:3,tintColor:'white'}}/>
        <Text style={{color:'white',paddingLeft:20,marginTop:-18}}>Watch Video</Text>
        </Pressable>
      </View>
    <View style={{ overflow: 'scroll' }}>
              <ScrollView
                pagingEnabled
                horizontal
                onScroll={change}
                showsHorizontalScrollIndicator={false}
                onTouchEnd={()=>openImageHandler(matchObj?.images)}
              >
                {matchObj?.images.map((image, index) => {
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
                  {matchObj.images.map((_, k) => (
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
    <PlayVideo/>
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