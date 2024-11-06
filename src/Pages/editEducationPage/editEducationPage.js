import AnotherHeader from "../../components/anotherHeader/anotherHeader";
import EditEducation from "../../components/editEducation/editEducation"
import { useNavigation } from '@react-navigation/native';
const EditEducationPage=()=>{
    const navigation = useNavigation();
    const educationObj={
        name:'Select Education'
    }
return (
    <>
    <AnotherHeader editObj={educationObj} navigation={navigation}/>
    <EditEducation  navigation={navigation}/>
    </>
)
}
export default EditEducationPage