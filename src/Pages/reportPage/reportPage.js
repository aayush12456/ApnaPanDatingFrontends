import CommonHeader from "../../components/common/commonHeader/commonHeader";
import Report from "../../components/report/report"
import { View } from "react-native";
const ReportPage=({route})=>{
    const reportObj=route?.params.formData
    // console.log('props report page',reportObj)
return (
    <>
      <View style={{backgroundColor:`black`,height:"100%"}}>
      <CommonHeader  commonHeaderName={reportObj.headerName} />
    <Report reportObj={reportObj}/>
      </View>
    </>
)
}
export default ReportPage