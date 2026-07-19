import Settings from "../../components/settings/settings"
import {View} from 'react-native'

const SettingsPage=({route,finalCompleteObj})=>{
  const {formData}=route.params||      finalCompleteObj

   
    const completeLoginObjData=formData|| {}
  

    
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <Settings completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default SettingsPage