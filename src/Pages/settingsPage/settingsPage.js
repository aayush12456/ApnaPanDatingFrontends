import Settings from "../../components/settings/settings"
import {View} from 'react-native'

const SettingsPage=({finalCompleteObj,notify})=>{


   
    const completeLoginObjData=finalCompleteObj|| {}
  console.log('complet login data',completeLoginObjData)

    
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <Settings completeObj={completeLoginObjData} notifyToken={notify}/>
    </View>
    </>
)
}
export default SettingsPage