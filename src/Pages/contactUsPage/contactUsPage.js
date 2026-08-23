import ContactUs from "../../components/contactUs/contactUs"
import { View } from "react-native";
import CommonHeader from "../../components/common/commonHeader/commonHeader"
const ContactUsPage=({route})=>{
    const { formData } = route?.params;
    const completeLoginObjData=formData?.loginDetails || {}
return (
    <>
      <View style={{backgroundColor:`black`,height:"100%"}}>
      <CommonHeader  commonHeaderName={formData.headerName} completeLoginObj={completeLoginObjData}/>
    <ContactUs completeLoginObj={completeLoginObjData}/>
      </View>
    </>
)
}
export default ContactUsPage