import { AlertNotificationRoot } from "react-native-alert-notification";
import CommonHeader from "../../components/common/commonHeader/commonHeader"
import ManageAccount from "../../components/manageAccount/manageAccount"
import {View} from 'react-native'
const MannageAccountPage=({route})=>{
    const { formData } = route?.params;
    
   
    const completeLoginObjData=formData?.loginDetails|| {}
   

    
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <CommonHeader commonHeaderName={formData.headerName} completeLoginObj={completeLoginObjData}/>
     <AlertNotificationRoot>
     <ManageAccount completeObj={completeLoginObjData}/>
     </AlertNotificationRoot>
    </View>
    </>
)
}
export default MannageAccountPage