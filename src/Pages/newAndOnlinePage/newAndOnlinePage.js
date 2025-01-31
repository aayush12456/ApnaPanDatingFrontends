import NewAndOnline from "../../components/newAndOnline/newAndOnline"
import {View} from 'react-native'
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
const NewAndOnlinePage=({route})=>{
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
    <NewAndOnline route={route} completeObj={completeObj}/>
    </View>
    </>
)
}
export default NewAndOnlinePage