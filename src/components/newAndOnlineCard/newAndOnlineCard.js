import { Text, View, Image } from "react-native";
import { Card, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { addChatModalActions } from "../../Redux/Slice/addChatModalSilce/addChatModalSlice";
import { passDataSliceActions } from "../../Redux/Slice/passDataSlice/passDataSlice";
import { useState,useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { AlertNotificationRoot } from "react-native-alert-notification";
import Notification from "../notification/notification";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://apnapandatingbackend.onrender.com")
const NewAndOnlineCard=({allUser,onlineLikeUserObj,loginId,completeObj,planStatus})=>{
    const BASE_URL = "http://192.168.29.169:4000";
    // const BASE_URL = "https://apnapandatingbackend.onrender.com";
    // console.log('online like user obj in new and online card',onlineLikeUserObj)
    // console.log('login id',loginId)
    // console.log('online like user',onlineLikeUserObj)
    // console.log('all user',allUser)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [selfLikeMatch,setSelfLikeMatch]=useState(false)
    const [deactivateUserObj,setDeactivateUserObj]=useState({})
    const [notifyDeactivateObj,setNotifyDeactivateObj]=useState({})
    const [openDailog,setOpenDialog]=useState(false)
    const getProfile = () => allUser;
    const dob = getProfile()?.DOB;
    const dobBreak = dob?.split("/");
    const year = dobBreak?.[2];
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    const age = year ? currentYear - parseInt(year) : "";

    

    useEffect(()=>{
      const fetchDeactivateUser = async () => {
        try {
          if (loginId) {
            const response = await axios.get(
              `${BASE_URL}/user/getDeactivateUser/${loginId}`,
            );
            // setLikesArray(response?.data?.anotherMatchUser || []);
            // console.log('get deactivate user obj is', response?.data)
            setDeactivateUserObj(response?.data)
          }
        } catch (error) {
          console.error("Error fetching in chat id obj:", error);
        }
      };
      fetchDeactivateUser();
  
      socket.on("getDeactivateUser", (newUser) => {
  
        setDeactivateUserObj(newUser)
      });
      return () => {
        socket.off("getDeactivateUser");
      };
    },[loginId])

    const cardClickHandler = async (allUser) => {
      if(loginId===deactivateUserObj?.selfDeactivate){
        setOpenDialog(true)
        const obj={
          type:'WARNING',
          textBody:`You can't visited ${allUser?.firstName}  profile untill you should activate yourself`
        }
        setNotifyDeactivateObj(obj)
        return
      }
      navigation.navigate('NewAndOnlinePageContent', { formData: allUser,  completeObj});
      if (allUser) {
        const addVisitorObj = {
          id: loginId,
          userId: allUser?._id,
        };
        const visitorCountObj = {
          id: loginId,
          visitorOnlineId: allUser?._id,
        };
       
      }
    };
    

      const addChatModalOpenHandler = (name) => {
        dispatch(addChatModalActions.addChatVisibleToggle());
        dispatch(passDataSliceActions.passDatas(name));
      };
      
 
  useEffect(() => {
    // Check if the user is liked
    const isLiked = onlineLikeUserObj?.selfOnlineLikeUser?.some(
        (onlineLike) => onlineLike?.firstName === allUser?.firstName
    );
    // console.log('is like',isLiked)
    setSelfLikeMatch(isLiked);
}, [onlineLikeUserObj?.selfOnlineLikeUser, allUser]);
    //  console.log('self online like',selfLikeMatch)

// console.log('active login response',activeLoginIdResponse)
return (
    <>
    <AlertNotificationRoot>
    <Card
              // key={allUser._id || index} // Unique key: use _id if available, or index as fallback
              style={{
                marginLeft: 8,
                marginRight: 8,
                marginTop: 20,
                backgroundColor: `#343434`
              }}
              onPress={() => cardClickHandler(allUser)}
            >
              <Card.Content>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Image
                      source={{ uri: allUser?.images[0] }}
                      style={{ width: 65, height: 65, borderRadius: 70 }}
                    />
                    
                  </View>
                  <View style={{ paddingTop: 1 }}>
                    <Text style={{  color:`white`, fontWeight: "500" }}>
                      {allUser?.firstName}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 6, paddingTop: 3 }}>
                      <Text style={{ color:`white`}}>{age},</Text>
                      <Text style={{ color:`white`}}>{allUser?.city}</Text>
                    </View>
                    <Text style={{ paddingTop: 2,color:`white` }}>{allUser?.relationship}</Text>
                  </View>
                
                      {selfLikeMatch && (
                        <View>
                            <Text style={{ color: 'black', paddingTop: 8, fontWeight: "600",
                           color:`white`
                          }}>
                                 ❤️Liked!
                            </Text>
                        </View>
                    )}
                  <View>
                    <Button
                      mode="contained"
                      onPress={() => addChatModalOpenHandler(allUser?.firstName)}
                      style={{
                        width: "100%",
                        borderRadius: 10,
                        marginTop: 9,
                      }}
                      buttonColor="#6D21FF"
                    >
                      Add Chat
                    </Button>
                  </View>
                </View>
              </Card.Content>
            </Card>
            {openDailog===true &&<Notification dialog={notifyDeactivateObj}/>}
    </AlertNotificationRoot>
    
    </>
)
}
export default NewAndOnlineCard