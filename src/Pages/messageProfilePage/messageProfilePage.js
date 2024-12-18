import MessageProfile from "../../components/messageProfile/messageProfile"

const MessageProfilePage=({route})=>{
    const { formData } = route?.params;
    console.log('form data in message profile',formData)
return (
    <>
<MessageProfile messageProfile={formData}/>
    </>
)
}
export default MessageProfilePage