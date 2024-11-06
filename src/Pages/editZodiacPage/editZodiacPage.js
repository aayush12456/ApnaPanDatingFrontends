import AnotherHeader from "../../components/anotherHeader/anotherHeader";
import EditZodiac from "../../components/editZodiac/editZodiac"
import { useNavigation } from '@react-navigation/native';
const EditZodiacPage=()=>{
    const navigation = useNavigation();
    const zodiacObj={
        name:'Select Zodiac Sign'
    }
return (
    <>
    <AnotherHeader editObj={zodiacObj} navigation={navigation}/>
    <EditZodiac  navigation={navigation}/>
    </>
)
}
export default EditZodiacPage