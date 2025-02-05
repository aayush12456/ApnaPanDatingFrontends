import { Text } from "react-native-paper"
import {View,Image, Pressable} from 'react-native'
import rightArrow from '../../../assets/settingIcons/rightArrow.png'
import { useNavigation } from "@react-navigation/native"

const Settings=({completeObj})=>{
    const navigation = useNavigation();
    
    const skippedProfileHandler=()=>{
        const skipProfileObj={
            headerName:'Skipped Profiles'
        }
        // console.log('skip profile')
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
    const appearanceHandler=()=>{
        const appearanceObj={
            headerName:'Dark Mode'
        }
        navigation.navigate('AppearancePage', {formData:appearanceObj});
    }
return (
    <>
    <View style={{marginTop:30}}>
    <Text style={{paddingLeft:20,color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>Skipped / Blocked profiles</Text>
    <Pressable onPress={skippedProfileHandler}>
    <View style={{backgroundColor:`${completeObj?.appearanceMode==='Dark Mode'?'#343434':'#dcdcdc'}`,
    width:'90%',marginLeft:20,marginTop:7}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10,
        color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>Skipped Profiles</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10,
        tintColor:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}` }}/>
     </View>
    </View>
    </Pressable>
    <Pressable onPress={blockProfileHandler}>
    <View style={{backgroundColor:`${completeObj?.appearanceMode==='Dark Mode'?'#343434':'#dcdcdc'}`,width:'90%',marginLeft:20}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10,
        color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>Blocked Users</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10,
         tintColor:`${completeObj && completeObj?.appearanceMode==='Dark Mode'?'white':'black'}` }}/>
     </View>
    </View>
    </Pressable>
    <View style={{marginTop:20}}>
    <Text style={{paddingLeft:20,color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>Account</Text>
    <Pressable onPress={accounSettingsHandler}>
    <View style={{backgroundColor:`${completeObj?.appearanceMode==='Dark Mode'?'#343434':'#dcdcdc'}`
    ,width:'90%',marginLeft:20,marginTop:7}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10,
        color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>Account Settings</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10,
         tintColor:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`}}/>
     </View>
    </View>
    </Pressable>
    </View>
    
    <View style={{marginTop:20}}>
    <Text style={{paddingLeft:20,color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>Appearance</Text>
    <Pressable onPress={appearanceHandler}>
    <View style={{backgroundColor:`${completeObj?.appearanceMode==='Dark Mode'?'#343434':'#dcdcdc'}`
    ,width:'90%',marginLeft:20,marginTop:7}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10,
        color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>Dark Mode</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10,
         tintColor:`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}` }}/>
     </View>
    </View>
    </Pressable>
    </View>
    </View>
    </>
)
}
export default Settings