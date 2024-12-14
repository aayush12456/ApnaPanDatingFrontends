import LargeCard from "../../components/common/largeCard/largeCard"

const VisitorPageContent=({route})=>{
    const { formData } = route?.params;
return (
    <>
    <LargeCard visitorContent={formData}/>
    </>
)
}
export default VisitorPageContent