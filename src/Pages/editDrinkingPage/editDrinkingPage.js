import AnotherHeader from "../../components/anotherHeader/anotherHeader";
import EditDrinking from "../../components/editDrinking/editDrinking"
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { View } from "react-native";
const EditDrinkingPage=()=>{
    const navigation = useNavigation();
    const drinkingObj={
        name:'Select Drinking Habit'
    }
    const getPersonalInfoSelector=useSelector((state)=>state.getPersonalData.updatePersonalData?.personalDetail
    )
    const completeLoginObjData=getPersonalInfoSelector|| {}
  
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <AnotherHeader editObj={drinkingObj} navigation={navigation} completeObj={completeLoginObjData} />
    <EditDrinking navigation={navigation} completeObj={completeLoginObjData} />
    </View>
    </>
)
}
export default EditDrinkingPage