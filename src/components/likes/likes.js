import { Text } from "react-native-paper"
import { useDispatch ,useSelector} from "react-redux"
import { useEffect,useState } from "react"
import {View,ScrollView} from 'react-native'
import io from "socket.io-client";
import * as SecureStore from 'expo-secure-store';
// import { getMatchUserAsync } from "../../Redux/Slice/getMatchUserSlice/getMatchUserSlice"
import SmallCard from "../common/smallCard/smallCard"
import axios from 'axios'
const socket = io.connect("http://192.168.29.169:4000")
const Likes=()=>{
  const [loginId,setLoginId]=useState('')
  // const getLikesArray=useSelector((state)=>state?.getMatchUserData?.getMatchUserObj?.anotherMatchUser)
  // console.log('get like filter user',getLikesArray)
const [likesArray,setLikesArray]=useState([])
const [likeMatchUser,setLikeMatchUser]=useState({})
const dispatch=useDispatch()
const completeLoginObj = useSelector(
    (state) => state?.loginData?.loginData?.completeLoginData
  );
  const loginResponse=useSelector((state)=>state.loginData.loginData.token)// ye loginToken

useEffect(()=>{
  if(loginResponse){
    const getLoginId = async () => {
      const loginIdData = await SecureStore.getItemAsync('loginId');
      setLoginId(loginIdData)
    };
    getLoginId()
  }
},[loginResponse])
console.log('login id in likes',loginId)

useEffect(() => {
  const fetchMatchUsers = async () => {
    try {
      if (loginId) {
        const response = await axios.get(
          `http://192.168.29.169:4000/user/getMatchUser/${loginId}`
        );
        setLikesArray(response?.data?.likesArray || []);
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  fetchMatchUsers();

  socket.on("getMatchUser", (newUser) => {

    setLikesArray(newUser)
  });

  return () => {
    socket.off("getMatchUser");
  };
}, [loginId]);
console.log('get likes data array',likesArray)

useEffect(() => {
  const fetchLikeMatchUsers = async () => {
    try {
      if (loginId) {
        const response = await axios.get(
          `http://192.168.29.169:4000/user/getLikeMatchUser/${loginId}`
        );
        // setLikesArray(response?.data?.anotherMatchUser || []);
        console.log('get like match user is',response?.data)
        setLikeMatchUser(response?.data );
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  fetchLikeMatchUsers();

  socket.on("getLikeMatchUser", (newUser) => {

    setLikeMatchUser(newUser)
  });

  return () => {
    socket.off("getLikeMatchUser");
  };
}, [loginId]);
console.log('get like match user in socket',likeMatchUser)
console.log('get likr another match',likeMatchUser.anotherMatchLikes)
console.log('get likr  match',likeMatchUser.matchLikes)

const anotherMatchLikesArray=likeMatchUser?.anotherMatchLikes?.length>0?
likeMatchUser?.anotherMatchLikes?.filter((likeItem)=>likeItem._id!==loginId):[]
const combineLikeArray=[...likesArray,...anotherMatchLikesArray]
    const chunkArray = (array, chunkSize) => {
      const chunks = [];
      for (let i = 0; i < array?.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
      }
      return chunks;
    };
  
    const chunkedData = chunkArray(combineLikeArray, 2);

  
return (
    <>
     <ScrollView>
      {chunkedData.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {row.map((item,itemIndex) => (
            <View 
            key={`${rowIndex}-${itemIndex}`}
              style={{
              flex: 1,
              marginHorizontal: 5
            }}>
     <SmallCard key={item._id} likesData={item} />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
 


    </>
)
}
export default Likes