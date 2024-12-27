import React, { useState } from "react";
import { Text,TextInput } from "react-native-paper"
import { Image, View, TouchableOpacity,  Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import back from '../../../assets/signUpFormIcon/back.png';
import { Button } from 'react-native-paper';
import {  useDispatch  } from "react-redux";
import { loginWithOtpAsync } from "../../Redux/Slice/loginWithOtpSlice/loginWithOtpSlice";
const LoginWithOtp=({allPhoneNumberArray})=>{
    const navigation = useNavigation();
    const dispatch=useDispatch()
    const [phoneNumber, setPhoneNumber] = useState(""); 
    const [error, setError] = useState(""); 

    const handleSendOtp = () => {
      if (!phoneNumber.trim()) {
          setError("Please enter your phone number"); // Show error if phone number is empty
      } else if (!allPhoneNumberArray.includes(phoneNumber.trim())) {
          setError("Phone number does not exist"); // Show error if phone number is not in the array
      } else {
          setError(""); // Clear the error
          console.log("Phone Number:", phoneNumber); // Log the phone number
          const phoneObj = {
              phone: phoneNumber,
              reset: 'login data',
          };
          dispatch(loginWithOtpAsync(phoneObj));
          setPhoneNumber(''); // Clear the input field
          navigation.navigate('LoginWithOtpDataPage')
      }
  };
return (
    <>
    <View>
    <View style={{ flexDirection: 'row', justifyContent: 'start' }}>
            <TouchableOpacity onPress={() => navigation.navigate('FrontPage')}>
              <Image
                source={back}
                style={{ width: 15, height: 15, marginTop: 60, marginLeft: 15 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 25, paddingLeft: 16, paddingTop: 20 }}>Login With OTP</Text>
          </View>
          <View>
            <TextInput
              label="Enter your registered mobile number"
              style={{ marginLeft: 12, marginRight: 20, marginTop: 30 }}
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
     SEND OTP
                    </Button>
          </View>
    </View>

    </>
)
}
export default LoginWithOtp