import AccountSettings from "../../components/accountSettings/accountSettings"
import CommonHeader from "../../components/common/commonHeader/commonHeader";

import {View} from 'react-native'
const AccountSettingsPage=({route})=>{

    const { formData } = route?.params;
    const completeLoginObjData=formData?.loginDetails || {}


   

return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <CommonHeader  commonHeaderName={formData.headerName} completeLoginObj={completeLoginObjData}/>
    <AccountSettings completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default AccountSettingsPage