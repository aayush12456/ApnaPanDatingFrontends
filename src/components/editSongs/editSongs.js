import { Text, View, TouchableOpacity, Image,Pressable,ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Audio } from 'expo-av';
import { getBollywoodSongAsync } from '../../Redux/Slice/getBollyWoodSongSlice/getBollywoodSongSlice';
import play from '../../../assets/myProfileIcons/play.png'
import pause from '../../../assets/myProfileIcons/pause.png'
import rightTik from '../../../assets/myProfileIcons/rightTik.png';
import { addSelectedSongAsync } from '../../Redux/Slice/addSelectedSongSlice/addSelectedSongSlice';
import { useNavigation } from '@react-navigation/native';
import { addNoneSongAsync } from '../../Redux/Slice/addNoneSongSlice/addNoneSongSlice';
const EditSongs=()=>{
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const completeLoginObj = useSelector((state) => state.loginData.loginData.completeLoginData);
    const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
    const completeLoginObjData=completeLoginObj?completeLoginObj:completeLoginObjForOtp
    const updatePersonalInfoSelector = useSelector((state) => state?.updatePersonalData?.updatePersonalData?.updateData);
    const getAllSongsSelector=useSelector((state)=>state.getBollyWoodSong.getBollywoodSongUserObj.uploadSongsData)
    const songLoginObj=useSelector((state)=>state?.addSong?.addSelectedSongData?.loginUser)
    const noneSongLoginObj=useSelector((state)=>state?.addNoneSong?.addNoneSongData?.loginUser)
    console.log('none song obj',noneSongLoginObj?.songId)
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongUrl, setCurrentSongUrl] = useState(null);
    const [updateSong,setUpdateSong]=useState({})
    useEffect(()=>{
        if(completeLoginObjData._id){
            dispatch(getBollywoodSongAsync(completeLoginObjData._id))
        }
        return () => {
            if (sound) {
              sound.unloadAsync();
            }
          };
          },[dispatch,completeLoginObjData._id,sound])
        
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
                console.error("Error playing sound:", error);
            }
        };
    
const songUploadHandler=(getSong)=>{
const songObj={
    id:completeLoginObjData._id,
    songId:getSong._id
}
dispatch(addSelectedSongAsync(songObj))
navigation.navigate('EditProfilePage');
}

useEffect(() => {
    if (songLoginObj) {
        setUpdateSong(songLoginObj);
    } else {
        setUpdateSong(completeLoginObjData);
    }
}, [songLoginObj, completeLoginObjData]);

const noneSongHandler=()=>{
    const noneSongObj={
        id:completeLoginObjData._id,
        songId:'none'
    }
    dispatch(addNoneSongAsync(noneSongObj))
    navigation.navigate('EditProfilePage');
}
return(
    <>
<View style={{marginTop:10}}>
    <ScrollView>
    {
            getAllSongsSelector?.map((getSong)=>{
                return (
    
                    <View style={{flexDirection:'row',marginTop:20,marginLeft:20,justifyContent:'space-between'}}>
                    <Pressable onPress={()=>songUploadHandler(getSong)}>
                    <Image source={{uri:getSong?.songImage}} style={{width:65,height:65,borderRadius:34}}/>
                    </Pressable>
                   <Text style={{paddingTop:15,fontSize: 15, color: `${updateSong?.songId === getSong._id && !noneSongLoginObj?.songId ? 'rgba(0, 150, 255, 1)' : 'black'}`}}>
                    {getSong.songName}</Text>
                  {updateSong?.songId === getSong._id && !noneSongLoginObj?.songId ?null: <Pressable onPress={() => playSongHandler(getSong.songUrl)}>
                        <Image
                            source={
                                isPlaying && currentSongUrl === getSong.songUrl
                                    ? pause
                                    : play
                            }
                            style={{ width: 27, height: 27, marginTop: 12, marginRight: 20 }}
                        />
                    </Pressable>}
                   {updateSong?.songId === getSong._id &&  !noneSongLoginObj?.songId &&
                   <Image source={rightTik} style={{width:15,height:15,marginTop: 17, marginRight: 20 }}/>}
                    </View>
                )
            })
        }
        <View>
            
        </View>
        <Pressable onPress={noneSongHandler}>
        <Text style={{paddingTop:15,fontSize: 15,textAlign:'center'}}>None</Text>
        </Pressable>
    </ScrollView>
    </View>
    </>
)
}
export default EditSongs