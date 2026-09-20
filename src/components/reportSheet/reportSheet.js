import React, { forwardRef, useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
} from "react-native";
import {
  Text,
  Button,
} from "react-native-paper";
import RBSheet from "@lunalee/react-native-raw-bottom-sheet";
import { useNavigation } from "@react-navigation/native";
const ReportSheet = forwardRef((props, ref) => {
    const navigation=useNavigation()
    // console.log('report obj detail',props)

  const [selectedReport, setSelectedReport] = useState("");

  const reportOptions = [
    {
      id: "inappropriate",
      title: "Inappropriate content",
    },
    {
      id: "harassment",
      title: "Harassment or bullying",
    },
    {
      id: "fake",
      title: "Fake or suspicious profile",
    },
    {
      id: "spam",
      title: "Spam or scam",
    },
    {
      id: "other",
      title: "Other",
    },
  ];

  const selectReportHandler = (report) => {
    setSelectedReport(report);
  };

  const submitReportHandler = () => {
    if (!selectedReport) {
      return;
    }

    console.log("Selected report:", selectedReport);

    // Yaha baad me report API call add kar sakte ho

    ref?.current?.close();
navigation.navigate("ReportPage",{formData:{...props.reportObj,reportTitle:selectedReport.title,headerName:'Report'}})

    setSelectedReport("");

  };

  return (
    <RBSheet
      ref={ref}
      draggable={true}
      closeOnPressMask={true}
      closeOnPressBack={true}
      height={430}
      customStyles={{
        container: {
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingHorizontal: 20,
          paddingTop: 20,
        },
      }}
    >
      <View style={{ flex: 1 }}>

        {/* Header */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            textAlign: "center",
            color: "#222",
          }}
        >
          Report
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: "#777",
            textAlign: "center",
            marginTop: 6,
            marginBottom: 15,
          }}
        >
          {`Select a problem to report`}
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        >

          {reportOptions.map((item) => {

            const isSelected =
              selectedReport.id === item.id;

            return (
              <Pressable
                key={item.id}
                onPress={() =>
                  selectReportHandler(item)
                }
                style={{
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    minHeight: 52,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 15,
                    borderRadius: 12,
                    borderWidth: isSelected ? 2 : 1,
                    borderColor: isSelected
                      ? "#2563EB"
                      : "#E5E7EB",
                    backgroundColor: isSelected
                      ? "#EFF6FF"
                      : "#FFFFFF",
                    elevation: 2,
                  }}
                >

                  <Text
                    style={{
                      fontWeight: isSelected
                        ? "600"
                        : "400",
                      color: "#222",
                    }}
                  >
                    {item.title}
                  </Text>

                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: isSelected
                        ? "#2563EB"
                        : "#BDBDBD",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isSelected && (
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: "#2563EB",
                        }}
                      />
                    )}
                  </View>

                </View>
              </Pressable>
            );
          })}

          {/* Submit Button */}
          <Button
            mode="contained"
            buttonColor="#2563EB"
            disabled={!selectedReport.id}
            onPress={submitReportHandler}
            style={{
              borderRadius: 12,
              marginTop: 8,
              marginBottom: 20,
            }}
            contentStyle={{
              height: 52,
            }}
          >
            Report
          </Button>

        </ScrollView>

      </View>
    </RBSheet>
  );
});

export default ReportSheet;