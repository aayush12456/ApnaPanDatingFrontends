import { Text } from "react-native-paper"
import {View,Image, Pressable} from 'react-native'
import rightArrow from '../../../assets/settingIcons/rightArrow.png'
import { useNavigation } from "@react-navigation/native"

const Settings=({completeObj,notifyToken})=>{
    const navigation = useNavigation();
    console.log('setting commplete',completeObj)
    const skippedProfileHandler=()=>{
        const skipProfileObj={
            headerName:'Skipped Profiles',
            loginDetails:completeObj
        }
        // console.log('skip profile')
        navigation.navigate('SkipProfilePage', {formData:skipProfileObj});
    }
    const blockProfileHandler=()=>{
        const blockProfileObj={
            headerName:'Blocked Users',
            loginDetails:completeObj
        }
        navigation.navigate('BlockProfilePage', {formData:blockProfileObj});
    }
    const accounSettingsHandler=()=>{
        const accountSettingsObj={
            headerName:'Account Settings',
            loginDetails:completeObj,
            token:notifyToken
        }
        navigation.navigate('AccountSettingsPage', {formData:accountSettingsObj});
    }
  
    const privacyPolicyHandler=()=>{
        const privacyPolicyObj={
            headerName:'Privacy Policy',
            loginDetails:completeObj,
        }
        navigation.navigate('PrivacyPolicyPage', {formData:privacyPolicyObj});
    }
    const communityGuidelinesHandler=()=>{
        const communityGuidelineObj={
            headerName:'Community Guidelines',
            loginDetails:completeObj,
        }
        navigation.navigate('CommunityGuidelinePage', {formData:communityGuidelineObj});
    }

    const TermsConditionHandler=()=>{
        const TermsConditionObj={
            headerName:'Terms & Conditions',
            loginDetails:completeObj,
        }
        navigation.navigate('TermsConditionPage', {formData:TermsConditionObj});
    }
    const aboutUsHandler=()=>{
        const aboutUsObj={
            headerName:'About Us',
            loginDetails:completeObj,
        }
        navigation.navigate('AboutUsPage', {formData:aboutUsObj});
    }
return (
    <>
    <View style={{marginTop:30}}>
    <Text style={{paddingLeft:20,color:`white`}}>Skipped / Blocked profiles</Text>
    <Pressable onPress={skippedProfileHandler}>
    <View style={{backgroundColor:`#343434`,
    width:'90%',marginLeft:20,marginTop:7}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10,
        color:`white`}}>Skipped Profiles</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10,
        tintColor:`white` }}/>
     </View>
    </View>
    </Pressable>
    <Pressable onPress={blockProfileHandler}>
    <View style={{backgroundColor:`#343434`,width:'90%',marginLeft:20}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10,
        color:`white`}}>Blocked Users</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10,
         tintColor:`white` }}/>
     </View>
    </View>
    </Pressable>
    </View>

    <View style={{marginTop:20}}>
    <Text style={{paddingLeft:20,color:`white`}}>Account</Text>
    <Pressable onPress={accounSettingsHandler}>
    <View style={{backgroundColor:`#343434`
    ,width:'90%',marginLeft:20,marginTop:7}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10,
        color:`white`}}>Account Settings</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10,
         tintColor:`white`}}/>
     </View>
    </View>
    </Pressable>
    </View>
    
    <View style={{marginTop:20}}>
    <Text style={{paddingLeft:20,color:`white`}}>Legal</Text>


    <Pressable onPress={privacyPolicyHandler}>
    <View style={{backgroundColor:`#343434`,
    width:'90%',marginLeft:20,marginTop:7}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10,
        color:`white`}}>Privacy Policy</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10,
        tintColor:`white` }}/>
     </View>
    </View>
    </Pressable>
    <Pressable onPress={TermsConditionHandler}>
    <View style={{backgroundColor:`#343434`,width:'90%',marginLeft:20}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10,
        color:`white`}}>Terms & Conditions</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10,
         tintColor:`white` }}/>
     </View>
    </View>
    </Pressable>
    <Pressable onPress={communityGuidelinesHandler}>
    <View style={{backgroundColor:`#343434`,width:'90%',marginLeft:20}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10,
        color:`white`}}>Community Guidelines</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10,
         tintColor:`white` }}/>
     </View>
    </View>
    </Pressable>
    </View>

    <View style={{marginTop:20}}>
    <Text style={{paddingLeft:20,color:`white`}}>Support</Text>
    <Pressable onPress={skippedProfileHandler}>
    <View style={{backgroundColor:`#343434`,
    width:'90%',marginLeft:20,marginTop:7}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10,
        color:`white`}}>Contact Us</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10,
        tintColor:`white` }}/>
     </View>
    </View>
    </Pressable>
    <Pressable onPress={aboutUsHandler}>
    <View style={{backgroundColor:`#343434`,width:'90%',marginLeft:20}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10,
        color:`white`}}>About Us</Text>
        <Image source={rightArrow} style={{ width:15, height:12,marginTop:14,marginRight:10,
         tintColor:`white` }}/>
     </View>
    </View>
    </Pressable>
    </View>
    </>
)
}
export default Settings