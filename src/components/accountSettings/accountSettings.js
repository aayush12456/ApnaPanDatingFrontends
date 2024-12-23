import { Text } from "react-native-paper"
import {View,Image, Pressable} from 'react-native'
import {useSelector} from 'react-redux'
import rightArrow from '../../../assets/settingIcons/rightArrow.png'
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native"
const AccountSettings=()=>{
    const navigation = useNavigation();
    const completeLoginObj = useSelector(
        (state) => state?.loginData?.loginData?.completeLoginData
      );
      const logoutHandler=async()=>{
        try {
            await SecureStore.deleteItemAsync('loginObj')
            await SecureStore.deleteItemAsync('loginToken')
            console.log('User logged out and login data removed from AsyncStorage');
            navigation.navigate('FrontPage');
          } catch (error) {
            console.error('Error removing login data:', error);
          }
      }
      const changePasswordHandler=()=>{
        const changePasswordObj={
            headerName:'Change Password'
        }
        navigation.navigate('ChangePasswordPage', { formData:changePasswordObj });
      }
return (
    <>
    <View style={{marginTop:30}}>
    <Text style={{paddingLeft:20}}>My Account Details</Text>
        <View style={{backgroundColor: '#dcdcdc',width:'90%',marginLeft:20,marginTop:7}}>
        <View style={{flexDirection:'row',gap:40}}>
            <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10}}>Email:</Text>
            <Text  style={{paddingTop:10,paddingBottom:12}}>{completeLoginObj?.email}</Text>
        </View>
        </View>
        <View style={{backgroundColor: '#dcdcdc',width:'90%',marginLeft:20}}>
        <View style={{flexDirection:'row',gap:40}}>
            <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10}}>Mobile:</Text>
            <Text style={{paddingTop:10,paddingBottom:12}}>{completeLoginObj?.phone}</Text>
        </View>
        </View>

        <View  style={{marginTop:20}}>
        <Text style={{paddingLeft:20}}>Account</Text>
       <Pressable onPress={changePasswordHandler}>
       <View style={{backgroundColor: '#dcdcdc',width:'90%',marginLeft:20,marginTop:7}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10}}>Change Password</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10 }}/>
     </View>
    </View>
       </Pressable>
    <View style={{backgroundColor: '#dcdcdc',width:'90%',marginLeft:20}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10}}>Manage Account</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10 }}/>
     </View>
    </View>
<Pressable onPress={logoutHandler}>
<View style={{backgroundColor: '#dcdcdc',width:'90%',marginLeft:20}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10}}>Logout</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10 }}/>
     </View>
    </View>
</Pressable>
        </View>
    </View>
    </>
)
}
export default AccountSettings