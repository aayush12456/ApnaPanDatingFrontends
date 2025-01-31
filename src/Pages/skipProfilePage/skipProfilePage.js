import CommonHeader from "../../components/common/commonHeader/commonHeader"
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import SkipProfile from "../../components/skipProfile/skipProfile";
import { Text } from "react-native-paper";
import {View} from 'react-native'
const SkipProfilePage=({route})=>{
  const BASE_URL = "http://192.168.29.169:4000";
    const { formData } = route?.params;
    const [loginId,setLoginId]=useState('')
    const [fetchMatchSkipUser,setFetchMatchSkipUser]=useState([])
    const [fetchOnlineSkipUser,setFetchOnlineSkipUser]=useState([])
    const [completeObj,setCompleteObj]=useState({})
    const loginResponse=useSelector((state)=>state.loginData.loginData.token)
    const loginOtpResponse=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.token)
    const passSkipProfileId=useSelector((state)=>state.passSkipProfile.passSkipProfile)
    console.log('pass skip profile id',passSkipProfileId)

    const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
    const completeLoginObj = useSelector(
      (state) => state.loginData.loginData.completeLoginData
    );
    const completeLoginObjData=completeLoginObj || completeLoginObjForOtp || {}
    const appearModeSelector=useSelector((state)=>state?.appearMode?.appearModeData?.loginUpdateUser)

    useEffect(()=>{
      if(appearModeSelector){
      setCompleteObj(appearModeSelector)
      }
      else{
          setCompleteObj(completeLoginObjData)
      }
      },[appearModeSelector,completeLoginObjData])

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
                `${BASE_URL}/user/getSkipUser/${loginId}`
              );
              console.log('get fetch match skip user is',response?.data)
              setFetchMatchSkipUser(response?.data?. matchSkipUser);
            }
          } catch (error) {
            console.error("Error fetching visitor like user:", error);
          }
        };
      
        fetchMatchSkipUsers();
      }, [loginId]);
      console.log('fetch match skip user',fetchMatchSkipUser)

      useEffect(() => {
        const fetchOnlineSkipUsers = async () => {
          try {
            if (loginId) {
              const response = await axios.get(
                `${BASE_URL}/user/getOnlineSkipUser/${loginId}`
              );
              console.log('get fetch online skip user is',response?.data)
              setFetchOnlineSkipUser(response?.data?.getOnlineSkipUser);
            }
          } catch (error) {
            console.error("Error fetching visitor like user:", error);
          }
        };
      
        fetchOnlineSkipUsers();
      }, [loginId]);
      console.log('fetch online skip user',fetchOnlineSkipUser)
    
      useEffect(() => {
        if (passSkipProfileId) {
          setFetchMatchSkipUser((prev) =>
            prev.filter((user) => user?._id !== passSkipProfileId)
          );
          setFetchOnlineSkipUser((prev) =>
            prev.filter((user) => user?._id !== passSkipProfileId)
          );
        }
      }, [passSkipProfileId]);
      const combineSkipUserArray=[...fetchMatchSkipUser,...fetchOnlineSkipUser]
      console.log('combine skip user array',combineSkipUserArray)
    
return (
    <>
    <View style={{backgroundColor:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'black':''}`,height:"100%"}}>
    <CommonHeader commonHeaderName={formData.headerName}/>
    {
      combineSkipUserArray.length>0?  combineSkipUserArray.map((skipUserData,index)=>{
            console.log('skip user data',skipUserData)
            return (
                <SkipProfile skipProfileUser={skipUserData} key={skipUserData?._id} loginId={loginId} completeObj={completeObj}/>

            )
        }):<Text style={{textAlign:'center',fontSize:17,fontWeight:"600",position:'relative',top:'30%',
     color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}` }}>No Skip Profile is there</Text>
    }
    </View>
    </>
)
}
export default SkipProfilePage