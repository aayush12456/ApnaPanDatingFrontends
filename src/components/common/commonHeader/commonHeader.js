import {Text,View,Image} from 'react-native'
import { Button } from 'react-native-paper';
import back from "../../../../assets/signUpFormIcon/back.png";
import { useNavigation } from "@react-navigation/native";
const CommonHeader=({commonHeaderName})=>{
    const navigation = useNavigation();
    const backHandler=()=>{
     if(commonHeaderName==='Skipped Profiles' || 'Blocked Users' || 'Account Settings'){
        navigation.navigate('Settings')
     }
    if(commonHeaderName==='Change Password'){

      navigation.navigate('AccountSettingsPage',{formData:{headerName:'Account Settings'}})
    }
    if(commonHeaderName==='Manage Account'){

      navigation.navigate('AccountSettingsPage',{formData:{headerName:'Account Settings'}})
    }
    if(commonHeaderName==='Deactivate Account'){

      navigation.navigate('ManageAccountPage',{formData:{headerName:'Manage Account'}})
    }
    if(commonHeaderName==='Delete Account'){

      navigation.navigate('ManageAccountPage',{formData:{headerName:'Manage Account'}})
    }
    }
return (
    <>
      <View
          style={{
            flexDirection:'row',
            backgroundColor: "white",
            marginTop: 40,
            gap:60
          }}
        >
             <View style={{ marginTop: 5,marginBottom:5 }}>
            <Button onPress={backHandler}>
              <Image source={back} style={{ width: 15, height: 15 }} />
            </Button>
          </View>
          <View>
            <Text style={{textAlign:'center',paddingLeft:5,paddingTop:9, fontSize: 17, fontWeight: '600', color: 'black',paddingBottom:5}}>{commonHeaderName}</Text>
          </View>
        </View>
    </>
)
}
export default CommonHeader