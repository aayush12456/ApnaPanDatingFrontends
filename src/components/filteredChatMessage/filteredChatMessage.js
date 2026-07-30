import {Text,View} from 'react-native'
const FilteredChatMessage=({ filterMessage,filterUser,loginObj,recordMessageId,completeObj})=>{

    const truncateText = (text = '', maxLength =10) => {
        if (!text || typeof text !== 'string') return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
      };
return (
    <View  >
    <View style={{flexDirection:"row",gap:20,paddingTop:4}}>
        {filterMessage?.senderId===filterUser?._id &&filterMessage?.recieverId===loginObj?._id &&<Text   numberOfLines={1}
  ellipsizeMode="tail" style={{fontSize:13.5,fontWeight:`${recordMessageId===true?'bold':'normal'}`,
     color: `white`}}>{filterMessage?.message? truncateText(filterMessage.message):filterMessage?.image?"Received an attachment":''}</Text>}

        {filterMessage?.senderId===filterUser?._id && filterMessage?.recieverId===loginObj?._id &&<Text style={{fontSize:11.5,paddingTop:2,fontWeight:`${recordMessageId===true?'bold':'normal'}`
    , color: `white`}}>{new Date(filterMessage.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>}
    </View>

    <View style={{flexDirection:"row",gap:20}}>
        {filterMessage?.senderId===loginObj?._id && filterMessage?.recieverId===filterUser?._id && <Text   numberOfLines={1}
  ellipsizeMode="tail" style={{marginLeft:'-2%',fontSize:13.5, 
        color: `white`}}>{filterMessage?.message? `You : ${truncateText(filterMessage.message)}`:filterMessage?.image?"You : Sent an attachment":""}</Text>}

        {filterMessage?.senderId===loginObj?._id && filterMessage?.recieverId===filterUser?._id &&<Text style={{fontSize:11.5,paddingTop:2, color: `white`
    }}>{new Date(filterMessage.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>}
    </View>
    </View>
)
}
export default FilteredChatMessage