import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import { useNavigation } from '@react-navigation/native';
import EditSongs from "../../components/editSongs/editSongs";
import { useSelector } from "react-redux";
import { View } from "react-native";
const EditSongsPage=()=>{
    const navigation = useNavigation();
    const songObj={
        name:'Select Songs'
    }
    const getPersonalInfoSelector=useSelector((state)=>state.getPersonalData.updatePersonalData?.personalDetail
    )
    const completeLoginObjData=getPersonalInfoSelector||{}
 
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <AnotherHeader editObj={songObj} navigation={navigation} completeObj={completeLoginObjData}/>
      <EditSongs navigation={navigation} completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default EditSongsPage