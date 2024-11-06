import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import EditEating from "../../components/editEating/editEating"
import { useNavigation } from '@react-navigation/native';
const EditEatingPage=()=>{
    const navigation = useNavigation();
    const eatingObj={
        name:'Select Eating Habit'
    }
return (
    <>
    <AnotherHeader editObj={eatingObj} navigation={navigation}/>
    <EditEating navigation={navigation} />
    </>
)
}
export default EditEatingPage