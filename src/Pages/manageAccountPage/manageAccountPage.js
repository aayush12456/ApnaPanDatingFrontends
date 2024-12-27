import { AlertNotificationRoot } from "react-native-alert-notification";
import CommonHeader from "../../components/common/commonHeader/commonHeader"
import ManageAccount from "../../components/manageAccount/manageAccount"

const MannageAccountPage=({route})=>{
    const { formData } = route?.params;
return (
    <>
     <CommonHeader commonHeaderName={formData.headerName}/>
     <AlertNotificationRoot>
     <ManageAccount/>
     </AlertNotificationRoot>
    </>
)
}
export default MannageAccountPage