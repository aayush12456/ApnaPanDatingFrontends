import { Text, View, Image, StatusBar } from "react-native";
import { Button } from "react-native-paper";
import arrow from "../../../assets/signUpFormIcon/back.png";
import { useSelector } from "react-redux";

const AnotherHeader = ({ editObj, navigation, completeObj }) => {
  const objSelector = useSelector(
    (state) => state.anotherPassData.anotherPassData
  );

  const anotherObjSelector = useSelector(
    (state) => state.passMatchData.passMatchData
  );

  console.log("another obj in another header", anotherObjSelector);

  const backArrowHandler = (name) => {
    if (name === "Edit Profile") {
      navigation.navigate("HeaderPage");
    } else if (name === "Basic Info") {
      navigation.navigate("EditProfilePage", { formData: completeObj });
    } else if (name === "Select Relationship Status") {
      navigation.navigate("EditProfilePage", { formData: completeObj });
    } else if (name === "Select Looking For") {
      navigation.navigate("EditProfilePage", { formData: completeObj });
    } else if (name === "Select Education") {
      navigation.navigate("EditProfilePage", { formData: completeObj });
    } else if (name === "Select Profession") {
      navigation.navigate("EditProfilePage", { formData: completeObj });
    } else if (name === "Select Drinking Habit") {
      navigation.navigate("EditProfilePage", { formData: completeObj });
    } else if (name === "Select Smoking Habit") {
      navigation.navigate("EditProfilePage", { formData: completeObj });
    } else if (name === "Select Eating Habit") {
      navigation.navigate("EditProfilePage", { formData: completeObj });
    } else if (name === "Select Zodiac Sign") {
      navigation.navigate("EditProfilePage", { formData: completeObj });
    } else if (name === "Select Songs") {
      navigation.navigate("EditProfilePage", { formData: completeObj });
    } else if (name === "About Me") {
      navigation.navigate("EditProfilePage", { formData: completeObj });
    } else if (name === "Select Languages") {
      navigation.navigate("EditProfilePage", { formData: completeObj });
    } else if (name === "Select Interest") {
      navigation.navigate("EditProfilePage", { formData: completeObj });
    } else if (name === "My Photos") {
      navigation.goBack();
    } else if (name === "Face Compare Guidance") {
      navigation.navigate("ImageUploadPage", { formData: {} });
    } else if (name === objSelector?.firstName) {
      navigation.goBack();
    } else if (name === anotherObjSelector?.firstName) {
      navigation.goBack();
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
        <Button onPress={() => backArrowHandler(editObj?.name)}>
          <Image
            source={arrow}
            style={{
              width: 15,
              height: 15,
              tintColor: "white",
            }}
          />
        </Button>
      </View>

      {(editObj?.name === objSelector?.firstName) ||
      editObj?.name === anotherObjSelector?.firstName ? (
        <Text
          style={{
            textAlign: "center",
            fontSize: 17,
            fontWeight: "600",
            color: "white",
            paddingTop: 9,
            paddingBottom: 9,
          }}
        >
          {`${editObj?.name} photos`}
        </Text>
      ) : (
        <Text
          style={{
            textAlign: "center",
            fontSize: 17,
            fontWeight: "600",
            color: "white",
            paddingTop: 9,
            paddingBottom: 9,
          }}
        >
          {editObj?.name}
        </Text>
      )}
    </View>
  );
};

export default AnotherHeader;