import CaptureImage from "../../components/captureImage/captureImage"

const CaptureImagePage=({route,navigation})=>{
    const { formData } = route.params;
return (
    <>
    <CaptureImage captureImages={formData} navigation={navigation}/>
    </>
)
}
export default CaptureImagePage