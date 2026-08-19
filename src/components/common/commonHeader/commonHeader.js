import { Text, View, Image, StatusBar } from "react-native";
import { Button } from "react-native-paper";
import back from "../../../../assets/signUpFormIcon/back.png";
import { useNavigation } from "@react-navigation/native";

const CommonHeader = ({ commonHeaderName }) => {
  const navigation = useNavigation();

  const backHandler = () => {
    if (
      commonHeaderName === "Skipped Profiles" ||
      commonHeaderName === "Blocked Users" ||
      commonHeaderName === "Account Settings" ||
      commonHeaderName === "AppearancePage"
    ) {
      navigation.goBack();
      return;
    }

    if (commonHeaderName === "Manage Account") {
      navigation.goBack();
      return;
    }

    if (commonHeaderName === "Deactivate Account") {
      navigation.goBack();
      return;
    }

    if (commonHeaderName === "Delete Account") {
      navigation.goBack();
      return;
    }

    if (commonHeaderName === "Privacy Policy") {
      navigation.goBack();
      return;
    }

    if (commonHeaderName === "Community Guidelines") {
      navigation.goBack();
      return;
    }
    if (commonHeaderName === "Terms & Conditions") {
      navigation.goBack();
      return;
    }
    if (commonHeaderName === "About Us") {
      navigation.goBack();
      return;
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#343434",
        paddingTop: StatusBar.currentHeight || 0,
        paddingBottom: 15,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          left: 0,
          top: StatusBar.currentHeight || 0,
          marginTop: 5,
          marginBottom: 5,
          zIndex: 1,
        }}
      >
        <Button onPress={backHandler}>
          <Image
            source={back}
            style={{
              width: 15,
              height: 15,
              tintColor: "white",
            }}
          />
        </Button>
      </View>

      <Text
        style={{
          textAlign: "center",
          paddingTop: 9,
          paddingBottom: 5,
          fontSize: 17,
          fontWeight: "600",
          color: "white",
        }}
      >
        {commonHeaderName}
      </Text>
    </View>
  );
};

export default CommonHeader;