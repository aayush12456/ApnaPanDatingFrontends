import { usePreventScreenCapture } from "expo-screen-capture";
import { View,Text } from "react-native";
const ScreenShotCapture=()=>{
    usePreventScreenCapture();
return (
    <>
        <View
      // style={{
      //   flex: 1,
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
    >
      <Text>Protected Screen</Text>
    </View>
    </>
)
}
export default ScreenShotCapture