import { useState } from "react"
import { View } from "react-native"
import { Text,TextInput,Button } from "react-native-paper"
import { useDispatch } from "react-redux"
import { forgotUpdatePasswordUserAsync } from "../../Redux/Slice/forgotUpdatePasswordUserSlice/forgotUpdatePasswordUserSlice"
import { showToast } from "../../Redux/Slice/toastSlice/toastSlice"
import { useNavigation } from '@react-navigation/native';
const ResetPassword=({phoneNumber})=>{
    const dispatch=useDispatch()
    const navigation = useNavigation();
    const [error, setError] = useState(""); 
    const [confirmError, setConfirmError] = useState(""); 
    const [newPassword,setNewPassword]=useState('')
    const [confirmNewPassword,setConfirmNewPassword]=useState('')
    const [commonError,setCommonError]=useState('')
    const handleSubmitPassword = () => {
      
        if(!newPassword.trim()){
            setError("Please enter new password");
        }
        if(!confirmNewPassword.trim()){
            setConfirmError("Please enter confirm new password");
        }
        if(newPassword!==confirmNewPassword){
setCommonError('password not match')
        }
        else {
            setError(""); // Clear the error
            setConfirmError("")
            setCommonError('')
            const updatePasswordObj = {
                phoneNumber: phoneNumber,
                confirmNewPassword:confirmNewPassword
            };
            dispatch(forgotUpdatePasswordUserAsync(updatePasswordObj));
            dispatch(
                showToast({
                  type: 'SUCCESS',
                  title: 'Success',
                  textBody: 'You have successfully changed your password please re-login to continue',
                }))
            setNewPassword('');
            setConfirmNewPassword("")
            navigation.navigate('FrontPage');
        }
    };
return (
    <>
    <View>
    <Text style={{ fontWeight: 'bold', fontSize: 25, paddingLeft: 16, paddingTop: 75 }}>Reset Password</Text>
    </View>
    <View>
            <TextInput
              label="New Password"
              style={{ marginLeft: 12, marginRight: 20, marginTop: 15 }}
              mode="outlined"
              onChangeText={(text) => {
                setNewPassword(text); // Update phone number state
                if (error) setError(""); // Clear error when typing starts
              }}
            />
            {error ? <Text style={{ color: 'red', marginLeft: 12 }}>{error}</Text> : null}
          </View>
          <View>
            <TextInput
              label="Confirm New Password"
              style={{ marginLeft: 12, marginRight: 20, marginTop: 15 }}
              mode="outlined"
              onChangeText={(text) => {
                setConfirmNewPassword(text); // Update phone number state
                if (error) setConfirmError(""); // Clear error when typing starts
              }}
            />
            {confirmError ? <Text style={{ color: 'red', marginLeft: 12 }}>{confirmError}</Text> : null}
          </View>
          {commonError ? <Text style={{ color: 'red', marginLeft: 12 }}>{commonError}</Text> : null}
          <View style={{ width: '100%', overflow: 'hidden' }}>
               <Button
                      mode="contained"
                      onPress={handleSubmitPassword}
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
export default ResetPassword