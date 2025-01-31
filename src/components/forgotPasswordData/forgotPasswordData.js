import { Text,Button } from "react-native-paper"
import {  View, } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { useState} from "react";
import { useNavigation } from '@react-navigation/native';
const ForgotPasswordData=({phone,otp})=>{
    const navigation = useNavigation();
    const [otpData,setOtpData]=useState('')
    const [error,setError]=useState('')
    const submitOtpData=()=>{
        if (!otpData.trim()) {
          setError("please enter your otp"); // Show error if phone number is empty
        }else if(otpData!==otp){
       setError('Invalid OTP')
        }
         else {
          setError(""); // Clear the error
          
        }
        console.log('match otp is',otpData)
        setOtpData('')
        navigation.navigate('ResetPasswordPage')
      }

return (
    <>
    <View>
    <Text style={{ fontWeight: 'bold', fontSize: 25, paddingLeft: 16, paddingTop: 75 }}>Reset Password</Text>
    <Text style={{paddingLeft:16 ,paddingTop:10}}>please enter the verification code </Text>
            <Text style={{paddingLeft:16}}> sent to +91{phone}</Text>
<View style={{marginTop:30,marginLeft:15,marginRight:15}}>
<OtpInput numberOfDigits={5} onTextChange={(text) =>setOtpData(text)} />
{error ? <Text style={{ color: 'red', marginLeft: 12 }}>{error}</Text> : null}
</View>
<View style={{ width: '100%', overflow: 'hidden',marginTop:8 }}>
               <Button
                  onPress={submitOtpData}
                      mode="contained"
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
    </View>
    </>
)
}
export default ForgotPasswordData