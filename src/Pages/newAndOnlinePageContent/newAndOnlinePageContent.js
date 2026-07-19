import LargeCard from "../../components/common/largeCard/largeCard"
import { View } from "react-native";
const NewAndOnlinePageContent=({route})=>{
    const { formData,completeObj } = route?.params;

    console.log('complete obj',completeObj)
    console.log('form data online',formData)
   
    const completeLoginObjData=completeObj|| {}

return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <LargeCard newAndOnlineContent={formData} completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default NewAndOnlinePageContent