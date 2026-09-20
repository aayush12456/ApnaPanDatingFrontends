
import { TextInput } from 'react-native-paper';
import { Image, View, TouchableOpacity, Text,StatusBar,Alert } from "react-native";
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import { loginSchema } from '../../schemas';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import back from '../../../assets/signUpFormIcon/back.png';
import { clearLoginResponse, userLoginAsync} from '../../Redux/Slice/loginSlice/loginSlice';
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
// const socket = io.connect("https://apnapandatingbackend.onrender.com")
const Login=({navigation})=>{
  const dispatch=useDispatch()
  const [loading, setLoading] = useState(false);
  const [errorBack,setErrorBack]=useState('')

  const loginObj=useSelector((state)=>state.loginData.loginObj)
  const errorObj=useSelector((state)=>state.loginData)
  // console.log('error objs',errorObj)
  // console.log(' login response data in login',loginObj)

 
useEffect(() => {
  if (loginObj?.mssg === "Send OTP successfully") {
    setLoading(false);
    navigation.navigate("verifyOtpPage", {
   formData:loginObj
    });

    // const timer = setTimeout(() => {
    //   dispatch(clearLoginResponse());
    // }, 30000); // 1 minute

    // return () => clearTimeout(timer);
  }
  else if(errorObj.error=="No account found with this phone number."){
    setErrorBack(errorObj.error)
    setLoading(false)
    dispatch(clearLoginResponse())
  }
}, [loginObj, errorObj.error, navigation, dispatch]);


return (
  <>
  <Formik
      initialValues={{
        phone: '',
      }}
      validationSchema={loginSchema}
      onSubmit={(values,action) => {
        setLoading(true);
        setErrorBack('');
        // console.log('value is',values)
       
  if (values.phone === "9479918217") {
    setLoading(false);

    Alert.alert(
      "Login",
      "Please choose how you want to continue.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Admin Login",
          onPress: () => {
            // Admin login logic
            // console.log("Admin Login clicked");
            navigation.navigate("verifyOtpPage",{
              formData:{name:"admin"}
               })
          },
        },
        {
          text: "User Login",
          onPress: () => {
            dispatch(userLoginAsync(values));
          },
        },
      ]
    );
  } 
        else{
          dispatch(userLoginAsync(values))
        }
      
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
              onChangeText={(text) => {
                setErrorBack('');
                handleChange('phone')(text);
              }}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
            {touched.phone && errors.phone && <Text style={{ color: 'red', marginLeft: 12,paddingTop:3 }}>{errors.phone}</Text>}
            {errorBack?<Text style={{ color: 'red', marginLeft: 12,paddingTop:3 }}>{errorBack}</Text>:null}
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
                      buttonColor="#6D21FF"
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
             </>
          )}
    </Formik>
   
  </>
    
)
}
export default Login