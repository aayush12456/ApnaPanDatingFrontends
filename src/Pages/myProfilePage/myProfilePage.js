import MyProfile from "../../components/myProfile/myProfile"
import { View } from "react-native";
import { useNavigation } from '@react-navigation/native';
const MyProfilePage=({loginObj})=>{
  const navigation=useNavigation()
   
return(
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <MyProfile loginObj={loginObj} navigation={navigation}/>
    </View>
    </>
)
}
export default MyProfilePage