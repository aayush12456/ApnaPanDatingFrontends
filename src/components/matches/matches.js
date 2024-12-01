
import {  Text} from 'react-native-paper';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { getMatchesData } from '../../Redux/Slice/getMatchesSlice/getMatchesSlice';
import io from "socket.io-client";
import MatchCard from '../MatchCard/MatchCard';
import axios from 'axios'
const socket = io.connect("http://192.168.29.169:4000")
const Matches=()=>{
  const [filterMatchArray,setFilterMatchArray]=useState([])
  const [loginId,setLoginId]=useState('')
  const dispatch=useDispatch()
  const getFilterUser=useSelector((state)=>state.getMatchesData.getMatchesArray.interestUsers)
console.log('get match filter user',getFilterUser)
const [matchArray,setMatchArray]=useState(getFilterUser)
const completeLoginObj = useSelector(
  (state) => state.loginData.loginData.completeLoginData
);
const getCrossId=useSelector((state)=>state.passData.passData)
console.log('cross id is',getCrossId)
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
        setFilterMatchArray(response?.data?.anotherMatchUser || []);
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
if(completeLoginObj?._id){
  dispatch(getMatchesData(completeLoginObj?._id))
}
},[dispatch,completeLoginObj?._id])


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
  if (filterMatchArray.length > 0 && matchArray.length > 0) {
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
return (
    <>
   {
    matchArray && matchArray.length>0 
    &&<MatchCard matchObj={matchArray[0]}/>
   }
    </>
)
}
export default Matches