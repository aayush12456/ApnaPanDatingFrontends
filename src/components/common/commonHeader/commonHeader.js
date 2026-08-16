import {Text,View,Image,StatusBar} from 'react-native'
import { Button } from 'react-native-paper';
import back from "../../../../assets/signUpFormIcon/back.png";
import { useNavigation } from "@react-navigation/native";
import {useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
const CommonHeader=({commonHeaderName,completeLoginObj})=>{
  console.log('name header',commonHeaderName)
    const navigation = useNavigation();
    const [completeObj,setCompleteObj]=useState({})
   
    
    const completeLoginObjData=completeLoginObj || {}

    const backHandler = () => {

      if (
        commonHeaderName === 'Skipped Profiles' ||
        commonHeaderName === 'Blocked Users' ||
        commonHeaderName === 'Account Settings' ||
        commonHeaderName === 'AppearancePage'
      ) {
       navigation.goBack()
        return;
      }
    
    
    
      if (commonHeaderName === 'Manage Account') {
        navigation.goBack();
        return;
      }
    
      if (commonHeaderName === 'Deactivate Account') {
        navigation.goBack();
        return;
      }
    
      if (commonHeaderName === 'Delete Account') {
        navigation.goBack();
        return;
      }
    };

return (
    <>
     <View
      style={{
    flexDirection: "row",
    backgroundColor: "#343434",
    paddingTop: StatusBar.currentHeight || 0,
    paddingBottom: 8,
    gap: 60,
  }}
      >
             <View style={{ marginTop: 5,marginBottom:5 }}>
            <Button onPress={backHandler}>
              <Image source={back} style={{ width: 15, height: 15,tintColor:`white` }} />
            </Button>
          </View>
          <View>
            <Text style={{textAlign:'center',paddingTop:9, fontSize: 17, fontWeight: '600', color:`white`,paddingBottom:5}}>{commonHeaderName}</Text>
          </View>
        </View>
    </>
)
}
export default CommonHeader