
import { TextInput } from 'react-native-paper';
import { Image, View, TouchableOpacity, Text, Pressable } from "react-native";
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import { loginSchema } from '../../schemas';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import back from '../../../assets/signUpFormIcon/back.png';
import { userLoginAsync } from '../../Redux/Slice/loginSlice/loginSlice';
import { useEffect,useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import closeEye from '../../../assets/AllIcons/closedeye.png'
import openEye from '../../../assets/AllIcons/openeye.png'
import io from "socket.io-client";
const socket = io.connect("http://192.168.29.169:4000")
const Login=({navigation})=>{
  const [loginToken,setLoginToken]=useState(null)
  const [showPassword, setShowPassword] = useState(false);
  const dispatch=useDispatch()
  const loginResponse=useSelector((state)=>state.loginData.loginData.token)
  const loginObj=useSelector((state)=>state.loginData.loginData.loginData)
  const loginError=useSelector((state)=>state.loginData.error)
  console.log('login eror is',loginError)
  const getAllLoginIdUserArray=useSelector((state)=>state.loginData.loginData.loginIdUserArray)
  console.log('get all login id user array',getAllLoginIdUserArray)
  console.log(' login response data in login',loginObj)

  useEffect(() => {
    if (getAllLoginIdUserArray) {
      socket.emit('loginUser',getAllLoginIdUserArray);
      console.log('Emitted login data:',getAllLoginIdUserArray);
    }
  }, [getAllLoginIdUserArray]);
  useEffect(() => {
    if (loginResponse) {
      const saveToSecureStore = async () => {
        try {
          await SecureStore.setItemAsync('loginObj', JSON.stringify(loginObj));
          console.log("Login data stored successfully!");
        } catch (error) {
          console.error("Failed to store login data:", error);
        }
    };
      saveToSecureStore();
    }
  }, [loginResponse]);

  

useEffect(() => {
  if(loginResponse){
    const fetchData = async () => {
      try {
        const token = await SecureStore.getItemAsync('loginToken');
        console.log("Fetched Token:", token);
        setLoginToken(token);
  
        if (token) {
          navigation.navigate('HeaderPage'); // Navigate if token exists
        }
      } catch (error) {
        console.error("Error fetching login token:", error);
      }
    };
    fetchData();
  }

}, [loginResponse,navigation]);

const generateNumber=Math.floor(1000 + Math.random() * 9000).toString(); 
const generateNumberObj={
  number:generateNumber
}

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};
const loginWithOtpHandler=()=>{
  console.log('login with otp')
  navigation.navigate('LoginWithOtpPage');
}
const forgotPasswordHandler=()=>{
  navigation.navigate('ForgotPasswordPage',{formData:generateNumberObj});
}
return (
  <>
  <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={(values,action) => {
       dispatch(userLoginAsync(values)).unwrap().then(()=>{ // form me password ya email galat nhi hai to form clear ho jayega ye check
        action.resetForm();                                 // hoga backend se jo response aa rha hai usse
       }). catch(() => {
        console.log("Login failed, form not reset.");
      });
      
      }}
    >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
             <>
              <View style={{ flexDirection: 'row', justifyContent: 'start' }}>
            <TouchableOpacity onPress={() => navigation.navigate('FrontPage')}>
              <Image
                source={back}
                style={{ width: 15, height: 15, marginTop: 60, marginLeft: 15 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 25, paddingLeft: 16, paddingTop: 20 }}>Login</Text>
          </View>
               <View>
            <TextInput
              label="Email"
              style={{ marginLeft: 12, marginRight: 20, marginTop: 30 }}
              mode="outlined"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.email}</Text>}
          </View>
          <View>
            <View style={{flexDirection:'row'}}>
            <TextInput
                  label="Password"
                  style={{ marginLeft: 12, marginRight: 20, marginTop: 9 ,width:'91%'}}
                  mode="outlined"
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  type='text'
                />
               { !showPassword &&<Pressable onPress={togglePasswordVisibility}>
                <Image source={closeEye} style={{width:25,height:25,marginLeft:-65,marginTop:30}}/>
                </Pressable>}
               {showPassword&& <Pressable onPress={togglePasswordVisibility}>
                <Image source={openEye} style={{width:25,height:25,marginLeft:-65,marginTop:30}}/>
                </Pressable>}
            </View>
                {touched.password && errors.password && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.password}</Text>}
                {loginError && <Text style={{ color: 'red', marginLeft: 12 }}>{loginError}</Text>}
              </View>
              <Pressable onPress={forgotPasswordHandler}>
              <Text style={{textAlign:'right',paddingRight:22,paddingTop:4}}>Forgot your password?</Text>
              </Pressable>
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
         LOGIN
                    </Button>
          </View>
           <Text style={{textAlign:'center',paddingTop:13}}>------   OR   ------</Text>
             </>
          )}
    </Formik>
    <View style={{ width: '100%', overflow: 'hidden' }}>
           <Button
                      mode="outlined"
                      onPress={loginWithOtpHandler}
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
         LOGIN WITH OTP
                    </Button>

           </View>
  </>
    
)
}
export default Login