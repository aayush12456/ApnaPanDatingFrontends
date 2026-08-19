import CommonHeader from "../../components/common/commonHeader/commonHeader";
import TermsCondition from "../../components/termsCondition/termsCondition"
import { View } from "react-native";
const TermsConditionPage=({route})=>{
    const { formData } = route?.params;
    const completeLoginObjData=formData?.loginDetails || {}
return (
    <>
      <View style={{backgroundColor:`black`,height:"100%"}}>
        <CommonHeader  commonHeaderName={formData.headerName} completeLoginObj={completeLoginObjData}/>
    <TermsCondition/>
    </View>
    </>
)
}
export default TermsConditionPage