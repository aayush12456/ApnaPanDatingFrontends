import AnotherHeader from "../../components/anotherHeader/anotherHeader";
import EditProfession from "../../components/editProfession/editProfession"
import { useNavigation } from '@react-navigation/native';
const EditProfessionPage=()=>{
    const navigation = useNavigation();
    const professionObj={
        name:'Select Profession'
    }
return (
    <>
    <AnotherHeader  editObj={professionObj} navigation={navigation}/>
    <EditProfession  navigation={navigation}/>
    </>
)
}
export default EditProfessionPage