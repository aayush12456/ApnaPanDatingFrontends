import { aboutUsData } from "../../utils/legalInfo"
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const AboutUs=()=>{
return (
    <>
      <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#000000",
      }}
      contentContainerStyle={{
        padding: 15,
        paddingBottom: 30,
      }}
    >
      
      {aboutUsData.map((item, index) => (
        <Card
          key={index}
          style={{
            backgroundColor: "#353535",
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
                color="#E0E0E0"
              />

              <Text
                style={{
                  flex: 1,
                  marginLeft: 12,
                  color: "#E0E0E0",
                  fontSize:16,
                  fontWeight: "700",
                }}
              >
                {item.title}
              </Text>
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: "#4A4A4A",
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
                    color: "#F5F5F5",
                    marginRight: 8,
                    fontSize: 15,
                  }}
                >
                  •
                </Text>

                <Text
                  style={{
                    flex: 1,
                    color: "#F5F5F5",
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
export default AboutUs