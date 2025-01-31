import MyProfile from "../../components/myProfile/myProfile"
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { View } from "react-native";
import { useNavigation } from '@react-navigation/native';
const MyProfilePage=()=>{
  const navigation=useNavigation()
    const [completeObj,setCompleteObj]=useState({})
    const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
    const completeLoginObj = useSelector(
      (state) => state.loginData.loginData.completeLoginData
    );
    const completeLoginObjData=completeLoginObj || completeLoginObjForOtp || {}
    const appearModeSelector=useSelector((state)=>state?.appearMode?.appearModeData?.loginUpdateUser)

    useEffect(()=>{
      if(appearModeSelector){
      setCompleteObj(appearModeSelector)
      }
      else{
          setCompleteObj(completeLoginObjData)
      }
      },[appearModeSelector,completeLoginObjData])
return(
    <>
    <View style={{backgroundColor:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'black':''}`,height:"100%"}}>
    <MyProfile completeObj={completeObj} navigation={navigation}/>
    </View>
    </>
)
}
export default MyProfilePage