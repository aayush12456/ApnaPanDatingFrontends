import ImageUpload from "../../components/imageUpload/imageUpload"
import { useSelector } from "react-redux";
const ImageUploadPage=({route})=>{
    const { formData } = route.params;
    // console.log('form data in image me data',formData)
    const registerResponse=useSelector((state)=>state?.registerData.registerDataObj.mssg)
    // console.log('register responses in page',registerResponse)
return (
    <>
    <ImageUpload imageUpload={formData} registerMssg={registerResponse}/>
    </>
)
}
export default ImageUploadPage