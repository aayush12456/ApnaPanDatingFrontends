import { Text, View, Image,ActivityIndicator } from "react-native";
import { Card, Button } from "react-native-paper";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { getPaymentHistoryAsync } from "../../../Redux/Slice/getPaymentHistorySlice/getPaymentHistorySlice";
const socket = io.connect("http://192.168.29.169:4000")
const AdminCard=({userObj})=>{
const BASE_URL = "http://192.168.29.169:4000";
// console.log('user obj card',userObj)
const navigation = useNavigation();
const dispatch=useDispatch()
const [deleteLoading, setDeleteLoading] = useState(false);
const [paymentStatus,setPaymentStatus] = useState(null)
const cardClickHandler=(userObj)=>{
    navigation.navigate('AdminPageContent',{formData:userObj})
}
const deleteProfileHandler=async(userObj)=>{
// console.log('obj',userObj._id)
try{
  setDeleteLoading(true);
  const response = await axios.post(`${BASE_URL}/user/deleteAdminProfileUser/${userObj?._id}`,userObj);
  socket.emit('deleteRegisterUser', response?.data)
}catch(error){
  console.error('Error sending activate', error);
}
finally{
  setDeleteLoading(false);
}
}
useEffect(()=>{
  if(userObj?._id){
  dispatch(getPaymentHistoryAsync(userObj?._id))
  }
      },[userObj?._id])
     

      useEffect(()=>{
        const getPaymentStatus = async ()=>{
           const res = await axios.get(`${BASE_URL}/user/getActiveSubscription/${userObj?._id}`)
           setPaymentStatus(res.data)
        }
     
        if(userObj?._id){
           getPaymentStatus()
        }
     },[userObj?._id])
    
return (
    <>
      <Card
              // key={allUser._id || index} // Unique key: use _id if available, or index as fallback
              style={{
                marginLeft: 8,
                marginRight: 8,
                marginTop: 20,
                backgroundColor: `#343434`
              }}
              onPress={() => cardClickHandler(userObj)}
            >
              <Card.Content>
              <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
         
                    <Image
                      source={{ uri: userObj?.images[0] }}
                      style={{ width: 65, height: 65, borderRadius: 70 }}
                    />
                    <View>
                <View>
                <Text style={{  color:`white`, fontWeight: "500",paddingTop:10 }}>
                      {userObj?.firstName}
                    </Text>
                  <Text style={{textAlign:'center',color:`${userObj?.freeSubscription?.plan==="free"
    ||  paymentStatus?.activeSubscription?.status==="active"?'green':'red'}`}}>
        {userObj?.freeSubscription?.plan==="free" || paymentStatus?.activeSubscription?.status==="active"
        ?'active':'expired'}</Text>
                </View>

                  
                    </View>
                    <Button
                      mode="contained"
                      style={{
                        borderRadius: 10,
                        height:50,
                        paddingTop:4
                      }}
                      buttonColor="red"
                      onPress={(e)=>{
                        e.stopPropagation();
                        deleteProfileHandler(userObj)
                      }}
                    >
                       {deleteLoading ? (
              <ActivityIndicator
                size="small"
                color="white"
              />
            ) : (
              "Delete"
            )}
                    </Button>
                  </View>
              </Card.Content>
            </Card>
    </>
)
}
export default AdminCard