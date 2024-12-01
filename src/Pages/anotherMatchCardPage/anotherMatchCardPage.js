import AnotherMatchCard from "../../components/anotherMatchCard/anotherMatchCard"

const AnotherMatchCardPage=({route})=>{
    const { formData } = route.params;
    console.log('form data in another match card',formData)
return (
    <>
    <AnotherMatchCard anotherMatch={formData}/>
    </>
)
}
export default AnotherMatchCardPage