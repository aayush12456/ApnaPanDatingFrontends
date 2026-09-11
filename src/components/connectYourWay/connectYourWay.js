import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StatusBar,
  useWindowDimensions,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import messageBoy from "../../../assets/onBoardingIcon/messageBoy.png"
import messageGirl from "../../../assets/onBoardingIcon/messageGirl.png"
import testImg from "../../../assets/onBoardingIcon/testImg.png"
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
export default function ConnectYourWay() {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  // Screenshot reference size
  const DESIGN_WIDTH = 941;
  const DESIGN_HEIGHT = 1672;

  const sx = width / DESIGN_WIDTH;
  const sy = height / DESIGN_HEIGHT;

  const s = (value) => value * sx;
  const vs = (value) => value * sy;

  // Keeps fonts from becoming excessively large on tablets
  const fs = (value) =>
    Math.min(value * sx, value * 1.35);

  const goNext = () => {
    // navigation.navigate("NextScreen");
  };

  const skip = () => {
    // navigation.navigate("Home");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#080A19",
        overflow: "hidden",
      }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#080A19"
      />

      <SafeAreaView
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >

        {/* ================================================= */}
        {/* BACKGROUND PURPLE GLOW */}
        {/* ================================================= */}

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            width: s(600),
            height: s(600),
            borderRadius: s(300),
            left: s(180),
            top: vs(350),
            backgroundColor: "rgba(94,24,185,0.045)",
          }}
        />

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            width: s(450),
            height: s(450),
            borderRadius: s(225),
            left: s(300),
            top: vs(650),
            backgroundColor: "rgba(145,27,255,0.035)",
          }}
        />

        {/* ================================================= */}
        {/* TOP PROGRESS + SKIP */}
        {/* ================================================= */}

       

        {/* ================================================= */}
        {/* MAIN HEADING */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            top: vs(155),
            left: s(70),
            zIndex: 100,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: fs(54),
              lineHeight: fs(62),
              fontWeight: "800",
              letterSpacing: -1,
            }}
          >
            Connect
          </Text>

          <Text
            style={{
              color: "#B935FF",
              fontSize: fs(56),
              lineHeight: fs(62),
              fontWeight: "800",
              letterSpacing: -1.5,
            }}
          >
            Your Way
          </Text>

          <Text
            style={{
              marginTop: vs(20),
              color: "#BDB9C8",
              fontSize: fs(25),
              lineHeight: fs(38),
              fontWeight: "400",
            }}
          >
            Chat, share photos, make audio calls{"\n"}
            and get AI-powered conversation{"\n"}
            support.
          </Text>
        </View>

        {/* ================================================= */}
        {/* RIGHT HANDWRITTEN TEXT */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            right: s(45),
            top: vs(225),
            zIndex: 110,
            transform: [{ rotate: "-5deg" }],
          }}
        >
          <Text
            style={{
              color: "#C43CFF",
              fontSize: fs(27),
              lineHeight: fs(40),
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            Real{"\n"}
            Conversations{"\n"}
            Real{"\n"}
            Connections
          </Text>

          <View
            style={{
              width: s(100),
              height: vs(3),
              borderRadius: 5,
              backgroundColor: "#C13BFF",
              marginTop: vs(7),
              alignSelf: "center",
              transform: [{ rotate: "-5deg" }],
            }}
          />

          <Text
            style={{
              position: "absolute",
              right: s(-30),
              bottom: vs(-42),
              color: "#C43CFF",
              fontSize: fs(50),
              transform: [{ rotate: "8deg" }],
            }}
          >
            ♡
          </Text>
        </View>

        {/* ================================================= */}
        {/* LEFT DECORATIVE HEART */}
        {/* ================================================= */}

        <Text
          style={{
            position: "absolute",
            left: s(22),
            top: vs(590),
            color: "#C43CFF",
            fontSize: fs(52),
            zIndex: 80,
            transform: [{ rotate: "-15deg" }],
          }}
        >
          ♡
        </Text>

        {/* ================================================= */}
        {/* CITY SILHOUETTE */}
        {/* ================================================= */}

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: vs(620),
            height: vs(300),
            opacity: 0.35,
            zIndex: 1,
          }}
        >
          {/* buildings */}
          <View
            style={{
              position: "absolute",
              left: s(20),
              bottom: 0,
              width: s(55),
              height: vs(170),
              backgroundColor: "#1B1744",
            }}
          />

          <View
            style={{
              position: "absolute",
              left: s(85),
              bottom: 0,
              width: s(45),
              height: vs(230),
              backgroundColor: "#21164D",
            }}
          />

          <View
            style={{
              position: "absolute",
              right: s(25),
              bottom: 0,
              width: s(55),
              height: vs(220),
              backgroundColor: "#20164D",
            }}
          />

          <View
            style={{
              position: "absolute",
              right: s(90),
              bottom: 0,
              width: s(40),
              height: vs(160),
              backgroundColor: "#261654",
            }}
          />
        </View>

        {/* ================================================= */}
        {/* CHAT CARD */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            left: s(78),
            top: vs(430),
            width: s(465),
            height: vs(625),
            borderRadius: s(34),
            backgroundColor: "#0B1123",
            borderWidth: 3,
            borderColor: "#9236FF",
            transform: [{ rotate: "-6deg" }],
            overflow: "hidden",
            zIndex: 30,
            shadowColor: "#A928FF",
            shadowOpacity: 0.75,
            shadowRadius: s(25),
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 20,
          }}
        >

          {/* CHAT HEADER */}

          <View
            style={{
              height: vs(95),
              width: "100%",
              borderBottomWidth: 1,
              borderBottomColor: "#252A3D",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: s(18),
            }}
          >
            {/* back */}
            <Ionicons
              name="chevron-back"
              size={s(31)}
              color="#FFFFFF"
            />

            {/* profile */}
            <Image
              source={messageGirl}
              style={{
                width: s(58),
                height: s(58),
                borderRadius: s(30),
                marginLeft: s(8),
              }}
            />

            <View
              style={{
                marginLeft: s(12),
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: fs(19),
                  fontWeight: "700",
                }}
              >
                Simran
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: vs(3),
                }}
              >
                <View
                  style={{
                    width: s(10),
                    height: s(10),
                    borderRadius: s(5),
                    backgroundColor: "#00F27A",
                    marginRight: s(7),
                  }}
                />

                <Text
                  style={{
                    color: "#AAA9B7",
                    fontSize: fs(14),
                  }}
                >
                  Online now
                </Text>
              </View>
            </View>

            <Ionicons
              name="call"
              size={s(29)}
              color="#FFFFFF"
              style={{
                marginRight: s(18),
              }}
            />

            <Ionicons
              name="videocam"
              size={s(31)}
              color="#FFFFFF"
              style={{
                marginRight: s(17),
              }}
            />

            <Ionicons
              name="ellipsis-vertical"
              size={s(27)}
              color="#FFFFFF"
            />
          </View>

          {/* CHAT BACKGROUND PATTERN APPROX */}

          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              top: vs(95),
              bottom: vs(80),
              left: 0,
              right: 0,
              opacity: 0.12,
            }}
          >
            <Text
              style={{
                color: "#AFA9C0",
                fontSize: fs(32),
                lineHeight: fs(60),
                transform: [{ rotate: "-25deg" }],
              }}
            >
              ♡  ✦  ◇  ♡  ✦  ◇{"\n"}
              ✦  ♡  ◇  ✦  ♡  ◇{"\n"}
              ◇  ✦  ♡  ◇  ✦  ♡{"\n"}
              ♡  ◇  ✦  ♡  ◇  ✦{"\n"}
            </Text>
          </View>

          {/* MESSAGE 1 */}

          <View
            style={{
              position: "absolute",
              top: vs(120),
              left: s(30),
              width: s(245),
              paddingHorizontal: s(18),
              paddingVertical: vs(14),
              borderRadius: s(18),
              borderTopLeftRadius: s(5),
              backgroundColor: "#303346",
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: fs(18),
                lineHeight: fs(27),
              }}
            >
              Hey! 👋{"\n"}
              How's your day going?
            </Text>

            <Text
              style={{
                color: "#9295A8",
                fontSize: fs(12),
                marginTop: vs(6),
              }}
            >
              10:24 AM
            </Text>
          </View>

          {/* MESSAGE 2 */}

          <View
            style={{
              position: "absolute",
              top: vs(220),
              right: s(22),
              width: s(275),
              paddingHorizontal: s(18),
              paddingVertical: vs(14),
              borderRadius: s(18),
              borderTopRightRadius: s(5),
              backgroundColor: "#6E16F7",
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: fs(18),
                lineHeight: fs(27),
              }}
            >
              Good! Just had coffee{"\n"}
              What about you?
            </Text>

            <Text
              style={{
                color: "#D7C7FF",
                fontSize: fs(12),
                marginTop: vs(6),
                textAlign: "right",
              }}
            >
              10:25 AM ✓✓
            </Text>
          </View>

          {/* MESSAGE 3 */}

          <View
            style={{
              position: "absolute",
              top: vs(320),
              left: s(25),
              width: s(300),
              paddingHorizontal: s(18),
              paddingVertical: vs(14),
              borderRadius: s(18),
              borderTopLeftRadius: s(5),
              backgroundColor: "#303346",
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: fs(18),
                lineHeight: fs(27),
              }}
            >
              That's nice! Here's a photo{"\n"}
              from my weekend trip 💜
            </Text>
          </View>

          {/* PHOTO MESSAGE */}

          <View
            style={{
              position: "absolute",
              left: s(28),
              top: vs(400),
              width: s(265),
              height: vs(170),
              borderRadius: s(15),
              overflow: "hidden",
              backgroundColor: "#25283A",
            }}
          >
            <Image
              source={testImg}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: s(7),
                left: s(10),
                right: s(10),
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: fs(11),
                }}
              >
                10:26 AM
              </Text>

              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: fs(11),
                }}
              >
                10:26 AM
              </Text>
            </View>
          </View>

          {/* MESSAGE INPUT */}

          <View
            style={{
              position: "absolute",
              left: s(15),
              right: s(15),
              bottom: vs(13),
              height: vs(62),
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: s(52),
                height: s(52),
                borderRadius: s(27),
                borderWidth: 1,
                borderColor: "#505367",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="add"
                size={s(30)}
                color="#FFFFFF"
              />
            </View>

            <View
              style={{
                flex: 1,
                height: vs(52),
                marginLeft: s(8),
                marginRight: s(8),
                borderRadius: s(28),
                backgroundColor: "#292C40",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: s(15),
              }}
            >
              <Text
                style={{
                  flex: 1,
                  color: "#777B91",
                  fontSize: fs(15),
                }}
              >
                Type a message...
              </Text>

              <Ionicons
                name="happy-outline"
                size={s(23)}
                color="#FFFFFF"
                style={{
                  marginRight: s(12),
                }}
              />

              <Ionicons
                name="mic-outline"
                size={s(23)}
                color="#FFFFFF"
              />
            </View>

            <View
              style={{
                width: s(55),
                height: s(55),
                borderRadius: s(28),
                backgroundColor: "#8D25FF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="send"
                size={s(26)}
                color="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* ================================================= */}
        {/* AUDIO CALL CARD */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            right: s(55),
            top: vs(520),
            width: s(345),
            height: vs(550),
            borderRadius: s(35),
            backgroundColor: "#0B1023",
            borderWidth: 3,
            borderColor: "#8B2EFF",
            transform: [{ rotate: "10deg" }],
            zIndex: 35,
            shadowColor: "#A528FF",
            shadowOpacity: 0.7,
            shadowRadius: s(25),
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 20,
          }}
        >

          {/* AUDIO ICON */}

          <View
            style={{
              position: "absolute",
              top: vs(-55),
              left: s(105),
              width: s(100),
              height: s(100),
              borderRadius: s(50),
              backgroundColor: "#211247",
              borderWidth: 2,
              borderColor: "#A83BFF",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#B42CFF",
              shadowOpacity: 0.7,
              shadowRadius: s(20),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: s(6),
              }}
            >
              <View
                style={{
                  width: s(8),
                  height: s(30),
                  borderRadius: s(5),
                  backgroundColor: "#C33DFF",
                }}
              />

              <View
                style={{
                  width: s(8),
                  height: s(48),
                  borderRadius: s(5),
                  backgroundColor: "#C33DFF",
                }}
              />

              <View
                style={{
                  width: s(8),
                  height: s(22),
                  borderRadius: s(5),
                  backgroundColor: "#C33DFF",
                }}
              />

              <View
                style={{
                  width: s(8),
                  height: s(40),
                  borderRadius: s(5),
                  backgroundColor: "#C33DFF",
                }}
              />
            </View>
          </View>

          {/* PROFILE CIRCLE */}

          <View
            style={{
              position: "absolute",
              top: vs(95),
              left: s(70),
              width: s(205),
              height: s(205),
              borderRadius: s(105),
              backgroundColor: "#19133D",
              borderWidth: 1,
              borderColor: "#342261",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: s(165),
                height: s(165),
                borderRadius: s(85),
                borderWidth: 3,
                borderColor: "#B137FF",
                padding: s(5),
              }}
            >
              <Image
                source={messageBoy}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: s(80),
                  resizeMode: "cover",
                }}
              />
            </View>
          </View>

          {/* NAME */}

          <Text
            style={{
              position: "absolute",
              top: vs(315),
              left: 0,
              right: 0,
              color: "#FFFFFF",
              fontSize: fs(25),
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Aarav
          </Text>

          <Text
            style={{
              position: "absolute",
              top: vs(350),
              left: 0,
              right: 0,
              color: "#FFFFFF",
              fontSize: fs(18),
              textAlign: "center",
            }}
          >
            00:12
          </Text>

          {/* WAVEFORM */}

          <View
            style={{
              position: "absolute",
              top: vs(390),
              left: s(55),
              right: s(55),
              height: vs(65),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {[
              20, 38, 25, 52, 30, 45, 22,
              55, 35, 28, 48, 22, 43, 30,
              52, 27, 46, 33, 25, 48, 35,
              22, 50, 29, 42, 25, 52, 32,
            ].map((item, index) => (
              <View
                key={index}
                style={{
                  width: s(4),
                  height: vs(item),
                  borderRadius: s(4),
                  backgroundColor: "#B631FF",
                }}
              />
            ))}
          </View>

          {/* CALL CONTROLS */}

          <View
            style={{
              position: "absolute",
              bottom: vs(22),
              left: s(25),
              right: s(25),
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: s(58),
                height: s(58),
                borderRadius: s(30),
                backgroundColor: "#36394B",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="mic-off"
                size={s(27)}
                color="#FFFFFF"
              />
            </View>

            <View
              style={{
                width: s(70),
                height: s(70),
                borderRadius: s(36),
                backgroundColor: "#FF2632",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="call"
                size={s(32)}
                color="#FFFFFF"
                style={{
                  transform: [{ rotate: "135deg" }],
                }}
              />
            </View>

            <View
              style={{
                width: s(58),
                height: s(58),
                borderRadius: s(30),
                backgroundColor: "#36394B",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="volume-high"
                size={s(27)}
                color="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* ================================================= */}
        {/* LEFT SHARE NOTE */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            left: s(20),
            top: vs(855),
            zIndex: 90,
            transform: [{ rotate: "-7deg" }],
          }}
        >
          <Text
            style={{
              color: "#C13CFF",
              fontSize: fs(53),
              lineHeight: fs(55),
            }}
          >
            ➤
          </Text>

          <Text
            style={{
              color: "#C44CFF",
              fontSize: fs(22),
              lineHeight: fs(31),
              fontStyle: "italic",
              marginTop: vs(3),
            }}
          >
            Share{"\n"}
            Moments{"\n"}
            That{"\n"}
            Matter
          </Text>

          <Text
            style={{
              color: "#C44CFF",
              fontSize: fs(45),
              marginLeft: s(70),
            }}
          >
            ♡
          </Text>
        </View>

        {/* ================================================= */}
        {/* RIGHT CALL NOTE */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            right: s(17),
            top: vs(1015),
            zIndex: 90,
            transform: [{ rotate: "-5deg" }],
          }}
        >
          <Text
            style={{
              color: "#C44CFF",
              fontSize: fs(19),
              lineHeight: fs(27),
              fontStyle: "italic",
            }}
          >
            Meaningful{"\n"}
            Conversations{"\n"}
            Anywhere
          </Text>

          <Text
            style={{
              color: "#C44CFF",
              fontSize: fs(43),
              textAlign: "right",
            }}
          >
            ♡
          </Text>
        </View>

        {/* ================================================= */}
        {/* AI SUPPORT PILL */}
        {/* ================================================= */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            position: "absolute",
            top: vs(1060),
            left: s(270),
            width: s(400),
            height: vs(90),
            borderRadius: s(50),
            backgroundColor: "#18132E",
            borderWidth: 2,
            borderColor: "#54208C",
            zIndex: 100,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: s(15),
            shadowColor: "#8125FF",
            shadowOpacity: 0.3,
            shadowRadius: s(15),
          }}
        >
          {/* AI ICON */}

          <View
            style={{
              width: s(65),
              height: s(65),
              borderRadius: s(33),
              backgroundColor: "#2A1551",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="robot-outline"
              size={s(39)}
              color="#D24DFF"
            />
          </View>

          <View
            style={{
              marginLeft: s(14),
              flex: 1,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: fs(18),
                fontWeight: "600",
              }}
            >
              Get AI-powered
            </Text>

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: fs(17),
                marginTop: vs(3),
              }}
            >
              conversation support
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={s(27)}
            color="#D14CFF"
          />
        </TouchableOpacity>

        {/* ================================================= */}
        {/* FEATURES */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            top: vs(1170),
            left: s(35),
            right: s(35),
            flexDirection: "row",
            justifyContent: "space-between",
            zIndex: 100,
          }}
        >

          {/* CHAT */}

          <View
            style={{
              width: s(195),
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: s(100),
                height: s(100),
                borderRadius: s(50),
                backgroundColor: "#21143C",
                borderWidth: 2,
                borderColor: "#3B2262",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#A02EFF",
                shadowOpacity: 0.3,
                shadowRadius: s(15),
              }}
            >
              <Ionicons
                name="chatbubble"
                size={s(50)}
                color="#C044FF"
              />
            </View>

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: fs(22),
                fontWeight: "700",
                marginTop: vs(16),
              }}
            >
              Chat
            </Text>

            <Text
              style={{
                color: "#BFC5D3",
                fontSize: fs(18),
                lineHeight: fs(29),
                textAlign: "center",
                marginTop: vs(7),
              }}
            >
              Start meaningful{"\n"}
              conversations
            </Text>
          </View>

          {/* SHARE PHOTOS */}

          <View
            style={{
              width: s(195),
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: s(100),
                height: s(100),
                borderRadius: s(50),
                backgroundColor: "#21143C",
                borderWidth: 2,
                borderColor: "#3B2262",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="image"
                size={s(50)}
                color="#C044FF"
              />
            </View>

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: fs(22),
                fontWeight: "700",
                marginTop: vs(16),
              }}
            >
              Share Photos
            </Text>

            <Text
              style={{
                color: "#BFC5D3",
                fontSize: fs(18),
                lineHeight: fs(29),
                textAlign: "center",
                marginTop: vs(7),
              }}
            >
              Share moments{"\n"}
              and get closer
            </Text>
          </View>

          {/* AUDIO CALL */}

          <View
            style={{
              width: s(195),
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: s(100),
                height: s(100),
                borderRadius: s(50),
                backgroundColor: "#21143C",
                borderWidth: 2,
                borderColor: "#3B2262",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="call"
                size={s(48)}
                color="#C044FF"
              />
            </View>

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: fs(22),
                fontWeight: "700",
                marginTop: vs(16),
              }}
            >
              Audio Calls
            </Text>

            <Text
              style={{
                color: "#BFC5D3",
                fontSize: fs(18),
                lineHeight: fs(29),
                textAlign: "center",
                marginTop: vs(7),
              }}
            >
              Hear real voices,{"\n"}
              feel the connection
            </Text>
          </View>

          {/* AI SUPPORT */}

          <View
            style={{
              width: s(195),
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: s(100),
                height: s(100),
                borderRadius: s(50),
                backgroundColor: "#21143C",
                borderWidth: 2,
                borderColor: "#3B2262",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="robot-outline"
                size={s(50)}
                color="#C044FF"
              />
            </View>

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: fs(22),
                fontWeight: "700",
                marginTop: vs(16),
              }}
            >
              AI Support
            </Text>

            <Text
              style={{
                color: "#BFC5D3",
                fontSize: fs(18),
                lineHeight: fs(29),
                textAlign: "center",
                marginTop: vs(7),
              }}
            >
              Get smart{"\n"}
              conversation help
            </Text>
          </View>

        </View>

        {/* ================================================= */}
        {/* BOTTOM PURPLE WAVES */}
        {/* ================================================= */}

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: -s(160),
            bottom: -vs(105),
            width: width + s(320),
            height: vs(310),
            borderRadius: s(200),
            backgroundColor: "#17102F",
            borderTopWidth: 2,
            borderTopColor: "#6822BC",
            transform: [{ rotate: "7deg" }],
            zIndex: 3,
          }}
        />

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: -s(180),
            bottom: -vs(160),
            width: width + s(360),
            height: vs(270),
            borderRadius: s(180),
            backgroundColor: "#0D0B1C",
            borderTopWidth: 2,
            borderTopColor: "#46157E",
            transform: [{ rotate: "7deg" }],
            zIndex: 4,
          }}
        />

        {/* ================================================= */}
        {/* PAGINATION */}
        {/* ================================================= */}

       {/* Dots */}
<View
  style={{
    position: "absolute",
    left: s(76),
    bottom: vs(72),
    flexDirection: "row",
    alignItems: "center",
    gap: s(25),
    zIndex: 150,
  }}
>
  <View
    style={{
      width: s(22),
      height: s(22),
      borderRadius: s(12),
      backgroundColor: "#6B6A91",
    }}
  />

  <View
    style={{
      width: s(22),
      height: s(22),
      borderRadius: s(12),
      backgroundColor: "#6B6A91",
    }}
  />

  <View
    style={{
      width: s(22),
      height: s(22),
      borderRadius: s(12),
      backgroundColor: "#BD32FF",
      shadowColor: "#C02CFF",
      shadowOpacity: 0.9,
      shadowRadius: s(12),
    }}
  />
</View>

{/* Right Arrow Button */}
<Pressable
  onPress={() => navigation.navigate("StayControlPage")}
  style={{
    position: "absolute",
    right: s(50),
    bottom: vs(35),
    width: s(145),
    height: s(145),
    borderRadius: s(73),
    overflow: "hidden",
    zIndex: 200,
  }}
>
  <LinearGradient
    colors={["#D347FF", "#6D21FF"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Ionicons
      name="arrow-forward"
      size={s(60)}
      color="#FFFFFF"
    />
  </LinearGradient>
</Pressable>

        {/* ================================================= */}
        {/* NEXT BUTTON */}
        {/* ================================================= */}
      

      </SafeAreaView>
    </View>
  );
}