import { useNavigation } from '@react-navigation/native';
import AnotherHeader from '../../components/anotherHeader/anotherHeader';
import EditLookingFor from '../../components/editLookingFor/editLookingFor';
const EditLookingForPage=()=>{
    const navigation = useNavigation();
    const lookingForObj={
        name:'Select Looking For'
    }
return (
    <>
    <AnotherHeader editObj={lookingForObj} navigation={navigation}/>
    <EditLookingFor  navigation={navigation}/>
    </>
)
}
export default EditLookingForPage