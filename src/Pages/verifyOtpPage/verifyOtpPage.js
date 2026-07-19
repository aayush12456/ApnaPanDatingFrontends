import VerifyOtp from "../../components/verifyOtp/verifyOtp"

const VerifyOtpPage=({route})=>{
    const { formData } = route?.params
    console.log('forms',formData)
return (
    <>
    <VerifyOtp datas={formData} />
    </>
)
}
export default VerifyOtpPage