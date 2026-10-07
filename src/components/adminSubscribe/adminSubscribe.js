import { useEffect, useState } from "react";
import { getPaymentHistoryAsync } from "../../Redux/Slice/getPaymentHistorySlice/getPaymentHistorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Text } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { deleteSubscribeUserAsync } from "../../Redux/Slice/deleteSubscribeSlice/deleteSubscribeSlice";

const AdminSubscribe = ({ subscribeObj }) => {

  const dispatch = useDispatch();

  const loginId = subscribeObj.loginId;

  const [updatedPaymentHistory, setUpdatedPaymentHistory] = useState([]);

  useEffect(() => {
    if (loginId) {
      dispatch(getPaymentHistoryAsync(loginId));
    }
  }, [loginId]);

  const paymentHistorySelector = useSelector(
    (state) => state.getPaymentHistory.getPaymentHistoryObj
  );

  const paymentHistoryArray =
    paymentHistorySelector?.subscriptionArray || [];

  // console.log("payment history", paymentHistoryArray);

  // API response se local UI array update
  useEffect(() => {
    if (paymentHistoryArray) {
      setUpdatedPaymentHistory(paymentHistoryArray);
    }
  }, [paymentHistoryArray]);

  // Delete response
  const deleteSubscribeSelector = useSelector(
    (state) =>
      state.deleteSubscribe.deleteSubscribeUserObj?.deleteUser
  );

  // console.log("delete subscribe select", deleteSubscribeSelector);

  // Deleted item ko UI array se remove karo
  useEffect(() => {
    if (deleteSubscribeSelector?._id) {

      // console.log(
      //   "Removing from UI:",
      //   deleteSubscribeSelector._id
      // );

      setUpdatedPaymentHistory((prevArray) =>
        prevArray.filter(
          (item) =>
            item._id !== deleteSubscribeSelector._id
        )
      );
    }
  }, [deleteSubscribeSelector]);

  const deleteSubscribeHandler = (pay) => {

    // console.log("pay delete", pay);

    dispatch(deleteSubscribeUserAsync(pay?._id));
  };

  return (
    <>
     {updatedPaymentHistory.length>0? <Card
        style={{
          marginLeft: 8,
          marginRight: 8,
          marginTop: 20,
          backgroundColor: "#343434",
        }}
      >
        <Card.Content>

          <ScrollView>

            {updatedPaymentHistory?.map((pay, index) => {

              return (
                <View key={pay?._id || index}>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        color: "white",
                      }}
                    >
                      {pay?.startDate}
                    </Text>

                    <Text
                      style={{
                        fontWeight: "700",
                        color: "white",
                      }}
                    >
                      {pay?.amount}
                    </Text>
                  </View>

                  <Text
                    style={{
                      paddingTop: 12,
                      color: "white",
                    }}
                  >
                    Subscription for {pay?.startDate} --{" "}
                    {pay?.endDate}
                  </Text>

                  <Text
                    style={{
                      paddingTop: 12,
                      color: "white",
                    }}
                  >
                    {pay?.planId}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      mode="contained"
                      style={{
                        borderRadius: 10,
                        height: 40,
                        width: "40%",
                        marginTop: 20,
                      }}
                      buttonColor="red"
                      onPress={() => {
                        deleteSubscribeHandler(pay);
                      }}
                    >
                      Delete
                    </Button>
                  </View>

                  <View
                    style={{
                      height: 1,
                      backgroundColor: "#e0e0e0",
                      marginTop: 10,
                      width: "100%",
                    }}
                  />

                </View>
              );
            })}

          </ScrollView>

        </Card.Content>
      </Card>:<Text style={{textAlign:'center',color:'white',paddingTop:30}}>No expired Subscription is there</Text>}
    </>
  );
};

export default AdminSubscribe;