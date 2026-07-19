import AdditonalForm from "../../components/additonalForm/additonalForm"
import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react"
import { getBollywoodSongAsync } from "../../Redux/Slice/getBollyWoodSongSlice/getBollywoodSongSlice"
const AdditionalPage=({route,navigation})=>{
    const { formData } = route.params;
    const dispatch=useDispatch()
    const getAllSongsSelector=useSelector((state)=>state.getBollyWoodSong.getBollywoodSongUserObj.uploadSongsData)
  // console.log('form data in addiotnal',formData)
  const id='1'
  useEffect(()=>{
      if(id){
          dispatch(getBollywoodSongAsync(id))
      }
        },[dispatch,id])
return (
    <>
    <AdditonalForm formData={formData} navigation={navigation} uploadSongs={getAllSongsSelector} />
    </>
)
}
export default AdditionalPage