
import { OtpInput } from "react-native-otp-entry";
import { View,Text,Image,ActivityIndicator,StatusBar } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { verifyOtpAsync } from '../../Redux/Slice/verifyOtpSlice/verifyOtpSlice';
const VerifyOtp=({datas})=>{
    console.log('data is',datas)
    const navigation = useNavigation();
    const dispatch=useDispatch()
    const [myOtp,setMyOtp]=useState('')
    const [otpError,setOtpError]=useState('')
    const [loading, setLoading] = useState(false);
    const loginUser=useSelector((state)=>state.verifyOtp.loginObj)
    console.log('login uses',loginUser)

    const verifyOtpHandler=()=>{
        if (loading) return; 
        setLoading(true)
       if(datas.otp.toString()!==myOtp){
        setOtpError('Otp is not valid')
        setLoading(false)
        return
       }
  
      const finalOtpObj = {
        phone: datas?.phone,
      };
      //  console.log('final otp obj',finalOtpObj)
      dispatch(verifyOtpAsync(finalOtpObj))
      }


    const cancelOtpHandler=()=>{
        if(datas){
          navigation.goBack()
        }
        else{
          navigation.navigate('LoginPage')
        }
      }

  //     useEffect(() => {
  //   if (loginUser?.token) {
  //     const saveToSecureStore = async () => {
  //       try {
  //         await SecureStore.setItemAsync('loginObj', JSON.stringify(loginUser));
  //         console.log("Login data stored successfully!");
  //       } catch (error) {
  //         // console.error("Failed to store login data:", error);
  //       }
  //   };
  //     saveToSecureStore();
  //     navigation.navigate('HeaderPage');
  //   }
  // }, [loginUser?.token]);
  useEffect(() => {
    if (!loginUser) return;
  
    if (loginUser?.token) {
      const saveToSecureStore = async () => {
        try {
          await SecureStore.setItemAsync(
            "loginObj",
            JSON.stringify(loginUser)
          );
        } catch (error) {}
  
        setLoading(false);
        navigation.navigate("HeaderPage");
      };
  
      saveToSecureStore();
    } else {
      // API response aa gaya lekin token nahi mila
      setLoading(false);
    }
  }, [loginUser]);
return (
    <>
<StatusBar
      translucent={false}
      backgroundColor="#343434"
      barStyle="light-content"
    />
        <View style={{backgroundColor:'black',flex:1}}>
        <Text style={{textAlign:'center',paddingBottom:15,color: '#6B7280'}}>otp send to {datas?.email} </Text>
        <View style={{ paddingHorizontal: 16 }}>
    <OtpInput numberOfDigits={5} onTextChange={(text) => setMyOtp(text)}
     theme={{
      pinCodeTextStyle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "600",
      },
    }}
    />
      </View> 
      <Text style={{color:'red',textAlign:'center',paddingTop:4}}>{otpError}</Text>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View style={{marginTop:11}}>
      <Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:23,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         alignItems: "center",  
                         marginLeft: 12,
                         marginTop:12,
                         marginRight: 20,
                         width:`${loading?100:""}`
                      }}
                      buttonColor="#007BFF"
                      onPress={verifyOtpHandler}
                    >
           {
                    loading?
                    <ActivityIndicator color="#fff" />
                    :'VERiFY OTP'
                   }
                    </Button>
      </View>
      <View style={{marginTop:11}}>
       <Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:23,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         marginLeft: 12,
                         marginTop:12,
                         marginRight: 20,
                      }}
                      buttonColor="#6C757D"
                      onPress={cancelOtpHandler}
                    >
           CANCEL
                    </Button>
       </View>
      </View>
      </View>

    </>
)
}
export default VerifyOtp