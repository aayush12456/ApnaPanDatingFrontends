import ChangePassword from "../../components/changePassword/changePassword"
import CommonHeader from "../../components/common/commonHeader/commonHeader"

const ChangePasswordPage=({route})=>{
    const { formData } = route?.params;
return (
    <>
    <CommonHeader  commonHeaderName={formData.headerName}/>
    <ChangePassword/>
    </>
)
}
export default ChangePasswordPage