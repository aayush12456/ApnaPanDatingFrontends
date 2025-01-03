import { Text,Button,TextInput } from "react-native-paper"
import back from "../../../assets/signUpFormIcon/back.png";
import guru from "../../../assets/chatIcons/guru.png";
import send from "../../../assets/chatIcons/sendIcon.png";
import typingIcon from "../../../assets/chatIcons/chat.gif";
import { useNavigation } from "@react-navigation/native";
import { View,Pressable, ScrollView ,Image} from "react-native";
// import { Image } from 'expo-image';
import { useState } from "react";
import axios from 'axios'
const ExpertChat=({obj})=>{
  const API_KEY='AIzaSyCcEe4JMmbqRe_IEdhN8KmN3rOopHO__u8'
  const [queryText,setQueryText]=useState('')
  const [responseExpertObj,setResponseExpertObj]=useState(null)
  const [isLoading, setIsLoading] = useState(false);
  console.log('obj in expert chat',obj.loginName)
    const navigation = useNavigation();
    const backHandler=()=>{
        navigation.navigate('MessageDetailsPageContent',{formData:obj})
    }
    const textChangeHandler=(text)=>{
      setQueryText(text)
        }
    const chatTextSubmitHandler=async()=>{
      if(queryText.trim()){
        const queryObj={
          query:queryText
          }
          console.log('query obj is',queryObj)
          setIsLoading(true); 
          setQueryText('')
          try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,  // Use the API key in the URL
                {
                    contents: [{ parts: [{ text: `${queryObj.query}` }] }]
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
          const data=response.data.candidates[0].content.parts[0]
          data.text = data.text.replace(/\*/g, '');
          setResponseExpertObj(data)
            console.log('message of gpt data is', data);
          } catch (error) {
            console.error('Error sending message:', error);
          } 
          finally {
            setIsLoading(false);  // Stop loading
          }
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
            <Text style={{textAlign:'center',paddingLeft:5,paddingTop:9, fontSize: 17, fontWeight: '600', color: 'black',paddingBottom:5}}>Guru Expert</Text>
          </View>
        </View>
       {responseExpertObj===null && isLoading===false && <View style={{flexDirection:"row",justifyContent:'center',marginTop:20}}>
          <View>
          <Image source={guru} style={{width:'100%'}}/>
          <Text style={{paddingTop:14,fontSize:15}}>Hello <Text style={{fontWeight:'600',color:'#0000ff'}}>{obj.loginName}</Text> how may I help you in case of <Text style={{fontWeight:'600',color:'#4682b4'}}>{obj.firstName}</Text></Text>
          </View>
        </View>}
      { isLoading===true && <View style={{flexDirection:'row',gap:5,marginLeft:10 ,marginTop:20}}> 
          <Image source={guru} style={{width:30,height:30}}/>
          <Image source={typingIcon} style={{width:30,height:30}}/>
        </View>}
        {responseExpertObj!=null && isLoading==false &&<View style={{flex: 1, marginBottom: 80}}>
          <ScrollView>
        <Text style={{textAlign:'center',paddingTop:20,paddingLeft:4,paddingRight:4}}>{responseExpertObj.text}</Text>
          </ScrollView>
        </View>}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            width: "100%",
            paddingVertical: 10,
            paddingHorizontal: 10,
            bottom: -6,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: "#ccc",
              paddingHorizontal: 10,
              borderRadius: 5,
              backgroundColor: "#fff",
              // marginLeft:-20
              marginRight: 12,
              height: 50
            }}
            placeholder="Message Expert"
            onChangeText={(text) => textChangeHandler(text)}
            onSubmitEditing={chatTextSubmitHandler}
            value={queryText}
      
          />
          <Pressable onPress={chatTextSubmitHandler} >
            <Image
              source={send}
              style={{
                width: 20,
                height: 20,
                marginLeft: -30,
                position: 'relative',
                right: 20

              }}
            />
          </Pressable>
        </View>
    </>
)
}
export default ExpertChat