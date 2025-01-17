import { getBollywoodSongAsync } from "../../Redux/Slice/getBollyWoodSongSlice/getBollywoodSongSlice";
import AnotherMatchCard from "../../components/anotherMatchCard/anotherMatchCard"
import { useSelector,useDispatch } from "react-redux";
import { useEffect,useState } from "react";
const AnotherMatchCardPage=({route})=>{
    const { formData } = route.params;
    const [songObj,setSongObj]=useState(null)
    console.log('form data in another match card',formData)
    const dispatch=useDispatch()
    const getAllSongsSelector=useSelector((state)=>state?.getBollyWoodSong?.getBollywoodSongUserObj?.uploadSongsData)
    console.log('get all song in another',getAllSongsSelector)
    const completeLoginObj = useSelector(
      (state) => state.loginData.loginData.completeLoginData
    );
    const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
    
    const completeLoginObjData=completeLoginObj || completeLoginObjForOtp || {}
    useEffect(()=>{
      if(completeLoginObjData._id){
          dispatch(getBollywoodSongAsync(completeLoginObjData._id))
      }
  
        },[dispatch,completeLoginObjData._id])
        useEffect(() => {
            if (formData && getAllSongsSelector?.length > 0) {
              const foundSong = getAllSongsSelector.find(
                (song) => song?._id === formData?.songId
              );
              setSongObj(foundSong || null);
            }
          }, [getAllSongsSelector, formData]);
return (
    <>
    <AnotherMatchCard anotherMatch={formData} songs={songObj} />
    </>
)
}
export default AnotherMatchCardPage