import NewAndOnline from "../../components/newAndOnline/newAndOnline"
import {View} from 'react-native'

const NewAndOnlinePage=({route,loginId,finalCompleteObj})=>{

   
    const completeLoginObjData=finalCompleteObj || {}
return(
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <NewAndOnline route={route} completeObj={completeLoginObjData}/>
    </View>
    </>
)
}
export default NewAndOnlinePage