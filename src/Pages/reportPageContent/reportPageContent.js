import { StatusBar,View} from 'react-native';
import ReportLargeCard from '../../components/common/reportLargeCard/reportLargeCard';
const ReportPageContent=({route})=>{
    const user=route?.params?.formData
    console.log('users',user)
return (
    <>
      <StatusBar
      translucent={false}
      backgroundColor="#343434"
      barStyle="light-content"
    />
        <View style={{backgroundColor:"black"}}>
            <ReportLargeCard user={user}/>
        </View>
    </>
)
}
export default ReportPageContent