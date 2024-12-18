import MessageDetailsCard from "../../components/messageDetailsCard/messageDetailsCard"

const MessageDetailsPageContent=({route})=>{
    const { formData } = route?.params;
return (
    <>
    <MessageDetailsCard messageDetails={formData}/>
    </>
)
}
export default MessageDetailsPageContent