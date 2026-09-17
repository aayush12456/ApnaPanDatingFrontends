import AnotherHeader from "../../components/anotherHeader/anotherHeader";
import EditZodiac from "../../components/editZodiac/editZodiac"
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { View } from "react-native";
const EditZodiacPage=()=>{
    const navigation = useNavigation();
    const zodiacObj={
        name:'Select Zodiac Sign'
    }
    const getPersonalInfoSelector=useSelector((state)=>state.getPersonalData.updatePersonalData?.personalDetail
    )
    const completeLoginObjData=getPersonalInfoSelector|| {}
   
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <AnotherHeader editObj={zodiacObj} navigation={navigation} completeObj={completeLoginObjData}/>
    <EditZodiac  navigation={navigation} completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default EditZodiacPage