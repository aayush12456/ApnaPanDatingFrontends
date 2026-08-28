import CommonHeader from "../../components/common/commonHeader/commonHeader"
import ReplyMail from "../../components/common/replyMail/replyMail"
import { View } from "react-native"
const ReplyMailPage=({route})=>{
    console.log('routes d',route)
    const replyObj=route.params.formData
    const headerName=route.params.headerName
return (
    <>
          <View style={{backgroundColor:`black`,height:"100%"}}>
          <CommonHeader  commonHeaderName={headerName} completeLoginObj={replyObj}/>
    <ReplyMail replyObj={replyObj}/>
          </View>
    </>
)
}
export default ReplyMailPage