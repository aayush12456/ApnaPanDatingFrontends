import Likes from "../../components/likes/likes"
import {View} from 'react-native'
const LikesPage=({loginId,finalCompleteObj})=>{

   
    const completeLoginObjData=finalCompleteObj|| {}
    console.log('login id like',loginId)

return (
    <>
    <View  style={{backgroundColor:`black`,height:"100%"}}>
    <Likes completeObj={completeLoginObjData} loginId={loginId}/>
    </View>
    </>
)
}
export default LikesPage