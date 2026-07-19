import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import EditLanguage from "../../components/editLanguage/editLanguage"
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { View } from "react-native";
const EditLanguagePage=()=>{
    const navigation = useNavigation();
    const languageObj={
        name:'Select Languages'
    }
    const [completeObj,setCompleteObj]=useState({})
    const getPersonalInfoSelector=useSelector((state)=>state.getPersonalData.updatePersonalData?.personalDetail
    )
    const completeLoginObjData= getPersonalInfoSelector || {}

return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <AnotherHeader editObj={languageObj} navigation={navigation} completeObj={completeLoginObjData}/>
    <EditLanguage navigation={navigation} completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default EditLanguagePage