import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import MyPhoto from "../../components/myPhoto/myPhoto"
import { useNavigation } from '@react-navigation/native';
import {View} from 'react-native'

const MyPhotoPage=({route})=>{
    const { formData } = route.params;
    const navigation = useNavigation();

    const myPhotoObj={
        name:formData?.name
    }
  
    const completeLoginObjData=formData ||  {}

return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <AnotherHeader editObj={myPhotoObj} navigation={navigation} completeObj={completeLoginObjData}/>
    <MyPhoto  navigation={navigation} photoObj={formData}/>
    </View>
    </>
)
}
export default MyPhotoPage