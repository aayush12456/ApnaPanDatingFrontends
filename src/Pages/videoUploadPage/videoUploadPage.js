import VideoUpload from "../../components/videoUpload/videoUpload"

const VideoUploadPage=({route,navigation})=>{
    const { formData } = route.params;
return (
    <>
    <VideoUpload VideoUpload={formData} navigation={navigation}/>
    </>
)
}
export default VideoUploadPage