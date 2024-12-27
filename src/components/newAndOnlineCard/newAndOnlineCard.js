import { Text, View, Image } from "react-native";
import { Card, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { addChatModalActions } from "../../Redux/Slice/addChatModalSilce/addChatModalSlice";
import { passDataSliceActions } from "../../Redux/Slice/passDataSlice/passDataSlice";
import { useState,useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { addVisitorEmailSenderAsync } from "../../Redux/Slice/addVisitorEmailSlice/addVisitorEmailSlice";
const socket = io.connect("http://192.168.29.169:4000")
const NewAndOnlineCard=({allUser,index,onlineLikeUserObj,loginId})=>{
    console.log('online like user obj in new and online card',onlineLikeUserObj)
    console.log('login id',loginId)
    console.log('all user',allUser)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [selfLikeMatch,setSelfLikeMatch]=useState(false)
    const getProfile = () => allUser;
    const dob = getProfile()?.DOB;
    const dobBreak = dob?.split("/");
    const year = dobBreak?.[2];
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    const age = year ? currentYear - parseInt(year) : "";

    const cardClickHandler = async(allUser) => {
        console.log('card pressed', allUser);
        if(allUser){
          const addVisitorObj={
            id:loginId,
            userId:allUser._id
          }
          const visitorCountObj={
            id:loginId,
            visitorOnlineId:allUser._id
          }
          const visitorEmailObj={
            id:loginId,
            recieverEmailId:allUser._id
          }
          console.log('add visitor obj',addVisitorObj)
          // dispatch(addVisitorEmailSenderAsync(visitorEmailObj))
          try {
            const response = await axios.post(`http://192.168.29.169:4000/user/addVisitorUser/${addVisitorObj.id}`, addVisitorObj);
            console.log('response in visitor user is',response?.data?.visitors)
            socket.emit('addVisitorUser', response?.data?.visitors)
        } catch (error) {
            console.error('Error sending message in visitor:', error);
        }

        try {
          const response = await axios.post(`http://192.168.29.169:4000/user/addVisitorCount/${visitorCountObj.id}`,visitorCountObj);
          console.log('response in visitor count user',response?.data?.userObj)
          socket.emit('addVisitorCountUser', response?.data?.userObj)
      
      } catch (error) {
          console.error('Error sending message in visitor count:', error);
      }
          navigation.navigate('NewAndOnlinePageContent', { formData: allUser });
        }
      };

      const addChatModalOpenHandler = (name) => {
        dispatch(addChatModalActions.addChatVisibleToggle());
        dispatch(passDataSliceActions.passDatas(name));
      };
      
  // useEffect(()=>{
  //   const selfOnlineLike= onlineLikeUserObj?.selfOnlineLikeUser?.some((onlineLike)=>onlineLike?.firstName===allUser?.firstName)
  //   console.log('self online like useEffect',selfOnlineLike)
  //   if(selfOnlineLike){
  //     setSelfLikeMatch(false)
  //   }
  //    },[onlineLikeUserObj?.selfOnlineLikeUser,allUser])
  useEffect(() => {
    // Check if the user is liked
    const isLiked = onlineLikeUserObj?.selfOnlineLikeUser?.some(
        (onlineLike) => onlineLike?.firstName === allUser?.firstName
    );
    setSelfLikeMatch(isLiked);
}, [onlineLikeUserObj?.selfOnlineLikeUser, allUser]);
     console.log('self online like',selfLikeMatch)
return (
    <>
     <Card
              key={allUser._id || index} // Unique key: use _id if available, or index as fallback
              style={{
                marginLeft: 8,
                marginRight: 8,
                marginTop: 20,
                backgroundColor: "white",
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
                    <Text style={{ color: "black", fontWeight: "500" }}>
                      {allUser?.firstName}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 6, paddingTop: 3 }}>
                      <Text>{age},</Text>
                      <Text>{allUser?.city}</Text>
                    </View>
                    <Text style={{ paddingTop: 2 }}>{allUser?.relationship}</Text>
                  </View>
                  {/* {selfLikeMatch==true?null:<View>
                    <Text style={{color:'black',paddingTop:8,fontWeight:"600"}}>Liked!</Text>
                  </View>} */}
                      {selfLikeMatch && (
                        <View>
                            <Text style={{ color: 'black', paddingTop: 8, fontWeight: "600" }}>
                                Liked!
                            </Text>
                        </View>
                    )}
                  <View>
                    <Button
                      mode="contained"
                      onPress={() => addChatModalOpenHandler(allUser.firstName)}
                      style={{
                        width: "100%",
                        borderRadius: 10,
                        marginTop: 9,
                      }}
                      buttonColor="rgba(34, 197, 94, 2)"
                    >
                      Add Chat
                    </Button>
                  </View>
                </View>
              </Card.Content>
            </Card>
    </>
)
}
export default NewAndOnlineCard