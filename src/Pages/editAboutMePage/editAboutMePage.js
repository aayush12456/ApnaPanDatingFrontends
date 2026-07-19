import EditAboutMe from "../../components/editAboutMe/editAboutMe"
import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { View } from "react-native";
const EditAboutMePage=()=>{
    const navigation = useNavigation();
    const eatingObj={
        name:'About Me'
    }
  
    const getPersonalInfoSelector=useSelector((state)=>state.getPersonalData.updatePersonalData?.personalDetail
    )
    const completeLoginObjData= getPersonalInfoSelector||{}
  

   
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <AnotherHeader editObj={eatingObj} navigation={navigation} completeObj={completeLoginObjData}/>
    <EditAboutMe  navigation={navigation}completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default EditAboutMePage