import Message from "../../components/message/message"
import {View} from 'react-native'
const MessagePage=({loginId,finalCompleteObj,onlineUserArray,route})=>{
    const completeLoginObjData=finalCompleteObj || {}
  
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}> 
    <Message completeObj={completeLoginObjData} loginId={loginId} onlineUserArray={onlineUserArray}/>
    </View>
    </>
)
}
export default MessagePage