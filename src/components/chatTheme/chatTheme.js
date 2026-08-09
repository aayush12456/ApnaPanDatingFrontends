import React, { forwardRef,useState } from "react";
import { View ,ScrollView, Pressable} from "react-native";
import { Text } from "react-native-paper";
import RBSheet from "@lunalee/react-native-raw-bottom-sheet";
import { Button } from "react-native-paper";
import io from "socket.io-client";
import axios from "axios";
import {useDispatch } from "react-redux";
import { bottomSheetOpenModalToggleActions } from "../../Redux/Slice/bottomSheetOpenModalSlice/bottomSheetOpenModalSlice";

const socket = io.connect("http://192.168.29.169:4000")
const ChatTheme = forwardRef((props, ref) => {
  const { loginId, recieverId ,loginTheme,recieverTheme} = props;
  console.log('loginTHeme',loginTheme)
  console.log('reciever theme',recieverTheme)
const dispatch=useDispatch()
  const BASE_URL = "http://192.168.29.169:4000";
  const [selectTheme,setSelectTheme]=useState({})
  const [loading, setLoading] = useState(false);

const selectThemeHandler=(selectTheme)=>{
setSelectTheme(selectTheme)
}

const submitThemeHandler=async()=>{
  if (!selectTheme?.name) {
    return;
  }
  const finalSelectTheme={id:loginId,recieverId:recieverId,...selectTheme}
  console.log('theme select',finalSelectTheme)
  setLoading(true);
  try {
    const themeResponse = await axios.post(`${BASE_URL}/user/addChatTheme/${finalSelectTheme.id}`,finalSelectTheme);
    // console.log('response in another record message id user is',deleteAnotherResponseIdObj?.data?.anotherRecordMessageIdArray)
    console.log('theme response in chat',themeResponse)
    socket.emit('addColourTheme', themeResponse.data);
    if (themeResponse?.data) {
      ref?.current?.close();

      // Redux bottom sheet state bhi close/toggle
      dispatch(
        bottomSheetOpenModalToggleActions.bottomSheetOpenModalToggle()
      );
    }
} catch (error) {
    // console.error('Error sending in delete another response in another response id:', error);
}
finally {
  setLoading(false);
}
}
const chatThemes = {
 
  ocean: {
    name: "Ocean Blue",
    header: ["#2563EB", "#60A5FA"],
    myBubble: "#2563EB",
    otherBubble: "#DBEAFE",
    myText: "#FFFFFF",
    otherText: "#1E3A8A",
    input: "#F0F9FF",
    icon: "#2563EB",
    background: "#F0F9FF",
    callBubble: "#F3F3F3",
  },

  sunset: {
    name: "Sunset Love",
    header: ["#F43F5E", "#FB7185"],
    myBubble: "#F43F5E",
    otherBubble: "#FFE4E6",
    myText: "#FFFFFF",
    otherText: "#9F1239",
    input: "#FFF1F2",
    icon: "#F43F5E",
    background: "#FFF7F7",
    callBubble: "#F3F3F3",
  },

  midnight: {
    name: "Midnight",
    header: ["#18181B", "#8B5CF6"],
    myBubble: "#8B5CF6",
    otherBubble: "#3F3F46",
    myText: "#FFFFFF",
    otherText: "#E4E4E7",
    input: "#27272A",
    icon: "#A855F7",
    background: "#18181B",
    callBubble: "#27272A",
  },

  default: {
    name: "Default",
    header: ["#343434", "#343434"],
    myBubble: "#1E3AFF",
    otherBubble: "#E5E5EA",
    myText: "#FFFFFF",
    otherText: "#000000",
    input: "#f0f0f0",
    icon: "#0095f6",
    background: "#000000",
    callBubble: "#F3F3F3",
  },
};
  return (
    <RBSheet
      ref={ref}
      draggable={true}
      closeOnPressMask={true}
      closeOnPressBack={true}
      height={300}
      customStyles={{
        container: {
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingHorizontal: 20,
          paddingTop: 20,
        },
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            textAlign: "center",

          }}
        >
          Theme
        </Text>
        <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingTop: 20,
    paddingBottom: 20,
  }}
>
  {Object.entries(chatThemes).map(([key, theme]) => (
    <Pressable
      key={key}
      style={{
        marginBottom: 15,
      }}
      onPress={()=>selectThemeHandler(theme)}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 14,
          borderWidth:
          selectTheme?.name === theme.name ||
          loginTheme?.[0]?.name === theme.name ||
          recieverTheme?.[0]?.name === theme.name
            ? 2
            : 1,
         borderColor:
      selectTheme?.name === theme.name ||
      loginTheme?.[0]?.name === theme.name ||
      recieverTheme?.[0]?.name === theme.name
        ? theme.header[0]
        : "#E5E7EB",
          elevation: 3,
        }}
      >
        {/* Theme Name */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            marginBottom: 12,
          }}
        >
          {theme.name}
        </Text>

        {/* Header Preview */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 12,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 12,
              backgroundColor: theme.header[0],
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          />

          <View
            style={{
              flex: 1,
              height: 12,
              backgroundColor: theme.header[1],
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          />
        </View>

        {/* Chat Preview */}
        <View>
          <View
            style={{
              alignSelf: "flex-start",
              backgroundColor: theme.otherBubble,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 18,
              marginBottom: 8,
            }}
          >
            <Text style={{ color: theme.otherText }}>
              Hi 👋
            </Text>
          </View>

          <View
            style={{
              alignSelf: "flex-end",
              backgroundColor: theme.myBubble,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 18,
            }}
          >
            <Text style={{ color: theme.myText }}>
              Hello ❤️
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  ))}
<Button
  mode="contained"
  buttonColor="#2563EB"
  onPress={() =>submitThemeHandler()}
  
  style={{
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 40,
  }}
  contentStyle={{
    height: 52,
  }}
>
{loading ? "Applying..." : "Apply Theme"}
</Button>
</ScrollView>
        {/* Theme options yaha add karna */}
      </View>
    </RBSheet>
  );
});

export default ChatTheme;