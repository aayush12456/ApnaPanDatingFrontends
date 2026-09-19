import { View,ScrollView,KeyboardAvoidingView, Platform,Text,ActivityIndicator,Alert,Pressable} from "react-native"
import { TextInput,Button } from 'react-native-paper';
import {  useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Image } from 'expo-image';
import { userReportAsync,reportUsData } from "../../Redux/Slice/reportSlice/reportSlice";
import block from "../../../assets/chatIcons/block.png";
import axios from "axios";
import io from "socket.io-client";
import { useNavigation } from "@react-navigation/native";
import { dotsOpenModalToggleActions } from "../../Redux/Slice/dotsOpenModalSlice/dotsOpenModalSlice";

const socket = io.connect("http://192.168.29.169:4000")
const Report=({reportObj})=>{
  const BASE_URL = "http://192.168.29.169:4000";
    const [loading, setLoading] = useState(false);
    const [messageText,setMessageText]=useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch=useDispatch()
    const navigation = useNavigation();
    const reportSelector=useSelector((state)=>state.report.userReportObj)
    // console.log('report selector',reportSelector)
    // console.log('report obj',reportObj)
    const messageTypeHandler=(text)=>{
setMessageText(text)
    }
    // console.log('select image uri',selectedImage)

  const selectImageHandler = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow photo library permission to select an image."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const image = result.assets[0];

        setSelectedImage({
          uri: image.uri,
          name: image.fileName || `report_${Date.now()}.jpg`,
          type: image.mimeType || "image/jpeg",
        });
      }
    } catch (error) {
      console.log("Image picker error:", error);
    }
  };

  // Remove selected image
  const removeImageHandler = () => {
    setSelectedImage(null);
  };

  // Submit
  const submitReportHandler = async () => {
    try {
      if (!messageText.trim()) {
        Alert.alert("Required", "Please enter a message.");
        return;
      }

      setLoading(true);

      const formData = new FormData();

      // Text fields
      formData.append("message", messageText);

      formData.append(
        "reportTitle",
        reportObj?.reportTitle || ""
      );

      formData.append(
        "senderName",
        reportObj?.senderName || ""
      );

      formData.append(
        "senderEmail",
        reportObj?.senderEmail || ""
      );

      formData.append(
        "recieverName",
        reportObj?.recieverName || ""
      );

      formData.append(
        "recieverEmail",
        reportObj?.recieverEmail || ""
      );

      // Image
      if (selectedImage?.uri) {
        formData.append("reportImage", {
          uri: selectedImage.uri,
          name: selectedImage.name,
          type: selectedImage.type,
        });
      }

      // console.log("REPORT FORM DATA READY",formData);

      dispatch(userReportAsync(formData))
    } catch (error) {
      console.log("Submit report error:", error);
      setLoading(false);
      Alert.alert(
        "Error",
        "Something went wrong while submitting the report."
      );
    } 
  };

  const viewProfileBlockHandler=async()=>{
    const blockChatIdObj={
    id:reportObj?.loginId,
    blockId:reportObj?.blockId
    }
   
    try {
      const response = await axios.post(`${BASE_URL}/user/addBlockChatIdUser/${blockChatIdObj.id}`,blockChatIdObj);
      // console.log('response in block chat user',response?.data)
      socket.emit('addBlockUser', response?.data)
  
  } catch (error) {
      // console.error('Error sending user in block', error);
  }
    dispatch(dotsOpenModalToggleActions.dotsOpenModalToggle())
    navigation.goBack();
  }

const finishedHandler=()=>{
  dispatch(reportUsData());
}

useEffect(() => {
  if (reportSelector?.mssg === "Report submitted successfully") {
    setLoading(false);
    setSelectedImage(null);
    setMessageText('')
  }
}, [reportSelector?.mssg]);

