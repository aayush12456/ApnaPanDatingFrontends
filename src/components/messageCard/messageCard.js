import { Text, View, Image } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux'
import {useState,useEffect} from 'react'
import * as SecureStore from 'expo-secure-store';
import io from "socket.io-client";
import axios from "axios";
const socket = io.connect("http://192.168.29.169:4000")
const MessageCard=({finalMessageUser,index})=>{
    const [loginObj,setLoginObj]=useState({})
    console.log('final message user in message card',finalMessageUser)
    const loginResponse=useSelector((state)=>state.loginData.loginData.token)
    const navigation = useNavigation();
    const getProfile = () => finalMessageUser;
    const dob = getProfile()?.DOB;
    const dobBreak = dob?.split("/");
    const year = dobBreak?.[2];
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    const age = year ? currentYear - parseInt(year) : "";
useEffect(() => {
  if (loginResponse) {
    const getLoginObj = async () => {
      try {
        const loginObjData = await SecureStore.getItemAsync('loginObj');
        if (loginObjData) {
          const parsedLoginObj = JSON.parse(loginObjData); // Parse the JSON string
          setLoginObj(parsedLoginObj); // Set the parsed object in state
        } else {
          console.error('No loginObj found in SecureStore');
        }
      } catch (error) {
        console.error('Error fetching loginObj from SecureStore:', error);
      }
    };
    getLoginObj();
  }
}, [loginResponse]);

  console.log('login obj',loginObj)
    const messageCardClickHandler=async(finalMessageUser)=>{
    console.log('final message user',finalMessageUser)
    if(finalMessageUser){
      const addChatIdObj={
     id:loginObj?._id,
     anotherId:finalMessageUser._id,
     loginName:loginObj.name,
     anotherName:finalMessageUser.firstName
      }
      try {
        const response = await axios.post(`http://192.168.29.169:4000/chat/addChatId`, addChatIdObj);
        console.log('response in add chat id user is',response?.data?.chatIdUser)
        // socket.emit('addChatIdUser', response?.data?.chatIdUser)
        navigation.navigate('MessageDetailsPageContent', {
          formData: finalMessageUser,
        });
    } catch (error) {
        console.error('Error sending message in add chat id:', error);
    }
    }
    }
return (
    <>
      <Card
              key={finalMessageUser._id || index} 
              style={{
                marginLeft: 8,
                marginRight: 8,
                marginTop: 20,
                backgroundColor: "white",
              }}
              onPress={()=>messageCardClickHandler(finalMessageUser)}
            >
              <Card.Content>
                <View
                  style={{
                    flexDirection: "row",
                    gap:30
                  }}
                >
                    <Image
                      source={{ uri: finalMessageUser?.images[0] }}
                      style={{ width: 65, height: 65, borderRadius: 70 }}
                    />
                    <View>
                    <View style={{ flexDirection:'row',gap:10,paddingTop:7 }}>
                    <Text style={{ color: "black", fontWeight: "500" }}>
                      {finalMessageUser?.firstName},
                    </Text>
                    <Text style={{ color: "black", fontWeight: "500" }}>
                      {age}
                    </Text>
                  </View>
                  <View>
                  <Text style={{ color: "black", fontWeight: "500",paddingTop:2 }}>
           You have both paired
                    </Text>
                  </View>
                    </View>                     
                </View>
              </Card.Content>
            </Card>
    </>
)
}
export default MessageCard