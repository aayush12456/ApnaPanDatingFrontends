import {  ScrollView,RefreshControl,Text } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import io from "socket.io-client";
import { getAllUserData } from "../../Redux/Slice/getAllUserSlice/getAllUserSlice";
import AddChat from "../common/addChat/addChat";
import NewAndOnlineCard from "../newAndOnlineCard/newAndOnlineCard";
import axios from "axios";
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://apnapandatingbackend.onrender.com")
const NewAndOnline = ({route,completeObj,planStatus}) => {
    const BASE_URL = "http://192.168.29.169:4000";
    // const BASE_URL = "https://apnapandatingbackend.onrender.com";
  const { formData = {} } = route.params || {}; // Fallback to an empty object
  // console.log('form data in new ', formData);

  const dispatch = useDispatch();
// console.log('complete objs online',completeObj)
  const completeLoginObjData=completeObj
  const getAllUserArray = useSelector(
    (state) => state.getAllUserData.getAllUserArray.users
  );
  // console.log("get all user array in new ", getAllUserArray);
const loginId=completeObj.userId

  const [allUser,setAllUser]=useState(getAllUserArray)
  const [onlineLikeUserObj,setOnlineLikeUserObj]=useState({})
  const [likeMatchUserObj,setLikeMatchUserObj]=useState({})
  const [deactivateUserObj,setDeactivateUserObj]=useState({})
  const [refreshing, setRefreshing] = useState(false); 
  useEffect(() => {
    if (completeLoginObjData?._id) {
      dispatch(getAllUserData(completeLoginObjData?._id));
    }
  }, [dispatch,completeLoginObjData?._id]);


  
// console.log('login id in new and online',loginId)
const onlinSkipUserSelector=useSelector((state)=>state.onlineSkipUser.addOnlineSkipData.skipUserId)
// console.log('online skip user select',onlinSkipUserSelector)
  useEffect(()=>{
    if(onlinSkipUserSelector){
      let updateArray=allUser?.filter((filterItem)=>filterItem?._id!==onlinSkipUserSelector)
      setAllUser(updateArray)
    }
    else{
      setAllUser(getAllUserArray)
    }
    
    },[onlinSkipUserSelector,getAllUserArray])
// console.log('all user array',allUser)
    useEffect(() => {
      const fetchOnlineLikeUsers = async () => {
        try {
          if (loginId) {
            const response = await axios.get(
              `${BASE_URL}/user/getOnlineLikeUser/${loginId}`
            );
            // setLikesArray(response?.data?.anotherMatchUser || []);
            // console.log('get online like user is',response?.data)
            setOnlineLikeUserObj(response?.data );
          }
        } catch (error) {
          // console.error("Error fetching matches:", error);
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
              `${BASE_URL}/user/getLikeMatchUser/${loginId}`
            );
            // setLikesArray(response?.data?.anotherMatchUser || []);
            // console.log('get like match user is',response?.data)
            setLikeMatchUserObj(response?.data );
          }
        } catch (error) {
          // console.error("Error fetching matches:", error);
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
      const fetchDeactivateUser = async () => {
        try {
          if (loginId) {
            const response = await axios.get(
              `${BASE_URL}/user/getDeactivateUser/${loginId}`,
            );
            // console.log('get deactivate user obj is', response?.data);
            setDeactivateUserObj(response?.data);
    
            // If deactivatedIdArray is available, filter the allUser array
            if (response?.data?.deactivatedIdArray?.length > 0 || response?.data?.selfDeactivate) {
              const filteredUsers = getAllUserArray.filter(
                (user) => 
                  !response?.data?.deactivatedIdArray.includes(user._id) && 
                  user._id !== response?.data?.selfDeactivate // Added condition
              );
              setAllUser(filteredUsers);
            }
          }
        } catch (error) {
          // console.error("Error fetching deactivate user:", error);
        }
      };
    
      fetchDeactivateUser();
    
      socket.on("getDeactivateUser", (newUser) => {
        setDeactivateUserObj(newUser);
    
        // If deactivatedIdArray is available, filter the allUser array
        if (newUser?.deactivatedIdArray?.length > 0 || newUser?.selfDeactivate) {
          const filteredUsers = getAllUserArray.filter(
            (user) => 
              !newUser?.deactivatedIdArray.includes(user._id) &&
              user._id !== newUser?.selfDeactivate // Added condition
          );
          setAllUser(filteredUsers);
        }
      });
    
      return () => {
        socket.off("getDeactivateUser");
      };
    }, [loginId, getAllUserArray]); // Re-run effect whenever loginId or getAllUserArray changes
    
    // console.log('get deactivate user obj in likes',deactivateUserObj)
    
    const handleRefresh = () => {
      setRefreshing(true); // Show loading spinner
      dispatch(getAllUserData(completeLoginObjData?._id));
      setRefreshing(false); // Hide loading spinner
    };

  return (
    <>
      <AddChat />

      <ScrollView  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        {allUser && allUser.length>0? allUser?.map((allUser) => {
        
          return (
           
            <NewAndOnlineCard allUser={allUser} key={allUser?._id}  onlineLikeUserObj={onlineLikeUserObj} 
            loginId={loginId} completeObj={completeObj} planStatus={planStatus}/>
          );
        }):<Text style={{textAlign:'center',fontSize:17,fontWeight:"600",position:'relative',top:'100%',
        color:`white`}}>No New Profile is there</Text>}
      </ScrollView>
    </>
  );
};

export default NewAndOnline
