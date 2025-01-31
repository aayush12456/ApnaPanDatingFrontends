
import {Image,View,Text,Pressable} from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import edit from '../../../assets/myProfileIcons/edit.png'
import verify from '../../../assets/matchIcons/verify.png'
const MyProfile=({navigation,completeObj})=>{
    const [loginData, setLoginData] = useState(null);
    useEffect(()=>{
        const getLoginData = async () => {
            const data = await SecureStore.getItemAsync('loginObj');
            setLoginData(JSON.parse(data))
          };
          getLoginData()
    },[])
        console.log('data of login in my porifle',loginData)
        
        const editProfileHandler=()=>{
      navigation.navigate('EditProfilePage')
        }
        const getProfile = () =>loginData
        const dob = getProfile()?.dob;
      const dobBreak = dob?.split("/");
      const year = dobBreak?.[2];
      let currentDate = new Date();
      let currentYear = currentDate.getFullYear();
      const age = year ? currentYear - parseInt(year) : "";
return (
    <>
 
    <View style={{flexDirection:"row",justifyContent:'center',marginTop:"20%"}}>
    <View>
    <Pressable onPress={editProfileHandler}>
    <Image  source={{ uri: loginData?.image }}  style={{ width:150, height:150,borderRadius:70 }}/>
    </Pressable>
    </View>
    <View style={{borderRadius:50,backgroundColor:'white',width:40,height:40,marginTop:100,marginLeft:-40}}>
        <Image source={edit} style={{marginLeft:8,marginRight:2,marginTop:7}} />
    </View>
    </View>
    <View style={{flexDirection:'row',justifyContent:'center',gap:5}}>
        <Text style={{textAlign:'center',paddingTop:20,
        color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`,fontSize:21,fontWeight:'700'}}>{loginData?.name}, {age} </Text>
        {/* <View style={{backgroundColor:'#0271fe',width:25,height:25,borderRadius:20,marginTop:22}}>
         <Image source={rightTik} style={{width:12,height:12,marginTop:7,marginLeft:6}}/>
        </View> */}
        <Image source={verify} style={{width:25,height:25,marginTop:22,marginLeft:3}}/>
    </View>
    </>
)
}
export default MyProfile