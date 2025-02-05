import { Text, View, Image,Pressable,ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Audio } from 'expo-av';
import { getBollywoodSongAsync } from '../../Redux/Slice/getBollyWoodSongSlice/getBollywoodSongSlice';
import play from '../../../assets/myProfileIcons/play.png'
import pause from '../../../assets/myProfileIcons/pause.png'
import rightTik from '../../../assets/myProfileIcons/rightTik.png';
import { useNavigation } from '@react-navigation/native';
import io from "socket.io-client";
// const socket = io.connect("http://192.168.29.169:4000")
const socket = io.connect("https://apnapandatingbackend.onrender.com")
import axios from 'axios'
const EditSongs=({completeObj})=>{
    // const BASE_URL = "http://192.168.29.169:4000";
    const BASE_URL = "https://apnapandatingbackend.onrender.com";
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const completeLoginObj = useSelector((state) => state.loginData.loginData.completeLoginData);
    const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
    const completeLoginObjData=completeLoginObj?completeLoginObj:completeLoginObjForOtp
    const getAllSongsSelector=useSelector((state)=>state.getBollyWoodSong.getBollywoodSongUserObj.uploadSongsData)
    // console.log('get all songs',getAllSongsSelector)
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongUrl, setCurrentSongUrl] = useState(null);
    const [updateSong,setUpdateSong]=useState({})
    const [songLoginObj,setSongLoginObj]=useState({})
    useEffect(()=>{
        if(completeLoginObjData?._id){
            dispatch(getBollywoodSongAsync(completeLoginObjData?._id))
        }
        return () => {
            if (sound) {
              sound.unloadAsync();
            }
          };
          },[dispatch,completeLoginObjData?._id,sound])
        
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
    
const songUploadHandler=async(getSong)=>{
const songObj={
    id:completeLoginObjData?._id,
    songId:getSong?._id
}
try {
    const response = await axios.post(`${BASE_URL}/user/addSelectedSong/${songObj.id}`, songObj);
    // console.log('response in song obj user is',response?.data?.loginUser)
    socket.emit('addSongObj', response?.data?.loginUser)
    if(response?.data?.loginUser){
        navigation.navigate('EditProfilePage');
    }
} catch (error) {
    // console.error('Error sending message:', error);
}
}
useEffect(() => {
    const fetchSongLoginObj = async () => {
      try {
        if (completeLoginObjData?._id) {
          const response = await axios.get(
            `${BASE_URL}/user/getSelectedSong/${completeLoginObjData?._id}`
          );
          // setLikesArray(response?.data?.anotherMatchUser || []);
        //   console.log('get Song login obj is',response?.data?.loginUser)
          setSongLoginObj(response?.data?.loginUser || {});
        }
      } catch (error) {
        // console.error("Error song login fetch:", error);
      }
    };
  
    fetchSongLoginObj ();
  
    socket.on("getSongObj", (newUser) => {
  
        setSongLoginObj(newUser)
    });
  
    return () => {
      socket.off("getSongObj");
    };
  }, [completeLoginObjData?._id]);
useEffect(() => {
    if (songLoginObj) {
        setUpdateSong(songLoginObj);
    } else {
        setUpdateSong(completeLoginObjData);
    }
}, [songLoginObj, completeLoginObjData]);

const noneSongHandler=async()=>{
    const noneSongObj={
        id:completeLoginObjData?._id,
        songId:'none'
    }
    try {
        const response = await axios.post(`${BASE_URL}/user/addNoneSong/${noneSongObj.id}`, noneSongObj);
        // console.log('response in none song obj user is',response?.data?.loginUser)
        socket.emit('addSongObj', response?.data?.loginUser)
        if(response?.data?.loginUser){
            navigation.navigate('EditProfilePage');
        }
    } catch (error) {
        // console.error('Error sending message:', error);
    }

}
return(
    <>
    <ScrollView>
    <View style={{marginTop:10}}>
    <ScrollView>
    {
            getAllSongsSelector?.map((getSong)=>{
                return (
    
                    <View key={getSong?._id} style={{flexDirection:'row',marginTop:20,marginLeft:20,justifyContent:'space-between'}}>
                    <Pressable onPress={()=>songUploadHandler(getSong)}>
                    <Image source={{uri:getSong?.songImage}} style={{width:65,height:65,borderRadius:34}}/>
                    </Pressable>
                   <Text style={{paddingTop:15,fontSize: 15, color: `${updateSong?.songId === getSong?._id && updateSong?.songId!=='none' ? 'rgba(0, 150, 255, 1)' : `${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`}`}}>
                    {getSong.songName}</Text>
                  {updateSong?.songId === getSong?._id && updateSong?.songId!=='none' ?null: <Pressable onPress={() => playSongHandler(getSong.songUrl)}>
                        <Image
                            source={
                                isPlaying && currentSongUrl === getSong.songUrl
                                    ? pause
                                    : play
                            }
                            style={{ width: 27, height: 27, marginTop: 12, marginRight: 20,
                                tintColor:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}` }}
                        />
                    </Pressable>}
                   {updateSong?.songId === getSong?._id && updateSong?.songId!=='none' &&
                   <Image source={rightTik} style={{width:15,height:15,marginTop: 17, marginRight: 20 }}/>}
                    </View>
                )
            })
        }
        <Pressable onPress={noneSongHandler}>
        <Text style={{paddingTop:15,fontSize: 15,textAlign:'center',color:`${updateSong.songId==='none'?'rgba(0, 150, 255, 1)':`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`}`}}>None</Text>
        </Pressable>
    </ScrollView>
    </View>
    </ScrollView>

    </>
)
}
export default EditSongs