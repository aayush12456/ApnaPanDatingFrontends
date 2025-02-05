import AdditonalForm from "../../components/additonalForm/additonalForm"

const AdditionalPage=({route,navigation})=>{
    const { formData } = route.params;

  // console.log('form data in addiotnal',formData)
return (
    <>
    <AdditonalForm formData={formData} navigation={navigation} />
    </>
)
}
export default AdditionalPage