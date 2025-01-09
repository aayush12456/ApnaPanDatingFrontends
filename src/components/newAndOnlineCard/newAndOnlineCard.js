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
import { AlertNotificationRoot } from "react-native-alert-notification";
import Notification from "../notification/notification";
const socket = io.connect("http://192.168.29.169:4000")
const NewAndOnlineCard=({allUser,index,onlineLikeUserObj,loginId})=>{
    console.log('online like user obj in new and online card',onlineLikeUserObj)
    console.log('login id',loginId)
    console.log('all user',allUser)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [selfLikeMatch,setSelfLikeMatch]=useState(false)
    const [activeLoginIdResponse,setActiveLoginIdResponse]=useState(false)
    const [loginIdUserArray, setLoginIdUserArray] = useState([])
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
      const fetchAllLoginIdUser = async () => {
        try {
          if (loginId) {
            const response = await axios.get(
              `http://192.168.29.169:4000/user/getAllLoginIdUser/${loginId}`,
            );
            // setLikesArray(response?.data?.anotherMatchUser || []);
            console.log('get all login id user is', response?.data?.loginIdUserArray)
            setLoginIdUserArray(response?.data?.loginIdUserArray)
          }
        } catch (error) {
          console.error("Error fetching in chat id obj:", error);
        }
      };
      fetchAllLoginIdUser();
  
      socket.on("getLoginUser", (newUser) => {
  
        setLoginIdUserArray(newUser)
      });
      socket.on("deleteLoginIdUser", (newUser) => {
        setLoginIdUserArray(newUser)
      });
      return () => {
        socket.off("getLoginUser");
        socket.off("deleteLoginIdUser");
      };
    },[loginId])
  
    console.log('login id user array is',loginIdUserArray)
    useEffect(() => {
      if (loginId) {
        const getActiveLoginId = loginIdUserArray?.some(
          (item) => item === allUser?._id
        );
        setActiveLoginIdResponse(getActiveLoginId)
      }
    }, [loginId, loginIdUserArray, allUser]);

    useEffect(()=>{
      const fetchDeactivateUser = async () => {
        try {
          if (loginId) {
            const response = await axios.get(
              `http://192.168.29.169:4000/user/getDeactivateUser/${loginId}`,
            );
            // setLikesArray(response?.data?.anotherMatchUser || []);
            console.log('get deactivate user obj is', response?.data)
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
      if(loginId===deactivateUserObj.selfDeactivate){
        setOpenDialog(true)
        const obj={
          type:'WARNING',
          textBody:`You can't visited ${allUser.firstName}  profile untill you should activate yourself`
        }
        setNotifyDeactivateObj(obj)
        return
      }
      navigation.navigate('NewAndOnlinePageContent', { formData: allUser });
      if (allUser) {
        const addVisitorObj = {
          id: loginId,
          userId: allUser._id,
        };
        const visitorCountObj = {
          id: loginId,
          visitorOnlineId: allUser._id,
        };
        try {
          // Execute both API calls in parallel
          const [visitorResponse, countResponse] = await Promise.all([
            axios.post(
              `http://192.168.29.169:4000/user/addVisitorUser/${addVisitorObj.id}`,
              addVisitorObj
            ),
            axios.post(
              `http://192.168.29.169:4000/user/addVisitorCount/${visitorCountObj.id}`,
              visitorCountObj
            ),
          ]);
    
          console.log("Visitor added:", visitorResponse.data);
          console.log("Visitor count updated:", countResponse.data);
          // Emit socket events after both API calls succeed
          socket.emit("addVisitorUser", visitorResponse.data.visitors);
          socket.emit("addVisitorCountUser", countResponse.data.userObj);
        } catch (error) {
          console.error("Error in cardClickHandler:", error.response?.data || error.message);
        }
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

console.log('active login response',activeLoginIdResponse)
return (
    <>
    <AlertNotificationRoot>
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
                     {activeLoginIdResponse===true?<View
      style={{
        width: 15, 
        height: 15,
        backgroundColor: 'rgba(74, 222, 128,1)',
        borderRadius: 15 / 2,
        position: 'absolute',
        bottom: 5, 
        right: 0, 
        borderWidth: 2,
        borderColor: 'white',
      }}
    />:null}
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
            {openDailog===true &&<Notification dialog={notifyDeactivateObj}/>}
    </AlertNotificationRoot>
    
    </>
)
}
export default NewAndOnlineCard