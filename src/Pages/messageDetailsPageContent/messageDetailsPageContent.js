import MessageDetailsCard from "../../components/messageDetailsCard/messageDetailsCard"
import { useSelector } from "react-redux";
const MessageDetailsPageContent=({route})=>{
    const { formData } = route?.params;
    // const loginOtpResponse=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.token || '')
return (
    <>
    <MessageDetailsCard messageDetails={formData}/>
    </>
)
}
export default MessageDetailsPageContent