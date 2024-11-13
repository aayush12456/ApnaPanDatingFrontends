import { Text, Card ,Button} from "react-native-paper";
import { ScrollView, View, Dimensions, Image,StyleSheet,TouchableOpacity,Pressable } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import like from '../../../../assets/matchIcons/rightTiks.png'
import dislike from '../../../../assets/matchIcons/crossTik.png'
import play from '../../../../assets/myProfileIcons/play.png'
import { passVideoDataSliceActions } from "../../../Redux/Slice/passVideoSlice/passVideoSlice";
import PlayVideo from "../playVideo/playVideo";
import { playVideoModalActions } from "../../../Redux/Slice/playVideoModalSlice/playVideoModalSlice";
import back from '../../../../assets/signUpFormIcon/back.png'
import { useNavigation } from "@react-navigation/native";
const LargeCard = ({ newAndOnlineContent }) => {
  const dispatch = useDispatch()
  const navigation=useNavigation()
  const [active, setActive] = useState(0); // Move useState outside of change function
  const width = Dimensions.get('window').width - 50;
  const height = width * 1.2;

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== active) {
      setActive(slide);
    }
  };

  const getProfile = () =>newAndOnlineContent
    const dob = getProfile()?.DOB;
  const dobBreak = dob?.split("/");
  const year = dobBreak?.[2];
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const age = year ? currentYear - parseInt(year) : "";

  const number=newAndOnlineContent?.phone
  const mainNumber = number.substring(0, 4) + 'X'.repeat(number.length - 4);

  const rows=[]
  for(let i=0;i<newAndOnlineContent?.interest?.length;i+=2){
    rows.push(newAndOnlineContent.interest.slice(i,i+2))
  }

  const playVideoHandler=()=>{
  dispatch(passVideoDataSliceActions.passVideoDatas(newAndOnlineContent))
  dispatch(playVideoModalActions.playVideoModalToggle())
  }
  const backHandler=()=>{
navigation.navigate('New And Online')
  }
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
              >
                {newAndOnlineContent?.images.map((image, index) => {
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
                  {newAndOnlineContent.images.map((_, k) => (
                    <Text key={k} style={k === active ? styles.activeDot : styles.dot}>•</Text>
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
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:"black"}}>{newAndOnlineContent?.firstName}</Text>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'black'}}>{age}</Text>
        <Text style={{fontSize:16,fontWeight:'semibold',color:'black'}}>{newAndOnlineContent?.city}</Text>
      </View>

      <View style={{paddingLeft:10,paddingTop:3}}>
<Text>Working as {newAndOnlineContent?.profession} </Text>
<Text style={{paddingTop:2}}>Studied {newAndOnlineContent?.education} </Text>
      </View>
      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Mobile Number</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{mainNumber}</Text>
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
        <Text style={{fontSize:16 ,paddingTop:2 }}>{newAndOnlineContent?.education}</Text>
      </View>

      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Profession</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{newAndOnlineContent?.profession}</Text>
      </View>

      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Drinking</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{newAndOnlineContent?.drinking}</Text>
      </View>

      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Smoking</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{newAndOnlineContent?.smoking}</Text>
      </View>

      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Eating</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{newAndOnlineContent?.eating}</Text>
      </View>

          </ScrollView>
          <View style={{flexDirection:"row",justifyContent:'space-between',position:'fixed',marginTop:12,marginLeft:8}} >
            <View style={{flexDirection:"row",gap:12,marginLeft:25}}>
                <View style={{width:47 ,height:47,borderRadius:30,backgroundColor:'grey'}}>
          <Image source={dislike} style={{ width: 20, height:30,marginLeft:14,marginTop:6,tintColor:'white' }} />
                </View>
          <Text style={{fontSize:15,paddingTop:10,colour:'grey'}}>SKIP</Text>
            </View>
            <View style={{flexDirection:"row",gap:12,marginRight:25}}>
            <View style={{width:47 ,height:47,borderRadius:30,backgroundColor:'rgba(37, 99, 235, 1)'}}>
            <Image source={like} style={{ width:20, height: 30,marginLeft:14,marginTop:6 }} />
            </View>
          <Text style={{fontSize:15,paddingTop:10,color: 'rgba(2, 113, 254, 0.8)'}}>LIKE</Text>
            </View>
        </View>
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
