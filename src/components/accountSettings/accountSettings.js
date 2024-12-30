import { Text } from "react-native-paper"
import {View,Image, Pressable} from 'react-native'
import {useSelector} from 'react-redux'
import rightArrow from '../../../assets/settingIcons/rightArrow.png'
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native"
import { useEffect,useState } from "react";
import axios from 'axios'
const AccountSettings=()=>{
    const navigation = useNavigation();
    const [loginId, setLoginId] = useState('')
    const completeLoginObj = useSelector(
        (state) => state?.loginData?.loginData?.completeLoginData
      );
      const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
      const completeLoginObjData=completeLoginObj?completeLoginObj:completeLoginObjForOtp
    
      const loginResponse = useSelector((state) => state.loginData.loginData.token)
      const loginOtpResponse=useSelector((state)=>state?.finalLoginWithOtpData?.finalLoginWithOtpData?.token || '') 

      useEffect(() => {
        if (loginResponse || loginOtpResponse) {
          const getLoginId = async () => {
            const loginIdData = await SecureStore.getItemAsync('loginId');
            setLoginId(loginIdData)
          };
          getLoginId()
        }
      }, [loginResponse,loginOtpResponse])

      const logoutHandler=async()=>{
        try {
          if(!loginId){
            console.error('loginId is not set');
            return;
          }
          const response = await axios.post(
            `http://192.168.29.169:4000/user/deleteLoginIdUser`,
             {loginId} 
        );
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

      const manageAccountHandler=()=>{
        const manageAccountObj={
            headerName:'Manage Account'
        }
        navigation.navigate('ManageAccountPage', { formData:manageAccountObj });
      }
return (
    <>
    <View style={{marginTop:30}}>
    <Text style={{paddingLeft:20}}>My Account Details</Text>
        <View style={{backgroundColor: '#dcdcdc',width:'90%',marginLeft:20,marginTop:7}}>
        <View style={{flexDirection:'row',gap:40}}>
            <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10}}>Email:</Text>
            <Text  style={{paddingTop:10,paddingBottom:12}}>{completeLoginObjData?.email}</Text>
        </View>
        </View>
        <View style={{backgroundColor: '#dcdcdc',width:'90%',marginLeft:20}}>
        <View style={{flexDirection:'row',gap:40}}>
            <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10}}>Mobile:</Text>
            <Text style={{paddingTop:10,paddingBottom:12}}>{completeLoginObjData?.phone}</Text>
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
       <Pressable onPress={manageAccountHandler}>
       <View style={{backgroundColor: '#dcdcdc',width:'90%',marginLeft:20}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10}}>Manage Account</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10 }}/>
     </View>
    </View>
       </Pressable>
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