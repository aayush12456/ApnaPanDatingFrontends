import { Text, Card ,Button} from "react-native-paper";
import { ScrollView, View, Dimensions, Image,StyleSheet,Pressable} from "react-native";
import { useState,useEffect } from "react";
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
const socket = io.connect("http://192.168.29.169:4000")
const LargeCard = ({ newAndOnlineContent,likeContent }) => {
  const dispatch = useDispatch()
  const navigation=useNavigation()
  const [active, setActive] = useState(0); // Move useState outside of change function
  const [loginId,setLoginId]=useState('')
  const [likeSkipUser,setLikeSkipUser]=useState([])
  const [likeSkip,setLikeSkip]=useState(true)
  const [likeMatch,setLikeMatch]=useState(true)
  const [likeMatchUser,setLikeMatchUser]=useState({})
  const loginResponse=useSelector((state)=>state.loginData.loginData.token)// ye loginToken'


  const width = Dimensions.get('window').width - 50;
  const height = width * 1.2;

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== active) {
      setActive(slide);
    }
  };

  const getProfile = () =>newAndOnlineContent || likeContent
    const dob = getProfile()?.DOB;
  const dobBreak = dob?.split("/");
  const year = dobBreak?.[2];
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const age = year ? currentYear - parseInt(year) : "";

  const number=newAndOnlineContent?.phone || likeContent?.phone
  const mainNumber = number.substring(0, 4) + 'X'.repeat(number.length - 4);
  const allImages = [...(newAndOnlineContent?.images || []), ...(likeContent?.images || [])];
  const rows=[]
  const likeRows=[]
  for(let i=0;i<newAndOnlineContent?.interest?.length;i+=2){
    rows.push(newAndOnlineContent.interest.slice(i,i+2))
  }
  for(let i=0;i<likeContent?.interest?.length;i+=2){
    likeRows.push(likeContent.interest.slice(i,i+2))
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
  }
  const backHandler=()=>{
    if(newAndOnlineContent){
      navigation.navigate('New And Online')
    }
    else if(likeContent){
      navigation.navigate('Likes')
    }
  }

  const openImageHandler=(image)=>{
    const imageObj={
      name:newAndOnlineContent?.firstName || likeContent?.firstName,
      images:image
    }
    navigation.navigate('MyPhotoPage',{formData:imageObj})
    if(newAndOnlineContent){
      dispatch(anotherPassDataSliceActions.anotherPassDatas(newAndOnlineContent))
    }
    else if(likeContent){
      dispatch(anotherPassDataSliceActions.anotherPassDatas(likeContent))
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


   const skipUserHandler=async(likeContent)=>{
    console.log('user is skipped',likeContent)
    const likeSkipUserObj={
      id:loginId,
      likeSkipUserId:likeContent?._id
    }
    const onlineSkipUserObj={
      id:loginId,
      onlinePersonSkipUserId:newAndOnlineContent?._id
    }
    if(likeSkipUserObj){
      try {
        const response = await axios.post(`http://192.168.29.169:4000/user/addLikeSkipUser/${likeSkipUserObj.id}`, likeSkipUserObj);
        console.log('response in like skip user is',response?.data?.likeSkip)
        socket.emit('addLikeSkipUser', response?.data?.likeSkip)
    } catch (error) {
        console.error('Error sending message:', error);
    }
    console.log('like skip user is',likeSkipUserObj)
    }
    if(onlineSkipUserObj){
      dispatch(addOnlineSkipUserAsync(onlineSkipUserObj))
      // dispatch( onlinePassDataSliceActions.onlinePassDatas(onlineSkipUserObj.onlinePersonSkipUserId))
      navigation.navigate('New And Online',{formData:onlineSkipUserObj})
    }
   }


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
    const likeSkipData= likeSkipUser?.some((likeSkip)=>likeSkip?.firstName===likeContent?.firstName)
    if(likeSkipData){
     setLikeSkip(false)
    }
     },[likeSkipUser,likeContent])


   const likeUserHandler=async(likeUser)=>{
    console.log('like user handler',likeUser)
    const likeMatchUserObj={
      id:loginId,
      likeMatchId:likeUser._id
    }
    const likeMatchCountObj={
      id:loginId,
      matchLikeId:likeUser._id
    }
    if(likeMatchUserObj){
      try {
        const response = await axios.post(`http://192.168.29.169:4000/user/addLikeMatchUser/${likeMatchUserObj.id}`, likeMatchUserObj);
        console.log('response in like match user is',response?.data)
        socket.emit('addLikeMatchUser', response?.data)
    } catch (error) {
        console.error('Error sending message:', error);
    }
    }
    if(likeMatchCountObj){
      try {
        const response = await axios.post(`http://192.168.29.169:4000/user/addLikeCount/${likeMatchCountObj.id}`,likeMatchCountObj);
        console.log('response in add like count user',response?.data?.userObj)
        socket.emit('addLikeCountUser', response?.data?.userObj)
    
    } catch (error) {
        console.error('Error sending message:', error);
    }
    }
   }

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
    const likeMatchData= likeMatchUser?.matchLikes?.some((likeMatch)=>likeMatch?.firstName===likeContent?.firstName)
    const anotherLikeMatchData= likeMatchUser?.anotherMatchLikes?.some((anotherLikeMatch)=>anotherLikeMatch?.firstName===likeContent?.firstName)
    if(likeMatchData || anotherLikeMatchData){
     setLikeMatch(false)
    }
     },[likeMatchUser?.matchLikes,likeContent,likeMatchUser?.anotherMatchLikes])


  return (
    <>
      <Card style={{ marginLeft: 8, marginRight: 8, marginTop:45, marginBottom:10, backgroundColor: 'white' }}>
        <Card.Content style={{height:'100%'}}>
        <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
          {/* <TouchableOpacity  onPress={backHandler} >
                <Image source={back}   style={{ width:19, height:19 }}/>
          </TouchableOpacity> */}
          {/* <Pressable  onPress={backHandler} >
          <Image source={back}   style={{ width:15, height:15 }}/>
          </Pressable> */}
          <Button onPress={backHandler}><Image source={back}   style={{ width:15, height:15 }}/></Button>
              </View>
          <ScrollView style={{ flexGrow: 1 }}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{ overflow: 'scroll' }}>
              <ScrollView
                pagingEnabled
                horizontal
                onScroll={change}
                showsHorizontalScrollIndicator={false}
                onTouchEnd={()=>openImageHandler(newAndOnlineContent?.images || likeContent?.images)}
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
            <Button  mode="contained"   style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}  buttonColor="rgba(34, 197, 94, 2)" onPress={playVideoHandler} >
  <Image source={play} style={{ width: 20, height:20, tintColor: 'white', marginRight: 32 }} />Play
  </Button>
            </View>
            </View>
            <View style={{flexDirection:'row',gap:12, paddingLeft:10,paddingTop:16}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:"black"}}>{newAndOnlineContent?.firstName || likeContent?.firstName}</Text>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'black'}}>{age}</Text>
        <Text style={{fontSize:16,fontWeight:'semibold',color:'black'}}>{newAndOnlineContent?.city || likeContent?.city}</Text>
      </View>

      <View style={{paddingLeft:10,paddingTop:3}}>
