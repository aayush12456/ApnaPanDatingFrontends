import AnotherHeader from "../../components/anotherHeader/anotherHeader";
import EditBasicInfo from "../../components/editBasicInfo/editBasicInfo"
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { View } from "react-native";
const EditBasicInfoPage=()=>{
    const navigation = useNavigation();
    const basicObj={
        name:'Basic Info'
    }
    const [completeObj,setCompleteObj]=useState({})
    const getPersonalInfoSelector=useSelector((state)=>state.getPersonalData.updatePersonalData?.personalDetail
    )
    const completeLoginObjData=getPersonalInfoSelector|| {}
    
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <AnotherHeader editObj={basicObj} navigation={navigation} completeObj={completeLoginObjData}/>
<EditBasicInfo completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default EditBasicInfoPage