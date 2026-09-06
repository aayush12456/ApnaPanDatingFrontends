import SignUpForm from "../../components/signUpForm/signUpForm"
import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react"
import {getAllPhoneMailData } from '../../Redux/Slice/getAllPhoneMailSlice/getAllPhoneMailSlice'
const SignUpPage=({navigation})=>{
    const dispatch=useDispatch()
    const allUserSelector=useSelector((state)=>state?.getAllPhoneMail?.getAllPhoneMailObj)
    console.log('all User selector',allUserSelector)
    const id='1'
    useEffect(()=>{
        if(id){
            dispatch(getAllPhoneMailData (id))
        }
          },[dispatch,id])
return (
    <>
    <SignUpForm navigation={navigation} allUserObj={allUserSelector}/>
    </>
)
}
export default SignUpPage