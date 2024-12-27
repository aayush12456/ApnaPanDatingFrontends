
import {  Text} from 'react-native-paper';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import {ScrollView,RefreshControl} from 'react-native'
import { getMatchesData } from '../../Redux/Slice/getMatchesSlice/getMatchesSlice';
import io from "socket.io-client";
import MatchCard from '../MatchCard/MatchCard';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
const socket = io.connect("http://192.168.29.169:4000")
const Matches=()=>{
  const [filterMatchArray,setFilterMatchArray]=useState([])
  const [loginId,setLoginId]=useState('')
  const [refreshing, setRefreshing] = useState(false);
  const dispatch=useDispatch()
  const getFilterUser=useSelector((state)=>state.getMatchesData.getMatchesArray.interestUsers)
console.log('get match filter user',getFilterUser)
const [matchArray,setMatchArray]=useState(getFilterUser)
const completeLoginObj = useSelector(
  (state) => state.loginData.loginData.completeLoginData
);
const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)

const completeLoginObjData=completeLoginObj || completeLoginObjForOtp || {}

const getCrossId=useSelector((state)=>state.passData.passData)
console.log('cross id is',getCrossId)
const loginResponse=useSelector((state)=>state.loginData.loginData.token)// ye loginToken
const loginOtpResponse=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.token) // ye loginOtpToken
console.log('login otp response token',loginOtpResponse)
useEffect(()=>{
  if(loginResponse  ){
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
        setFilterMatchArray(response?.data?.likesArray || []);
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
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
console.log('filter match array in matches',filterMatchArray)
useEffect(()=>{
if(completeLoginObjData?._id){
  dispatch(getMatchesData(completeLoginObjData._id))
}
},[dispatch,completeLoginObjData?._id])


useEffect(()=>{
if(getCrossId){
  let updateArray=matchArray.filter((filterItem)=>filterItem._id!=getCrossId)
  setMatchArray(updateArray)
}
else{
  setMatchArray(getFilterUser)
}

},[getCrossId,getFilterUser])

useEffect(() => {
  if (filterMatchArray?.length > 0 && matchArray?.length > 0) {
    const updatedArray = matchArray.filter(
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
      {matchArray && matchArray.length > 0 && (
        <MatchCard matchObj={matchArray[0]} />
      ) }
    </ScrollView>
    </>
)
}
export default Matches