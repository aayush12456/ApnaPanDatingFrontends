import { useNavigation } from '@react-navigation/native';
import AnotherHeader from '../../components/anotherHeader/anotherHeader';
import EditLookingFor from '../../components/editLookingFor/editLookingFor';
import { useSelector } from "react-redux";
import { View } from "react-native";
const EditLookingForPage=()=>{
    const navigation = useNavigation();
    const lookingForObj={
        name:'Select Looking For'
    }

    const getPersonalInfoSelector=useSelector((state)=>state.getPersonalData.updatePersonalData?.personalDetail
    )
    const completeLoginObjData=getPersonalInfoSelector || {}
 


return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <AnotherHeader editObj={lookingForObj} navigation={navigation} completeObj={completeLoginObjData}/>
    <EditLookingFor  navigation={navigation} completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default EditLookingForPage