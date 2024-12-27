import CommonHeader from "../../components/common/commonHeader/commonHeader"
import DeleteAccount from "../../components/deleteAccount/deleteAccount"

const DeleteAccountPage=({route})=>{
    const { formData } = route?.params;
return (
    <>
        <CommonHeader commonHeaderName={formData.headerName}/>
    <DeleteAccount/>
    </>
)
}
export default DeleteAccountPage