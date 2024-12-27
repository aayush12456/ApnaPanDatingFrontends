import ForgotPassword from "../../components/forgotPassword/forgotPassword"
import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react";
import { getAllPhoneNumbersData } from "../../Redux/Slice/getAllPhoneNumberSlice/getAllPhoneNumberSlice";
const ForgotPasswordPage=({route})=>{
    const { formData } = route?.params;
    const dispatch=useDispatch()
    const allPhoneNumberArraySelector=useSelector((state)=>state.getAllPhoneNumber.getAllPhoneNumbersArray.phoneNumberArray)
    console.log('all phone number array',allPhoneNumberArraySelector)
    const id='1'
    useEffect(()=>{
  if(id){
      dispatch(getAllPhoneNumbersData(id))
  }
    },[dispatch,id])
return (
    <>
 <ForgotPassword number={formData.number} allPhoneNumberArray={allPhoneNumberArraySelector}/>
    </>
)
}
export default ForgotPasswordPage