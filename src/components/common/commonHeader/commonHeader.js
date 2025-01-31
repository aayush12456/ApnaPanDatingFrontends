import {Text,View,Image} from 'react-native'
import { Button } from 'react-native-paper';
import back from "../../../../assets/signUpFormIcon/back.png";
import { useNavigation } from "@react-navigation/native";
import {useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
const CommonHeader=({commonHeaderName})=>{
    const navigation = useNavigation();
    const [completeObj,setCompleteObj]=useState({})
    const completeLoginObj = useSelector(
      (state) => state.loginData.loginData.completeLoginData
    );
    const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
    
    const completeLoginObjData=completeLoginObj || completeLoginObjForOtp || {}
    const appearModeSelector=useSelector((state)=>state?.appearMode?.appearModeData?.loginUpdateUser)
    const backHandler=()=>{
     if(commonHeaderName==='Skipped Profiles' || 'Blocked Users' || 'Account Settings' || 'AppearancePage'){
        navigation.navigate('Settings')
     }
    if(commonHeaderName==='Change Password'){

      navigation.navigate('AccountSettingsPage',{formData:{headerName:'Account Settings'}})
    }
    if(commonHeaderName==='Manage Account'){

      navigation.navigate('AccountSettingsPage',{formData:{headerName:'Account Settings'}})
    }
    if(commonHeaderName==='Deactivate Account'){

      navigation.navigate('ManageAccountPage',{formData:{headerName:'Manage Account'}})
    }
    if(commonHeaderName==='Delete Account'){

      navigation.navigate('ManageAccountPage',{formData:{headerName:'Manage Account'}})
    }
    }
    useEffect(()=>{
      if(appearModeSelector){
      setCompleteObj(appearModeSelector)
      }
      else{
          setCompleteObj(completeLoginObjData)
      }
      },[appearModeSelector,completeLoginObjData])
return (
    <>
      <View
          style={{
            flexDirection:'row',
            backgroundColor: `${completeObj?.appearanceMode==='Dark Mode'?'#343434':'white'}` ,
            marginTop: 40,
            gap:60
          }}
        >
             <View style={{ marginTop: 5,marginBottom:5 }}>
            <Button onPress={backHandler}>
              <Image source={back} style={{ width: 15, height: 15,tintColor:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}` }} />
            </Button>
          </View>
          <View>
            <Text style={{textAlign:'center',paddingLeft:5,paddingTop:9, fontSize: 17, fontWeight: '600',color:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`,paddingBottom:5}}>{commonHeaderName}</Text>
          </View>
        </View>
    </>
)
}
export default CommonHeader