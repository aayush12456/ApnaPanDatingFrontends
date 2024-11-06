import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import MyPhoto from "../../components/myPhoto/myPhoto"
import { useNavigation } from '@react-navigation/native';
const MyPhotoPage=()=>{
    const navigation = useNavigation();
    const myPhotoObj={
        name:'My Photos'
    }
return (
    <>
    <AnotherHeader editObj={myPhotoObj} navigation={navigation}/>
    <MyPhoto  navigation={navigation}/>
    </>
)
}
export default MyPhotoPage