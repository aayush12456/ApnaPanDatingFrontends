import AboutMe from "../../components/aboutMe/aboutMe"

const AboutMePage=({route,navigation})=>{
    const { formData } = route.params;
    console.log('form data in about me data',formData)
return (
    <>
    <AboutMe aboutMe={formData} navigation={navigation}/>
    </>
)
}
export default AboutMePage