return (
    <>
<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
>
<ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingBottom: 40,
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
     { reportSelector.mssg=="Report submitted successfully"?null:<View>
      <Text
          style={{
            fontSize: 14,
            color: "white",
            textAlign: "center",
            paddingTop:15
          }}
        >
          {`why are you reporting ${reportObj?.recieverName} profile`}
        </Text>
    <View>
    <View style={{ paddingHorizontal:16,marginTop:12 }}>
      <TextInput
  label="Message"
  mode="outlined"
  multiline
  numberOfLines={5}
  style={{
    height: 120,
    marginTop: 10,
    textAlignVertical: 'top'
  }}
value={messageText}
  onChangeText={(text)=>messageTypeHandler(text)}
/>
{/* {touched.message && errors.message && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {errors.message}
                  </Text>
                )} */}
      </View>

<View>
    
</View>
     {selectedImage!==null?null: <Pressable
            onPress={selectImageHandler}
            style={{
              marginTop: 15,
              height: 52,
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: "#007BFF",
              borderRadius: 11,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F5F9FF",
              marginLeft:12,
              marginRight:12
    
            }}
          >
            <Text
              style={{
                color: "#007BFF",
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              + Select Image
            </Text>
          </Pressable>}

          {selectedImage?.uri && (
            <View
              style={{
                marginTop: 15,
                borderRadius: 12,
                overflow: "hidden",
                backgroundColor: "#1F1F1F",
                marginLeft:12,
                marginRight:12
              }}
            >
              <Image
                source={{ uri: selectedImage.uri }}
                contentFit="contain"
                style={{
                  width: "100%",
                  height: 220,
                }}
              />

              {/* Remove Image */}
              <Pressable
                onPress={removeImageHandler}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: "rgba(0,0,0,0.7)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "700",
                  }}
                >
                  ×
                </Text>
              </Pressable>

              <Text
                numberOfLines={1}
                style={{
                  color: "white",
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  fontSize: 12,
                }}
              >
                {selectedImage.name}
              </Text>
            </View>
          )}


<View
  style={{
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 12,
  }}
>
  <Pressable
    disabled={loading}
    onPress={submitReportHandler}
    style={{
      height: 50,
      borderRadius: 11,
      backgroundColor: "#007BFF",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      opacity: loading ? 0.8 : 1,
    }}
  >
    {loading ? (
      <>
        <ActivityIndicator
          size="small"
          color="#FFFFFF"
          style={{ marginRight: 8 }}
        />

        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Sending...
        </Text>
      </>
    ) : (
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        Submit
      </Text>
    )}
  </Pressable>
</View>
    </View>
      </View>}

      {reportSelector.mssg=="Report submitted successfully"?
        <View style={{marginTop:30}}>
          <View>
            <Text style={{color:'white',fontSize:18,fontWeight:600,paddingLeft:13}}>Thanks for reporting</Text>
            <Text  style={{color:'white',paddingTop:9,paddingLeft:13,paddingRight:13}}>While you wait for our decision,there are other steps that you can take now.</Text>
          </View>
          <View
              style={{
                height: 1,
                backgroundColor: "#4A4A4A",
                marginTop: 15,
                marginBottom: 15,
                marginLeft:13,
                marginRight:13
              }}
            />
            <View style={{paddingTop:5,paddingLeft:13,paddingRight:13}}>
            <Text style={{color:'white',fontSize:16}}>Other steps that you can take</Text> 
            <Text style={{color:'white',paddingTop:9}}>{`We won't notify ${reportObj?.recieverName} if you take any of these actions`}</Text>
            <Pressable onPress={()=>viewProfileBlockHandler()}>
           <View style={{flexDirection:'row',gap:5,marginTop:12}}>
            <Image source={block} style={{ width: 30, height: 30 }}/>
            <Text style={{ paddingTop: 4,color:'red' }}>Block {reportObj?.recieverName}</Text>
           </View>
           </Pressable>
            </View>

            <View style={{ width: '100%', overflow: 'hidden' }}>
<Button
  mode="contained"
  disabled={loading}
  style={{
    height: 50,
    borderRadius: 11,
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 12,
    fontSize: 16,
    marginRight: 20,
    backgroundColor: "#007BFF", // force color
    // opacity:loading ? 0.8 : 1, // disabled feel
  }}
  onPress={finishedHandler}
  contentStyle={{ height: 50 }}
>
Finished

</Button>

      </View>
          
        </View>
      :null}

</ScrollView>
</KeyboardAvoidingView>
    </>
)
}
export default Report