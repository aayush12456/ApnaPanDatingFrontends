import { Card, Button } from "react-native-paper";
import {View,Text,Image,Pressable,ScrollView,Dimensions,StyleSheet,TouchableOpacity} from 'react-native'
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import downArrow from '../../../assets/matchIcons/downArrow.png'
import like from '../../../assets/matchIcons/rightTiks.png'
import dislike from '../../../assets/matchIcons/crossTik.png'
import play from '../../../assets/myProfileIcons/play.png'
import pause from '../../../assets/myProfileIcons/pause.png'
import { Audio } from 'expo-av';
const AnotherMatchCard=({anotherMatch,songs})=>{
  console.log('songs is',songs)
    const navigation = useNavigation();
    const [active, setActive] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongUrl, setCurrentSongUrl] = useState(null);
    const [sound, setSound] = useState(null);
    const getProfile = () =>anotherMatch
    const dob = getProfile()?.DOB;
  const dobBreak = dob?.split("/");
  const year = dobBreak?.[2];
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const age = year ? currentYear - parseInt(year) : "";

  const width = Dimensions.get('window').width - 50;
  const height = width * 1.2;

  const number=anotherMatch?.phone
  const mainNumber = number.substring(0, 4) + 'X'.repeat(number.length - 4);

  const rows=[]
  for(let i=0;i<anotherMatch?.interest?.length;i+=2){
    rows.push(anotherMatch.interest.slice(i,i+2))
  }

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== active) {
      setActive(slide);
    }
  };

  const downArrowHandler=()=>{
navigation.navigate('Matches')
  }
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
return (
    <>
    <Card style={{ marginLeft: 8, marginRight: 8,marginTop:45,marginBottom:10, backgroundColor: 'white' }}>
    <Card.Content  style={{height:'100%'}}>
    <View style={{flexDirection:"row",justifyContent:'space-between'}}>
        <View style={{flexDirection:"row",gap:12}}>
                    <Text style={{fontSize:19,fontWeight:'700'}}>{anotherMatch?.firstName}</Text>
                    <Text  style={{fontSize:19,fontWeight:'500'}}>{age}</Text>
        </View>
        <View style={{width:30,height:30,borderRadius:16,backgroundColor:'black'}}>
            <Pressable onPress={downArrowHandler}>
            <Image source={downArrow} style={{width:13,height:13,marginLeft:8,marginTop:7,tintColor:'white'}}/>
            </Pressable>
        </View>
    </View>
    <ScrollView>
    <View style={{marginTop:10}}> 
    <ScrollView
                pagingEnabled
                horizontal
                onScroll={change}
                showsHorizontalScrollIndicator={false}
              >
                {anotherMatch?.images.map((image, index) => {
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
                  {anotherMatch.images.map((_, k) => (
                    <Text key={k} style={k === active ? styles.activeDot : styles.dot}>•</Text>
                  ))}
                </View>
        </View>

        <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Mobile Number</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{mainNumber}</Text>
      </View>

      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Relationship status</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{anotherMatch?.relationship}</Text>
      </View>

      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>I'm looking for</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{anotherMatch?.looking}</Text>
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
       </View>
      </View>

      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Education</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{anotherMatch?.education}</Text>
      </View>

      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Profession</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{anotherMatch?.profession}</Text>
      </View>

      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Drinking</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{anotherMatch?.drinking}</Text>
      </View>

      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Smoking</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{anotherMatch?.smoking}</Text>
      </View>

      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Eating</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{anotherMatch?.eating}</Text>
      </View>

    {anotherMatch.songId!=='none' || !anotherMatch.songId? <View style={{paddingLeft:10,paddingTop:18}}>
      <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Bio Track</Text>
        <View style={{flexDirection:'row',marginTop:8,gap:8}}>
          <Image source={{uri:songs &&songs.songImage}} style={{width:50,height:50,borderRadius:25}}/>
          <Text style={{fontSize:16 ,fontWeight:'semibold',color:'black',paddingTop:6}}>{songs && songs.songName}</Text>
          <Pressable  onPress={() => playSongHandler(songs.songUrl)}> 
          <Image  source={isPlaying && currentSongUrl === songs.songUrl? pause: play}  style={{ width: 27, height: 27, marginTop: 6, marginRight: 20 }}/>
          </Pressable>
        </View>
      </View>:null}
    </ScrollView>
  
    </Card.Content>
    </Card>
    </>
)
}
export default AnotherMatchCard
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