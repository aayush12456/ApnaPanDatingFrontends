import { Text, Card ,Button,TextInput} from "react-native-paper";
import { useState,useEffect} from "react";
import { View,Image,ScrollView,ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch,useSelector } from "react-redux";
import back from '../../../../assets/signUpFormIcon/back.png'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { replyUserAsync, replyUserData } from "../../../Redux/Slice/replyUserSlice/replyUserSlice";
const ReportLargeCard=({user})=>{
    console.log('report user obj',user)
    const [loading,setLoading]=useState(false)
const [messageReply,setMessageReply]=useState('')
    const navigation=useNavigation()
    const dispatch = useDispatch()
    const replySelector=useSelector((state)=>state.replyUser.replyUserObj)

    const backHandler=()=>{
        navigation.goBack()
      }

      const submitReplyHandler=()=>{
        if(messageReply==""){
            return
        }
        setLoading(true);
const replyObj={
    name:user.senderName,
    message:messageReply,
    email:user.senderEmail,
    replyMessage:'Thank you for reaching out to ApnaPan Support. We have reviewed your request and are getting back to you with an update.',
}
dispatch(replyUserAsync(replyObj))
      }

      useEffect(() => {
        if (replySelector?.mssg === "Email sent successfully") {
      
          setLoading(false)
          // ✅ Toast show
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: `Email sent successfully`,
            autoClose: 3000,
            containerStyle: {
              borderRadius: 16,
              marginHorizontal: 20,
              paddingVertical: 12,
              backgroundColor: "#1F2937",
            },
            titleStyle: {
              fontSize: 15,
              fontWeight: "600",
            },
          });
        setMessageReply('')
          // ✅ 3 sec baad state reset
          setTimeout(() => {
            dispatch(replyUserData());
          }, 3000);
        }
      }, [replySelector.mssg]);
return (
    <>
    <Card style={{ marginLeft: 8, marginRight: 8, marginTop:45, marginBottom:10, 
      backgroundColor: `#343434` }}>
             <Card.Content style={{height:'100%'}}>
             <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
          <Button onPress={backHandler}><Image source={back}   style={{ width:15, height:15,
            tintColor:`white` }}/></Button>
              </View>
                <ScrollView 
              style={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
                >
                
              <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
              <View>
<Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Reported By</Text>
<Text style={{fontSize:16,paddingTop:2,color:`white`}}>{user?.senderName} </Text>
</View>

<View>
<Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Reported User</Text>
<Text style={{fontSize:16,paddingTop:2,color:`white`}}>{user?.recieverName} </Text>
</View>
              </View>

              <View style={{paddingTop:15}}>
              <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Message</Text>
<Text style={{fontSize:16,paddingTop:2,color:`white`}}>{user?.message} </Text>
              </View>

              {user?.imageUrl!==null?<View style={{marginTop:15}}>
                <Image source={{uri:user?.imageUrl}} style={{width:'100%',height:250}}/>
              </View>:null}

              <View style={{marginTop:12 }}>
      <TextInput
  label="Reply Message"
  mode="outlined"
  multiline
  numberOfLines={5}
  style={{
    height: 120,
    marginTop: 10,
    textAlignVertical: 'top'
  }}
 onChangeText={(text)=>setMessageReply(text)}
 value={messageReply}
/>

      </View>
      <View style={{ width: '100%', overflow: 'hidden' }}>
<Button
  mode="contained"
  disabled={loading}
  style={{
    height: 50,
    borderRadius: 11,
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 12,
    fontSize: 16,
    marginRight: 20,
    backgroundColor: "#007BFF", // force color
  }}
  contentStyle={{ height: 50 }}
  onPress={submitReplyHandler}
>
  {loading ? (
    <View style={{ flexDirection: "row", alignItems: "center",gap:4 }}>
<ActivityIndicator size="small" color="#ffffff" style={{marginLeft:-12}} />
      <Text style={{ color: "#ffffff",textAlign:'center',fontWeight:'600' }}>sending...</Text>
    </View>
  ) : (
    "Send Message"
  )}
</Button>

      </View>
                </ScrollView>

             </Card.Content>
      </Card>
    </>
)
}
export default ReportLargeCard