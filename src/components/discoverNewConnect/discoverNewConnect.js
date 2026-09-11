import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import newBoy from "../../../assets/onBoardingIcon/newBoy.png"
import newGirl from "../../../assets/onBoardingIcon/newGirl.png"
import smallGirl from "../../../assets/onBoardingIcon/smallGirl.png"
import smallBoy from "../../../assets/onBoardingIcon/smallBoy.png"
import { useNavigation } from '@react-navigation/native';

export default function DiscoverNewConnect() {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const scale = width / 941;

  const s = (value) => value * scale;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#181818",
      }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#181818"
      />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#181818",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: height,
            paddingBottom: s(35),
          }}
        >
          {/* ================= TOP ================= */}

          <View
            style={{
              width: "100%",
              paddingHorizontal: s(72),
              paddingTop: Math.max(s(75), height * 0.085),
            }}
          >
            {/* Progress */}
          

          

            {/* Heading */}
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: s(66),
                lineHeight: s(70),
                fontWeight: "800",
                letterSpacing: -s(1.5),
              }}
            >
              Discover New
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#B548F5",
                  fontSize: s(66),
                  lineHeight: s(72),
                  fontWeight: "800",
                  letterSpacing: -s(1.5),
                }}
              >
                Connections
              </Text>

              <Text
                style={{
                  color: "#C143FF",
                  fontSize: s(55),
                  marginLeft: s(13),
                  marginTop: s(4),
                }}
              >
                ♡
              </Text>
            </View>

            {/* Description */}
            <Text
              style={{
                color: "#BFC5D3",
                fontSize: s(27),
                lineHeight: s(37),
                marginTop: s(24),
                width: s(610),
              }}
            >
              Meet new and online people from beyond
              {"\n"}
              your city and discover connections you
              {"\n"}
              might otherwise miss.
            </Text>
          </View>

          {/* ================= HERO AREA ================= */}

          <View
            style={{
              height: s(735),
              marginTop: s(20),
              position: "relative",
            }}
          >
            {/* Globe */}
            <View
              style={{
                position: "absolute",
                width: s(330),
                height: s(330),
                borderRadius: s(165),
                right: s(82),
                top: s(30),
                backgroundColor: "#211936",
                borderWidth: s(2),
                borderColor: "#6E36A4",
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="earth"
                size={s(310)}
                color="#39265F"
              />

              <View
                style={{
                  position: "absolute",
                  width: s(350),
                  height: s(350),
                  borderRadius: s(175),
                  borderWidth: s(2),
                  borderColor: "#A83CFF",
                  borderStyle: "dashed",
                  opacity: 0.8,
                }}
              />
            </View>

            {/* Globe Location Pin 1 */}
            <View
              style={{
                position: "absolute",
                right: s(330),
                top: s(0),
              }}
            >
              <Ionicons
                name="location"
                size={s(55)}
                color="#C94EFF"
              />
            </View>

            {/* Globe Location Pin 2 */}
            <View
              style={{
                position: "absolute",
                right: s(57),
                top: s(75),
              }}
            >
              <Ionicons
                name="location"
                size={s(48)}
                color="#C94EFF"
              />
            </View>

            {/* ================= LEFT PROFILE ================= */}

            <View
              style={{
                position: "absolute",
                left: s(76),
                top: s(76),
                width: s(400),
                height: s(530),
                borderRadius: s(28),
                backgroundColor: "#171717",
                borderWidth: s(3),
                borderColor: "#55545D",
                transform: [{ rotate: "-8deg" }],
                overflow: "hidden",
              }}
            >
              {/* Profile image */}
              <Image
                source={newBoy}
                style={{
                  width: "100%",
                  height: s(330),
                  resizeMode: "cover",
                }}
              />

              {/* Online */}
              <View
                style={{
                  position: "absolute",
                  top: s(25),
                  left: s(20),
                  height: s(45),
                  paddingHorizontal: s(17),
                  borderRadius: s(23),
                  backgroundColor: "rgba(20,20,20,0.82)",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: s(14),
                    height: s(14),
                    borderRadius: s(7),
                    backgroundColor: "#00E879",
                    marginRight: s(10),
                  }}
                />

                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: s(19),
                    fontWeight: "600",
                  }}
                >
                  Online
                </Text>
              </View>

              {/* Heart */}
              <View
                style={{
                  position: "absolute",
                  top: s(18),
                  right: s(17),
                  width: s(58),
                  height: s(58),
                  borderRadius: s(18),
                  backgroundColor: "rgba(35,30,28,0.72)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="heart-outline"
                  size={s(34)}
                  color="#FFFFFF"
                />
              </View>

              {/* Bottom */}
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: s(22),
                  paddingTop: s(17),
                  backgroundColor: "#171717",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: s(29),
                    fontWeight: "800",
                  }}
                >
                  Karan, 28
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: s(7),
                  }}
                >
                  <Ionicons
                    name="location"
                    size={s(20)}
                    color="#BFC4D0"
                  />

                  <Text
                    style={{
                      color: "#C1C5D0",
                      fontSize: s(18),
                      marginLeft: s(5),
                    }}
                  >
                    New York, USA
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: s(14),
                    gap: s(10),
                  }}
                >
                  {["Travel", "Coffee", "Photography"].map(
                    (item) => (
                      <View
                        key={item}
                        style={{
                          borderWidth: s(1.5),
                          borderColor: "#7332A8",
                          borderRadius: s(20),
                          paddingHorizontal: s(14),
                          paddingVertical: s(8),
                        }}
                      >
                        <Text
                          style={{
                            color: "#D4D5DD",
                            fontSize: s(15),
                          }}
                        >
                          {item}
                        </Text>
                      </View>
                    )
                  )}
                </View>
              </View>

              {/* Like button */}
              <View
                style={{
                  position: "absolute",
                  right: s(24),
                  bottom: s(83),
                  width: s(72),
                  height: s(72),
                  borderRadius: s(36),
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#812BFF",
                  borderWidth: s(2),
                  borderColor: "#C86AFF",
                }}
              >
                <Ionicons
                  name="heart"
                  size={s(37)}
                  color="#FFFFFF"
                />
              </View>
            </View>

            {/* ================= RIGHT PROFILE ================= */}

            <View
              style={{
                position: "absolute",
                right: s(48),
                top: s(175),
                width: s(390),
                height: s(535),
                borderRadius: s(28),
                backgroundColor: "#171717",
                borderWidth: s(3),
                borderColor: "#55545D",
                transform: [{ rotate: "9deg" }],
                overflow: "hidden",
              }}
            >
              <Image
                source={newGirl}
                style={{
                  width: "100%",
                  height: s(335),
                  resizeMode: "cover",
                }}
              />

              {/* Online */}
              <View
                style={{
                  position: "absolute",
                  top: s(25),
                  left: s(20),
                  height: s(45),
                  paddingHorizontal: s(17),
                  borderRadius: s(23),
                  backgroundColor: "rgba(20,20,20,0.82)",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: s(14),
                    height: s(14),
                    borderRadius: s(7),
                    backgroundColor: "#00E879",
                    marginRight: s(10),
                  }}
                />

                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: s(19),
                    fontWeight: "600",
                  }}
                >
                  Online
                </Text>
              </View>

              {/* Heart */}
              <View
                style={{
                  position: "absolute",
                  top: s(18),
                  right: s(17),
                  width: s(58),
                  height: s(58),
                  borderRadius: s(18),
                  backgroundColor: "rgba(35,30,28,0.72)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="heart-outline"
                  size={s(34)}
                  color="#FFFFFF"
                />
              </View>

              <View
                style={{
                  flex: 1,
                  paddingHorizontal: s(22),
                  paddingTop: s(17),
                  backgroundColor: "#171717",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: s(29),
                    fontWeight: "800",
                  }}
                >
                  Meera, 25
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: s(7),
                  }}
                >
                  <Ionicons
                    name="location"
                    size={s(20)}
                    color="#BFC4D0"
                  />

                  <Text
                    style={{
                      color: "#C1C5D0",
                      fontSize: s(18),
                      marginLeft: s(5),
                    }}
                  >
                    London, UK
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: s(14),
                    gap: s(10),
                  }}
                >
                  {["Art", "Food", "Movies"].map(
                    (item) => (
                      <View
                        key={item}
                        style={{
                          borderWidth: s(1.5),
                          borderColor: "#7332A8",
                          borderRadius: s(20),
                          paddingHorizontal: s(14),
                          paddingVertical: s(8),
                        }}
                      >
                        <Text
                          style={{
                            color: "#D4D5DD",
                            fontSize: s(15),
                          }}
                        >
                          {item}
                        </Text>
                      </View>
                    )
                  )}
                </View>
              </View>

              {/* Like */}
              <View
                style={{
                  position: "absolute",
                  right: s(24),
                  bottom: s(83),
                  width: s(72),
                  height: s(72),
                  borderRadius: s(36),
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#812BFF",
                  borderWidth: s(2),
                  borderColor: "#C86AFF",
                }}
              >
                <Ionicons
                  name="heart"
                  size={s(37)}
                  color="#FFFFFF"
                />
              </View>
            </View>

            {/* Airplane */}
            <View
              style={{
                position: "absolute",
                left: s(44),
                bottom: s(175),
                transform: [{ rotate: "-25deg" }],
              }}
            >
              <MaterialCommunityIcons
                name="airplane"
                size={s(57)}
                color="#CA4AFF"
              />
            </View>
          </View>

          {/* ================= CONNECTION BAR ================= */}

          <View
            style={{
              marginHorizontal: s(210),
              marginTop: s(-65),
              height: s(88),
              borderRadius: s(45),
              borderWidth: s(2),
              borderColor: "#33204D",
              backgroundColor: "#211B2D",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: s(18),
            }}
          >
            {/* Small profile circles */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={smallGirl}
                style={{
                  width: s(57),
                  height: s(57),
                  borderRadius: s(30),
                }}
              />

              <Image
                source={smallBoy}
                style={{
                  width: s(57),
                  height: s(57),
                  borderRadius: s(30),
                  marginLeft: -s(12),
                }}
              />

              
            </View>

            <Text
              style={{
                flex: 1,
                color: "#F2F2F5",
                fontSize: s(18),
                lineHeight: s(25),
                marginLeft: s(17),
              }}
            >
              People from across cities
              {"\n"}
              are waiting to connect
            </Text>

            <Ionicons
              name="chevron-forward"
              size={s(36)}
              color="#C445FF"
            />
          </View>

          {/* ================= FEATURES ================= */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: s(80),
              marginTop: s(25),
            }}
          >
            {/* New Profiles */}
            <View
              style={{
                width: s(230),
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: s(96),
                  height: s(96),
                  borderRadius: s(48),
                  backgroundColor: "#24212A",
                  borderWidth: s(1.5),
                  borderColor: "#3B3047",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="location"
                  size={s(52)}
                  color="#BD48FF"
                />
              </View>

              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: s(23),
                  fontWeight: "700",
                  marginTop: s(17),
                }}
              >
                New Profiles
              </Text>

              <Text
                style={{
                  color: "#BFC5D3",
                  fontSize: s(19),
                  lineHeight: s(28),
                  textAlign: "center",
                  marginTop: s(8),
                }}
              >
                Discover fresh
                {"\n"}
                people every day
              </Text>
            </View>

            {/* Online Now */}
            <View
              style={{
                width: s(230),
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: s(96),
                  height: s(96),
                  borderRadius: s(48),
                  backgroundColor: "#24212A",
                  borderWidth: s(1.5),
                  borderColor: "#3B3047",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="web"
                  size={s(52)}
                  color="#BD48FF"
                />
              </View>

              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: s(23),
                  fontWeight: "700",
                  marginTop: s(17),
                }}
              >
                Online Now
              </Text>

              <Text
                style={{
                  color: "#BFC5D3",
                  fontSize: s(19),
                  lineHeight: s(28),
                  textAlign: "center",
                  marginTop: s(8),
                }}
              >
                Connect with
                {"\n"}
                people who are active
              </Text>
            </View>

            {/* Beyond Your City */}
            <View
              style={{
                width: s(230),
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: s(96),
                  height: s(96),
                  borderRadius: s(48),
                  backgroundColor: "#24212A",
                  borderWidth: s(1.5),
                  borderColor: "#3B3047",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="airplane"
                  size={s(52)}
                  color="#BD48FF"
                />
              </View>

              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: s(23),
                  fontWeight: "700",
                  marginTop: s(17),
                }}
              >
                Beyond Your City
              </Text>

              <Text
                style={{
                  color: "#BFC5D3",
                  fontSize: s(19),
                  lineHeight: s(28),
                  textAlign: "center",
                  marginTop: s(8),
                }}
              >
                Explore profiles
                {"\n"}
                from other cities
              </Text>
            </View>
          </View>

          {/* ================= BOTTOM ================= */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: s(75),
              marginTop: s(55),
            }}
          >
            {/* Dots */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: s(23),
              }}
            >
              <View
                style={{
                  width: s(24),
                  height: s(24),
                  borderRadius: s(12),
                  backgroundColor: "#55565D",
                }}
              />

              <LinearGradient
                colors={["#D448FF", "#963DFF"]}
                style={{
                  width: s(24),
                  height: s(24),
                  borderRadius: s(12),
                }}
              />

              <View
                style={{
                  width: s(24),
                  height: s(24),
                  borderRadius: s(12),
                  backgroundColor: "#55565D",
                }}
              />
            </View>

            {/* Next */}
            <Pressable
              onPress={() =>navigation.navigate("ConnectYourWayPage")}
              style={{
                width: s(145),
                height: s(145),
                borderRadius: s(73),
                overflow: "hidden",
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}