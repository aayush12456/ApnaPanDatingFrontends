import AboutMe from "../../components/aboutMe/aboutMe"

const AboutMePage=({route,navigation})=>{
    const { formData } = route.params;
    // console.log('form data in about me data',formData)
    // console.log('form data in about me datas i sjdjo',formData)
return (
    <>
    <AboutMe aboutMe={formData} navigation={navigation}/>
    </>
)
}
export default AboutMePage