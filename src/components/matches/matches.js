import {  Text} from 'react-native-paper';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import {ScrollView,RefreshControl} from 'react-native'
import { getMatchesData } from '../../Redux/Slice/getMatchesSlice/getMatchesSlice';
import io from "socket.io-client";
import MatchCard from '../MatchCard/MatchCard';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
// const socket = io.connect("http://192.168.29.169:4000")
const socket = io.connect("https://apnapandatingbackend.onrender.com")
const Matches=({completeObj})=>{
  // const BASE_URL = "http://192.168.29.169:4000";
  const BASE_URL = "https://apnapandatingbackend.onrender.com";
  const [filterMatchArray,setFilterMatchArray]=useState([])
  const [loginId,setLoginId]=useState('')
  const [refreshing, setRefreshing] = useState(false);
    const [deactivateUserObj,setDeactivateUserObj]=useState({})
  const dispatch=useDispatch()
  const getFilterUser=useSelector((state)=>state.getMatchesData.getMatchesArray.interestUsers)
// console.log('get match filter user',getFilterUser)
const [matchArray,setMatchArray]=useState(getFilterUser)
const completeLoginObj = useSelector(
  (state) => state.loginData.loginData.completeLoginData
);
const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)

const completeLoginObjData=completeLoginObj?completeLoginObj:completeLoginObjForOtp
// console.log('complete login obj data',completeLoginObjData)

const getCrossId=useSelector((state)=>state?.passFilterData?.passData)
// console.log('cross id is',getCrossId)
const loginResponse=useSelector((state)=>state.loginData.loginData.token)// ye loginToken
const loginOtpResponse=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.token) // ye loginOtpToken
// console.log('login otp response token',loginOtpResponse)
useEffect(()=>{
  if(loginResponse  ){
    const getLoginId = async () => {
      const loginIdData = await SecureStore.getItemAsync('loginId');
      setLoginId(loginIdData)
    };
    getLoginId()
  }
  
},[loginResponse])


// console.log('login id in likes',loginId)
// useEffect(()=>{
// if(getFilterUser){
// setMatchArray(getFilterUser)
// }
// },[getFilterUser,matchArray])
useEffect(() => {
  const fetchMatchUsers = async () => {
    try {
      if (loginId) {
        const response = await axios.get(
          `${BASE_URL}/user/getMatchUser/${loginId}`,{
            headers: { 'Cache-Control': 'no-cache' }
          }
        );
        setFilterMatchArray(response?.data?.likesArray || []);
      }
    } catch (error) {
      // console.error("Error fetching matches:", error);
    }
  };

  fetchMatchUsers();

  socket.on("getMatchUser", (newUser) => {

    setFilterMatchArray(newUser)
  });

  return () => {
    socket.off("getMatchUser");
  };
}, [loginId]);
// console.log('filter match array in matches',filterMatchArray)
useEffect(()=>{
if(completeLoginObjData?._id){
  dispatch(getMatchesData(completeLoginObjData?._id))
}
},[dispatch,completeLoginObjData?._id])



useEffect(() => {
  if (getCrossId) {
    let updateArray = matchArray?.filter((filterItem) => filterItem._id !== getCrossId);
    setMatchArray([...updateArray]);  // Ensure new array reference
  } else {
    setMatchArray(getFilterUser);
  }
}, [getCrossId, getFilterUser]);



useEffect(() => {
  if (filterMatchArray?.length > 0 && matchArray?.length > 0) {
    const updatedArray = matchArray?.filter(
      (user) =>
        !filterMatchArray.some(
          (filterUser) => filterUser._id === user._id
        )
    );
    setMatchArray(updatedArray);
  } else {
    setMatchArray(getFilterUser);
  }
}, [filterMatchArray, getFilterUser]);

useEffect(() => {
  const fetchDeactivateUser = async () => {
    try {
      if (loginId) {
        const response = await axios.get(
          `${BASE_URL}/user/getDeactivateUser/${loginId}`,{
            headers: { 'Cache-Control': 'no-cache' }
          }
        );
        // console.log('get deactivate user obj is', response?.data);
        setDeactivateUserObj(response?.data);

        // If deactivatedIdArray is available, filter the allUser array
        if (response?.data?.deactivatedIdArray?.length > 0 || response?.data?.selfDeactivate) {
          const filteredUsers = getFilterUser?.filter(
            (user) => 
              !response?.data?.deactivatedIdArray.includes(user._id) && 
              user._id !== response?.data?.selfDeactivate // Added condition
          );
          setMatchArray(filteredUsers);
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
      const filteredUsers = getFilterUser.filter(
        (user) => 
          !newUser?.deactivatedIdArray.includes(user._id) &&
          user._id !== newUser?.selfDeactivate // Added condition
      );
      setMatchArray(filteredUsers);
    }
  });

  return () => {
    socket.off("getDeactivateUser");
  };
}, [loginId,getFilterUser]); // Re-run effect whenever loginId or getAllUserArray changes

// console.log('get deactivate user obj in likes',deactivateUserObj)
// console.log('match card',matchArray)
const handleRefresh = () => {
  setRefreshing(true);
  dispatch(getMatchesData(completeLoginObj?._id)).finally(() =>
    setRefreshing(false)
  );

};
return (
    <>
  <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {matchArray && matchArray.length > 0 ? (
        <MatchCard matchObj={matchArray[0]} completeObj={completeObj} />
      ):<Text style={{textAlign:'center',fontSize:17,fontWeight:"600",position:'relative',top:'100%',
      color:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>No Match Profile is there</Text> }
    </ScrollView>
    </>
)
}
export default Matches