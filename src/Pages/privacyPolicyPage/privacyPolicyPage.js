import CommonHeader from "../../components/common/commonHeader/commonHeader"
import PrivacyPolicy from "../../components/privacyPolicy/privacyPolicy"
import { View } from "react-native";
const PrivacyPolicyPage=({route})=>{
    const { formData } = route?.params;
    const completeLoginObjData=formData?.loginDetails || {}
console.log('complete obj',completeLoginObjData)
return (
    <>
        <View style={{backgroundColor:`black`,height:"100%"}}>
        <CommonHeader  commonHeaderName={formData.headerName} completeLoginObj={completeLoginObjData}/>
    <PrivacyPolicy/>
        </View>
    </>
)
}
export default PrivacyPolicyPage