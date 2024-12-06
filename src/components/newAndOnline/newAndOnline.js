import { Text, View, Image, ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { getAllUserData } from "../../Redux/Slice/getAllUserSlice/getAllUserSlice";
import { addChatModalActions } from "../../Redux/Slice/addChatModalSilce/addChatModalSlice";
import AddChat from "../common/addChat/addChat";
import { passDataSliceActions } from "../../Redux/Slice/passDataSlice/passDataSlice";

const NewAndOnline = ({route}) => {
  const { formData = {} } = route.params || {}; // Fallback to an empty object
  console.log('form data in new ', formData);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const completeLoginObj = useSelector(
    (state) => state.loginData.loginData.completeLoginData
  );
  const getAllUserArray = useSelector(
    (state) => state.getAllUserData.getAllUserArray.users
  );
  console.log("get all user array in new ", getAllUserArray);
  const [allUser,setAllUser]=useState(getAllUserArray)
  
  useEffect(() => {
    if (dispatch) {
      dispatch(getAllUserData(completeLoginObj?._id));
    }
  }, [dispatch]);

  const addChatModalOpenHandler = (name) => {
    dispatch(addChatModalActions.addChatVisibleToggle());
    dispatch(passDataSliceActions.passDatas(name));
  };

  const cardClickHandler = (allUser) => {
    console.log('card pressed', allUser);
    navigation.navigate('NewAndOnlinePageContent', { formData: allUser });
  };
  useEffect(()=>{
    if(formData?.onlinePersonSkipUserId){
      let updateArray=allUser.filter((filterItem)=>filterItem?._id!=formData?.onlinePersonSkipUserId)
      setAllUser(updateArray)
    }
    else{
      setAllUser(getAllUserArray)
    }
    
    },[formData?.onlinePersonSkipUserId,getAllUserArray])
    
  return (
    <>
      <AddChat />
      <ScrollView>
        {allUser?.map((allUser, index) => {
          const getProfile = () => allUser;
          const dob = getProfile()?.DOB;
          const dobBreak = dob?.split("/");
          const year = dobBreak?.[2];
          let currentDate = new Date();
          let currentYear = currentDate.getFullYear();
          const age = year ? currentYear - parseInt(year) : "";

          return (
            <Card
              key={allUser._id || index} // Unique key: use _id if available, or index as fallback
              style={{
                marginLeft: 8,
                marginRight: 8,
                marginTop: 20,
                backgroundColor: "white",
              }}
              onPress={() => cardClickHandler(allUser)}
            >
              <Card.Content>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Image
                      source={{ uri: allUser?.images[0] }}
                      style={{ width: 65, height: 65, borderRadius: 70 }}
                    />
                  </View>
                  <View style={{ paddingTop: 1 }}>
                    <Text style={{ color: "black", fontWeight: "500" }}>
                      {allUser?.firstName}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 6, paddingTop: 3 }}>
                      <Text>{age},</Text>
                      <Text>{allUser?.city}</Text>
                    </View>
                    <Text style={{ paddingTop: 2 }}>{allUser?.relationship}</Text>
                  </View>
                  <View>
                    <Button
                      mode="contained"
                      onPress={() => addChatModalOpenHandler(allUser.firstName)}
                      style={{
                        width: "100%",
                        borderRadius: 10,
                        marginTop: 9,
                      }}
                      buttonColor="rgba(34, 197, 94, 2)"
                    >
                      Add Chat
                    </Button>
                  </View>
                </View>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
    </>
  );
};

export default NewAndOnline;
