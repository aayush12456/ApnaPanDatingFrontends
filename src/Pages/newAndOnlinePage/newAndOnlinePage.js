import NewAndOnline from "../../components/newAndOnline/newAndOnline"
import {View} from 'react-native'

const NewAndOnlinePage=({route,finalCompleteObj,planStatus})=>{

   
    const completeLoginObjData=finalCompleteObj || {}
return(
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <NewAndOnline route={route} completeObj={completeLoginObjData} planStatus={planStatus}/>
    </View>
    </>
)
}
export default NewAndOnlinePage