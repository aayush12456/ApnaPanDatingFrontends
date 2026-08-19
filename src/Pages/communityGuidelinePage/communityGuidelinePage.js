import CommonHeader from "../../components/common/commonHeader/commonHeader";
import CommunityGuideline from "../../components/communityGuideline/communityGuideline"
import { View } from "react-native";
const CommunityGuidelinePage=({route})=>{
    const { formData } = route?.params;
    const completeLoginObjData=formData?.loginDetails || {}
return (
    <>
            <View style={{backgroundColor:`black`,height:"100%"}}>
        <CommonHeader  commonHeaderName={formData.headerName} completeLoginObj={completeLoginObjData}/>
    <CommunityGuideline/>
    </View>
    </>
)
}
export default CommunityGuidelinePage