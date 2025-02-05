import { View } from "react-native"
import { TextInput } from 'react-native-paper';
import { Text } from "react-native-paper";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Formik } from 'formik';
import { updatePasswordSchema } from "../../schemas";
import { useSelector,useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import { PasswordUpdateAsync } from "../../Redux/Slice/passwordUpdateSlice/passwordUpdateSlice";
import * as SecureStore from 'expo-secure-store'
import { showToast } from "../../Redux/Slice/toastSlice/toastSlice";
const ChangePassword=({completeObj})=>{
  const [loginId, setLoginId] = useState('')
  const [notMatch,setNotMatch]=useState('')
    const navigation = useNavigation();
    const dispatch=useDispatch()
    const loginResponse = useSelector((state) => state.loginData.loginData.token)
    const loginOtpResponse=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.token) // otp login token
    const passwordUpdateObj=useSelector((state)=>state.passwordUpdate.addPasswordUpdateData)
    // console.log('password update obj',passwordUpdateObj)
    const cancelClickHandler=()=>{
        navigation.navigate('AccountSettingsPage',{formData:{headerName:'Account Settings'}})
    }
    useEffect(() => {
      if (loginResponse || loginOtpResponse) {
        const getLoginId = async () => {
          const loginIdData = await SecureStore.getItemAsync('loginId');
          setLoginId(loginIdData)
        };
        getLoginId()
      }
    }, [loginResponse,loginOtpResponse])

return (
    <>
        <Formik
      initialValues={{
      currentPassword:'',
      newPassword:'',
      confirmNewPassword:''
      }}
      validationSchema={updatePasswordSchema}
      onSubmit={async(values,action) => {
        const passwordObj={
          id:loginId,
         currentPassword:values.currentPassword,
         newPassword:values.newPassword,
         confirmNewPassword:values.confirmNewPassword
       }
       if(passwordObj.newPassword !==passwordObj.confirmNewPassword){
           setNotMatch('Both the passwords you typed do not match. Please use identical passwords in both the form fields.')
          return
       }
        // console.log('password obj  is', passwordObj); // Handle form submissio
          dispatch(PasswordUpdateAsync(passwordObj))
          dispatch(
            showToast({
              type: 'SUCCESS',
              title: 'Success',
              textBody: 'You have successfully changed your password please re-login to continue',
            })
          );
        action.resetForm();
        await SecureStore.deleteItemAsync('loginObj');
        await SecureStore.deleteItemAsync('loginToken');
        navigation.navigate('FrontPage');
      }}
    >
       {({ handleChange, handleSubmit, values, errors, touched ,handleBlur}) => (
        <>
        <View style={{marginTop:20}}>
        <View>
<Text style={{paddingLeft:12,
  color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>Current Password</Text>
<View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
        >
<TextInput
            style={{
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: "#ccc",
              paddingHorizontal: 10,
              borderRadius: 5,
              backgroundColor: "#fff",
              marginRight: 12,
              height: 40,

            }}
            onChangeText={handleChange('currentPassword')}
            onBlur={handleBlur('currentPassword')}
            value={values.currentPassword}
             name="currentPassword"
              type="password"  
          />
          </View>
          {errors.currentPassword && touched.currentPassword? <Text style={{ color: 'red', marginLeft: 12 }}>{errors.currentPassword}</Text>:null}
        </View>

        <View>
<Text style={{paddingLeft:12,
color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>New Password</Text>
<View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
        >
<TextInput
            style={{
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: "#ccc",
              paddingHorizontal: 10,
              borderRadius: 5,
              backgroundColor: "#fff",
              marginRight: 12,
              height: 40,
            }}
            onChangeText={handleChange('newPassword')}
            onBlur={handleBlur('newPassword')}
            value={values.newPassword}
             name="newPassword"
              type="password"  
          />
          </View>
          {errors.newPassword && touched.newPassword? <Text style={{ color: 'red', marginLeft: 12 }}>{errors.newPassword}</Text>:null}
        </View>

        <View>
<Text style={{paddingLeft:12,
  color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>confirm New Password</Text>
<View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
        >
<TextInput
            style={{
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: "#ccc",
              paddingHorizontal: 10,
              borderRadius: 5,
              backgroundColor: "#fff",
              marginRight: 12,
              height: 40,
            }}
            onChangeText={handleChange('confirmNewPassword')}
            onBlur={handleBlur('confirmNewPassword')}
            value={values.confirmNewPassword}
             name="confirmNewPassword"
              type="password"  
          />
          </View>
          {errors.confirmNewPassword && touched.confirmNewPassword? <Text style={{ color: 'red', marginLeft: 12 }}>{errors.confirmNewPassword}</Text>:null}
        </View>
        <View style={{flexDirection:"row",marginLeft:12,marginTop:10,justifyContent:"space-between"}}>
            <View style={{width:'40%'}} >
            <Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         borderRadius: 6
                            
                      }}
                      buttonColor="#bbc5d1"
                      onPress={cancelClickHandler}
                    >
                  Cancel
                    </Button>
            </View>
            {/* <AlertNotificationRoot> */}
            <View  style={{width:'40%',marginRight:20}} >

<Button
                mode="contained"
                title={'Save'}
                style={{
                  height: 50, // Set the desired height
                  color: '#FFFFFF',
                   fontSize: 16, 
                   justifyContent:'center',
                   borderRadius: 6
      
                }}
                buttonColor="#5394e4"
                onPress={handleSubmit}
              >
               Save
              </Button>
</View>
            {/* </AlertNotificationRoot> */}

                   
        </View>
    </View>
        </>
       )
                    }
    </Formik>
    
    </>
)
}
export default ChangePassword