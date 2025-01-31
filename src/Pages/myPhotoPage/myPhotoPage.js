import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import MyPhoto from "../../components/myPhoto/myPhoto"
import { useNavigation } from '@react-navigation/native';
import {View} from 'react-native'
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
const MyPhotoPage=({route})=>{
    const { formData } = route.params;
    const navigation = useNavigation();
    const [completeObj,setCompleteObj]=useState({})
    const myPhotoObj={
        name:formData?.name
    }
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
    <AnotherHeader editObj={myPhotoObj} navigation={navigation} completeObj={completeObj}/>
    <MyPhoto  navigation={navigation} photoObj={formData}/>
    </View>
    </>
)
}
export default MyPhotoPage