
import {Image,View,Text,TouchableOpacity} from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import edit from '../../../assets/myProfileIcons/edit.png'
const MyProfile=({navigation})=>{
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
      console.log('edit me nakkrhspkdp')
        }
return (
    <>
 
    <View style={{flexDirection:"row",justifyContent:'center',marginTop:"20%"}}>
    <View>
    <TouchableOpacity onPress={editProfileHandler}>
    <Image  source={{ uri: loginData?.image }}  style={{ width:150, height:150,borderRadius:70 }}/>
    </TouchableOpacity>
    </View>
    <View style={{borderRadius:50,backgroundColor:'white',width:40,height:40,marginTop:100,marginLeft:-40}}>
        <Image source={edit} style={{marginLeft:8,marginRight:2,marginTop:7}} />
    </View>
    </View>
    <View>
        <Text style={{textAlign:'center',paddingTop:20}}>Welcome to your Profile  {loginData?.name} </Text>
    </View>
    </>
)
}
export default MyProfile