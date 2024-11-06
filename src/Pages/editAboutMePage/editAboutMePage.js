import EditAboutMe from "../../components/editAboutMe/editAboutMe"
import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import { useNavigation } from '@react-navigation/native';
const EditAboutMePage=()=>{
    const navigation = useNavigation();
    const eatingObj={
        name:'About Me'
    }
return (
    <>
    <AnotherHeader editObj={eatingObj} navigation={navigation}/>
    <EditAboutMe  navigation={navigation}/>
    </>
)
}
export default EditAboutMePage