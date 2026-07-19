import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import EditProfile from "../../components/editProfile/editProfile"
import { useNavigation } from '@react-navigation/native';

import { View } from "react-native";
const EditProfilePage=({route})=>{
    const { formData } = route?.params
    const navigation = useNavigation();
    const editObj={
        name:'Edit Profile'
    }
   
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <AnotherHeader editObj={editObj} navigation={navigation} completeObj={formData} />
    <EditProfile navigation={navigation} completeObj={formData}/>
    </View>
    </>
)
}
export default EditProfilePage