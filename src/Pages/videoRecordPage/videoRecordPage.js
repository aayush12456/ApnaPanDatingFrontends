import VideoRecord from "../../components/videoRecord/videoRecord"

const VideoRecordPage=({route,navigation,})=>{
    const { formData } = route.params;
    console.log('form data in video record data',formData)
return(
    <>
    <VideoRecord videoRecord={formData} navigation={navigation}/>
    </>
)
}
export default VideoRecordPage