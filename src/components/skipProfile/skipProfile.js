import { Text, View, Image } from "react-native";
import { Card, Button } from "react-native-paper";
import { useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import { passSkipProfileSliceActions } from "../../Redux/Slice/passSkipProfileSlice/passSkipProfileSlice";
const SkipProfile=({skipProfileUser,loginId})=>{
    const dispatch=useDispatch()
    console.log('skip profile user',skipProfileUser)
    // const [loginId,setLoginId]=useState('')
    const getProfile = () => skipProfileUser;
    const dob = getProfile()?.DOB;
    const dobBreak = dob?.split("/");
    const year = dobBreak?.[2];
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    const age = year ? currentYear - parseInt(year) : "";
  //   const loginResponse=useSelector((state)=>state.loginData.loginData.token)
  //   useEffect(()=>{
  //     if(loginResponse){
  //       const getLoginId = async () => {
  //         const loginIdData = await SecureStore.getItemAsync('loginId');
  //         setLoginId(loginIdData)
  //       };
  //       getLoginId()
  //     }
  // },[loginResponse])

    const resetSkipProfileHandler=async(resetProfile)=>{
  console.log('reset profile',resetProfile)
  const deleteUserId=resetProfile._id
  dispatch(passSkipProfileSliceActions.passSkipProfile(deleteUserId))
  try {
    const response = await axios.delete(`http://192.168.29.169:4000/user/deleteSkipProfile/${loginId}`,{params:{deleteUserId}});
    console.log('response in delete skip profile',response?.data)
    // socket.emit('addVisitorUser', response?.data?.visitors)
} catch (error) {
    console.error('Error sending message in delete skip profile:', error);
}

    }
return (
    <>
       <Card
             
              style={{
                marginLeft: 8,
                marginRight: 8,
                marginTop: 20,
                backgroundColor: "white",
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
                      source={{ uri: skipProfileUser?.images[0] }}
                      style={{ width: 65, height: 65, borderRadius: 70 }}
                    />
                  </View>
                  <View style={{marginTop:7,marginLeft:10}}>
                  <View style={{ paddingTop: 1,flexDirection:'row',gap:7}}>
                    <Text style={{ color: "black", fontWeight: "500" }}>
                      {skipProfileUser?.firstName},
                    </Text>
                    <Text>{age}</Text>
                    </View>
                    <View style={{ paddingTop: 1,flexDirection:'row',gap:7,marginTop:3 }}>
                     <Text >{skipProfileUser?.city}</Text>
                     <Text >{skipProfileUser?.education}</Text>
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
                      onPress={() => resetSkipProfileHandler(skipProfileUser)}
                    >
                   Reset
                    </Button>
                  </View>
                    </View>
              </Card.Content>
              </Card>
    </>
)
}
export default SkipProfile