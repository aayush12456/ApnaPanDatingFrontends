import { Text } from "react-native-paper"
import {View,Image, Pressable} from 'react-native'
import rightArrow from '../../../assets/settingIcons/rightArrow.png'
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native"
import axios from 'axios'
const AccountSettings=({completeObj,notifyToken})=>{
  console.log('complete obj account',completeObj)
  const BASE_URL = "http://192.168.29.169:4000";
  // const BASE_URL = "https://apnapandatingbackend.onrender.com";
    const navigation = useNavigation();
 
    
      const completeLoginObjData=completeObj
    
const loginId=completeLoginObjData.userId
console.log('login id setting',loginId)
   
const removeLoginData = async () => {
  try {
    await SecureStore.deleteItemAsync("loginObj");
  } catch (error) {
    console.error("Error removing login obj:", error);
  }
};

const logoutHandler = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/deleteNotifyUser/${loginId}`,
      {
        token: notifyToken,
      }
    );

    socket.emit("deleteNotifyId", response.data);
  } catch (error) {
    console.log("Error deleting notify token:", error);
  }

  await removeLoginData();
  navigation.navigate("FrontPage");
};


      const manageAccountHandler=()=>{
        const manageAccountObj={
            headerName:'Manage Account',
            loginDetails:completeLoginObjData
        }
        navigation.navigate('ManageAccountPage', { formData:manageAccountObj });
      }
return (
    <>
    <View style={{marginTop:30}}>
    <Text style={{paddingLeft:20,color:`white`}}>My Account Details</Text>
        <View style={{backgroundColor: `#343434`,width:'90%',marginLeft:20,marginTop:7}}>
        <View style={{flexDirection:'row',gap:40}}>
            <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10,
            color: `white`}}>Email:</Text>
            <Text  style={{paddingTop:10,paddingBottom:12,
               color: `white`}}>{completeObj?.email}</Text>
        </View>
        </View>
        <View style={{backgroundColor:  `#343434`,width:'90%',marginLeft:20}}>
        <View style={{flexDirection:'row',gap:40}}>
            <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10, 
              color: `white`}}>Mobile:</Text>
            <Text style={{paddingTop:10,paddingBottom:12,
             color: `white`}}>{completeLoginObjData?.phone}</Text>
        </View>
        </View>

        <View  style={{marginTop:20}}>
       <Pressable onPress={manageAccountHandler}>
       <View style={{backgroundColor:  `#343434`,width:'90%',marginLeft:20}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10,
         color: `white`}}>Manage Account</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10
        , tintColor:`white` }}/>
     </View>
    </View>
       </Pressable>
<Pressable onPress={logoutHandler}>
<View style={{backgroundColor:  `#343434`,width:'90%',marginLeft:20}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10,
         color: `white`}}>Logout</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10,
         tintColor:`white` }}/>
     </View>
    </View>
</Pressable>
        </View>
    </View>
    </>
)
}
export default AccountSettings