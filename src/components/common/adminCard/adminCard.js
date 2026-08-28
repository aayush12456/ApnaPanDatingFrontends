import { Text, View, Image,ActivityIndicator } from "react-native";
import { Card, Button } from "react-native-paper";
import { useState,useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
const socket = io.connect("http://192.168.29.169:4000")
const AdminCard=({userObj})=>{
const BASE_URL = "http://192.168.29.169:4000";
console.log('user obj card',userObj)
const navigation = useNavigation();
const [deleteLoading, setDeleteLoading] = useState(false);
const cardClickHandler=(userObj)=>{
    navigation.navigate('AdminPageContent',{formData:userObj})
}
const deleteProfileHandler=async(userObj)=>{
console.log('obj',userObj._id)
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
              <Text style={{  color:`white`, fontWeight: "500",paddingTop:10 }}>
                      {userObj?.firstName}
                    </Text>
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