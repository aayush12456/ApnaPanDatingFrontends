import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import { useNavigation } from '@react-navigation/native';
import EditSongs from "../../components/editSongs/editSongs";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { View } from "react-native";
const EditSongsPage=()=>{
    const navigation = useNavigation();
    const songObj={
        name:'Select Songs'
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
    <AnotherHeader editObj={songObj} navigation={navigation} completeObj={completeObj}/>
      <EditSongs navigation={navigation} completeObj={completeObj}/>
    </View>
    </>
)
}
export default EditSongsPage