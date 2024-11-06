import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import EditLanguage from "../../components/editLanguage/editLanguage"
import { useNavigation } from '@react-navigation/native';
const EditLanguagePage=()=>{
    const navigation = useNavigation();
    const languageObj={
        name:'Select Languages'
    }
return (
    <>
    <AnotherHeader editObj={languageObj} navigation={navigation}/>
    <EditLanguage navigation={navigation}/>
    </>
)
}
export default EditLanguagePage