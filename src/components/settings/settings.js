import { Text } from "react-native-paper"
import {View,Image, Pressable} from 'react-native'
import rightArrow from '../../../assets/settingIcons/rightArrow.png'
import { useNavigation } from "@react-navigation/native"
// rgba(117, 117, 117, 0.7)
const Settings=()=>{
    const navigation = useNavigation();
    const skippedProfileHandler=()=>{
        const skipProfileObj={
            headerName:'Skipped Profiles'
        }
        console.log('skip profile')
        navigation.navigate('SkipProfilePage', {formData:skipProfileObj});
    }
    const blockProfileHandler=()=>{
        const blockProfileObj={
            headerName:'Blocked Users'
        }
        navigation.navigate('BlockProfilePage', {formData:blockProfileObj});
    }
    const accounSettingsHandler=()=>{
        const accountSettingsObj={
            headerName:'Account Settings'
        }
        navigation.navigate('AccountSettingsPage', {formData:accountSettingsObj});
    }
return (
    <>
    <View style={{marginTop:30}}>
    <Text style={{paddingLeft:20}}>Skipped / Blocked profiles</Text>
    <Pressable onPress={skippedProfileHandler}>
    <View style={{backgroundColor: '#dcdcdc',width:'90%',marginLeft:20,marginTop:7}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10}}>Skipped Profiles</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10 }}/>
     </View>
    </View>
    </Pressable>
    <Pressable onPress={blockProfileHandler}>
    <View style={{backgroundColor: '#dcdcdc',width:'90%',marginLeft:20}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10}}>Blocked Users</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10 }}/>
     </View>
    </View>
    </Pressable>
    <View style={{marginTop:20}}>
    <Text style={{paddingLeft:20}}>Account</Text>
    <Pressable onPress={accounSettingsHandler}>
    <View style={{backgroundColor: '#dcdcdc',width:'90%',marginLeft:20,marginTop:7}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10}}>Account Settings</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10 }}/>
     </View>
    </View>
    </Pressable>
    </View>
    
    </View>
    </>
)
}
export default Settings