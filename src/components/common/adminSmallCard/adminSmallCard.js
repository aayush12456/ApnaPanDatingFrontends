import { Text, Card ,Button} from "react-native-paper";
import { View,Image } from "react-native";
import { useDispatch } from "react-redux";
import { deleteProfileArrayAsync } from "../../../Redux/Slice/deleteProfileArraySlice/deleteProfileArraySlice";
const AdminSmallCard=({commonObj,id})=>{
    const dispatch = useDispatch()
    console.log(' admin id is',id)
// let firstName=likeFilter?.firstName||likes?.firstName||likeUser?.firstName||matchUser?.firstName
// ||anotherMatch?.firstName||onlineLike?.firstName||selfOnline?.firstName||skipUser?.firstName

// let image=likeFilter?.images[0]||likes?.images[0]||likeUser?.images[0]||
// matchUser?.images[0]||anotherMatch?.images[0]||onlineLike?.images[0]||selfOnline?.images[0]||skipUser?.images[0]

let firstName=commonObj?.firstName
let image=commonObj?.images[0]

const smallCardClickHander=(commonObj)=>{
console.log('first name',commonObj?.firstName)
const obj={
 id:id,
 deleteUserId:commonObj?._id   
}
console.log('delete obj',obj)
dispatch(deleteProfileArrayAsync(obj))
}
return (
    <>
    <Card style={{ marginLeft: 8, marginRight: 8, marginTop:15, 
      backgroundColor: `#343434` }} >
           <Card.Content >
           <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                      <Image
                      source={{ uri: image }}
                      style={{ width: 65, height: 65, borderRadius: 70 }}
                    />
                      <Text style={{  color:`white`, fontWeight: "500",paddingTop:9 }}>
                      {firstName}
                    </Text>
                    <View>
                    <Button
                      mode="contained"
                      style={{
                        width: "100%",
                        borderRadius: 10,
                        marginTop: 9,
                      }}
                      buttonColor="red"
                      onPress={()=>smallCardClickHander(commonObj)}
                    >
                      Delete
                    </Button>
                  </View>
                  </View>

           </Card.Content>
      </Card>
    </>
)
}
export default AdminSmallCard