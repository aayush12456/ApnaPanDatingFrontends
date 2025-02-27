import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { View, ScrollView,Text,RefreshControl  } from "react-native";
import io from "socket.io-client";
import * as SecureStore from "expo-secure-store";
import SmallCard from "../common/smallCard/smallCard";
import axios from "axios";

// const socket = io.connect("http://192.168.29.169:4000");
const socket = io.connect("https://apnapandatingbackend.onrender.com")
const Likes = ({completeObj}) => {
    // const BASE_URL = "http://192.168.29.169:4000";
    const BASE_URL = "https://apnapandatingbackend.onrender.com";
  const [loginId, setLoginId] = useState("");
  const [likesArray, setLikesArray] = useState([]);
  const [likeMatchUser, setLikeMatchUser] = useState({});
  const [onlineLikeUserObj, setOnlineLikeUserObj] = useState({});
  const [blockUserObj,setBlockUserObj]=useState({})
  const [deactivateUserObj,setDeactivateUserObj]=useState({})
  const [refreshing, setRefreshing] = useState(false); 
  const dispatch = useDispatch();

  const completeLoginObj = useSelector(
    (state) => state?.loginData?.loginData?.completeLoginData
  );
  const completeLoginObjForOtp=useSelector((state)=>state?.finalLoginWithOtpData?.finalLoginWithOtpData?.completeLoginData)
  const completeLoginObjData=completeLoginObj?completeLoginObj:completeLoginObjForOtp

  const loginResponse = useSelector(
    (state) => state.loginData.loginData.token
  ); // loginToken
  const loginOtpResponse=useSelector((state)=>state?.finalLoginWithOtpData?.finalLoginWithOtpData?.token) // otp login token

  useEffect(() => {
    if (loginResponse || loginOtpResponse) {
      const getLoginId = async () => {
        const loginIdData = await SecureStore.getItemAsync("loginId");
        setLoginId(loginIdData);
      };
      getLoginId();
    }
  }, [loginResponse,loginOtpResponse]);

  // console.log("login id in likes", loginId);

  // Fetch and update likesArray
  useEffect(() => {
    const fetchMatchUsers = async () => {
      try {
        if (loginId) {
          const response = await axios.get(
            `${BASE_URL}/user/getMatchUser/${loginId}`
          );
          setLikesArray(response?.data?.likesArray || []);
        }
      } catch (error) {
        // console.error("Error fetching matches:", error);
      }
    };

    fetchMatchUsers();

    socket.on("getMatchUser", (newUser) => {
      setLikesArray((prevLikesArray) => {
        const updatedArray = [...prevLikesArray, ...newUser].filter(
          (item, index, self) =>
            index === self.findIndex((obj) => obj._id === item._id)
        );
        return updatedArray;
      });
    });

    return () => {
      socket.off("getMatchUser");
    };
  }, [loginId]);

  // console.log("get likes data array", likesArray);

  // Fetch and update likeMatchUser
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

  // console.log("get like match user in socket", likeMatchUser);

  // Fetch and update onlineLikeUserObj
  useEffect(() => {
    const fetchOnlineLikeUsers = async () => {
      try {
        if (loginId) {
          const response = await axios.get(
            `${BASE_URL}/user/getOnlineLikeUser/${loginId}`
          );
          setOnlineLikeUserObj(response?.data);
        }
      } catch (error) {
        // console.error("Error fetching matches:", error);
      }
    };

    fetchOnlineLikeUsers();

    socket.on("getOnlineLikeUser", (newUser) => {
      setOnlineLikeUserObj((prevOnlineLikeUserObj) => {
        const updatedArray = {
          onlineLikeUser: [
            ...(prevOnlineLikeUserObj?.onlineLikeUser || []),
            ...(newUser?.onlineLikeUser || []),
          ].filter(
            (item, index, self) =>
              index === self.findIndex((obj) => obj._id === item._id)
          ),
        };
        return updatedArray;
      });
    });

    return () => {
      socket.off("getOnlineLikeUser");
    };
  }, [loginId]);

  // console.log("online like user obj", onlineLikeUserObj);

  useEffect(() => {
    const fetchBlockProfileUser = async () => {
      try {
        if (loginId) {
          const response = await axios.get(
            `${BASE_URL}/user/getBlockChatIdUser/${loginId}`,
          );
          // setLikesArray(response?.data?.anotherMatchUser || []);
          // console.log('get block user obj is block profile page', response?.data)
          setBlockUserObj(response?.data);
        }
      } catch (error) {
        // console.error("Error fetching in block user obj:", error);
      }
    };

    fetchBlockProfileUser();

    socket.on("getBlockUser", (newUser) => {

        setBlockUserObj(newUser)
    });

    return () => {
      socket.off("getBlockUser");
    };
  }, [loginId]);  


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
  // console.log('get deactivate user obj in likes',deactivateUserObj)

  const finalLikesArray =
    likesArray.length > 0
      ? likesArray.filter((finalLikes) => finalLikes._id !== loginId)
      : [];

  const anotherMatchLikesArray =
    likeMatchUser?.anotherMatchLikes?.length > 0
      ? likeMatchUser?.anotherMatchLikes?.filter(
          (anotherLikeItem) => anotherLikeItem._id !== loginId
        )
      : [];

  const onlineLikeUserArray =
    onlineLikeUserObj?.onlineLikeUser?.length > 0
      ? onlineLikeUserObj?.onlineLikeUser?.filter(
          (onlineLikeItem) => onlineLikeItem._id !== loginId
        )
      : [];

  // console.log("final like array", finalLikesArray);
  // console.log("another match like array", anotherMatchLikesArray);
  // console.log("online like array", onlineLikeUserArray);
  
  const blockUserIds = [
    ...(blockUserObj?.blockUserArray || []),
    ...(blockUserObj?.anotherBlockUserArray || [])
  ].map(user => user._id); // Extract block user IDs

  const combineLikeArray = [
    ...finalLikesArray,
    ...anotherMatchLikesArray,
    ...onlineLikeUserArray,
  ].filter(
    (likeItem) =>
      likeItem?.gender &&
      completeLoginObjData?.gender &&
      likeItem.gender.toLowerCase() !== completeLoginObjData.gender.toLowerCase()
  ).filter((likeItem) => !blockUserIds?.includes(likeItem._id)).
  filter((likeItem) => !deactivateUserObj?.deactivatedIdArray?.includes(likeItem._id) ).
  filter((likeItem) => likeItem._id!==deactivateUserObj?.selfDeactivate)


  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array?.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const chunkedData = chunkArray(combineLikeArray, 2);
const handleRefresh=async()=>{
  setRefreshing(true)
  try {
    if (loginId) {
        // Manually fetching data again
        const [getMatchUserResponse,getLikeMatchUserResponse,getOnlineLikeUserResponse, blockUserResponse, deactivateUserResponse] = await Promise.all([
          axios.get(`${BASE_URL}/user/getMatchUser/${loginId}`),
            axios.get(`${BASE_URL}/user/getLikeMatchUser/${loginId}`),
            axios.get(`${BASE_URL}/user/getOnlineLikeUser/${loginId}`),
            axios.get(`${BASE_URL}/user/getBlockChatIdUser/${loginId}`),
            axios.get(`${BASE_URL}/user/getDeactivateUser/${loginId}`)
        ]);

        // console.log("New Like Match Data:", likeMatchResponse?.data);
        // console.log("New Block User Data:", blockUserResponse?.data);
        // console.log("New Deactivate User Data:", deactivateUserResponse?.data);

        // Updating the states with new fetched data
        setLikesArray(getMatchUserResponse?.data?.likesArray || []);
        setLikeMatchUser(getLikeMatchUserResponse?.data);
        setOnlineLikeUserObj(getOnlineLikeUserResponse?.data);
        setBlockUserObj(blockUserResponse?.data);
        setDeactivateUserObj(deactivateUserResponse?.data);
    }
} catch (error) {
    // console.error("Error refreshing data:", error);
}

setRefreshing(false); // Stop loading
}
  return (
    <>
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        {chunkedData && chunkedData.length>0 ?chunkedData.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {row.map((item, itemIndex) => (
              <View
                key={`${rowIndex}-${itemIndex}`}
                style={{
                  flex: 1,
                  marginHorizontal: 5,
                }}
              >
                <SmallCard key={item._id} likesData={item} />
              </View>
            ))}
          </View>
        )):<Text style={{textAlign:'center',fontSize:17,fontWeight:"400",position:'relative',top:200,
        color:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>No Likes Profile is there</Text>}
      </ScrollView>
    </>
  );
};

export default Likes;
