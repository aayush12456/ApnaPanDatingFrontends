import AdditionalDataForm from "../../components/additionalDataForm/additionalDataForm"

const AdditionalDataPage=({route,navigation})=>{
    const { formData } = route.params;

    console.log('form data in addiotnal data',formData)
return (
    <>
    <AdditionalDataForm additionalFormData={formData} navigation={navigation}/>
    </>
)
}
export default AdditionalDataPage