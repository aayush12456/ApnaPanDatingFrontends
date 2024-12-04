import LargeCard from "../../components/common/largeCard/largeCard"

const LikePageContent=({route})=>{
    const { formData } = route?.params;
    console.log('form in likePage',formData)
return (
    <>
    <LargeCard likeContent={formData}/>
    </>
)
}
export default LikePageContent