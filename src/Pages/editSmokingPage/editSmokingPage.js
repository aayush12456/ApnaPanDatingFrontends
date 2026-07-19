import AnotherHeader from "../../components/anotherHeader/anotherHeader";
import EditSmoking from "../../components/editSmoking/editSmoking"
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { View } from "react-native";
const EditSmokingPage=()=>{
    const navigation = useNavigation();
    const smokingObj={
        name:'Select Smoking Habit'
    }
    const [completeObj,setCompleteObj]=useState({})
    const getPersonalInfoSelector=useSelector((state)=>state.getPersonalData.updatePersonalData?.personalDetail
    )

    const completeLoginObjData=getPersonalInfoSelector|| {}
   
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <AnotherHeader  editObj={smokingObj} navigation={navigation} completeObj={completeLoginObjData}/>
    <EditSmoking navigation={navigation} completeObj={completeLoginObjData} />
    </View>
    </>
)
}
export default EditSmokingPage