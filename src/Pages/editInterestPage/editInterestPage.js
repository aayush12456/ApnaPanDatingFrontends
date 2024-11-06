import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import EditInterest from "../../components/editInterest/editInterest"
import { useNavigation } from '@react-navigation/native';
const EditInterestPage=()=>{
    const navigation = useNavigation();
    const interestObj={
        name:'Select Interest'
    }
return (
    <>
    <AnotherHeader editObj={interestObj} navigation={navigation}/>
    <EditInterest navigation={navigation}/>
    </>
)
}
export default EditInterestPage