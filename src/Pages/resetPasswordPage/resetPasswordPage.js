import ResetPassword from "../../components/resetPassword/resetPassword"
import { useSelector } from "react-redux"
const ResetPasswordPage=()=>{
    const loginOtpNumber=useSelector((state)=>state.loginOtpData.loginWithOtpData.phoneNumber)
return (
    <>
    <ResetPassword phoneNumber={loginOtpNumber}/>
    </>
)
}
export default ResetPasswordPage