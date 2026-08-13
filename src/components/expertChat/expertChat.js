
import { Text, Button, TextInput } from "react-native-paper";
import back from "../../../assets/signUpFormIcon/back.png";
import guru from "../../../assets/chatIcons/guru.png";
import send from "../../../assets/chatIcons/sendIcon.png";
import typingIcon from "../../../assets/chatIcons/chat.gif";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {KeyboardAvoidingView,StatusBar,Platform,Keyboard } from "react-native";

import {
  View,
  Pressable,
  ScrollView,
  Image,
  Alert,
} from "react-native";



import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { GoogleGenerativeAI } from "@google/generative-ai";

const ExpertChat = ({ obj, completeObj }) => {



  const [queryText, setQueryText] = useState("");
  const [responseExpertObj, setResponseExpertObj] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const navigation = useNavigation();

 
  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
  
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });
  
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);


  // --------------------------------------------------
  // BACK
  // --------------------------------------------------

  const backHandler = () => {
    navigation.goBack();
  };

  // --------------------------------------------------
  // TEXT CHANGE
  // --------------------------------------------------

  const textChangeHandler = (text) => {
    setQueryText(text);
  };

  // --------------------------------------------------
  // GALLERY
  // --------------------------------------------------

  const pickImageFromGallery = async () => {
    try {

      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Gallery permission is required."
        );
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          quality: 0.8,
        });

      if (result.canceled) {
        return;
      }

      const asset = result.assets[0];

      setSelectedImage({
        uri: asset.uri,
        mimeType: asset.mimeType || "image/jpeg",
        fileName: asset.fileName || "image.jpg",
      });

    } catch (error) {

      console.log("Gallery Error:", error);

      Alert.alert(
        "Error",
        "Unable to select image."
      );
    }
  };

  // --------------------------------------------------
  // CAMERA
  // --------------------------------------------------

  const takePhoto = async () => {
    try {

      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Camera permission is required."
        );
        return;
      }

      const result =
        await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 0.8,
        });

      if (result.canceled) {
        return;
      }

      const asset = result.assets[0];

      setSelectedImage({
        uri: asset.uri,
        mimeType: asset.mimeType || "image/jpeg",
        fileName: asset.fileName || "camera.jpg",
      });

    } catch (error) {

      console.log("Camera Error:", error);

      Alert.alert(
        "Error",
        "Unable to open camera."
      );
    }
  };

  // --------------------------------------------------
  // IMAGE SELECT OPTION
  // --------------------------------------------------

  const selectImage = () => {

    Alert.alert(
      "Select Image",
      "Choose image source",
      [
        {
          text: "Camera",
          onPress: takePhoto,
        },
        {
          text: "Gallery",
          onPress: pickImageFromGallery,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  // --------------------------------------------------
  // REMOVE IMAGE
  // --------------------------------------------------

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  // --------------------------------------------------
  // IMAGE TO BASE64
  // --------------------------------------------------

  const imageToBase64 = async (uri) => {

    const base64 =
      await FileSystem.readAsStringAsync(uri, {
        encoding: "base64",
      });

    return base64;
  };

  // --------------------------------------------------
  // SEND TO GEMINI
  // --------------------------------------------------

  const chatTextSubmitHandler = async () => {

    // Text aur image dono nahi hain
    if (
      !queryText.trim() &&
      !selectedImage
    ) {
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const userPrompt =
      queryText.trim();

    setQueryText("");

    try {

      // ----------------------------------------------
      // GEMINI INITIALIZE
      // ----------------------------------------------

      const genAI =
        new GoogleGenerativeAI(API_KEY);

      const model =
        genAI.getGenerativeModel({
          model: "gemini-3.6-flash",
        });

      let result;

      // ----------------------------------------------
      // IMAGE + TEXT
      // ----------------------------------------------

      if (selectedImage) {

        const base64Image =
          await imageToBase64(
            selectedImage.uri
          );

        /*
          Agar user ne text diya hai:
          "Is image me kya hai?"

          Ya Hindi:
          "इस फोटो में क्या है?"

          Ya Hinglish:
          "Is photo ko explain karo"

          To wahi exact prompt Gemini ko milega.
        */

        const prompt =
          userPrompt ||
          "Please analyze this image and explain what you see.";

        result =
          await model.generateContent([
            {
              text: prompt,
            },
            {
              inlineData: {
                mimeType:
                  selectedImage.mimeType ||
                  "image/jpeg",
                data: base64Image,
              },
            },
          ]);
      }

      // ----------------------------------------------
      // ONLY TEXT
      // ----------------------------------------------

      else {

        /*
          User jo text field me likhega,
          wahi exact prompt Gemini ko jayega.

          English:
          What is artificial intelligence?

          Hindi:
          आर्टिफिशियल इंटेलिजेंस क्या है?

          Hinglish:
          AI ko simple language me samjhao.
        */

        result =
          await model.generateContent(
            userPrompt
          );
      }

      // ----------------------------------------------
      // RESPONSE
      // ----------------------------------------------

      const response =
        result.response;
console.log('response of model',response)
      const text =
        response.text();

      setResponseExpertObj({
        text: text.replace(/\*/g, ""),
      });

      // Image clear after successful request
      setSelectedImage(null);

    } catch (error) {

      console.log(
        "Gemini Error:",
        error
      );

      setResponseExpertObj({
        text:
          "Sorry, response generate nahi ho saka. Please try again.",
      });

    } finally {

      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getAvailableModels = async () => {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
        );
  
        const data = await response.json();
  
        console.log(
          "AVAILABLE GEMINI MODELS:",
          JSON.stringify(data.models, null, 2)
        );
  
      } catch (error) {
        console.log("MODEL LIST ERROR:", error);
      }
    };
  
    getAvailableModels();
  }, []);

  return (
    <>
      {/* ================= HEADER ================= */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : undefined}   // Android me thoda adjust kar sakte ho
        
      >
    

      <View
      style={{
    flexDirection: "row",
    backgroundColor: "#343434",
    paddingTop: StatusBar.currentHeight || 0,
    paddingBottom: 8,
    gap: 60,
  }}
      >

        <View
          style={{
            marginTop: 5,
            marginBottom: 5,
          }}
        >

          <Button
            onPress={backHandler}
          >

            <Image
              source={back}
              style={{
                width: 15,
                height: 15,
                tintColor:'white',
              }}
            />

          </Button>

        </View>

        <View>

          <Text
            style={{
              textAlign: "center",
              paddingLeft: 5,
              paddingTop: 9,
              fontSize: 17,
              fontWeight: "600",
              color:'white',
              paddingBottom: 5,
            }}
          >
            Guru Expert
          </Text>

        </View>

      </View>

      {/* ================= INITIAL MESSAGE ================= */}

      {responseExpertObj === null &&
        !isLoading && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >

            <View>

              <Image
                source={guru}
                style={{
                  width: "100%",
                }}
              />

              <Text
                style={{
                  paddingTop: 14,
                  fontSize: 15,
                  color:'white',
                }}
              >

                Hello{" "}

                <Text
                  style={{
                    fontWeight: "600",
                    color: "#0000ff",
                  }}
                >
                  {obj.loginName}
                </Text>

                {" "}how may I help you in case of{" "}

                <Text
                  style={{
                    fontWeight: "600",
                    color: "#4682b4",
                  }}
                >
                  {obj.firstName}
                </Text>

              </Text>

            </View>

          </View>
        )}

      {/* ================= LOADING ================= */}

      {isLoading && (
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            marginLeft: 10,
            marginTop: 20,
          }}
        >

          <Image
            source={guru}
            style={{
              width: 30,
              height: 30,
            }}
          />

          <Image
            source={typingIcon}
            style={{
              width: 30,
              height: 30,
            }}
          />

        </View>
      )}

      {/* ================= RESPONSE ================= */}

      {responseExpertObj !== null &&
        !isLoading && (

          <View
            style={{
              flex: 1,
              marginBottom: 100,
            }}
          >

            <ScrollView
              contentContainerStyle={{
                paddingBottom: 100,
              }}
            >

              <Text
                style={{
                  textAlign: "left",
                  paddingTop: 20,
                  paddingLeft: 12,
                  paddingRight: 12,
                  color:'white',
                  fontSize: 15,
                  lineHeight: 23,
                }}
              >
                {responseExpertObj.text}
              </Text>

            </ScrollView>

          </View>
        )}

      {/* ================= SELECTED IMAGE PREVIEW ================= */}

      {selectedImage && (

        <View
          style={{
            position: "absolute",
            bottom: 62,
            left: 10,
            width: 90,
            height: 90,
            backgroundColor:'#444',
            borderRadius: 10,
            padding: 5,
            zIndex: 100,
            elevation: 5,
          }}
        >

          <Image
            source={{
              uri: selectedImage.uri,
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 8,
            }}
          />

          {/* REMOVE IMAGE */}

          <Pressable
            onPress={removeSelectedImage}
            style={{
              position: "absolute",
              top: -8,
              right: -8,
              width: 25,
              height: 25,
              borderRadius: 15,
              backgroundColor: "red",
              alignItems: "center",
              justifyContent: "center",
            }}
          >

            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              ×
            </Text>

          </Pressable>

        </View>
      )}

      {/* ================= INPUT AREA ================= */}

      <View
   style={{
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#343434",

    paddingTop: 3,
    paddingBottom: 0,
    borderRadius: 25,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minHeight: 40,

    marginBottom:Platform.OS === "android" ? keyboardHeight : 0,
  }}
>

        {/* ================= IMAGE BUTTON ================= */}

        <Pressable
          onPress={selectImage}
          disabled={isLoading}
          style={{
            width: 45,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >

          <Text
            style={{
              fontSize: 28,
              color:'white',
              fontWeight: "300",
            }}
          >
            +
          </Text>

        </Pressable>

        {/* ================= TEXT INPUT ================= */}

        <TextInput
          style={{
            flex: 1,
            minHeight: 48,
            maxHeight: 110,
            borderWidth: 1,
            borderColor:'#666',
            borderRadius: 7,
            backgroundColor: "white",
            paddingHorizontal: 10,
            paddingRight: 40,
            color: "black",
          }}
          placeholder={
            selectedImage
              ? "Image ke baare me puchhein..."
              : "Message Expert..."
          }
          placeholderTextColor="#888"
          multiline={true}
          onChangeText={textChangeHandler}
          value={queryText}
          editable={!isLoading}
          onSubmitEditing={() => {
            if (!isLoading) {
              chatTextSubmitHandler();
            }
          }}
        />

        {/* ================= SEND ================= */}

        <Pressable
          onPress={chatTextSubmitHandler}
          disabled={
            isLoading ||
            (
              !queryText.trim() &&
              !selectedImage
            )
          }
          style={{
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >

          <Image
            source={send}
            style={{
              width: 20,
              height: 20,
              opacity:
                isLoading ||
                (
                  !queryText.trim() &&
                  !selectedImage
                )
                  ? 0.4
                  : 1,
                  tintColor:'white'
            }}
          />

        </Pressable>

      </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default ExpertChat;

