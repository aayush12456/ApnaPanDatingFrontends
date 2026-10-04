import { ScrollView,View } from "react-native";
import { useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Card, Button,Text } from "react-native-paper";
import { getAllChatIdData,  clearChatIdData} from "../../Redux/Slice/getAllChatIdSlice/getAllChatIdSlice";
import { deleteChatIdAsync } from "../../Redux/Slice/deleteChatIdSlice/deleteChatIdSlice";
const ChatId=()=>{
const dispatch=useDispatch()
const id=1
useEffect(()=>{
if(id){
    dispatch(getAllChatIdData(id))
}
},[id])
const chatIdSelectorArray=useSelector((state)=>state.getAllChatId.getAllChatIdArray.chatIdArray)
console.log('chat id array',chatIdSelectorArray)

const deleteChatIdHandler=async()=>{
const deleteChatIdObj={
    id:id
}
const result = await dispatch(
    deleteChatIdAsync(deleteChatIdObj)
  );

  if (deleteChatIdAsync.fulfilled.match(result)) {
    dispatch(clearChatIdData());
  }
}
return (
    <>
    <ScrollView>
{
    chatIdSelectorArray?.length>0?  chatIdSelectorArray?.map((chatObj,index)=>{
        return (
            <Card
            key={chatObj._id || index} // Unique key: use _id if available, or index as fallback
            style={{
              marginLeft: 8,
              marginRight: 8,
              marginTop: 20,
              backgroundColor: `#343434`

            }}
          >
            <Card.Content>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View>
    <Text style={{color:"white"}}>Login Name</Text>
    <Text style={{color:"white",paddingTop:10}}>{chatObj.loginName}</Text>
</View>
<View>
    <Text style={{color:"white"}}>Another Name</Text>
    <Text style={{color:"white",paddingTop:10}}>{chatObj.anotherName}</Text>
</View>
</View>

<View>
<View style={{paddingTop:20,flexDirection:"row",gap:5}}>
    <Text style={{color:"white"}}>Login Id : </Text>
    <Text style={{color:"white"}}>{chatObj.loginId}</Text>
</View>
<View style={{paddingTop:20,flexDirection:"row",gap:5}}>
    <Text style={{color:"white"}}>Another Id</Text>
    <Text style={{color:"white"}}>{chatObj.anotherId}</Text>
</View>
</View>

            </Card.Content>
            </Card>
        )
    })
    :
    <Text style={{color:'white',textAlign:"center",paddingTop:20}}>Chat id is not avaialble</Text>
}
{ chatIdSelectorArray?.length>0? <Button
                      mode="contained"
                      style={{
                        borderRadius: 10,
                        height:50,
                        paddingTop:4,
                        marginTop:20,
                        marginBottom:20,
                        width:"90%",
                        marginLeft:15
                        
                      }}
                      buttonColor="red"
                      onPress={(e)=>{
                        // e.stopPropagation();
                        deleteChatIdHandler()
                      }}
                    >
                      Delete
                    </Button>:null}
</ScrollView>
    </>
)
}
export default ChatId