import SignUpForm from "../../components/signUpForm/signUpForm"
import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllPhoneNumbersData } from "../../Redux/Slice/getAllPhoneNumberSlice/getAllPhoneNumberSlice"
const SignUpPage=({navigation})=>{
    const dispatch=useDispatch()
    const allUserSelector=useSelector((state)=>state.getAllPhoneNumber.getAllPhoneNumbersObj)
    console.log('all User selector',allUserSelector)
    const id='1'
    useEffect(()=>{
        if(id){
            dispatch(getAllPhoneNumbersData(id))
        }
          },[dispatch,id])
return (
    <>
    <SignUpForm navigation={navigation} allUserObj={allUserSelector}/>
    </>
)
}
export default SignUpPage