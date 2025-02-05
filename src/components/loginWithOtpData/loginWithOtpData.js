import { Text } from "react-native-paper"
import { View,Pressable } from "react-native"
import { OtpInput } from "react-native-otp-entry";
import { Button } from "react-native-paper";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { loginWithOtpAsync } from "../../Redux/Slice/loginWithOtpSlice/loginWithOtpSlice";
import { useNavigation } from "@react-navigation/native";
import {  finalLoginWithOtpAsync } from "../../Redux/Slice/finalLoginWithOtpSlice/finalLoginWithOtpSlice";
import * as SecureStore from 'expo-secure-store';
const LoginWithOtpData=({phoneNumber,otp})=>{
  // console.log('phone number in otp data',phoneNumber)
  // console.log('otp in otp data',otp)
  const dispatch=useDispatch()
  const navigation=useNavigation()
  const [otpData,setOtpData]=useState('')
  const [error,setError]=useState('')
  const [phone,setPhone]=useState('')
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const phoneObj = {
    phone: phoneNumber
  };

  const loginOtpResponse=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.token)
  // console.log('login otp response token',loginOtpResponse)
  const loginOtpObj=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.loginData)
  // console.log('login otp response login obj',loginOtpObj)

  useEffect(() => {
    if (loginOtpResponse) {
      const saveToSecureStore = async () => {
        try {
          await SecureStore.setItemAsync('loginObj', JSON.stringify(loginOtpObj));
          // console.log("Login data stored successfully!");
        } catch (error) {
          // console.error("Failed to store login data:", error);
        }
      };
      saveToSecureStore();
    }
  }, [loginOtpResponse]);

  useEffect(() => {
    if(loginOtpResponse){
      const fetchData = async () => {
        try {
          const token = await SecureStore.getItemAsync('loginToken');
          // console.log("Fetched Token:", token);
    
          if (token) {
            navigation.navigate('HeaderPage'); // Navigate if token exists
          }
        } catch (error) {
          // console.error("Error fetching login token:", error);
        }
      };
      fetchData();
    }
  
  }, [loginOtpResponse,navigation]);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setResendDisabled(false); // Enable resend button after countdown
    }
  }, [countdown]);
  const submitOtpData=()=>{
    if (!otpData.trim()) {
      setError("please enter your otp"); // Show error if phone number is empty
    }else if(otpData!==otp){
   setError('Invalid OTP')
    }
     else {
      setError(""); // Clear the error
      
    }
    // console.log('match otp is',otpData)
    dispatch(finalLoginWithOtpAsync({otp:otpData}))
    setOtpData('')
  }

  const resetOtpHandler=()=>{
    // console.log('phone number for reset')
    setCountdown(10); 
    setPhone(phoneNumber)
    dispatch(loginWithOtpAsync(phoneObj))
    setResendDisabled(true);
  }
  const changeHandler=()=>{
    // console.log('change had')
navigation.navigate('LoginWithOtpPage')
  }

return (
    <>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 25, paddingLeft: 16, paddingTop:80 }}>Enter OTP</Text>
            <Text style={{paddingLeft:16 ,paddingTop:10}}>please enter the verification code </Text>
            <Text style={{paddingLeft:16}}> sent to +91{phoneNumber}</Text>
          </View>
          <View style={{marginTop:30,marginLeft:15,marginRight:15}} >
          <OtpInput numberOfDigits={5} onTextChange={(text) =>setOtpData(text)} />
          {error ? <Text style={{ color: 'red', marginLeft: 12 }}>{error}</Text> : null}
          </View>
          <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:8}}>
            <View style={{width:'50%', overflow: 'hidden' }}>
              <Pressable   onPress={changeHandler}>
              <Button
                      mode="outlined"
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:11,
                         fontSize: 16, 
                         justifyContent:'center',
                         marginTop: 20,
                         marginLeft: 12,
                         marginRight: 20,
                         backgroundColor:"transparent",
                         borderColor:'black',
                      }}
                    labelStyle={{
                      color:'black'
                    }}
                    >
         CHANGE
                    </Button>
              </Pressable>
            </View>
            <View style={{width:'50%', overflow: 'hidden' }}>
              <Pressable  onPress={resetOtpHandler}  disabled={resendDisabled}>
              <Button
                      mode="outlined"
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:11,
                         fontSize: 16, 
                         justifyContent:'center',
                         marginTop: 20,
                         marginLeft: 12,
                         marginRight: 20,
                         backgroundColor:"transparent",
                         borderColor: resendDisabled ? "gray" : "black",
                      }}
                      labelStyle={{
                        color: resendDisabled ? "gray" : "black",
                      }}
                    >
           {resendDisabled ? `Resend in ${countdown}s` : "RESEND"}
                    </Button>
              </Pressable>
            </View>
          </View>
         { phone &&<Text style={{paddingLeft:13,color:'green',paddingTop:10}}>Successfully sent OTP to +91{phone}</Text>}
          <View style={{ width: '100%', overflow: 'hidden',marginTop:8 }}>
               <Button
                      mode="contained"
                      onPress={submitOtpData}
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
    </>
)
}
export default LoginWithOtpData