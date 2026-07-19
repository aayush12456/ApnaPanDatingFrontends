import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import EditRelation from "../../components/editRelation/editRelation"
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";

import { View } from "react-native";
const  EditRelationPage=()=>{
    const navigation = useNavigation();
    const relationObj={
        name:'Select Relationship Status'
    }
 
    const getPersonalInfoSelector=useSelector((state)=>state.getPersonalData.updatePersonalData?.personalDetail
    )
    const completeLoginObjData=getPersonalInfoSelector|| {}
   
   
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <AnotherHeader editObj={relationObj} navigation={navigation} completeObj={completeLoginObjData}/>
    <EditRelation  navigation={navigation} completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default EditRelationPage