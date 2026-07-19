import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import EditEating from "../../components/editEating/editEating"
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { View } from "react-native";
const EditEatingPage=()=>{
    const navigation = useNavigation();
    const eatingObj={
        name:'Select Eating Habit'
    }
    const [completeObj,setCompleteObj]=useState({})
    const getPersonalInfoSelector=useSelector((state)=>state.getPersonalData.updatePersonalData?.personalDetail
    )

    const completeLoginObjData=getPersonalInfoSelector||{}
 
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <AnotherHeader editObj={eatingObj} navigation={navigation} completeObj={completeLoginObjData}/>
    <EditEating navigation={navigation} completeObj={completeLoginObjData} />
    </View>
    </>
)
}
export default EditEatingPage