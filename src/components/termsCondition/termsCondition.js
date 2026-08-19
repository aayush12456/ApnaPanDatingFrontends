import { termsAndConditionsData } from "../../utils/legalInfo"
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const TermsCondition=()=>{
    const COLORS = {
        background: "#000000",
        card: "#353535",
        heading: "#E0E0E0",
        content: "#F5F5F5",
        divider: "#4A4A4A",
        icon: "#E0E0E0",
      };
return (
    <>
     <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
      contentContainerStyle={{
        padding: 15,
        paddingBottom: 30,
      }}
    >
      <Card
        style={{
          backgroundColor: COLORS.card,
          borderRadius: 20,
          marginBottom: 20,
        }}
      >
        <Card.Content>
        <Text
    style={{
      marginBottom: 12,
      color: "#F5F5F5",
    }}
  >
    <Text style={{ fontWeight: "600",fontSize:15 }}>Application Name: </Text>
    ApnaPan
  </Text>
         <Text
    style={{
      marginBottom: 12,
      color: "#F5F5F5",
    }}
  >
    <Text style={{ fontWeight: "600",fontSize:15 }}>Effective Date: </Text>
    August 16, 2026
  </Text>

        </Card.Content>
      </Card>

      {termsAndConditionsData.map((item, index) => (
        <Card
          key={index}
          style={{
            backgroundColor: COLORS.card,
            borderRadius: 20,
            marginBottom: 15,
          }}
        >
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={24}
                color={COLORS.icon}
              />

              <Text
                style={{
                  color: COLORS.heading,
                  fontSize: 16,
                  fontWeight: "700",
                  marginLeft: 12,
                  flex: 1,
                }}
              >
                {item.title}
              </Text>
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: COLORS.divider,
                marginTop: 15,
                marginBottom: 15,
              }}
            />

            {item.content.map((text, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: COLORS.content,
                    marginRight: 8,
                    fontSize: 15,
                  }}
                >
                  •
                </Text>

                <Text
                  style={{
                    flex: 1,
                    color: COLORS.content,
                    fontSize: 15,
                    lineHeight: 24,
                  }}
                >
                  {text}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
    </>
)
}
export default TermsCondition