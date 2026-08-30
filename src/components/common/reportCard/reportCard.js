import { Text, Card ,Button} from "react-native-paper";
import { View,ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import io from "socket.io-client";
import axios from 'axios'
const socket = io.connect("http://192.168.29.169:4000")
const ReportCard=({user})=>{
  const BASE_URL = "http://192.168.29.169:4000";
  const navigation=useNavigation()
  const [deleteLoading, setDeleteLoading] = useState(false);

  const cardClickHandler=(user)=>{
navigation.navigate('ReportPageContent',{formData:user})
  }

  const deleteProfileHandler=async(user)=>{
    console.log('user id',user)
    try{
      setDeleteLoading(true);
      const response = await axios.post(`${BASE_URL}/user/deleteReportUser/${user?._id}`,user);
      socket.emit('deleteReportUser', response?.data)
    }catch(error){
      console.error('Error sending activate', error);
    }
    finally{
      setDeleteLoading(false);
    }
    
  }
return (
    <>
       <Card style={{ marginLeft: 8, marginRight: 8, marginTop:15, 
      backgroundColor: `#343434` }} onPress={()=>cardClickHandler(user)} >
                <Card.Content >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
     <Text style={{  color:`white`, fontWeight: "500",paddingTop:10 }}>
                      {user?.senderName}
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
                        deleteProfileHandler(user)
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
export default ReportCard