import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import EditInterest from "../../components/editInterest/editInterest"
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { View } from "react-native";
const EditInterestPage=()=>{
    const navigation = useNavigation();
    const interestObj={
        name:'Select Interest'
    }

    const getPersonalInfoSelector=useSelector((state)=>state.getPersonalData.updatePersonalData?.personalDetail
    )
    const completeLoginObjData=getPersonalInfoSelector|| {}


    
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <AnotherHeader editObj={interestObj} navigation={navigation} completeObj={completeLoginObjData}/>
    <EditInterest navigation={navigation} completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default EditInterestPage