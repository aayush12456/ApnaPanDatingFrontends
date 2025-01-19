import CommonHeader from "../../components/common/commonHeader/commonHeader"
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import SkipProfile from "../../components/skipProfile/skipProfile";
import { Text } from "react-native-paper";
const SkipProfilePage=({route})=>{
    const { formData } = route?.params;
    const [loginId,setLoginId]=useState('')
    const [fetchMatchSkipUser,setFetchMatchSkipUser]=useState([])
    const [fetchOnlineSkipUser,setFetchOnlineSkipUser]=useState([])
    const loginResponse=useSelector((state)=>state.loginData.loginData.token)
    const loginOtpResponse=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.token)
    const passSkipProfileId=useSelector((state)=>state.passSkipProfile.passSkipProfile)
    console.log('pass skip profile id',passSkipProfileId)
    useEffect(()=>{
        if(loginResponse || loginOtpResponse){
          const getLoginId = async () => {
            
            const loginIdData = await SecureStore.getItemAsync('loginId');
            setLoginId(loginIdData)
          };
          getLoginId()
        }
    },[loginResponse,loginOtpResponse])
    useEffect(() => {
        const fetchMatchSkipUsers = async () => {
          try {
            if (loginId) {
              const response = await axios.get(
                `http://192.168.29.169:4000/user/getSkipUser/${loginId}`
              );
              // setLikesArray(response?.data?.anotherMatchUser || []);
              console.log('get fetch match skip user is',response?.data)
              setFetchMatchSkipUser(response?.data?. matchSkipUser);
            }
          } catch (error) {
            console.error("Error fetching visitor like user:", error);
          }
        };
      
        fetchMatchSkipUsers();
      
        // socket.on("getVisitorLikeUser", (newUser) => {
      
        //   setVisitorLikeUserObj(newUser)
        // });
      
        // return () => {
        //   socket.off("getVisitorLikeUser");
        // };
      }, [loginId]);
      console.log('fetch match skip user',fetchMatchSkipUser)

      useEffect(() => {
        const fetchOnlineSkipUsers = async () => {
          try {
            if (loginId) {
              const response = await axios.get(
                `http://192.168.29.169:4000/user/getOnlineSkipUser/${loginId}`
              );
              // setLikesArray(response?.data?.anotherMatchUser || []);
              console.log('get fetch online skip user is',response?.data)
              setFetchOnlineSkipUser(response?.data?.getOnlineSkipUser);
            }
          } catch (error) {
            console.error("Error fetching visitor like user:", error);
          }
        };
      
        fetchOnlineSkipUsers();
      
        // socket.on("getVisitorLikeUser", (newUser) => {
      
        //   setVisitorLikeUserObj(newUser)
        // });
      
        // return () => {
        //   socket.off("getVisitorLikeUser");
        // };
      }, [loginId]);
      console.log('fetch online skip user',fetchOnlineSkipUser)
    
      useEffect(() => {
        if (passSkipProfileId) {
          setFetchMatchSkipUser((prev) =>
            prev.filter((user) => user._id !== passSkipProfileId)
          );
          setFetchOnlineSkipUser((prev) =>
            prev.filter((user) => user._id !== passSkipProfileId)
          );
        }
      }, [passSkipProfileId]);
      const combineSkipUserArray=[...fetchMatchSkipUser,...fetchOnlineSkipUser]
      console.log('combine skip user array',combineSkipUserArray)
    
return (
    <>
    <CommonHeader commonHeaderName={formData.headerName}/>
    {
      combineSkipUserArray.length>0?  combineSkipUserArray.map((skipUserData,index)=>{
            console.log('skip user data',skipUserData)
            return (
                <>
                <SkipProfile skipProfileUser={skipUserData} loginId={loginId}/>
                </>
            )
        }):<Text style={{textAlign:'center',fontSize:17,fontWeight:"600",position:'relative',top:'30%'}}>No Skip Profile is there</Text>
    }
    </>
)
}
export default SkipProfilePage