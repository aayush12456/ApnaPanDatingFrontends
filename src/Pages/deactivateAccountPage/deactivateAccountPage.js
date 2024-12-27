import CommonHeader from "../../components/common/commonHeader/commonHeader";
import DeactivateAccount from "../../components/deactivateAccount/deactivateAccount"

const DeactivateAccountPage=({route})=>{
    const { formData } = route?.params;
return (
    <>
    <CommonHeader commonHeaderName={formData.headerName}/>
    <DeactivateAccount/>
    </>
)
}
export default DeactivateAccountPage