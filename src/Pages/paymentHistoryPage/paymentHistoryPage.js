import PaymentHistory from "../../components/paymentHistory/paymentHistory";
import CommonHeader from "../../components/common/commonHeader/commonHeader";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getPaymentHistoryAsync } from "../../Redux/Slice/getPaymentHistorySlice/getPaymentHistorySlice";
import { View } from "react-native";
import { getPaymentActiveAsync } from "../../Redux/Slice/getPaymentActiveSlice/getPaymentActiveSlice";
const PaymentHistoryPage=({route})=>{
    const { formData } = route?.params;
    const completeLoginObjData=formData?.loginDetails || {}
    const dispatch=useDispatch()
   const loginId=completeLoginObjData.userId

    useEffect(()=>{
        if(loginId){
        dispatch(getPaymentHistoryAsync(loginId))
        }
            },[loginId])

            useEffect(()=>{
                if(loginId){
                dispatch(getPaymentActiveAsync(loginId))
                }
                    },[loginId])

 const paymentActiveSelector=useSelector((state)=>state.getPaymentActive.getPaymentActiveObj)
const paymentHistorySelector=useSelector((state)=>state.getPaymentHistory.getPaymentHistoryObj)
// console.log('pay active',paymentActiveSelector)
// console.log('pay history',paymentHistorySelector)
return (
    <>
     <View style={{backgroundColor:`black`,height:"100%"}}>
    <CommonHeader  commonHeaderName={formData.headerName} completeLoginObj={completeLoginObjData}/>
   <PaymentHistory paymentActive={paymentActiveSelector}  paymentHistory={paymentHistorySelector?.subscriptionArray}/>
    </View>
    </>
)
}
export default PaymentHistoryPage