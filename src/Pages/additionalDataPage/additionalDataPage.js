import AdditionalDataForm from "../../components/additionalDataForm/additionalDataForm"
import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react"
import { getBollywoodSongAsync } from "../../Redux/Slice/getBollyWoodSongSlice/getBollywoodSongSlice"
const AdditionalDataPage=({route,navigation})=>{
    const dispatch=useDispatch()
    const getAllSongsSelector=useSelector((state)=>state.getBollyWoodSong.getBollywoodSongUserObj.uploadSongsData)
    // console.log('get all songs',getAllSongsSelector)
    const { formData } = route.params;
    // console.log('form data in addiotnal data',formData)
    const id='1'
    useEffect(()=>{
        if(id){
            dispatch(getBollywoodSongAsync(id))
        }
          },[dispatch,id])
return (
    <>
    <AdditionalDataForm additionalFormData={formData} navigation={navigation} uploadSongs={getAllSongsSelector}/>
    </>
)
}
export default AdditionalDataPage