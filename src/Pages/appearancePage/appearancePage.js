import Appearance from "../../components/appearance/appearance"
import CommonHeader from "../../components/common/commonHeader/commonHeader";
import {useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
import {View} from 'react-native'
const AppearancePage=({route})=>{
    const { formData } = route?.params;
    const [completeObj,setCompleteObj]=useState({})
   
    
    const completeLoginObjData=formData?.loginDetails  || {}
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
    <CommonHeader  commonHeaderName={formData.headerName} completeLoginObj={completeObj}/>
    <Appearance completeLoginObj={completeObj}/>
    </View>
    </>
)
}
export default AppearancePage