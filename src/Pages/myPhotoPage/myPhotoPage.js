import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import MyPhoto from "../../components/myPhoto/myPhoto"
import { useNavigation } from '@react-navigation/native';
const MyPhotoPage=({route})=>{
    const { formData } = route.params;
    const navigation = useNavigation();
    const myPhotoObj={
        name:formData?.name

    }
return (
    <>
    <AnotherHeader editObj={myPhotoObj} navigation={navigation}/>
    <MyPhoto  navigation={navigation} photoObj={formData}/>
    </>
)
}
export default MyPhotoPage