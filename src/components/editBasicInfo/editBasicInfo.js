import { View,Text } from "react-native"
import {useSelector } from 'react-redux';

const EditBasicInfo=({completeObj})=>{
    const completeLoginObj=useSelector((state)=>state.loginData.loginData.completeLoginData)
    console.log('complete  login response data in login',completeLoginObj)
    const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
     const completeLoginObjData=completeLoginObj?completeLoginObj:completeLoginObjForOtp
     console.log('complete logn obj data',completeLoginObjData)
     const getProfile = () =>completeLoginObjData
    const dob = getProfile()?.DOB;
  const dobBreak = dob?.split("/");
  const year = dobBreak?.[2];
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const age = year ? currentYear - parseInt(year) : "";

return (
    <>
    <View style={{backgroundColor:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'#343434':'white'}`,
    marginTop:16,marginLeft:8,marginRight:8,borderRadius:4}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:12,paddingBottom:12}}>
    <Text style={{fontSize:15 ,fontWeight:'semibold',color:'grey',paddingLeft:6}}>Name : </Text>
    <Text style={{fontSize:15 ,fontWeight:'semibold',color:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`}}>{completeLoginObjData?.firstName}</Text>
    <Text style={{fontSize:15 ,fontWeight:'semibold',color:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`,paddingRight:6}}>Can't change</Text>
        </View>
    </View>
    <View style={{backgroundColor:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'#343434':'white'}`,marginTop:16,marginLeft:8,marginRight:8,borderRadius:4}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:12,paddingBottom:12}}>
    <Text style={{fontSize:15 ,fontWeight:'semibold',color:'grey',paddingLeft:6}}>Age : </Text>
    <Text style={{fontSize:15 ,fontWeight:'semibold',color:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`}}>{age}</Text>
    <Text style={{fontSize:15 ,fontWeight:'semibold',color:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`,paddingRight:6}}>Can't change</Text>
        </View>
    </View>

    <View style={{backgroundColor:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'#343434':'white'}`,marginTop:16,marginLeft:8,marginRight:8,borderRadius:4}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:12,paddingBottom:12}}>
    <Text style={{fontSize:15 ,fontWeight:'semibold',color:'grey',paddingLeft:6}}>My City : </Text>
    <Text style={{fontSize:15 ,fontWeight:'semibold',color:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`}}>{completeLoginObjData?.city}</Text>
    <Text style={{fontSize:15 ,fontWeight:'semibold',color:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`,paddingRight:6}}>Can't change</Text>
        </View>
    </View>
    <Text style={{paddingTop:20,paddingLeft:6,paddingRight:6,textAlign:'center',
    color:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`}}>Your profile will be shown to users in and around {completeLoginObjData?.city}.Your profile may also visible to users who have enabled matches from other cities</Text>
  
    </>
)
}
export default EditBasicInfo