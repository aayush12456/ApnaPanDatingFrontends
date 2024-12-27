import LoginWithOtpData from "../../components/loginWithOtpData/loginWithOtpData"
import { useSelector } from "react-redux"
const LoginWithOtpDataPage=()=>{
    const loginWithOtpSelector=useSelector((state)=>state?.loginOtpData?.loginWithOtpData)
return (
    <>
    <LoginWithOtpData phoneNumber={loginWithOtpSelector.phoneNumber} otp={loginWithOtpSelector.otp}/>
    </>
)
}
export default LoginWithOtpDataPage