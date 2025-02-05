
import { useEffect,useState,useRef } from "react"
import {useSelector} from "react-redux"
import {View,ScrollView,Text,RefreshControl} from 'react-native'
import io from "socket.io-client";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import SmallCard from "../common/smallCard/smallCard";
// const socket = io.connect("http://192.168.29.169:4000")
const socket = io.connect("https://apnapandatingbackend.onrender.com")
const Visitors=({completeObj})=>{
    // const BASE_URL = "http://192.168.29.169:4000";
    const BASE_URL = "https://apnapandatingbackend.onrender.com";
    const [loginId,setLoginId]=useState('')
    const loginResponse=useSelector((state)=>state.loginData.loginData.token)// ye loginToken
    const loginOtpResponse=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.token) // otp login token
    const [visitorArray,setVisitorArray]=useState([])
    const [likeMatchUser, setLikeMatchUser] = useState({});
    const [deactivateUserObj,setDeactivateUserObj]=useState({})
    const processedVisitors = useRef(false); 
    const [refreshing, setRefreshing] = useState(false); 
    useEffect(()=>{
        if(loginResponse || loginOtpResponse){
          const getLoginId = async () => {
            const loginIdData = await SecureStore.getItemAsync('loginId');
            setLoginId(loginIdData)
          };
          getLoginId()
        }
      },[loginResponse,loginOtpResponse])
      // console.log('login id in visitors',loginId)


useEffect(() => {
  const fetchVisitorUsers = async () => {
    try {
      if (loginId) {
        const response = await axios.get(
          `${BASE_URL}/user/getVisitorUser/${loginId}`
        );
        // console.log('visitor user in response',response?.data)
        setVisitorArray(response?.data?.visitors || [] )
      }
    } catch (error) {
      // console.error("Error fetching visitors:", error);
    }
  };

  fetchVisitorUsers();

  socket.on("getVisitorUser", (newUser) => {
    setVisitorArray(newUser);
  });
  return () => {
    socket.off("getVisitorUser");
  };
}, [loginId]);



useEffect(() => {
  const fetchLikeMatchUsers = async () => {
    try {
      if (loginId) {
        const response = await axios.get(
          `${BASE_URL}/user/getLikeMatchUser/${loginId}`
        );
        setLikeMatchUser(response?.data);
      }
    } catch (error) {
      // console.error("Error fetching matches:", error);
    }
  };

  fetchLikeMatchUsers();

  socket.on("getLikeMatchUser", (newUser) => {
    setLikeMatchUser((prevLikeMatchUser) => {
      const updatedArray = {
        anotherMatchLikes: [
          ...(prevLikeMatchUser?.anotherMatchLikes || []),
          ...(newUser?.anotherMatchLikes || []),
        ].filter(
          (item, index, self) =>
            index === self.findIndex((obj) => obj._id === item._id)
        ),
        matchLikes: [
          ...(prevLikeMatchUser?.matchLikes || []),
          ...(newUser?.matchLikes || []),
        ].filter(
          (item, index, self) =>
            index === self.findIndex((obj) => obj._id === item._id)
        ),
      };
      return updatedArray;
    });
  });

  return () => {
    socket.off("getLikeMatchUser");
  };
}, [loginId]);


useEffect(() => {
  if (
    visitorArray.length &&
    likeMatchUser?.anotherMatchLikes?.length &&
    !processedVisitors.current
  ) {
    const anotherMatchFirstNames = likeMatchUser?.anotherMatchLikes.map(
      (match) => match?.firstName
    );
// console.log('another match first name',anotherMatchFirstNames)
    const filteredVisitors = visitorArray?.filter(
      (visitor) => !anotherMatchFirstNames.includes(visitor?.visitor?.firstName)
    );
    // console.log('filtered visitors',filteredVisitors)
    setVisitorArray(filteredVisitors);
    processedVisitors.current = true; // Mark as processed
  }
}, [visitorArray, likeMatchUser]); 

// console.log("get like match user in socket in visitors", likeMatchUser);
// console.log('visitor data array',visitorArray)

useEffect(()=>{
  const fetchDeactivateUser = async () => {
    try {
      if (loginId) {
        const response = await axios.get(
          `${BASE_URL}/user/getDeactivateUser/${loginId}`,
        );
        // console.log('get deactivate user obj is', response?.data)
        setDeactivateUserObj(response?.data)
      }
    } catch (error) {
      // console.error("Error fetching in chat id obj:", error);
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
// console.log('get deactivate user obj in visitor',deactivateUserObj)
let combineVisitorArray=[]
 combineVisitorArray=[...visitorArray]?.filter((visitorItem) => !deactivateUserObj?.deactivatedIdArray?.includes(visitorItem?.visitor?._id) )?.
 filter((visitorItem) => visitorItem?.visitor?._id!==deactivateUserObj?.selfDeactivate).filter((visitorItem)=> visitorItem?.visitor?._id!==loginId)
const visitorChunkArray = (array, chunkSize) => {
    const visitorChunks = [];
    for (let i = 0; i < array?.length; i += chunkSize) {
      visitorChunks.push(array.slice(i, i + chunkSize));
    }
    return visitorChunks;
  };

  const visitorChunkedData = visitorChunkArray(combineVisitorArray, 2);
  // console.log('combine visitor array',combineVisitorArray)

  const handleRefresh = async () => {
    setRefreshing(true); // Start loading
    // console.log("Refreshing Data...");

    try {
        if (loginId) {
            const [visitorUserResponse, likeMatchResponse, deactivateUserResponse] = await Promise.all([
                axios.get(`${BASE_URL}/user/getVisitorUser/${loginId}`),
                axios.get(`${BASE_URL}/user/getLikeMatchUser/${loginId}`),
                axios.get(`${BASE_URL}/user/getDeactivateUser/${loginId}`)
            ]);

            // Ensure response data is an array, else use default empty array
            setVisitorArray(Array.isArray(visitorUserResponse?.data?.visitors) ? visitorUserResponse?.data?.visitors : []);
            setLikeMatchUser(likeMatchResponse?.data || {}); // Ensure object
            setDeactivateUserObj(deactivateUserResponse?.data || {}); // Ensure object
        }
    } catch (error) {
        // console.error("Error refreshing data:", error);
    }

    setRefreshing(false); // Stop loading
};

return (
    <>
     <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
      {visitorChunkedData && visitorChunkedData?.length>0? visitorChunkedData?.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {row?.map((item,itemIndex) => (
            <View 
            key={`${rowIndex}-${itemIndex}`}
              style={{
              flex: 1,
              marginHorizontal: 5
            }}>
     <SmallCard key={item._id} visitorData={item} />
            </View>
          ))}
        </View>
      )):<Text style={{textAlign:'center',fontSize:17,fontWeight:"400",position:'relative',top:200
      , color:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>No Visitor Profile is there</Text>}
    </ScrollView>
    </>
)
}
export default Visitors