import { Text, Card ,Button} from "react-native-paper";
import { ScrollView, View, Dimensions, Image,StyleSheet,Pressable} from "react-native";
import { passVideoDataSliceActions } from "../../Redux/Slice/passVideoSlice/passVideoSlice";
import { playVideoModalActions } from "../../Redux/Slice/playVideoModalSlice/playVideoModalSlice";
import { anotherPassDataSliceActions } from "../../Redux/Slice/anotherPassDataSlice/anotherPassDataSlice";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import back from '../../../assets/signUpFormIcon/back.png'
import play from '../../../assets/myProfileIcons/play.png'
import PlayVideo from "../common/playVideo/playVideo";
const MessageProfile=({messageProfile})=>{
    const dispatch = useDispatch()
    const navigation=useNavigation()
    const [active, setActive] = useState(0); 
    const width = Dimensions.get('window').width - 50;
  const height = width * 1.2;

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== active) {
      setActive(slide);
    }
  };
  const getProfile = () =>messageProfile
    const dob = getProfile()?.DOB;
  const dobBreak = dob?.split("/");
  const year = dobBreak?.[2];
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const age = year ? currentYear - parseInt(year) : "";

  const number=messageProfile?.phone 
  const mainNumber = number.substring(0, 4) + 'X'.repeat(number.length - 4);
  const rows=[]
  for(let i=0;i<messageProfile?.interest?.length;i+=2){
    rows.push(messageProfile.interest.slice(i,i+2))
  }
  const playVideoHandler=()=>{
    if(messageProfile){
      dispatch(passVideoDataSliceActions.passVideoDatas(messageProfile))
      dispatch(playVideoModalActions.playVideoModalToggle())
    }

  }
  const backHandler=()=>{
    navigation.navigate('MessageDetailsPageContent',{formData:messageProfile})
  }

  const openImageHandler=(image)=>{
    const imageObj={
      name:messageProfile?.firstName,
      images:image
    }
    navigation.navigate('MyPhotoPage',{formData:imageObj})
    if(messageProfile){
      dispatch(anotherPassDataSliceActions.anotherPassDatas(messageProfile))
    }  
   }
return (
    <>
       <Card style={{ marginLeft: 8, marginRight: 8, marginTop:45, marginBottom:10, backgroundColor: 'white' }}>
        <Card.Content style={{height:'100%'}}>
        <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
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
                onTouchEnd={()=>openImageHandler(messageProfile?.images )}
              >
                {messageProfile.images.map((image, index) => {
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
              {messageProfile.images.map((_, index) => (
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
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:"black"}}>{messageProfile?.firstName }</Text>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'black'}}>{age}</Text>
        <Text style={{fontSize:16,fontWeight:'semibold',color:'black'}}>{messageProfile?.city }</Text>
      </View>

      <View style={{paddingLeft:10,paddingTop:3}}>
<Text>Working as {messageProfile?.profession } </Text>
<Text style={{paddingTop:2}}>Studied {messageProfile?.education } </Text>
      </View>
      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Mobile Number</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{mainNumber}</Text>
      </View>

            
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Relationship status</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{messageProfile?.relationship }</Text>
      </View>

      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>I'm looking for</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{messageProfile?.looking }</Text>
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
        <Text style={{fontSize:16 ,paddingTop:2 }}>{messageProfile?.education }</Text>
      </View>

      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Profession</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{messageProfile?.profession }</Text>
      </View>

      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Drinking</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{messageProfile?.drinking }</Text>
      </View>

      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Smoking</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{messageProfile?.smoking }</Text>
      </View>

      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Eating</Text>
        <Text style={{fontSize:16 ,paddingTop:2 }}>{messageProfile?.eating }</Text>
      </View>

          </ScrollView>
        </Card.Content>
        </Card>
        <PlayVideo/>
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
export default MessageProfile