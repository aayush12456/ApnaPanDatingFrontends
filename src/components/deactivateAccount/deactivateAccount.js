import deactivate from '../../../assets/AllIcons/deactivate.png';
import { Button, Text } from "react-native-paper"
import { View, Image} from 'react-native'
import { deactivateAccount } from '../../utils/personalInfo';
import { Dropdown } from 'react-native-paper-dropdown';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import io from "socket.io-client";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
// const socket = io.connect("http://192.168.29.169:4000")
const socket = io.connect("https://apnapandatingbackend.onrender.com")
const DeactivateAccount=({loginId,deactivateObj,completeObj})=>{
  // const BASE_URL = "http://192.168.29.169:4000";
  const BASE_URL = "https://apnapandatingbackend.onrender.com";
    const navigation = useNavigation();
    const [deactivateReason,setDeactivateReason]=useState('')
    const dropdownOptions = deactivateAccount.map(item => ({
        label: item.reasonTitle,
        value: item.reasonTitle,
      }));
      const selectDeactivateReasonHandler=(reason)=>{
      setDeactivateReason(reason)
      }
      const matchesHandler=()=>{
        navigation.navigate('Matches')
      }

      const deactivateAccountHandler=async()=>{
        // console.log('deactivate account reason',deactivateReason)
        const deactivateAccountObj={
          id:loginId,
          deactivate:'deactivate'
        }
        // console.log('deactivate obj',deactivateAccountObj)
        try {
          const response = await axios.post(`${BASE_URL}/user/addDeactivateUser/${deactivateAccountObj.id}`,  deactivateAccountObj);
          // console.log('response in deactivate obj is',response?.data)
          socket.emit('addDeactivateUser', response?.data)
          await SecureStore.deleteItemAsync('loginObj')
          await SecureStore.deleteItemAsync('loginToken')
          navigation.navigate('FrontPage',{formData:response.data.msg})
      } catch (error) {
          // console.error('Error sending deactivate', error);
      }
      }

      const activateAccountHandler=async()=>{
       const activateAccountObj={
        id:loginId,
        activate:'activate'
       }
       try {
        const response = await axios.post(`${BASE_URL}/user/getActivateUser/${activateAccountObj.id}`,activateAccountObj);
        // console.log('response in deactivate obj is',response?.data)
        socket.emit('addActivateUser', response?.data)
    } catch (error) {
        // console.error('Error sending activate', error);
    }
      }
return (
    <>
    <View>
    <View  style={{flexDirection:"row",justifyContent:"center",marginTop:20}}>
        <Image source={deactivate} style={{width:100,height:100}}/>
    </View>
    <Text style={{textAlign:'center',paddingLeft:9,paddingRight:9,paddingTop:15,color:`${completeObj?._id && completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>Deactivating account will cause your profile, messages, visits, likes to be hidden from others until you login back again.When you login again, your profile will be visible to others.Before you go, let us know why you are deactivating your account.</Text>
    <View style={{flexDirection:"row",justifyContent:'center',marginTop:9}}>
    <View style={{  width: "90%" }}>
              <Dropdown
                label="Select One"
                options={dropdownOptions}
                mode="outlined"
                onSelect={(value)=>selectDeactivateReasonHandler(value)}
                value={deactivateReason}
              />
              </View>
    </View>
              <View style={{flexDirection:"row",justifyContent:"center",marginTop:18}}>
            <View style={{width:"90%"}}  >
          { deactivateObj.selfDeactivate===null || !deactivateObj.selfDeactivate ?<Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         borderRadius: 6,
                      }}
                      buttonColor="#bbc5d1"
                      onPress={deactivateAccountHandler}
                    >
                  Deactivate Account
                    </Button>:
                    <Button
                    mode="contained"
                    style={{
                      height: 50, // Set the desired height
                      color: '#FFFFFF',
                       fontSize: 16, 
                       justifyContent:'center',
                       borderRadius: 6,
                    }}
                    buttonColor="#bbc5d1"
                    onPress={activateAccountHandler}
                  >
               Activate Account
                  </Button>
                    }
            </View>
            </View>

            <View style={{flexDirection:"row",justifyContent:"center",marginTop:14}}>
           {deactivateObj.selfDeactivate===null || !deactivateObj.selfDeactivate ? <View style={{width:"90%"}}  >
            <Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         borderRadius: 6,
                      }}
                      buttonColor="#5394e4"
                      onPress={matchesHandler}
                    >
                 Go to Matches
                    </Button>
            </View>:null}
            </View>
    </View>
    </>
)
}
export default DeactivateAccount