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
import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Boy from "../../../assets/onBoardingIcon/boy.png"
import Girl from "../../../assets/onBoardingIcon/girl.png"
import { useNavigation } from '@react-navigation/native';
export default function FindMatchNearby() {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  // Reference screenshot ≈ 941 x 1672
  const DESIGN_WIDTH = 941;
  const DESIGN_HEIGHT = 1672;

  const sx = width / DESIGN_WIDTH;
  const sy = height / DESIGN_HEIGHT;

  /*
    Keep everything proportional but don't allow very large
    typography on tablets.
  */
  const s = (value) => value * sx;
  const vs = (value) => value * sy;

  const font = (value) =>
    Math.min(value * sx, value * 1.35);

  const goNext = () => {
    navigation.navigate("DiscoverNewConnectPage");
  };

  

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1B1B1B",
      }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#1B1B1B"
        translucent={false}
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
            width: s(700),
            height: s(700),
            borderRadius: s(350),
            left: s(120),
            top: vs(380),
            backgroundColor: "rgba(112,35,190,0.045)",
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
            top: vs(680),
            backgroundColor: "rgba(175,55,255,0.025)",
          }}
        />

        {/* ================================================= */}
        {/* TOP PROGRESS */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            top: vs(80),
            left: s(72),
            right: s(65),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 100,
          }}
        >
         
        </View>

        {/* ================================================= */}
        {/* HEADING */}
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
              fontSize: font(54),
              lineHeight: font(61),
              fontWeight: "800",
              letterSpacing: -1.2,
            }}
          >
            Find Your
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: font(54),
                lineHeight: font(61),
                fontWeight: "800",
                letterSpacing: -1.2,
              }}
            >
              Match{" "}
            </Text>

            <Text
              style={{
                color: "#A444F8",
                fontSize: font(54),
                lineHeight: font(61),
                fontWeight: "800",
                letterSpacing: -1.2,
              }}
            >
              Nearby
            </Text>

            <Text
              style={{
                color: "#C044FF",
                fontSize: font(50),
                marginLeft: s(15),
                marginTop: vs(-10),
                transform: [{ rotate: "-12deg" }],
              }}
            >
              ♡
            </Text>
          </View>

          <Text
            style={{
              marginTop: vs(20),
              color: "#BDB9C8",
              fontSize: font(24),
              lineHeight: font(37),
              fontWeight: "400",
            }}
          >
            Discover compatible people from your city{"\n"}
            and connect with someone who shares{"\n"}
            your interests.
          </Text>
        </View>

        {/* ================================================= */}
        {/* RIGHT HANDWRITTEN MESSAGE */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            right: s(45),
            top: vs(270),
            zIndex: 60,
            alignItems: "center",
            transform: [{ rotate: "-7deg" }],
          }}
        >
          <Text
            style={{
              color: "#C34DFF",
              fontSize: font(26),
              lineHeight: font(39),
              fontStyle: "italic",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Real people{"\n"}
            Real connections{"\n"}
            Near you
          </Text>

          <View
            style={{
              width: s(90),
              height: vs(3),
              backgroundColor: "#C13CFF",
              marginTop: vs(8),
              transform: [{ rotate: "-4deg" }],
              borderRadius: 5,
            }}
          />

          <Text
            style={{
              color: "#C34DFF",
              fontSize: font(45),
              position: "absolute",
              right: s(-35),
              bottom: vs(-15),
              transform: [{ rotate: "10deg" }],
            }}
          >
            ♡
          </Text>
        </View>

        {/* ================================================= */}
        {/* LOCATION RADAR */}
        {/* ================================================= */}

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            width: s(420),
            height: s(420),
            borderRadius: s(210),
            borderWidth: 2,
            borderColor: "rgba(153,52,240,0.38)",
            left: s(275),
            top: vs(405),
            transform: [{ rotate: "-10deg" }],
          }}
        />

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            width: s(300),
            height: s(300),
            borderRadius: s(150),
            borderWidth: 2,
            borderColor: "rgba(153,52,240,0.30)",
            left: s(335),
            top: vs(470),
          }}
        />

        <View
          style={{
            position: "absolute",
            left: s(400),
            top: vs(445),
            width: s(165),
            height: s(165),
            borderRadius: s(90),
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(60,20,85,0.18)",
            borderWidth: 1,
            borderColor: "rgba(155,56,235,0.3)",
            zIndex: 5,
          }}
        >
          <Ionicons
            name="location"
            size={s(70)}
            color="#C144FF"
          />
        </View>

        {/* ================================================= */}
        {/* LOCATION BUBBLE */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            right: s(55),
            top: vs(465),
            width: s(215),
            height: vs(105),
            borderRadius: s(23),
            backgroundColor: "#28262A",
            borderWidth: 1,
            borderColor: "#3B3740",
            zIndex: 30,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: s(18),
            transform: [{ rotate: "6deg" }],
            shadowColor: "#000",
            shadowOpacity: 0.35,
            shadowRadius: s(15),
            elevation: 10,
          }}
        >
          <Ionicons
            name="location"
            size={s(48)}
            color="#C13CFF"
          />

          <View
            style={{
              marginLeft: s(12),
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: font(20),
                fontWeight: "700",
              }}
            >
              Ujjain
            </Text>

            <Text
              style={{
                color: "#D0CBD6",
                fontSize: font(17),
                marginTop: vs(3),
              }}
            >
              2 km away
            </Text>
          </View>
        </View>

        {/* ================================================= */}
        {/* PROFILE CARD 1 */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            left: s(68),
            top: vs(510),
            width: s(395),
            height: vs(545),
            borderRadius: s(32),
            overflow: "hidden",
            backgroundColor: "#262427",
            borderWidth: 2,
            borderColor: "#454047",
            transform: [{ rotate: "-9deg" }],
            zIndex: 20,
            shadowColor: "#000",
            shadowOpacity: 0.65,
            shadowRadius: s(20),
            shadowOffset: {
              width: 0,
              height: s(10),
            },
            elevation: 18,
          }}
        >

          {/* IMAGE */}
          <Image
            source={Boy}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />

          {/* DARK BOTTOM GRADIENT APPROX */}
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: vs(220),
              backgroundColor: "rgba(16,15,17,0.82)",
            }}
          />

          {/* ONLINE */}
          <View
            style={{
              position: "absolute",
              top: vs(20),
              left: s(18),
              height: vs(43),
              paddingHorizontal: s(15),
              borderRadius: s(25),
              backgroundColor: "rgba(10,10,10,0.72)",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: s(12),
                height: s(12),
                borderRadius: s(6),
                backgroundColor: "#00F27A",
                marginRight: s(10),
              }}
            />

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: font(18),
                fontWeight: "500",
              }}
            >
              Online
            </Text>
          </View>

          {/* TOP HEART */}
          <View
            style={{
              position: "absolute",
              top: vs(18),
              right: s(17),
              width: s(53),
              height: s(53),
              borderRadius: s(28),
              backgroundColor: "rgba(0,0,0,0.48)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="heart-outline"
              size={s(35)}
              color="#FFFFFF"
            />
          </View>

          {/* PROFILE DATA */}
          <View
            style={{
              position: "absolute",
              left: s(20),
              right: s(18),
              bottom: vs(20),
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: font(31),
                fontWeight: "800",
              }}
            >
              Aryan, 27
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: vs(4),
              }}
            >
              <Ionicons
                name="location"
                size={s(20)}
                color="#E4E0E7"
              />

              <Text
                style={{
                  color: "#E4E0E7",
                  fontSize: font(18),
                  marginLeft: s(5),
                }}
              >
                2 km away
              </Text>
            </View>

            {/* TAGS */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: s(9),
                marginTop: vs(14),
              }}
            >
              {["Music", "Travel", "Fitness"].map((item) => (
                <View
                  key={item}
                  style={{
                    borderWidth: 1,
                    borderColor: "#7C35A9",
                    borderRadius: s(22),
                    paddingHorizontal: s(16),
                    paddingVertical: vs(9),
                    backgroundColor: "rgba(30,20,35,0.55)",
                  }}
                >
                  <Text
                    style={{
                      color: "#E5DFE9",
                      fontSize: font(15),
                    }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* BIG HEART */}
          <View
            style={{
              position: "absolute",
              right: s(17),
              bottom: vs(92),
              width: s(67),
              height: s(67),
              borderRadius: s(35),
              backgroundColor: "#8E20FF",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#C75BFF",
              shadowColor: "#A62AFF",
              shadowOpacity: 0.8,
              shadowRadius: s(18),
            }}
          >
            <Ionicons
              name="heart"
              size={s(36)}
              color="#FFFFFF"
            />
          </View>
        </View>

        {/* ================================================= */}
        {/* PROFILE CARD 2 */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            right: s(62),
            top: vs(590),
            width: s(390),
            height: vs(535),
            borderRadius: s(32),
            overflow: "hidden",
            backgroundColor: "#262427",
            borderWidth: 2,
            borderColor: "#454047",
            transform: [{ rotate: "10deg" }],
            zIndex: 25,
            shadowColor: "#000",
            shadowOpacity: 0.65,
            shadowRadius: s(20),
            shadowOffset: {
              width: 0,
              height: s(10),
            },
            elevation: 18,
          }}
        >

          <Image
            source={Girl}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />

          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: vs(215),
              backgroundColor: "rgba(16,15,17,0.82)",
            }}
          />

          {/* ONLINE */}
          <View
            style={{
              position: "absolute",
              top: vs(20),
              left: s(18),
              height: vs(43),
              paddingHorizontal: s(15),
              borderRadius: s(25),
              backgroundColor: "rgba(10,10,10,0.72)",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: s(12),
                height: s(12),
                borderRadius: s(6),
                backgroundColor: "#00F27A",
                marginRight: s(10),
              }}
            />

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: font(18),
              }}
            >
              Online
            </Text>
          </View>

          {/* TOP HEART */}
          <View
            style={{
              position: "absolute",
              top: vs(18),
              right: s(17),
              width: s(53),
              height: s(53),
              borderRadius: s(28),
              backgroundColor: "rgba(0,0,0,0.48)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="heart-outline"
              size={s(35)}
              color="#FFFFFF"
            />
          </View>

          {/* INFO */}
          <View
            style={{
              position: "absolute",
              left: s(20),
              right: s(18),
              bottom: vs(20),
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: font(31),
                fontWeight: "800",
              }}
            >
              Advika, 26
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: vs(4),
              }}
            >
              <Ionicons
                name="location"
                size={s(20)}
                color="#E4E0E7"
              />

              <Text
                style={{
                  color: "#E4E0E7",
                  fontSize: font(18),
                  marginLeft: s(5),
                }}
              >
                3 km away
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: s(9),
                marginTop: vs(14),
              }}
            >
              {["Food", "Movies", "Pets"].map((item) => (
                <View
                  key={item}
                  style={{
                    borderWidth: 1,
                    borderColor: "#7C35A9",
                    borderRadius: s(22),
                    paddingHorizontal: s(16),
                    paddingVertical: vs(9),
                    backgroundColor: "rgba(30,20,35,0.55)",
                  }}
                >
                  <Text
                    style={{
                      color: "#E5DFE9",
                      fontSize: font(15),
                    }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* HEART */}
          <View
            style={{
              position: "absolute",
              right: s(17),
              bottom: vs(92),
              width: s(67),
              height: s(67),
              borderRadius: s(35),
              backgroundColor: "#8E20FF",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#C75BFF",
            }}
          >
            <Ionicons
              name="heart"
              size={s(36)}
              color="#FFFFFF"
            />
          </View>
        </View>

        {/* ================================================= */}
        {/* LEFT HANDWRITTEN NOTE */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            left: s(25),
            top: vs(925),
            zIndex: 70,
            transform: [{ rotate: "-8deg" }],
          }}
        >
          <Text
            style={{
              color: "#C044FF",
              fontSize: font(48),
              lineHeight: font(45),
            }}
          >
            ↗
          </Text>

          <Text
            style={{
              color: "#C44EFF",
              fontSize: font(23),
              lineHeight: font(32),
              fontStyle: "italic",
              marginTop: vs(-5),
            }}
          >
            People{"\n"}
            near you!
          </Text>
        </View>

        {/* ================================================= */}
        {/* RIGHT HANDWRITTEN NOTE */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            right: s(20),
            top: vs(1050),
            zIndex: 70,
            transform: [{ rotate: "-5deg" }],
          }}
        >
          <Text
            style={{
              color: "#C44EFF",
              fontSize: font(22),
              lineHeight: font(31),
              fontStyle: "italic",
              textAlign: "left",
            }}
          >
            Same city{"\n"}
            Bigger possibilities
          </Text>

          <Text
            style={{
              color: "#C44EFF",
              fontSize: font(43),
              textAlign: "right",
              marginTop: vs(2),
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
            left: s(55),
            right: s(55),
            top: vs(1160),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            zIndex: 80,
          }}
        >

          {/* FEATURE 1 */}
          <View
            style={{
              width: s(245),
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: s(100),
                height: s(100),
                borderRadius: s(30),
                backgroundColor: "#28262A",
                borderWidth: 1,
                borderColor: "#3B3740",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="location"
                size={s(52)}
                color="#B83CFF"
              />
            </View>

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: font(24),
                fontWeight: "700",
                marginTop: vs(17),
                textAlign: "center",
              }}
            >
              Your City
            </Text>

            <Text
              style={{
                color: "#C0BBC9",
                fontSize: font(20),
                lineHeight: font(32),
                marginTop: vs(7),
                textAlign: "center",
              }}
            >
              See people{"\n"}
              near you
            </Text>
          </View>

          {/* FEATURE 2 */}
          <View
            style={{
              width: s(270),
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: s(100),
                height: s(100),
                borderRadius: s(30),
                backgroundColor: "#28262A",
                borderWidth: 1,
                borderColor: "#3B3740",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="heart"
                size={s(50)}
                color="#B83CFF"
              />
            </View>

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: font(24),
                fontWeight: "700",
                marginTop: vs(17),
                textAlign: "center",
              }}
            >
              Compatible Profiles
            </Text>

            <Text
              style={{
                color: "#C0BBC9",
                fontSize: font(20),
                lineHeight: font(32),
                marginTop: vs(7),
                textAlign: "center",
              }}
            >
              Find people who{"\n"}
              match your interests
            </Text>
          </View>

          {/* FEATURE 3 */}
          <View
            style={{
              width: s(245),
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: s(100),
                height: s(100),
                borderRadius: s(30),
                backgroundColor: "#28262A",
                borderWidth: 1,
                borderColor: "#3B3740",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="account-group"
                size={s(52)}
                color="#B83CFF"
              />
            </View>

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: font(24),
                lineHeight: font(31),
                fontWeight: "700",
                marginTop: vs(17),
                textAlign: "center",
              }}
            >
              Meaningful{"\n"}
              Connections
            </Text>

            <Text
              style={{
                color: "#C0BBC9",
                fontSize: font(20),
                lineHeight: font(32),
                marginTop: vs(7),
                textAlign: "center",
              }}
            >
              Start conversations{"\n"}
              that matter
            </Text>
          </View>
        </View>

        {/* ================================================= */}
        {/* BOTTOM WAVE */}
        {/* ================================================= */}

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: -s(150),
            bottom: -vs(135),
            width: width + s(300),
            height: vs(260),
            borderRadius: s(180),
            backgroundColor: "#21122F",
            borderTopWidth: 2,
            borderTopColor: "#40205D",
            transform: [{ rotate: "5deg" }],
            zIndex: 2,
          }}
        />

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: -s(180),
            bottom: -vs(210),
            width: width + s(360),
            height: vs(260),
            borderRadius: s(180),
            backgroundColor: "#19151B",
            borderTopWidth: 1,
            borderTopColor: "#34213F",
            transform: [{ rotate: "5deg" }],
            zIndex: 3,
          }}
        />

        {/* ================================================= */}
        {/* BOTTOM DOTS */}
        {/* ================================================= */}

        <View
          style={{
            position: "absolute",
            left: s(76),
            bottom: vs(75),
            flexDirection: "row",
            alignItems: "center",
            gap: s(25),
            zIndex: 100,
          }}
        >
          <View
            style={{
              width: s(22),
              height: s(22),
              borderRadius: s(12),
              backgroundColor: "#C044FF",
              shadowColor: "#C044FF",
              shadowOpacity: 0.9,
              shadowRadius: s(10),
            }}
          />

          <View
            style={{
              width: s(22),
              height: s(22),
              borderRadius: s(12),
              backgroundColor: "#65646D",
            }}
          />

          <View
            style={{
              width: s(22),
              height: s(22),
              borderRadius: s(12),
              backgroundColor: "#65646D",
            }}
          />
        </View>

        {/* ================================================= */}
        {/* NEXT BUTTON */}
        {/* ================================================= */}

        <TouchableOpacity
  activeOpacity={0.82}
  onPress={goNext}
  style={{
    position: "absolute",
    right: s(65),
    bottom: vs(35),
    width: s(145),
    height: s(145),
    borderRadius: s(75),
    overflow: "hidden",
    zIndex: 100,
    shadowColor: "#A52DFF",
    shadowOffset: {
      width: 0,
      height: s(5),
    },
    shadowOpacity: 0.75,
    shadowRadius: s(25),
    elevation: 20,
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
      size={s(70)}
      color="#FFFFFF"
    />
  </LinearGradient>
</TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}