import AnotherHeader from "../../components/anotherHeader/anotherHeader"
import CompareFace from "../../components/compareFace/compareFace"
import { useNavigation } from '@react-navigation/native';
const CompareFacePage=()=>{
    const navigation = useNavigation();
    const compareObj={
        name:'Face Compare Guidance'
    }
return (
    <>
    <AnotherHeader editObj={compareObj} navigation={navigation}/>
    <CompareFace navigation={navigation}/>
    </>
)
}
export default CompareFacePage