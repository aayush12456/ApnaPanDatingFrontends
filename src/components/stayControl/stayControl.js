import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import ControlImg from "../../../assets/onBoardingIcon/control.png"
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from 'expo-secure-store';

export default function StayControl() {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  // Screenshot reference = 941 x 1672
  const DESIGN_WIDTH = 941;
  const DESIGN_HEIGHT = 1672;

  const sx = width / DESIGN_WIDTH;
  const sy = height / DESIGN_HEIGHT;

  // Horizontal responsive scale
  const s = (value) => value * sx;

  // Vertical responsive scale
  const vs = (value) => value * sy;

  // Responsive font
  const fs = (value) =>
    Math.min(value * sx, value * 1.35);

 
  const handleStart = async () => {
    try {

      /* FLAG STORE */
      await SecureStore.setItemAsync('flag', '1');

      /* NAVIGATE */
      navigation.navigate('FrontPage');

    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#070A18",
        overflow: "hidden",
      }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#070A18"
      />

      <SafeAreaView
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >

        {/* ================================================= */}
        {/* BACKGROUND GLOW */}
        {/* ================================================= */}

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            width: s(650),
            height: s(650),
            borderRadius: s(325),
            left: s(130),
            top: vs(350),
            backgroundColor: "rgba(94,20,190,0.045)",
          }}
        />

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            width: s(500),
            height: s(500),
            borderRadius: s(250),
            left: s(220),
            top: vs(650),
            backgroundColor: "rgba(151,31,255,0.035)",
          }}
        />

        {/* ================================================= */}
        {/* TOP PROGRESS */}
        {/* ================================================= */}

    

        {/* ================================================= */}
        {/* MAIN TITLE */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            top: vs(155),
            left: s(70),
            zIndex: 50,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: fs(55),
              lineHeight: fs(63),
              fontWeight: "800",
              letterSpacing: -1.5,
            }}
          >
            Stay in
          </Text>

          {/* Gradient Control text */}

          <Text
            style={{
              color: "#B935FF",
              fontSize: fs(56),
              lineHeight: fs(62),
              fontWeight: "800",
              letterSpacing: -1.5,
            }}
          >
           Control
          </Text>

          <Text
            style={{
              marginTop: vs(18),
              color: "#BDB9C8",
              fontSize: fs(25),
              lineHeight: fs(38),
              fontWeight: "400",
            }}
          >
            Manage your connections, skipped{"\n"}
            profiles, blocked users and account{"\n"}
            preferences with ease.
          </Text>
        </View>

        {/* ================================================= */}
        {/* RIGHT HANDWRITTEN NOTE */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            right: s(48),
            top: vs(215),
            zIndex: 80,
            transform: [{ rotate: "-5deg" }],
          }}
        >
          <Text
            style={{
              color: "#C637FF",
              fontSize: fs(27),
              lineHeight: fs(40),
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            Your{"\n"}
            Experience{"\n"}
            Your Rules
          </Text>

          <View
            style={{
              width: s(105),
              height: vs(3),
              backgroundColor: "#C637FF",
              borderRadius: 5,
              alignSelf: "center",
              marginTop: vs(8),
              transform: [{ rotate: "-5deg" }],
            }}
          />

          <Text
            style={{
              position: "absolute",
              right: s(-35),
              bottom: vs(-40),
              color: "#C637FF",
              fontSize: fs(50),
              transform: [{ rotate: "10deg" }],
            }}
          >
            ♡
          </Text>
        </View>

        {/* ================================================= */}
        {/* CITY SILHOUETTE */}
        {/* ================================================= */}

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: vs(540),
            height: vs(330),
            zIndex: 1,
            opacity: 0.65,
          }}
        >
          <View
            style={{
              position: "absolute",
              left: s(0),
              bottom: 0,
              width: s(35),
              height: vs(145),
              backgroundColor: "#18133D",
            }}
          />

          <View
            style={{
              position: "absolute",
              left: s(30),
              bottom: 0,
              width: s(42),
              height: vs(210),
              backgroundColor: "#201448",
            }}
          />

          <View
            style={{
              position: "absolute",
              left: s(72),
              bottom: 0,
              width: s(38),
              height: vs(165),
              backgroundColor: "#1D1443",
            }}
          />

          <View
            style={{
              position: "absolute",
              left: s(105),
              bottom: 0,
              width: s(48),
              height: vs(245),
              backgroundColor: "#251550",
            }}
          />

          <View
            style={{
              position: "absolute",
              right: s(20),
              bottom: 0,
              width: s(45),
              height: vs(205),
              backgroundColor: "#1B143E",
            }}
          />

          <View
            style={{
              position: "absolute",
              right: s(70),
              bottom: 0,
              width: s(37),
              height: vs(160),
              backgroundColor: "#23144A",
            }}
          />
        </View>

        {/* ================================================= */}
        {/* MAIN ACCOUNT & PRIVACY CARD */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            left: s(125),
            top: vs(430),
            width: s(410),
            height: vs(650),
            borderRadius: s(34),
            backgroundColor: "#090D1E",
            borderWidth: 3,
            borderColor: "#9A36FF",
            zIndex: 30,
            transform: [{ rotate: "-7deg" }],
            overflow: "hidden",

            shadowColor: "#A72DFF",
            shadowOpacity: 0.8,
            shadowRadius: s(25),
            shadowOffset: {
              width: 0,
              height: 0,
            },

            elevation: 20,
          }}
        >

          {/* CARD HEADER */}

          <View
            style={{
              height: vs(100),
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: s(20),
            }}
          >
            <Ionicons
              name="chevron-back"
              size={s(31)}
              color="#FFFFFF"
            />

            <Text
              style={{
                flex: 1,
                color: "#FFFFFF",
                fontSize: fs(20),
                fontWeight: "700",
                textAlign: "center",
                marginRight: s(30),
              }}
            >
              Account & Privacy
            </Text>
          </View>

          {/* PROFILE */}

          <View
            style={{
              marginHorizontal: s(20),
              height: vs(112),
              borderRadius: s(18),
              backgroundColor: "#151B35",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: s(14),
            }}
          >
            <Image
              source={ControlImg}
              style={{
                width: s(78),
                height: s(78),
                borderRadius: s(40),
                resizeMode: "cover",
              }}
            />

            <View
              style={{
                marginLeft: s(15),
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: fs(18),
                  fontWeight: "700",
                }}
              >
                Priya Sharma
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: vs(7),
                }}
              >
                <Text
                  style={{
                    color: "#AFCFFF",
                    fontSize: fs(15),
                  }}
                >
                  View Profile
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={s(20)}
                  color="#FFFFFF"
                  style={{
                    marginLeft: s(5),
                  }}
                />
              </View>
            </View>
          </View>

          {/* MENU ITEMS */}

          <View
            style={{
              marginTop: vs(15),
              paddingHorizontal: s(20),
            }}
          >

            {/* My Connections */}

            <View
              style={{
                height: vs(65),
                borderRadius: s(16),
                backgroundColor: "#12182E",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: s(15),
                marginBottom: vs(8),
              }}
            >
              <MaterialCommunityIcons
                name="account-group"
                size={s(32)}
                color="#E7C8FF"
              />

              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: fs(16),
                  marginLeft: s(17),
                  flex: 1,
                }}
              >
                My Connections
              </Text>

              <Ionicons
                name="chevron-forward"
                size={s(25)}
                color="#FFFFFF"
              />
            </View>

            {/* Skipped Profiles */}

            <View
              style={{
                height: vs(65),
                borderRadius: s(16),
                backgroundColor: "#12182E",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: s(15),
                marginBottom: vs(8),
              }}
            >
              <MaterialCommunityIcons
                name="eye-off-outline"
                size={s(31)}
                color="#E7C8FF"
              />

              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: fs(16),
                  marginLeft: s(17),
                  flex: 1,
                }}
              >
                Skipped Profiles
              </Text>

              <Ionicons
                name="chevron-forward"
                size={s(25)}
                color="#FFFFFF"
              />
            </View>

            {/* Blocked Users */}

            <View
              style={{
                height: vs(65),
                borderRadius: s(16),
                backgroundColor: "#12182E",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: s(15),
                marginBottom: vs(8),
              }}
            >
              <MaterialCommunityIcons
                name="cancel"
                size={s(31)}
                color="#E7C8FF"
              />

              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: fs(16),
                  marginLeft: s(17),
                  flex: 1,
                }}
              >
                Blocked Users
              </Text>

              <Ionicons
                name="chevron-forward"
                size={s(25)}
                color="#FFFFFF"
              />
            </View>

            {/* Account Preferences */}

            <View
              style={{
                height: vs(65),
                borderRadius: s(16),
                backgroundColor: "#12182E",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: s(15),
                marginBottom: vs(8),
              }}
            >
              <Ionicons
                name="settings"
                size={s(31)}
                color="#E7C8FF"
              />

              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: fs(16),
                  marginLeft: s(17),
                  flex: 1,
                }}
              >
                Account Preferences
              </Text>

              <Ionicons
                name="chevron-forward"
                size={s(25)}
                color="#FFFFFF"
              />
            </View>

            {/* Privacy & Safety */}

            <View
              style={{
                height: vs(65),
                borderRadius: s(16),
                backgroundColor: "#12182E",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: s(15),
              }}
            >
              <Ionicons
                name="lock-closed"
                size={s(29)}
                color="#E7C8FF"
              />

              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: fs(16),
                  marginLeft: s(17),
                  flex: 1,
                }}
              >
                Privacy & Safety
              </Text>

              <Ionicons
                name="chevron-forward"
                size={s(25)}
                color="#FFFFFF"
              />
            </View>

          </View>
        </View>

        {/* ================================================= */}
        {/* RIGHT SIDE CARDS */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            right: s(45),
            top: vs(490),
            width: s(350),
            zIndex: 40,
          }}
        >

          {/* My Connections */}

          <View
            style={{
              width: s(350),
              height: vs(145),
              borderRadius: s(23),
              backgroundColor: "#191442",
              borderWidth: 1.5,
              borderColor: "#6325A3",
              paddingHorizontal: s(20),
              paddingVertical: vs(17),
              flexDirection: "row",
              alignItems: "center",
              transform: [{ rotate: "7deg" }],
              marginBottom: vs(22),

              shadowColor: "#8D2BFF",
              shadowOpacity: 0.35,
              shadowRadius: s(15),
            }}
          >
            <View
              style={{
                width: s(55),
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="account-group"
                size={s(43)}
                color="#00EFA2"
              />
            </View>

            <View
              style={{
                flex: 1,
                marginLeft: s(8),
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: fs(17),
                  fontWeight: "700",
                }}
              >
                My Connections
              </Text>

              <Text
                style={{
                    color: "#BDB9C8",
                  fontSize: fs(14),
                  lineHeight: fs(21),
                  marginTop: vs(6),
                }}
              >
                View and manage{"\n"}
                your matches
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={s(25)}
              color="#E6C4FF"
            />
          </View>

          {/* Skipped Profiles */}

          <View
            style={{
              width: s(350),
              height: vs(145),
              borderRadius: s(23),
              backgroundColor: "#191442",
              borderWidth: 1.5,
              borderColor: "#6325A3",
              paddingHorizontal: s(20),
              paddingVertical: vs(17),
              flexDirection: "row",
              alignItems: "center",
              transform: [{ rotate: "7deg" }],
              marginBottom: vs(22),
            }}
          >
            <MaterialCommunityIcons
              name="eye-off"
              size={s(44)}
              color="#FF5676"
            />

            <View
              style={{
                flex: 1,
                marginLeft: s(17),
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: fs(17),
                  fontWeight: "700",
                }}
              >
                Skipped Profiles
              </Text>

              <Text
                style={{
                  color: "#C4D5FF",
                  fontSize: fs(14),
                  lineHeight: fs(21),
                  marginTop: vs(6),
                }}
              >
                See profiles{"\n"}
                you passed on
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={s(25)}
              color="#E6C4FF"
            />
          </View>

          {/* Blocked Users */}

          <View
            style={{
              width: s(350),
              height: vs(145),
              borderRadius: s(23),
              backgroundColor: "#191442",
              borderWidth: 1.5,
              borderColor: "#6325A3",
              paddingHorizontal: s(20),
              paddingVertical: vs(17),
              flexDirection: "row",
              alignItems: "center",
              transform: [{ rotate: "7deg" }],
              marginBottom: vs(22),
            }}
          >
            <MaterialCommunityIcons
              name="cancel"
              size={s(44)}
              color="#FF5978"
            />

            <View
              style={{
                flex: 1,
                marginLeft: s(17),
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: fs(17),
                  fontWeight: "700",
                }}
              >
                Blocked Users
              </Text>

              <Text
                style={{
                  color: "#C4D5FF",
                  fontSize: fs(14),
                  lineHeight: fs(21),
                  marginTop: vs(6),
                }}
              >
                Manage blocked{"\n"}
                accounts
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={s(25)}
              color="#E6C4FF"
            />
          </View>

          {/* Account Preferences */}

          <View
            style={{
              width: s(350),
              height: vs(145),
              borderRadius: s(23),
              backgroundColor: "#191442",
              borderWidth: 1.5,
              borderColor: "#6325A3",
              paddingHorizontal: s(20),
              paddingVertical: vs(17),
              flexDirection: "row",
              alignItems: "center",
              transform: [{ rotate: "7deg" }],
            }}
          >
            <Ionicons
              name="settings"
              size={s(44)}
              color="#C23DFF"
            />

            <View
              style={{
                flex: 1,
                marginLeft: s(17),
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: fs(17),
                  fontWeight: "700",
                }}
              >
                Account Preferences
              </Text>

              <Text
                style={{
                  color: "#C4D5FF",
                  fontSize: fs(14),
                  lineHeight: fs(21),
                  marginTop: vs(6),
                }}
              >
                Update your settings{"\n"}
                anytime
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={s(25)}
              color="#E6C4FF"
            />
          </View>

        </View>

        {/* ================================================= */}
        {/* GEAR DECORATION */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            right: s(45),
            top: vs(445),
            width: s(95),
            height: s(95),
            borderRadius: s(50),
            backgroundColor: "#1B123B",
            borderWidth: 1.5,
            borderColor: "#54208E",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 80,
          }}
        >
          <Ionicons
            name="settings"
            size={s(50)}
            color="#C73DFF"
          />
        </View>

        {/* ================================================= */}
        {/* LEFT SHIELD */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            left: s(30),
            top: vs(725),
            width: s(105),
            height: s(105),
            zIndex: 80,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons
            name="shield-check"
            size={s(92)}
            color="#B73CFF"
          />
        </View>

        {/* ================================================= */}
        {/* LEFT HANDWRITTEN */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            left: s(30),
            top: vs(865),
            zIndex: 100,
            transform: [{ rotate: "-6deg" }],
          }}
        >
          <Text
            style={{
              color: "#C43CFF",
              fontSize: fs(22),
              lineHeight: fs(32),
              fontStyle: "italic",
            }}
          >
            Safe{"\n"}
            Private{"\n"}
            In Your{"\n"}
            Hands
          </Text>

          <Text
            style={{
              color: "#C43CFF",
              fontSize: fs(48),
              marginLeft: s(75),
            }}
          >
            ♡
          </Text>
        </View>

        {/* ================================================= */}
        {/* RIGHT HANDWRITTEN */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            right: s(15),
            top: vs(945),
            zIndex: 100,
            transform: [{ rotate: "-5deg" }],
          }}
        >
          <Text
            style={{
              color: "#C43CFF",
              fontSize: fs(21),
              lineHeight: fs(31),
              fontStyle: "italic",
            }}
          >
            Manage{"\n"}
            Your{"\n"}
            Way
          </Text>

          <Text
            style={{
              color: "#C43CFF",
              fontSize: fs(48),
              textAlign: "right",
            }}
          >
            ♡
          </Text>
        </View>

        {/* ================================================= */}
        {/* FEATURES */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            left: s(35),
            right: s(35),
            top: vs(1170),
            flexDirection: "row",
            justifyContent: "space-between",
            zIndex: 100,
          }}
        >

          {/* MANAGE CONNECTIONS */}

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
                backgroundColor: "#21143E",
                borderWidth: 2,
                borderColor: "#3B2264",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="account-group"
                size={s(52)}
                color="#C33EFF"
              />
            </View>

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: fs(20),
                lineHeight: fs(26),
                fontWeight: "700",
                textAlign: "center",
                marginTop: vs(15),
              }}
            >
              Manage{"\n"}
              Connections
            </Text>

            <Text
              style={{
                color: "#BDB9C8",
                fontSize: fs(17),
                lineHeight: fs(28),
                textAlign: "center",
                marginTop: vs(8),
              }}
            >
              View and organize{"\n"}
              your matches
            </Text>
          </View>

          {/* TRACK SKIPPED */}

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
                backgroundColor: "#21143E",
                borderWidth: 2,
                borderColor: "#3B2264",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="eye-off"
                size={s(51)}
                color="#C33EFF"
              />
            </View>

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: fs(20),
                lineHeight: fs(26),
                fontWeight: "700",
                textAlign: "center",
                marginTop: vs(15),
              }}
            >
              Track Skipped{"\n"}
              Profiles
            </Text>

            <Text
              style={{
                color: "#BDB9C8",
                fontSize: fs(17),
                lineHeight: fs(28),
                textAlign: "center",
                marginTop: vs(8),
              }}
            >
              Revisit profiles{"\n"}
              you passed on
            </Text>
          </View>

          {/* BLOCKED */}

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
                backgroundColor: "#21143E",
                borderWidth: 2,
                borderColor: "#3B2264",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="cancel"
                size={s(51)}
                color="#FF557D"
              />
            </View>

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: fs(20),
                lineHeight: fs(26),
                fontWeight: "700",
                textAlign: "center",
                marginTop: vs(15),
              }}
            >
              Control{"\n"}
              Blocked Users
            </Text>

            <Text
              style={{
                color: "#BDB9C8",
                fontSize: fs(17),
                lineHeight: fs(28),
                textAlign: "center",
                marginTop: vs(8),
              }}
            >
              Keep your experience{"\n"}
              safe and comfortable
            </Text>
          </View>

          {/* CUSTOMIZE */}

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
                backgroundColor: "#21143E",
                borderWidth: 2,
                borderColor: "#3B2264",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="settings"
                size={s(52)}
                color="#C33EFF"
              />
            </View>

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: fs(20),
                lineHeight: fs(26),
                fontWeight: "700",
                textAlign: "center",
                marginTop: vs(15),
              }}
            >
              Customize{"\n"}
              Preferences
            </Text>

            <Text
              style={{
                color: "#BDB9C8",
                fontSize: fs(17),
                lineHeight: fs(28),
                textAlign: "center",
                marginTop: vs(8),
              }}
            >
              Set your choices{"\n"}
              your way
            </Text>
          </View>

        </View>

        {/* ================================================= */}
        {/* BOTTOM PURPLE WAVE 1 */}
        {/* ================================================= */}

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: -s(170),
            bottom: -vs(105),
            width: width + s(340),
            height: vs(310),
            borderRadius: s(200),
            backgroundColor: "#17102F",
            borderTopWidth: 2,
            borderTopColor: "#6822BC",
            transform: [{ rotate: "7deg" }],
            zIndex: 3,
          }}
        />

        {/* ================================================= */}
        {/* BOTTOM PURPLE WAVE 2 */}
        {/* ================================================= */}

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: -s(190),
            bottom: -vs(160),
            width: width + s(380),
            height: vs(275),
            borderRadius: s(180),
            backgroundColor: "#0B0A1B",
            borderTopWidth: 2,
            borderTopColor: "#471681",
            transform: [{ rotate: "7deg" }],
            zIndex: 4,
          }}
        />

        {/* ================================================= */}
        {/* LET'S GET STARTED BUTTON */}
        {/* ================================================= */}

        <TouchableOpacity
          onPress={handleStart}
          activeOpacity={0.85}
          style={{
            position: "absolute",
            right: s(55),
            bottom: vs(42),
            width: s(275),
            height: vs(82),
            borderRadius: s(42),
            zIndex: 150,

            shadowColor: "#B62CFF",
            shadowOpacity: 0.75,
            shadowRadius: s(22),
            shadowOffset: {
              width: 0,
              height: 5,
            },

            elevation: 20,
          }}
        >
          <LinearGradient
            colors={[
              "#C22EFF",
              "#A52AFF",
              "#7628F7",
            ]}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 1,
              y: 1,
            }}
            style={{
              flex: 1,
              borderRadius: s(42),
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              paddingHorizontal: s(20),
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: fs(26),
                fontWeight: "800",
                letterSpacing: 0.2,
              }}
            >
              Let's Get Started
            </Text>

            <Ionicons
              name="arrow-forward"
              size={s(27)}
              color="#FFFFFF"
              style={{
                marginLeft: s(12),
              }}
            />
          </LinearGradient>
        </TouchableOpacity>

      </SafeAreaView>
    </View>
  );
}