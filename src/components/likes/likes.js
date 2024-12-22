import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import io from "socket.io-client";
import * as SecureStore from "expo-secure-store";
import SmallCard from "../common/smallCard/smallCard";
import axios from "axios";

const socket = io.connect("http://192.168.29.169:4000");

const Likes = () => {
  const [loginId, setLoginId] = useState("");
  const [likesArray, setLikesArray] = useState([]);
  const [likeMatchUser, setLikeMatchUser] = useState({});
  const [onlineLikeUserObj, setOnlineLikeUserObj] = useState({});
  const [blockUserObj,setBlockUserObj]=useState({})
  const dispatch = useDispatch();

  const completeLoginObj = useSelector(
    (state) => state?.loginData?.loginData?.completeLoginData
  );
  const loginResponse = useSelector(
    (state) => state.loginData.loginData.token
  ); // loginToken

  useEffect(() => {
    if (loginResponse) {
      const getLoginId = async () => {
        const loginIdData = await SecureStore.getItemAsync("loginId");
        setLoginId(loginIdData);
      };
      getLoginId();
    }
  }, [loginResponse]);

  console.log("login id in likes", loginId);

  // Fetch and update likesArray
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

  console.log("get likes data array", likesArray);

  // Fetch and update likeMatchUser
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

  console.log("get like match user in socket", likeMatchUser);

  // Fetch and update onlineLikeUserObj
  useEffect(() => {
    const fetchOnlineLikeUsers = async () => {
      try {
        if (loginId) {
          const response = await axios.get(
            `http://192.168.29.169:4000/user/getOnlineLikeUser/${loginId}`
          );
          setOnlineLikeUserObj(response?.data);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
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

  console.log("online like user obj", onlineLikeUserObj);

  useEffect(() => {
    const fetchBlockProfileUser = async () => {
      try {
        if (loginId) {
          const response = await axios.get(
            `http://192.168.29.169:4000/user/getBlockChatIdUser/${loginId}`,
          );
          // setLikesArray(response?.data?.anotherMatchUser || []);
          console.log('get block user obj is block profile page', response?.data)
          setBlockUserObj(response?.data);
        }
      } catch (error) {
        console.error("Error fetching in block user obj:", error);
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

  console.log("final like array", finalLikesArray);
  console.log("another match like array", anotherMatchLikesArray);
  console.log("online like array", onlineLikeUserArray);
  
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
      completeLoginObj?.gender &&
      likeItem.gender.toLowerCase() !== completeLoginObj.gender.toLowerCase()
  ).filter((likeItem) => !blockUserIds?.includes(likeItem._id));


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
        ))}
      </ScrollView>
    </>
  );
};

export default Likes;
