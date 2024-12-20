import {  ScrollView,RefreshControl } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import io from "socket.io-client";
import { getAllUserData } from "../../Redux/Slice/getAllUserSlice/getAllUserSlice";
import AddChat from "../common/addChat/addChat";
import NewAndOnlineCard from "../newAndOnlineCard/newAndOnlineCard";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
const socket = io.connect("http://192.168.29.169:4000")
const NewAndOnline = ({route}) => {
  const { formData = {} } = route.params || {}; // Fallback to an empty object
  console.log('form data in new ', formData);

  const dispatch = useDispatch();
  const completeLoginObj = useSelector(
    (state) => state.loginData.loginData.completeLoginData
  );
  const getAllUserArray = useSelector(
    (state) => state.getAllUserData.getAllUserArray.users
  );
  console.log("get all user array in new ", getAllUserArray);
  const loginResponse=useSelector((state)=>state.loginData.loginData.token)// ye loginToken'
  console.log('login response in new and pnline',loginResponse)
  const [allUser,setAllUser]=useState(getAllUserArray)
  const [onlineLikeUserObj,setOnlineLikeUserObj]=useState({})
  const [likeMatchUserObj,setLikeMatchUserObj]=useState({})
  const [loginId,setLoginId]=useState('')
  const [visitorArray,setVisitorArray]=useState([])
  const [visitorLikeUserObj,setVisitorLikeUserObj]=useState({})
  const [refreshing, setRefreshing] = useState(false); 
  useEffect(() => {
    if (dispatch) {
      dispatch(getAllUserData(completeLoginObj?._id));
    }
  }, [dispatch]);


  useEffect(()=>{
    if(loginResponse){
      const getLoginId = async () => {
        const loginIdData = await SecureStore.getItemAsync('loginId');
        setLoginId(loginIdData)
      };
      getLoginId()
    }
},[loginResponse])
console.log('login id in new and online',loginId)
  useEffect(()=>{
    if(formData?.onlinePersonSkipUserId){
      let updateArray=allUser?.filter((filterItem)=>filterItem?._id!==formData?.onlinePersonSkipUserId)
      setAllUser(updateArray)
    }
    else{
      setAllUser(getAllUserArray)
    }
    
    },[formData?.onlinePersonSkipUserId,getAllUserArray])

    useEffect(() => {
      const fetchOnlineLikeUsers = async () => {
        try {
          if (loginId) {
            const response = await axios.get(
              `http://192.168.29.169:4000/user/getOnlineLikeUser/${loginId}`
            );
            // setLikesArray(response?.data?.anotherMatchUser || []);
            console.log('get online like user is',response?.data)
            setOnlineLikeUserObj(response?.data );
          }
        } catch (error) {
          console.error("Error fetching matches:", error);
        }
      };
    
      fetchOnlineLikeUsers();
    
      socket.on("getOnlineLikeUser", (newUser) => {
    
        setOnlineLikeUserObj(newUser)
      });
    
      return () => {
        socket.off("getOnlineLikeUser");
      };
    }, [loginId]);

    useEffect(() => {
      if (onlineLikeUserObj.onlineLikeUser?.length > 0 && allUser?.length > 0) {
        const updatedArray = allUser.filter(
          (user) =>
            !onlineLikeUserObj?.onlineLikeUser.some(
              (filterUser) => filterUser._id === user._id
            )
        );
        setAllUser(updatedArray);
      } else {
        setAllUser(getAllUserArray);
      }
    }, [onlineLikeUserObj?.onlineLikeUser, getAllUserArray]);

    useEffect(() => {
      const fetchLikeMatchUsers = async () => {
        try {
          if (loginId) {
            const response = await axios.get(
              `http://192.168.29.169:4000/user/getLikeMatchUser/${loginId}`
            );
            // setLikesArray(response?.data?.anotherMatchUser || []);
            console.log('get like match user is',response?.data)
            setLikeMatchUserObj(response?.data );
          }
        } catch (error) {
          console.error("Error fetching matches:", error);
        }
      };
    
      fetchLikeMatchUsers();
    
      socket.on("getLikeMatchUser", (newUser) => {
    
        setLikeMatchUserObj(newUser)
      });
    
      return () => {
        socket.off("getLikeMatchUser");
      };
    }, [loginId]);

    useEffect(() => {
      const fetchVisitorUsers = async () => {
        try {
          if (loginId) {
            const response = await axios.get(
              `http://192.168.29.169:4000/user/getVisitorUser/${loginId}`
            );
            console.log('visitor user in new and online response',response?.data)
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

console.log('visitor user in new and online',visitorArray)
  //   useEffect(() => {
  //     if (visitorArray?.length > 0 && allUser?.length > 0) {
  //       const updatedArray = allUser.filter(
  //         (user) =>
  //           !visitorArray.some(
  //             (filterUser) => filterUser.visitor._id === user._id
  //           )
  //       );
  //       setAllUser(updatedArray);
  //     } else {
  //       setAllUser(getAllUserArray);
  //     }
  //   }, [visitorArray, getAllUserArray]);
  // console.log('final visitor array',visitorArray)
    useEffect(() => {
      const fetchVisitorLikeUsers = async () => {
        try {
          if (loginId) {
            const response = await axios.get(
              `http://192.168.29.169:4000/user/getVisitorLikeUser/${loginId}`
            );
            // setLikesArray(response?.data?.anotherMatchUser || []);
            console.log('get visitor like user is',response?.data)
            setVisitorLikeUserObj(response?.data);
          }
        } catch (error) {
          console.error("Error fetching visitor like user:", error);
        }
      };
    
      fetchVisitorLikeUsers();
    
      socket.on("getVisitorLikeUser", (newUser) => {
    
        setVisitorLikeUserObj(newUser)
      });
    
      return () => {
        socket.off("getVisitorLikeUser");
      };
    }, [loginId]);
    console.log('visitor like user obj',visitorLikeUserObj)

    useEffect(() => {
      if (visitorLikeUserObj?.likes?.length > 0 && allUser?.length > 0) {
        const updatedArray = allUser.filter(
          (user) =>
            !visitorLikeUserObj?.likes.some(
              (filterUser) => filterUser._id === user._id
            )
        );
        setAllUser(updatedArray);
      } else {
        setAllUser(getAllUserArray);
      }
    }, [visitorArray, getAllUserArray]);
    
    const handleRefresh = () => {
      setRefreshing(true); // Show loading spinner
      dispatch(getAllUserData(completeLoginObj?._id));
      setRefreshing(false); // Hide loading spinner
    };
  
  return (
    <>
      <AddChat />

      <ScrollView  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        {allUser?.map((allUser, index) => {
        
          return (
           
            <NewAndOnlineCard allUser={allUser} index={index} onlineLikeUserObj={onlineLikeUserObj} loginId={loginId}/>
          );
        })}
      </ScrollView>
    </>
  );
};

export default NewAndOnline;
