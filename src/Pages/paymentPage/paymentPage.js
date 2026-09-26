import Payment from "../../components/payment/payment"
import { View } from "react-native"
const PaymentPage=({finalCompleteObj,loginId})=>{
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <Payment profile={finalCompleteObj} loginId={loginId}/>
    </View>
    </>
)
}
export default PaymentPage