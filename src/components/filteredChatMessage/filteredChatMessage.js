import {Text,View} from 'react-native'
const FilteredChatMessage=({ filterMessage,filterUser,loginObj,index,recordMessageId})=>{
    // {filterItem.senderId===chatItem._id && filterItem.recieverId===id 
    // filterItem.senderId===id && filterItem.recieverId===chatItem._id
    console.log('record message id',recordMessageId) 
return (
    <View key={filterMessage._id || index} >
    <View style={{flexDirection:"row",gap:20,paddingTop:4}}>
        {filterMessage.senderId===filterUser._id &&filterMessage.recieverId===loginObj._id &&<Text style={{fontSize:13.5,fontWeight:`${recordMessageId===true?'bold':'normal'}`}}>{filterMessage.message}</Text>}
        {filterMessage.senderId===filterUser._id && filterMessage.recieverId===loginObj._id &&<Text style={{fontSize:11.5,paddingTop:2,fontWeight:`${recordMessageId===true?'bold':'normal'}`}}>{new Date(filterMessage.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>}
    </View>

    <View style={{flexDirection:"row",gap:20}}>
        {filterMessage.senderId===loginObj._id && filterMessage.recieverId===filterUser._id && <Text style={{marginLeft:'-2%',fontSize:13.5}}> You : {filterMessage.message}</Text>}
        {filterMessage.senderId===loginObj._id && filterMessage.recieverId===filterUser._id &&<Text style={{fontSize:11.5,paddingTop:2}}>{new Date(filterMessage.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>}
    </View>
    </View>
)
}
export default FilteredChatMessage