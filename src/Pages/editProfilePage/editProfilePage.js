import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import EditProfile from "../../components/editProfile/editProfile"
import { useNavigation } from '@react-navigation/native';
const EditProfilePage=()=>{
    const navigation = useNavigation();
    const editObj={
        name:'Edit Profile'
    }
return (
    <>
    <AnotherHeader editObj={editObj} navigation={navigation} />
    <EditProfile navigation={navigation}/>
    </>
)
}
export default EditProfilePage