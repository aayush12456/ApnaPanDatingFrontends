import * as React from 'react';
import Slider from '@react-native-community/slider';
import { Card,Text} from 'react-native-paper'
import { Dimensions, View ,ScrollView,StyleSheet,Image,TouchableOpacity,Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import edit from '../../../assets/myProfileIcons/edit.png'
import play from '../../../assets/myProfileIcons/play.png'
import pause from '../../../assets/myProfileIcons/pause.png'
import { Audio } from 'expo-av';
import { getBollywoodSongAsync } from '../../Redux/Slice/getBollyWoodSongSlice/getBollywoodSongSlice';
const EditProfile=({navigation})=>{
  const dispatch=useDispatch()
  const [active,setActive]=useState(0)
  const [loginObj,setLoginObj]=useState({})
  const [songObj,setSongObj]=useState({})
  const [updateSong,setUpdateSong]=useState({})
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
const [duration, setDuration] = useState(0);
const [position, setPosition] = useState(0);
const [isSliding, setIsSliding] = useState(false);
    const width = Dimensions.get('window').width-50;
    console.log('widht us',width)
    const height=width *1.2
    const change=({nativeEvent})=>{
   const slide=Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
   if(slide!=active){
    setActive(slide)
   }
    }
    const completeLoginObj=useSelector((state)=>state.loginData.loginData.completeLoginData)
    console.log('complete  login response data in login',completeLoginObj)
   
    const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)


     const completeLoginObjData=completeLoginObj?completeLoginObj:completeLoginObjForOtp
     console.log('complete logn obj data',completeLoginObjData.songId)
    const updatePersonalInfoSelector=useSelector((state)=>state?.updatePersonalData?.updatePersonalData?.updateData)
    const getAllSongsSelector=useSelector((state)=>state?.getBollyWoodSong?.getBollywoodSongUserObj?.uploadSongsData)
    console.log('get all songs selector',getAllSongsSelector)
    const songLoginObj=useSelector((state)=>state?.addSong?.addSelectedSongData?.loginUser)
    console.log('song login',songLoginObj)
    const noneSongLoginObj=useSelector((state)=>state?.addNoneSong?.addNoneSongData?.loginUser)
    const getProfile = () =>completeLoginObjData
    const dob = getProfile()?.DOB;
  const dobBreak = dob?.split("/");
  const year = dobBreak?.[2];
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const age = year ? currentYear - parseInt(year) : "";



  console.log('about user us',completeLoginObjData?.aboutUser)

  const editRelationHandler=()=>{
   navigation.navigate('EditRelationPage')
  }
 
  useEffect(()=>{
  if(updatePersonalInfoSelector){
  setLoginObj(updatePersonalInfoSelector)
  }
  else{
    setLoginObj(completeLoginObjData)
  }
  },[updatePersonalInfoSelector,completeLoginObjData])

  const rows=[]
  for(let i=0;i<loginObj?.interest?.length;i+=2){
    rows.push(loginObj.interest.slice(i,i+2))
  }

  const openImageHandler=(image)=>{
    const imageObj={
      name:'My Photos',
      images:image
    }
    navigation.navigate('MyPhotoPage',{formData:imageObj})
   }
  const editLookingForHandler=()=>{
    navigation.navigate('EditLookingForPage')
   }
   const editEducationHandler=()=>{
    navigation.navigate('EditEducationPage')
   }
   const editProfessionHandler=()=>{
    navigation.navigate('EditProfessionPage')
   }
   const editDrinkingHandler=()=>{
    navigation.navigate('EditDrinkingPage')
   }
   const editSmokingHandler=()=>{
    navigation.navigate('EditSmokingPage')
   }
   const editEatingHandler=()=>{
    navigation.navigate('EditEatingPage')
   }
   const editZodiacHandler=()=>{
    navigation.navigate('EditZodiacPage')
   }
   const editAboutMeHandler=()=>{
    navigation.navigate('EditAboutMePage')
   }
   const editLanguageHandler=()=>{
    navigation.navigate('EditLanguagePage')
   }
   const editInterestHandler=()=>{
    navigation.navigate('EditInterestPage')
   }
   const editSongsHandler=()=>{
    navigation.navigate('EditSongsPage')
   }

   useEffect(()=>{
    if(completeLoginObjData._id){
        dispatch(getBollywoodSongAsync(completeLoginObjData._id))
    }

      },[dispatch,completeLoginObjData._id])
   const finalSongObj=songLoginObj  || completeLoginObjData
   console.log('finalSongObj',finalSongObj)
   useEffect(() => {
    if (finalSongObj && getAllSongsSelector?.length > 0) {
      console.log("Final Song Object:", finalSongObj);
      console.log("All Songs Selector:", getAllSongsSelector);

      const completeSongObj = getAllSongsSelector.filter(
        (song) => song._id === finalSongObj.songId
      );

      console.log("Filtered Song Object:", completeSongObj);

      if (completeSongObj?.length > 0) {
        setSongObj(completeSongObj[0]);
      } else {
        console.warn("No matching song found");
      }
    }
  }, [finalSongObj, getAllSongsSelector]);
   console.log('song obj in edit',songObj)

//    const playSongHandler = async (songUrl) => {
//     try {
//         if (sound && currentSongUrl === songUrl) {
//             if (isPlaying) {
//                 // Pause the current song
//                 await sound.pauseAsync();
//                 setIsPlaying(false);
//             } else {
//                 // Resume playing the song from where it was paused
//                 await sound.playAsync();
//                 setIsPlaying(true);
//             }
//             return;
//         }

//         // Stop and unload the previous sound if a different song is clicked
//         if (sound) {
//             await sound.stopAsync();
//             await sound.unloadAsync();
//         }

//         // Load and play the new song
//         const { sound: newSound } = await Audio.Sound.createAsync({ uri: songUrl });
//         setSound(newSound);
//         setCurrentSongUrl(songUrl);

//         await newSound.playAsync();
//         setIsPlaying(true);
//     } catch (error) {
//         console.error("Error playing sound:", error);
//     }
// };
const playSongHandler = async (songUrl) => {
  try {
      if (sound && currentSongUrl === songUrl) {
          if (isPlaying) {
              await sound.pauseAsync();
              setIsPlaying(false);
          } else {
              await sound.playAsync();
              setIsPlaying(true);
          }
          return;
      }

      if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync({ uri: songUrl });
      setSound(newSound);
      setCurrentSongUrl(songUrl);

      newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
              setDuration(status.durationMillis || 0);
              setPosition(status.positionMillis || 0);

              if (!isSliding) {
                  setSliderValue(status.positionMillis / (status.durationMillis || 1));
              }

              if (status.didJustFinish) {
                  setIsPlaying(false);
              }
          }
      });

      await newSound.playAsync();
      setIsPlaying(true);
  } catch (error) {
      console.error("Error playing sound:", error);
  }
};

