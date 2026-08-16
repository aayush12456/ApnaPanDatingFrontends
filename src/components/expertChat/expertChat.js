
import { Text, Button, TextInput } from "react-native-paper";
import Markdown from '@ronradtke/react-native-markdown-display';
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





import { GoogleGenerativeAI } from "@google/generative-ai";

const ExpertChat = ({ obj, completeObj }) => {


  const [queryText, setQueryText] = useState("");
  const [responseExpertObj, setResponseExpertObj] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

 

  const textChangeHandler = (text) => {
    setQueryText(text);
  };

 

  const chatTextSubmitHandler = async () => {

    // Text aur image dono nahi hain
    if (
      !queryText.trim()
    
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

      result = await model.generateContent(userPrompt);
      // ----------------------------------------------
      // RESPONSE
      // ----------------------------------------------

      const response =
        result.response;
console.log('response of model',response)
      const text =
        response.text();

      setResponseExpertObj({
        text: text,
      });

  

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

<Markdown
  style={{
    body: {
      color: 'white',
      fontSize: 15.5,
      lineHeight: 24,
      paddingHorizontal: 14,
      paddingTop: 16,
    },
    heading1: {
      color: '#ffffff',
      fontSize: 22,
      fontWeight: '700',
      marginTop: 18,
      marginBottom: 8,
    },
    heading2: {
      color: '#ffffff',
      fontSize: 19,
      fontWeight: '700',
      marginTop: 16,
      marginBottom: 6,
    },
    heading3: {
      color: '#ffffff',
      fontSize: 17,
      fontWeight: '600',
      marginTop: 14,
      marginBottom: 5,
    },
    paragraph: {
      marginTop: 0,
      marginBottom: 10,
      color: 'white',
    },
    bullet_list: {
      marginBottom: 10,
    },
    ordered_list: {
      marginBottom: 10,
    },
    list_item: {
      color: 'white',
      fontSize: 15.5,
      lineHeight: 23,
      marginBottom: 5,
    },
    strong: {
      fontWeight: '700',
      color: 'white',
    },
    em: {
      fontStyle: 'italic',
      color: 'white',
    },
    code_inline: {
      backgroundColor: '#404040',
      color: '#f0f0f0',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 5,
      fontSize: 14,
    },
    code_block: {
      backgroundColor: '#2c2c2c',
      color: '#f0f0f0',
      padding: 14,
      borderRadius: 10,
      marginVertical: 10,
      fontSize: 14,
    },
    fence: {
      backgroundColor: '#2c2c2c',
      color: '#f0f0f0',
      padding: 14,
      borderRadius: 10,
      marginVertical: 10,
    },
    table: {
      borderWidth: 1,
      borderColor: '#555',
      borderRadius: 8,
      marginVertical: 12,
    },
    thead: {
      backgroundColor: '#404040',
    },
    th: {
      padding: 10,
      color: 'white',
      fontWeight: '700',
    },
    td: {
      padding: 10,
      color: 'white',
      borderColor: '#555',
      borderWidth: 0.5,
    },
    blockquote: {
      backgroundColor: '#3a3a3a',
      borderLeftWidth: 4,
      borderLeftColor: '#4a9eff',
      paddingHorizontal: 14,
      paddingVertical: 10,
      marginVertical: 10,
      borderRadius: 6,
    },
  }}
>
  {responseExpertObj.text}
</Markdown>

            </ScrollView>

          </View>
        )}

      {/* ================= SELECTED IMAGE PREVIEW ================= */}

     

      {/* ================= INPUT AREA ================= */}

      <View
   style={{
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  
    flexDirection: "row",
    alignItems: "center",
  
    backgroundColor: "#ffffff",
  
    paddingTop: 3,
    paddingBottom: 0,
    borderRadius: 25,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minHeight: 40,
  
    marginBottom:
      Platform.OS === "android"
        ? keyboardHeight
        : 0,
  }}
>

        {/* ================= IMAGE BUTTON ================= */}

        {/* ================= TEXT INPUT ================= */}

        <TextInput
          style={{
            flex: 1,

            backgroundColor: "transparent",
          
            minHeight: 60,
            maxHeight: 120,
          
            fontSize: 16,
          
            color: "#000",
          
            borderWidth: 0,
          
            paddingHorizontal: 0,
          
            paddingRight: 10,
            paddingLeft:20
          }}
          placeholder="Message Expert..."
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
              !queryText.trim() 
            )
          }
          style={{
            width: 52,
            height: 52,
          
            borderRadius: 26,
          
            backgroundColor: "#d6d6d6",
          
            alignItems: "center",
            justifyContent: "center",
          }}
        >

          <Image
            source={send}
            style={{
              width: 24,
              height: 24,
              opacity:
              isLoading || !queryText.trim()
                 ? 0.4
                 : 1
            }}
          />

        </Pressable>

      </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default ExpertChat;

