import AboutUs from "../../components/aboutUs/aboutUs"
import CommonHeader from "../../components/common/commonHeader/commonHeader";
import { View } from "react-native";
const AboutUsPage=({route})=>{
    const { formData } = route?.params;
    const completeLoginObjData=formData?.loginDetails || {}
return (
    <>
      <View style={{backgroundColor:`black`,height:"100%"}}>
      <CommonHeader  commonHeaderName={formData.headerName} completeLoginObj={completeLoginObjData}/>
    <AboutUs/>
      </View>
    </>
)
}
export default AboutUsPage