import LargeCard from "../../components/common/largeCard/largeCard"
import { View } from "react-native";
import PlanScreen from "../../components/planScreen/planScreen";
import { useSelector } from "react-redux";
const NewAndOnlinePageContent=({route})=>{
    const { formData,completeObj } = route?.params;
    const largePlanSlice=useSelector((state)=>state.largePlanScreen.LargePlanScreenToggle )
    // console.log('complete obj',completeObj)
    // console.log('form data online',formData)
    // console.log('plan status',planStatus)
   
    const completeLoginObjData=completeObj|| {}
    const loginId=completeLoginObjData?.userId
    
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    {largePlanSlice === false ? (
                // Large Card
                <LargeCard
                    newAndOnlineContent={formData}
                    completeObj={completeLoginObjData}
                    planStatus={planStatus}
                />
            ) : (
                // Plan Screen
                <PlanScreen loginId={loginId} />
            )}
    </View>
    </>
)
}
export default NewAndOnlinePageContent