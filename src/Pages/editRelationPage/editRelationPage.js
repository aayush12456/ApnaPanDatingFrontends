import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import EditRelation from "../../components/editRelation/editRelation"
import { useNavigation } from '@react-navigation/native';
const  EditRelationPage=()=>{
    const navigation = useNavigation();
    const relationObj={
        name:'Select Relationship Status'
    }
return (
    <>
    <AnotherHeader editObj={relationObj} navigation={navigation}/>
    <EditRelation  navigation={navigation}/>
    </>
)
}
export default EditRelationPage