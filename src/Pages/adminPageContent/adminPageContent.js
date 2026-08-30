import AdminLargeCard from "../../components/common/adminLargeCard/adminLargeCard"
import { StatusBar,View} from 'react-native';
const AdminPageContent=({route})=>{
    // console.log('route page',route)
    const userObj=route?.params?.formData
return (
    <>
      <StatusBar
      translucent={false}
      backgroundColor="#343434"
      barStyle="light-content"
    />
    <View style={{backgroundColor:"black"}}>
    <AdminLargeCard userObj={userObj}/>
    </View>

    </>
)
}
export default AdminPageContent