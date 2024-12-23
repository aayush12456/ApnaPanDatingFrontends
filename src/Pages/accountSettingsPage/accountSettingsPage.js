import AccountSettings from "../../components/accountSettings/accountSettings"
import CommonHeader from "../../components/common/commonHeader/commonHeader";

const AccountSettingsPage=({route})=>{
    const { formData } = route?.params;
return (
    <>
    <CommonHeader  commonHeaderName={formData.headerName}/>
    <AccountSettings/>
    </>
)
}
export default AccountSettingsPage