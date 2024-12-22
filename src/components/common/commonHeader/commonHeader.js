import {Text,View,Image} from 'react-native'
import { Button } from 'react-native-paper';
import back from "../../../../assets/signUpFormIcon/back.png";
import { useNavigation } from "@react-navigation/native";
const CommonHeader=({skipProfileName})=>{
    const navigation = useNavigation();
    const backHandler=()=>{
     if(skipProfileName='Skipped Profiles' || 'Blocked Users'){
        navigation.navigate('Settings')
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
            <Text style={{textAlign:'center',paddingLeft:5,paddingTop:9, fontSize: 17, fontWeight: '600', color: 'black',paddingBottom:5}}>{skipProfileName}</Text>
          </View>
        </View>
    </>
)
}
export default CommonHeader