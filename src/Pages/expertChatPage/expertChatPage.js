import ExpertChat from "../../components/expertChat/expertChat"

const ExpertChatPage=({route})=>{
    const { formData } = route?.params;
return (
    <>
    <ExpertChat obj={formData}/>
    </>
)
}
export default ExpertChatPage