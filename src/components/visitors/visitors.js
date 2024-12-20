
import { useEffect,useState,useRef } from "react"
import {useSelector} from "react-redux"
import {View,ScrollView} from 'react-native'
import io from "socket.io-client";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import SmallCard from "../common/smallCard/smallCard";
const socket = io.connect("http://192.168.29.169:4000")
const Visitors=()=>{
    const [loginId,setLoginId]=useState('')
    const loginResponse=useSelector((state)=>state.loginData.loginData.token)// ye loginToken
    const [visitorArray,setVisitorArray]=useState([])
    const [likeMatchUser, setLikeMatchUser] = useState({});
    const processedVisitors = useRef(false); 
    useEffect(()=>{
        if(loginResponse){
          const getLoginId = async () => {
            const loginIdData = await SecureStore.getItemAsync('loginId');
            setLoginId(loginIdData)
          };
          getLoginId()
        }
      },[loginResponse])
      console.log('login id in visitors',loginId)


useEffect(() => {
  const fetchVisitorUsers = async () => {
    try {
      if (loginId) {
        const response = await axios.get(
          `http://192.168.29.169:4000/user/getVisitorUser/${loginId}`
        );
        console.log('visitor user in response',response?.data)
        setVisitorArray(response?.data?.visitors || []);
      }
    } catch (error) {
      console.error("Error fetching visitors:", error);
    }
  };

  fetchVisitorUsers();

  socket.on("getVisitorUser", (newUser) => {

    setVisitorArray(newUser)
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
          `http://192.168.29.169:4000/user/getLikeMatchUser/${loginId}`
        );
        setLikeMatchUser(response?.data);
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
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
console.log('another match first name',anotherMatchFirstNames)
    const filteredVisitors = visitorArray?.filter(
      (visitor) => !anotherMatchFirstNames.includes(visitor?.visitor?.firstName)
    );
    console.log('filtered visitors',filteredVisitors)
    setVisitorArray(filteredVisitors);
    processedVisitors.current = true; // Mark as processed
  }
}, [visitorArray, likeMatchUser]); 

console.log("get like match user in socket in visitors", likeMatchUser);
console.log('visitor data array',visitorArray)
const combineVisitorArray=[...visitorArray]
const visitorChunkArray = (array, chunkSize) => {
    const visitorChunks = [];
    for (let i = 0; i < array?.length; i += chunkSize) {
      visitorChunks.push(array.slice(i, i + chunkSize));
    }
    return visitorChunks;
  };

  const visitorChunkedData = visitorChunkArray(combineVisitorArray, 2);
return (
    <>
     <ScrollView>
      {visitorChunkedData.map((row, rowIndex) => (
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
     <SmallCard key={item._id} visitorData={item} />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
    </>
)
}
export default Visitors