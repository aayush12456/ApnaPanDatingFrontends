import deactivate from '../../../assets/AllIcons/deactivate.png';
import { Button, Text } from "react-native-paper"
import { View, Image, Pressable } from 'react-native'
import { deactivateAccount } from '../../utils/personalInfo';
import { Dropdown } from 'react-native-paper-dropdown';
import { Provider as PaperProvider } from 'react-native-paper';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
const DeactivateAccount=()=>{
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
      const deactivateAccountHandler=()=>{
        console.log('deactivate account reason',deactivateReason)
      }
return (
    <>
    <View>
    <View  style={{flexDirection:"row",justifyContent:"center",marginTop:20}}>
        <Image source={deactivate} style={{width:100,height:100}}/>
    </View>
    <Text style={{textAlign:'center',paddingLeft:9,paddingRight:9,paddingTop:15}}>Deactivating account will cause your profile, messages, visits, likes to be hidden from others until you login back again.When you login again, your profile will be visible to others.Before you go, let us know why you are deactivating your account.</Text>
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
                      onPress={deactivateAccountHandler}
                    >
                  Deactivate Account
                    </Button>
            </View>
            </View>

            <View style={{flexDirection:"row",justifyContent:"center",marginTop:14}}>
            <View style={{width:"90%"}}  >
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
            </View>
            </View>
    </View>
    </>
)
}
export default DeactivateAccount