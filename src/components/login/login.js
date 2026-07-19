
import { TextInput } from 'react-native-paper';
import { Image, View, TouchableOpacity, Text,StatusBar } from "react-native";
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import { loginSchema } from '../../schemas';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import back from '../../../assets/signUpFormIcon/back.png';
import { userLoginAsync, clearLoginResponse } from '../../Redux/Slice/loginSlice/loginSlice';
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
// const socket = io.connect("https://apnapandatingbackend.onrender.com")
const Login=({navigation})=>{
  const dispatch=useDispatch()
  const [loading, setLoading] = useState(false);
  // const loginResponse=useSelector((state)=>state.loginData.loginData.token)
  const loginObj=useSelector((state)=>state.loginData.loginObj)
  // const loginError=useSelector((state)=>state.loginData.error)
  // console.log('login eror is',loginError)
  // const getAllLoginIdUserArray=useSelector((state)=>state.loginData.loginData.loginIdUserArray)
  // console.log('get all login id user array',getAllLoginIdUserArray)
  console.log(' login response data in login',loginObj)

  // useEffect(() => {
  //   if (getAllLoginIdUserArray) {
  //     socket.emit('loginUser',getAllLoginIdUserArray);
  //     // console.log('Emitted login data:',getAllLoginIdUserArray);
  //   }
  // }, [getAllLoginIdUserArray]);
  // useEffect(() => {
  //   if (loginResponse) {
  //     const saveToSecureStore = async () => {
  //       try {
  //         await SecureStore.setItemAsync('loginObj', JSON.stringify(loginObj));
  //         // console.log("Login data stored successfully!");
  //       } catch (error) {
  //         // console.error("Failed to store login data:", error);
  //       }
  //   };
  //     saveToSecureStore();
  //   }
  // }, [loginResponse]);

  

// useEffect(() => {
//   if(loginResponse){
//     const fetchData = async () => {
//       try {
//         const token = await SecureStore.getItemAsync('loginToken');
//         // console.log("Fetched Token:", token);
//         setLoginToken(token);
  
//         if (token) {
//           navigation.navigate('HeaderPage'); // Navigate if token exists
//         }
//       } catch (error) {
//         // console.error("Error fetching login token:", error);
//       }
//     };
//     fetchData();
//   }

// }, [loginResponse,navigation]);
useEffect(() => {
  if (loginObj?.mssg === "Send OTP successfully") {
    setLoading(false);
    navigation.navigate("verifyOtpPage", {
   formData:loginObj
    });

    const timer = setTimeout(() => {
      dispatch(clearLoginResponse());
    }, 60000); // 1 minute

    return () => clearTimeout(timer);
  }
}, [loginObj, navigation, dispatch]);


return (
  <>
  <Formik
      initialValues={{
        phone: '',
      }}
      validationSchema={loginSchema}
      onSubmit={(values,action) => {
        setLoading(true);
        console.log('value is',values)
       dispatch(userLoginAsync(values))
      
      }}
    >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
             <>
<StatusBar
      translucent={false}
      backgroundColor="#343434"
      barStyle="light-content"
    />
                 <View style={{backgroundColor:'black',flex:1}}>
                 <View style={{ flexDirection: 'row', justifyContent: 'start' }}>
            <TouchableOpacity onPress={() => navigation.navigate('FrontPage')}>
              <Image
                source={back}
                style={{ width: 15, height: 15, marginTop: 60, marginLeft: 15,tintColor:'white' }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 25, paddingLeft: 16, paddingTop: 20,color:'white' }}>Login</Text>
          </View>
               <View>
            <TextInput
              label="Phone Number"
              style={{ marginLeft: 12, marginRight: 20, marginTop: 30 }}
              mode="outlined"
              keyboardType="number-pad"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
            {touched.phone && errors.phone && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.phone}</Text>}
          </View>
              <View style={{ width: '100%', overflow: 'hidden' }}>
               <Button
                      mode="contained"
                      onPress={handleSubmit}

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
  {loading ? (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <ActivityIndicator
        size="small"
        color="#ffffff"
        style={{ marginLeft: -12 }}
      />
      <Text
        style={{
          color: "#ffffff",
          fontWeight: "600",
        }}
      >
        Sending OTP...
      </Text>
    </View>
  ) : (
    "LOGIN"
  )}
                    </Button>
          </View>
                 </View>

           {/* <Text style={{textAlign:'center',paddingTop:13}}>------   OR   ------</Text> */}
             </>
          )}
    </Formik>
   
  </>
    
)
}
export default Login