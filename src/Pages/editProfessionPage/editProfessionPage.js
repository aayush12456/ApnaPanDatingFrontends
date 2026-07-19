import AnotherHeader from "../../components/anotherHeader/anotherHeader";
import EditProfession from "../../components/editProfession/editProfession"
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { View } from "react-native";
const EditProfessionPage=()=>{
    const navigation = useNavigation();
    const professionObj={
        name:'Select Profession'
    }
    const [completeObj,setCompleteObj]=useState({})
    const getPersonalInfoSelector=useSelector((state)=>state.getPersonalData.updatePersonalData?.personalDetail
    )
 
    const completeLoginObjData=getPersonalInfoSelector|| {}


  
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <AnotherHeader  editObj={professionObj} navigation={navigation} completeObj={ completeLoginObjData}/>
    <EditProfession  navigation={navigation} completeObj={ completeLoginObjData}/>
    </View>
    </>
)
}
export default EditProfessionPage