import { useNavigation } from '@react-navigation/native';
import AnotherHeader from '../../components/anotherHeader/anotherHeader';
import EditLookingFor from '../../components/editLookingFor/editLookingFor';
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { View } from "react-native";
const EditLookingForPage=()=>{
    const navigation = useNavigation();
    const lookingForObj={
        name:'Select Looking For'
    }
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
return (
    <>
    <View style={{backgroundColor:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'black':''}`,height:"100%"}}>
    <AnotherHeader editObj={lookingForObj} navigation={navigation} completeObj={completeObj}/>
    <EditLookingFor  navigation={navigation} completeObj={completeObj}/>
    </View>
    </>
)
}
export default EditLookingForPage