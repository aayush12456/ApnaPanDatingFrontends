import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { privacyPolicyData } from "../../utils/legalInfo";
import { sectionIcons } from "../../utils/legalInfo";
import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const PrivacyPolicy=()=>{
return (
    <>
     <ScrollView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
      contentContainerStyle={{
        padding: 15,
      }}
    >
      <Card
  style={{
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "#343434",
    elevation: 4,
  }}
>
<Card.Content
  style={{
    paddingVertical: 10,
  }}
>
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

  <Text
    style={{
      color: "#F5F5F5",
    }}
  >
    <Text style={{ fontWeight: "600",fontSize:15 }}>Last Updated: </Text>
    August 16, 2026
  </Text>
</Card.Content>
      </Card>

      {privacyPolicyData.map((section, index) => (
      <Card
      key={index}
      style={{
        marginBottom: 20,
        borderRadius: 20,
        backgroundColor: "#353535",
        elevation: 5,
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
    name={sectionIcons[section.title]?.icon || "shield-outline"}
    size={24}
    color={"#E0E0E0"}
  />

  <Text
    style={{
      fontSize: 16,
      fontWeight: "700",
      marginLeft: 12,
      flex: 1,
      color:'#E0E0E0'
    }}
  >
    {section.title.replace(/^\d+\.\s*/, "")}
  </Text>
</View>

<View
  style={{
    height: 1,
    backgroundColor: "#E5E5E5",
    marginTop: 15,
    marginBottom: 20,
  }}
/>

            {section.description?.map((text, i) => (
              <Text
                key={i}
                style={{
                  fontSize: 15,
                  lineHeight: 24,
                  marginBottom: 10,
                  color:"#F5F5F5"
                }}
              >
                {text}
              </Text>
            ))}

            {section.items?.map((item, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  marginBottom: 8,
                  color:"#F5F5F5"
                }}
              >
                <Text
                  style={{
                    marginRight: 8,
                    color:"#F5F5F5"
                  }}
                >
                  •
                </Text>

                <Text
                  style={{
                    flex: 1,
                    fontSize: 15,
                    lineHeight: 22,
                    color:"#F5F5F5"
                  }}
                >
                  {item}
                </Text>
              </View>
            ))}

            {section.subSections?.map((subSection, subIndex) => (
              <View key={subIndex}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    marginTop: 10,
                    marginBottom: 10,
                    color:'#E0E0E0'
                  }}
                >
                  {subSection.title}
                </Text>

                {subSection.items.map((item, itemIndex) => (
                  <View
                    key={itemIndex}
                    style={{
                      flexDirection: "row",
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{
                        marginRight: 8,
                        color:"#F5F5F5"
                      }}
                    >
                      •
                    </Text>

                    <Text
                      style={{
                        flex: 1,
                        fontSize: 15,
                        lineHeight: 22,
                        color:"#F5F5F5"
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
    </>
)
}
export default PrivacyPolicy