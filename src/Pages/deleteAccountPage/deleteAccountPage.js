import CommonHeader from "../../components/common/commonHeader/commonHeader"
import DeleteAccount from "../../components/deleteAccount/deleteAccount"


import { View } from "react-native";
const DeleteAccountPage=({route})=>{
    const { formData } = route?.params;
    const completeLoginObjData=formData.loginDetails || {}
const loginId=completeLoginObjData?.userId

return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <CommonHeader commonHeaderName={formData.headerName} completeObj={completeLoginObjData}/>
    <DeleteAccount loginId={loginId} completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default DeleteAccountPage