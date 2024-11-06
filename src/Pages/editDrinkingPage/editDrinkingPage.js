import AnotherHeader from "../../components/anotherHeader/anotherHeader";
import EditDrinking from "../../components/editDrinking/editDrinking"
import { useNavigation } from '@react-navigation/native';
const EditDrinkingPage=()=>{
    const navigation = useNavigation();
    const drinkingObj={
        name:'Select Drinking Habit'
    }
return (
    <>
    <AnotherHeader editObj={drinkingObj} navigation={navigation} />
    <EditDrinking navigation={navigation} />
    </>
)
}
export default EditDrinkingPage