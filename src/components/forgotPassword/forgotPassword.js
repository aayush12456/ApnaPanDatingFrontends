import React, { useState } from "react";
import { Text,TextInput,Button } from "react-native-paper"
import { Image, View, TouchableOpacity } from "react-native";
import back from '../../../assets/signUpFormIcon/back.png';
import { useNavigation } from '@react-navigation/native';
import { loginWithOtpAsync } from "../../Redux/Slice/loginWithOtpSlice/loginWithOtpSlice";
import { useDispatch,useSelector } from "react-redux";
import ForgotPasswordData from "../forgotPasswordData/forgotPasswordData";
const ForgotPassword=({number,allPhoneNumberArray})=>{
    console.log('number is',number)
    const navigation = useNavigation();
    const dispatch=useDispatch()
    const loginOtpMessage=useSelector((state)=>state.loginOtpData.loginWithOtpData.mssg)
    const loginOtpNumber=useSelector((state)=>state.loginOtpData.loginWithOtpData.phoneNumber)
    const loginOtp=useSelector((state)=>state.loginOtpData.loginWithOtpData.otp)
    const [phoneNumber, setPhoneNumber] = useState(""); 
    const [captchaNumber, setCaptchaNumber] = useState(""); 
    const [error, setError] = useState(""); 
    const [captchaError, setCaptchaError] = useState(""); 
    const handleSendOtp = () => {
      
        if(!phoneNumber.trim()){
            setError("Please enter your phone number");
        }
    if(!allPhoneNumberArray?.includes(phoneNumber?.trim())){
            setError("Phone number does not exist");
        }
     if(!captchaError.trim()){
            setCaptchaError("Please enter captcha number")
        }
      if(captchaNumber!==number){
            setCaptchaError("captcha does not match")
            return 
        }
        else {
            setError(""); // Clear the error
            setCaptchaError("")
            const phoneObj = {
                phone: phoneNumber,
                reset: 'Reset Password',
            };
            dispatch(loginWithOtpAsync(phoneObj));
            setPhoneNumber('');
            setCaptchaNumber("")
        }
    };
return (
    <>
    {loginOtpMessage==="Login Successfully"?null:<View>
    <View style={{ flexDirection: 'row', justifyContent: 'start' }}>
            <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
              <Image
                source={back}
                style={{ width: 15, height: 15, marginTop: 60, marginLeft: 15 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 25, paddingLeft: 16, paddingTop: 20 }}>Reset Password</Text>
          </View>
          <View>
            <TextInput
              label="Enter your registered mobile number"
              style={{ marginLeft: 12, marginRight: 20, marginTop: 15 }}
              mode="outlined"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text); // Update phone number state
                if (error) setError(""); // Clear error when typing starts
              }}
              keyboardType="phone-pad"
            />
            {error ? <Text style={{ color: 'red', marginLeft: 12 }}>{error}</Text> : null}
          </View>
          <View style={{flexDirection:"row"}}>
          <View style={{width:"100%"}}>
            <TextInput
              label="Enter Captcha code"
              style={{ marginLeft: 12, marginRight: 20, marginTop: 15 }}
              mode="outlined"
              value={captchaNumber}
              onChangeText={(text) => {
                setCaptchaNumber(text); // Update phone number state
                if (captchaError) setCaptchaError(""); // Clear error when typing starts
              }}
              keyboardType="phone-pad"
            />
            {captchaError ? <Text style={{ color: 'red', marginLeft: 12 }}>{captchaError}</Text> : null}
          </View>
          <View>
            <Text style={{paddingTop:35,marginLeft:-70}}>{number}</Text>
          </View>
          </View>
          <View style={{ width: '100%', overflow: 'hidden' }}>
               <Button
                      mode="contained"
                      onPress={handleSendOtp}
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:11,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         marginTop: 20,
                         marginLeft: 12,
                         marginRight: 20,
                      }}
                      buttonColor="rgba(234, 88, 12, 1)"
                    >
SUBMIT
                    </Button>
          </View>
    </View>}
   {loginOtpMessage==="Login Successfully"? <ForgotPasswordData phone={loginOtpNumber} otp={loginOtp}/>:null}
    </>
)
}
export default ForgotPassword