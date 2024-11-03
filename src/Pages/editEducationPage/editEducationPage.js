import AnotherHeader from "../../components/anotherHeader/anotherHeader";
import EditEducation from "../../components/editEducation/editEducation"
import { useNavigation } from '@react-navigation/native';
const EditEducationPage=()=>{
    const navigation = useNavigation();
    const lookingForObj={
        name:'Select Education'
    }
return (
    <>
    <AnotherHeader editObj={lookingForObj} navigation={navigation}/>
    <EditEducation  navigation={navigation}/>
    </>
)
}
export default EditEducationPage