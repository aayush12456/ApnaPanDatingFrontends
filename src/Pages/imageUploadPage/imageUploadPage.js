import ImageUpload from "../../components/imageUpload/imageUpload"

const ImageUploadPage=({route})=>{
    const { formData } = route.params;
    console.log('form data in image me data',formData)
return (
    <>
    <ImageUpload imageUpload={formData}/>
    </>
)
}
export default ImageUploadPage