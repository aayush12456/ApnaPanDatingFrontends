import LargeCard from "../../components/common/largeCard/largeCard"

const NewAndOnlinePageContent=({route})=>{
    const { formData } = route.params;
return (
    <>
    <LargeCard newAndOnlineContent={formData}/>
    </>
)
}
export default NewAndOnlinePageContent