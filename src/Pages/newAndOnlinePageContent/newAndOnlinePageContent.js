import LargeCard from "../../components/common/largeCard/largeCard"
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { View } from "react-native";
const NewAndOnlinePageContent=({route})=>{
    const { formData } = route?.params;
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
    <LargeCard newAndOnlineContent={formData} completeObj={completeObj}/>
    </View>
    </>
)
}
export default NewAndOnlinePageContent