
import axios from "axios";
import { Text, View, Image } from "react-native";
import { Card, Button } from "react-native-paper";
import io from "socket.io-client";
const socket = io.connect("http://192.168.29.169:4000")
const BlockProfile=({blockProfileUser,loginId,completeObj})=>{
  const BASE_URL = "http://192.168.29.169:4000";
    const getProfile = () => blockProfileUser;
    const dob = getProfile()?.DOB;
    const dobBreak = dob?.split("/");
    const year = dobBreak?.[2];
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    const age = year ? currentYear - parseInt(year) : "";
      const unblockProfileHandler=async(unblockProfile)=>{
       console.log('unblock profile',unblockProfile)
       const blockId=unblockProfile?._id
    try {
      const response = await axios.post(`${BASE_URL}/user/deleteBlockIdUser/${loginId}`,{blockId});
      console.log('response in delete block profile',response?.data)
      socket.emit('deleteBlockUser', response?.data)
  } catch (error) {
      console.error('Error sending message in delete block profile:', error);
  }
      }
return (
    <>
    <Card
             
             style={{
               marginLeft: 8,
               marginRight: 8,
               marginTop: 20,
               backgroundColor: `${completeObj?.appearanceMode==='Dark Mode'?'#343434':'white'}`,
             }}
           >
             <Card.Content>
             <View
                 style={{
                   flexDirection: "row",
                   justifyContent: "space-between",
                 }}
               >
                 <View>
                   <Image
                     source={{ uri: blockProfileUser?.images[0] }}
                     style={{ width: 65, height: 65, borderRadius: 70 }}
                   />
                 </View>
                 <View style={{marginTop:7,marginLeft:10}}>
                 <View style={{ paddingTop: 1,flexDirection:'row',gap:7}}>
                   <Text style={{ color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`, fontWeight: "500" }}>
                     {blockProfileUser?.firstName},
                   </Text>
                   <Text  style={{ color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>{age}</Text>
                   </View>
                   <View style={{ paddingTop: 1,flexDirection:'row',gap:7,marginTop:3 }}>
                    <Text style={{ color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>{blockProfileUser?.city}</Text>
                    <Text style={{ color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}} >{blockProfileUser?.education}</Text>
                   </View>
                 </View>
                 <View >
                   <Button
                     mode="contained"
                     style={{
                       width: "100%",
                       borderRadius: 10,
                       marginTop: 9,
                     }}
                     buttonColor="rgba(34, 197, 94, 2)"
                     onPress={() => unblockProfileHandler(blockProfileUser)}
                   >
                  Unblock
                   </Button>
                 </View>
                   </View>
             </Card.Content>
             </Card>
    </>
)
}
export default BlockProfile