const handleSlidingComplete = async (value) => {
  if (sound) {
      const newPosition = value * duration;
      await sound.setPositionAsync(newPosition);
      setPosition(newPosition);
      setIsSliding(false);
  }
};

return (
    <>
    <Card style={{marginLeft:8,marginRight:8,marginTop:20,backgroundColor:'white'}}>
    <Card.Content>
      <ScrollView>
      <View style={{ overflow: 'scroll' }}>
      <View>
<ScrollView
pagingEnabled
horizontal
onScroll={change}
showsHorizontalScrollIndicator={false}
style={{width,height}}
onTouchEnd={()=>openImageHandler(completeLoginObjData?.images)} 
>
{
  completeLoginObjData.images.map((image,index)=>{
    return (
      <>
      <Image 
key={index}
source={{uri:image}}
style={{width,height,resizeMode:'cover'}}
/>

      </>
    )
  })
}

</ScrollView>
<View style={styles.pagination}>
                  {completeLoginObjData.images.map((_, k) => (
                    <Text key={k} style={k === active ? styles.activeDot : styles.dot}>•</Text>
                  ))}
                </View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View style={{flexDirection:'row',gap:12, paddingLeft:12,paddingTop:16}}>
        <Text style={{fontSize:17 ,fontWeight:'semibold'}}>{completeLoginObjData?.firstName}</Text>
        <Text style={{fontSize:17 ,fontWeight:'semibold'}}>{age}</Text>
        <Text style={{fontSize:17,fontWeight:'semibold'}}>{completeLoginObjData?.city}</Text>
      </View>
      <View>
      <TouchableOpacity>
          <Image source={edit} style={{marginRight:7,marginTop:16}}/>
        </TouchableOpacity>
      </View>
      </View>
      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Relationship Status</Text>
        <TouchableOpacity onPress={editRelationHandler}>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{loginObj?.relationship }</Text>
      </View>


      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>I'm looking for</Text>
        <TouchableOpacity onPress={editLookingForHandler}>
          <Image source={edit} style={{marginRight:7,marginTop:18}} />
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{loginObj?.looking}</Text>
      </View>


      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Interest</Text>
        <TouchableOpacity onPress={editInterestHandler}>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
       <View>
       {
  rows.map((row, rowIndex) => (
    <View key={rowIndex} style={{ flexDirection: "row", gap: 12, paddingTop: 14, paddingLeft: 12 }}>
      {
        row.map((rowItem, itemIndex) => (
          <View  key={`${rowIndex}-${itemIndex}`} style={{ backgroundColor: 'rgba(226, 232, 240, 0.5)', width: 130, height: 40 }}>
            <Text style={{ fontSize: 17, textAlign: 'center', paddingTop: 6 }}>{rowItem}</Text>
          </View>
        ))
      }
    </View>
  ))
}
       </View>
      </View>
      
   <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>About Me </Text>
        <TouchableOpacity onPress={editAboutMeHandler}   >
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{loginObj?.aboutUser}</Text>
      </View>
 
      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Education</Text>
        <TouchableOpacity onPress={editEducationHandler}>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{loginObj?.education}</Text>
      </View>


      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Profession</Text>
        <TouchableOpacity onPress={editProfessionHandler}>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{loginObj?.profession}</Text>
      </View>


      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Drinking</Text>
        <TouchableOpacity onPress={editDrinkingHandler}>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{loginObj?.drinking}</Text>
      </View>


      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Smoking</Text>
        <TouchableOpacity onPress={editSmokingHandler}>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{loginObj?.smoking}</Text>
      </View>

      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Eating</Text>
        <TouchableOpacity onPress={editEatingHandler}>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{loginObj?.eating}</Text>
      </View>

      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Zodiac Sign</Text>
        <TouchableOpacity onPress={editZodiacHandler}>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{loginObj?.zodiac}</Text>
      </View>

      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>languages I know</Text>
        <TouchableOpacity onPress={editLanguageHandler}>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{loginObj?.language}</Text>
      </View>

      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Connect with Songs</Text>
        <TouchableOpacity onPress={editSongsHandler}>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        {/* <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{loginObj?.eating}</Text> */}
        {completeLoginObjData.songId!=='none'?<View style={{flexDirection:'row',gap:8,marginTop:10}}>
          <Image source={{uri:songObj.songImage}} style={{width:60,height:60,borderRadius:27}}/>
          <View>
          <Text style={{fontSize:17 ,fontWeight:'semibold',color:'black',paddingTop:6}}>{songObj.songName}</Text>
         { !completeLoginObjData.songId?null:<Slider
            style={{ width:100, height: 40,marginLeft:-13 }}
            minimumValue={0}
            maximumValue={1}
            value={sliderValue}
            minimumTrackTintColor="#1FB28A"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#1FB28A"
            onValueChange={() => setIsSliding(true)}
            onSlidingComplete={handleSlidingComplete}
        />}
          </View>
          { !completeLoginObjData.songId?null:<Pressable onPress={() => playSongHandler(songObj.songUrl)}>
                        <Image
                            source={
                                isPlaying && currentSongUrl === songObj.songUrl
                                    ? pause
                                    : play
                            }
                            style={{ width: 27, height: 27, marginTop:5, marginRight: 20 }}
                        />
                    </Pressable>}

        </View>:
        <Text style={{fontSize:17 ,fontWeight:'semibold',color:'black',paddingTop:6,paddingLeft:12}}>None</Text>
        }
        {!completeLoginObjData?.songId && !songLoginObj?.songId? <Text style={{fontSize:17 ,fontWeight:'semibold',color:'black',marginTop:-60,marginLeft:14}}>None</Text>:null}
      </View>

      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Connect with Songs</Text>
        <TouchableOpacity>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        {/* <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{loginObj?.eating}</Text> */}
        <View style={{flexDirection:'row'}}>
          <Image source={{uri:songObj.songImage}} style={{width:40,height:40,borderRadius:12}}/>
          <Text style={{fontSize:17 ,fontWeight:'semibold',color:'black'}}>{songObj.songName}</Text>
          <Image source={play}  style={{ width: 27, height: 27, marginTop: 12, marginRight: 20 }}/>
        </View>
      </View>
      </View>
      </ScrollView>
      
    </Card.Content>
  </Card>
    </>
)
}
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
export default EditProfile