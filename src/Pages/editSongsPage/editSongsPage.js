import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import { useNavigation } from '@react-navigation/native';
import EditSongs from "../../components/editSongs/editSongs";
const EditSongsPage=()=>{
    const navigation = useNavigation();
    const songObj={
        name:'Select Songs'
    }
return (
    <>
      <AnotherHeader editObj={songObj} navigation={navigation}/>
      <EditSongs navigation={navigation}/>
    </>
)
}
export default EditSongsPage