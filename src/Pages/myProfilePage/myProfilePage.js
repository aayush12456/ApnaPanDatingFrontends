import MyProfile from "../../components/myProfile/myProfile"
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { View } from "react-native";
import { useNavigation } from '@react-navigation/native';
const MyProfilePage=({loginId,loginObj})=>{
  const navigation=useNavigation()
   
return(
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <MyProfile loginObj={loginObj} navigation={navigation}/>
    </View>
    </>
)
}
export default MyProfilePage