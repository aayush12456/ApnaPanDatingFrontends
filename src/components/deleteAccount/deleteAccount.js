import deleteIcon from '../../../assets/AllIcons/deletePerson.png';
import { Button, Text } from "react-native-paper"
import { View, Image,ActivityIndicator } from 'react-native'
import {useDispatch,useSelector} from 'react-redux'
import {  deleteProfileUserAsync } from '../../Redux/Slice/deleteProfileUserSlice/deleteProfileUserSlice';
import { useNavigation } from '@react-navigation/native';
import { useEffect ,useState} from 'react';
import * as SecureStore from 'expo-secure-store';
const DeleteAccount=({loginId})=>{
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch()
  const navigation = useNavigation();
  const deleteProfileResponse=useSelector((state)=>state.deleteProfileData.deleteProfileUserObj.msg)
  // console.log('delete profile user',deleteProfileResponse)
  const deleteAccountHandler = async () => {
    if (loading) return;
  
    setLoading(true);
  
    try {
      await dispatch(deleteProfileUserAsync(loginId)).unwrap();
  
      // Login data delete only after successful API response
      await SecureStore.deleteItemAsync('loginObj');
  
    } catch (error) {
      console.log('Delete account error:', error);
    } finally {
      // Success OR error -> stop loader
      setLoading(false);
    }
  };
  useEffect(() => {
    if (deleteProfileResponse === "User deleted successfully") {
      navigation.navigate("FrontPage"); // Navigate to 'frontPage'
    }
  }, [deleteProfileResponse, navigation]);
return (
    <>
    <View>
    <View  style={{flexDirection:"row",justifyContent:"center",marginTop:20}}>
        <Image source={deleteIcon} style={{width:100,height:100}}/>
    </View>
    <Text style={{textAlign:'center',paddingLeft:9,paddingRight:9,paddingTop:15,color:`white`}}>We're sad to see you go. Deleting your account would remove all your personal information, messages, photos, matches and purchases. This action cannot be undone.Some information may be stored as per Privacy Policy for legal reasons, which will also be deleted after a grace period.If you decide to come back later and use the same profile, you can deactivate your profile instead.</Text>
    <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
    <View style={{width:"90%"}}  >
    <Button
  mode="contained"
  style={{
    height: 50,
    justifyContent: 'center',
    borderRadius: 6,
  }}
  buttonColor="#EF4444"
  onPress={loading ? undefined : deleteAccountHandler}
>
  {loading ? (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator
        size="small"
        color="#FFFFFF"
        style={{ marginRight: 10 }}
      />

      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: '600',
        }}
      >
    Deleting...
      </Text>
    </View>
  ) : (
    'Delete Account'
  )}
</Button>
            </View>
    </View>
    </View>
    </>
)
}
export default DeleteAccount