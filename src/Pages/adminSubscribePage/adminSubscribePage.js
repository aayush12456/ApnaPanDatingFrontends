import AdminSubscribe from "../../components/adminSubscribe/adminSubscribe"
import { View } from "react-native"
import CommonHeader from "../../components/common/commonHeader/commonHeader"
const AdminSubscribePage=({route})=>{
    // const accessObj=route.params.formData
    const subscribeObj=route.params.formData
    const headerName=route.params.headerName
return (
    <>
       <View style={{backgroundColor:`black`,height:"100%"}}>
       <CommonHeader  commonHeaderName={headerName} />
    <AdminSubscribe subscribeObj={subscribeObj} />
       </View>
    </>
)
}
export default AdminSubscribePage