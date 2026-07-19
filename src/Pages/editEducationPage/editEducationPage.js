import AnotherHeader from "../../components/anotherHeader/anotherHeader";
import EditEducation from "../../components/editEducation/editEducation"
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { View } from "react-native";
const EditEducationPage=()=>{
    const navigation = useNavigation();
    const educationObj={
        name:'Select Education'
    }
    const [completeObj,setCompleteObj]=useState({})
    const getPersonalInfoSelector=useSelector((state)=>state.getPersonalData.updatePersonalData?.personalDetail
    )
 
    const completeLoginObjData=getPersonalInfoSelector|| {}


return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <AnotherHeader editObj={educationObj} navigation={navigation} completeObj={completeLoginObjData}/>
    <EditEducation  navigation={navigation} completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default EditEducationPage