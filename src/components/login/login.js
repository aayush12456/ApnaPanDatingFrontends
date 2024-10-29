
import { TextInput } from 'react-native-paper';
import { Image, View, TouchableOpacity, Text, Button } from "react-native";
import { Formik } from 'formik';
import { loginSchema } from '../../schemas';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import back from '../../../assets/signUpFormIcon/back.png';
import { userLoginAsync } from '../../Redux/Slice/loginSlice/loginSlice';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
const Login=({navigation})=>{
  const dispatch=useDispatch()
  const loginResponse=useSelector((state)=>state.loginData.loginData.token)
  const loginObj=useSelector((state)=>state.loginData.loginData.loginData)
  console.log(' login response data in login',loginObj)
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
      navigation.navigate('HeaderPage');
    }
  }, [loginResponse, navigation,loginObj]);
  
return (
  <>
  <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={(values,action) => {
        // navigation.navigate('AdditionalPage',{formData:values})
       dispatch(userLoginAsync(values)) 
     
        action.resetForm();
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
                <TextInput
                  label="Password"
                  style={{ marginLeft: 12, marginRight: 20, marginTop: 9 }}
                  mode="outlined"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {touched.password && errors.password && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.password}</Text>}
              </View>

              <View style={{ width: '100%', overflow: 'hidden' }}>
            <TouchableOpacity
              style={{
                height: 50,
                backgroundColor: '#F00000',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                marginLeft: 12,
                marginRight: 20,
                borderRadius: 11
              }}
              onPress={handleSubmit}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16 }}>SUBMIT</Text>
            </TouchableOpacity>
          </View>

             </>
          )}
    </Formik>
  </>
    
)
}
export default Login

