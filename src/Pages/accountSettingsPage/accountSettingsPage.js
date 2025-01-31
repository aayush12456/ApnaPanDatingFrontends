import AccountSettings from "../../components/accountSettings/accountSettings"
import CommonHeader from "../../components/common/commonHeader/commonHeader";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import {View} from 'react-native'
const AccountSettingsPage=({route})=>{
    const [completeObj,setCompleteObj]=useState({})
    const { formData } = route?.params;
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
    <CommonHeader  commonHeaderName={formData.headerName}/>
    <AccountSettings completeObj={completeObj}/>
    </View>
    </>
)
}
export default AccountSettingsPage