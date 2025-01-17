import LoginWithOtp from "../../components/loginWithOtp/loginWithOtp"
import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { getAllPhoneNumbersData } from "../../Redux/Slice/getAllPhoneNumberSlice/getAllPhoneNumberSlice"
const LoginWithOtpPage=()=>{
    const dispatch=useDispatch()
    const allPhoneNumberArraySelector=useSelector((state)=>state.getAllPhoneNumber.getAllPhoneNumbersObj.phoneNumberArray)
    console.log('all phone number array',allPhoneNumberArraySelector)
    const id='1'
  useEffect(()=>{
if(id){
    dispatch(getAllPhoneNumbersData(id))
}
  },[dispatch,id])
return (
    <>
    <LoginWithOtp allPhoneNumberArray={allPhoneNumberArraySelector}/>
    </>
)
}
export default LoginWithOtpPage