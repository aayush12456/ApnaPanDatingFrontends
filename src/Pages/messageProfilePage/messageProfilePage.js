import MessageProfile from "../../components/messageProfile/messageProfile"
import {View} from 'react-native'
const MessageProfilePage=({route})=>{
    const { formData,completeObj } = route?.params;
    // console.log('form data in message profile',formData)

  
    const completeLoginObjData=completeObj || {}
   
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
<MessageProfile messageProfile={formData} completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default MessageProfilePage