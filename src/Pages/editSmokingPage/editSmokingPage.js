import AnotherHeader from "../../components/anotherHeader/anotherHeader";
import EditSmoking from "../../components/editSmoking/editSmoking"
import { useNavigation } from '@react-navigation/native';
const EditSmokingPage=()=>{
    const navigation = useNavigation();
    const smokingObj={
        name:'Select Smoking Habit'
    }
return (
    <>
    <AnotherHeader  editObj={smokingObj} navigation={navigation}/>
    <EditSmoking navigation={navigation} />
    </>
)
}
export default EditSmokingPage