<Text>Working as {newAndOnlineContent?.profession || likeContent?.profession} </Text>
<Text style={{paddingTop:2}}>Studied {newAndOnlineContent?.education || likeContent?.education} </Text>
      </View>
      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Mobile Number</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{mainNumber}</Text>
      </View>

            
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Relationship status</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{newAndOnlineContent?.relationship || likeContent?.relationship}</Text>
      </View>

      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>I'm looking for</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{newAndOnlineContent?.looking || likeContent?.looking}</Text>
      </View>

      <View style={{paddingLeft:10,paddingTop:18}}>
      <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Interest</Text>
      <View>
       {
  rows.map((row, rowIndex) => (
    <View key={rowIndex} style={{ flexDirection: "row", gap: 12, paddingTop: 10 }}>
      {
        row.map((rowItem, itemIndex) => (
          <View  key={`${rowIndex}-${itemIndex}`} style={{ backgroundColor: 'rgba(226, 232, 240, 0.5)', width: 130, height: 40 }}>
            <Text style={{ fontSize: 16, textAlign: 'center', paddingTop: 6 }}>{rowItem}</Text>
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
          <View  key={`${rowIndex}-${itemIndex}`} style={{ backgroundColor: 'rgba(226, 232, 240, 0.5)', width: 130, height: 40 }}>
            <Text style={{ fontSize: 16, textAlign: 'center', paddingTop: 6 }}>{rowItem}</Text>
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
        <Text style={{fontSize:16 ,paddingTop:2 }}>{newAndOnlineContent?.education || likeContent?.education}</Text>
      </View>

      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Profession</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{newAndOnlineContent?.profession || likeContent?.profession}</Text>
      </View>

      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Drinking</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{newAndOnlineContent?.drinking || likeContent?.drinking}</Text>
      </View>

      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Smoking</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{newAndOnlineContent?.smoking || likeContent?.smoking}</Text>
      </View>

      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Eating</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{newAndOnlineContent?.eating || likeContent?.eating}</Text>
      </View>

          </ScrollView>
          {likeSkip===false  &&<Text style={{ color: 'rgba(117, 117, 117, 0.5)',fontSize:16,textAlign:'center',paddingTop:18,paddingBottom:8}}>
            You skipped this profile</Text>}

            {likeMatch===false  &&<Text style={{ color: 'rgba(117, 117, 117, 0.5)',fontSize:16,textAlign:'center',paddingTop:18,paddingBottom:8}}>
            You've both paired</Text>}

       {likeSkip===false || likeMatch===false?null:<View style={{flexDirection:"row",justifyContent:'space-between',position:'fixed',marginTop:12,marginLeft:8}} >
            <Pressable onPress={()=>skipUserHandler(likeContent)}>
            <View style={{flexDirection:"row",gap:12,marginLeft:25}} >
                <View style={{width:47 ,height:47,borderRadius:30,backgroundColor:'grey'}}>
          <Image source={dislike} style={{ width: 20, height:30,marginLeft:14,marginTop:6,tintColor:'white' }} />
                </View>
          <Text style={{fontSize:15,paddingTop:10,colour:'grey'}}>SKIP</Text>
            </View>
            </Pressable>
            <Pressable onPress={()=>likeUserHandler(likeContent)}>
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
