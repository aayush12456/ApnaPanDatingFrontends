import Header from "../../components/common/header/header";
import { BlurView } from "expo-blur";
import money from "../../../assets/premiumIcons/money.gif";
import { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const HeaderPage = ({ route }) => {
  const { paymentData } = route.params || {};

  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  useEffect(() => {
    if (paymentData?.razorpay_payment_id) {
      setShowPaymentSuccess(true);

      const timer = setTimeout(() => {
        setShowPaymentSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [paymentData?.razorpay_payment_id]);

  return (
    <View style={{ flex: 1 }}>
      <Header />

      {showPaymentSuccess && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            zIndex: 99999,
          }}
        >
          {/* ========================= */}
          {/* BACKGROUND BLUR */}
          {/* ========================= */}

          <BlurView
            intensity={50}
            tint="dark"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />

          {/* Dark overlay */}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(9, 1, 22, 0.55)",
            }}
          />

          {/* ========================= */}
          {/* CENTER MODAL */}
          {/* ========================= */}

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LinearGradient
              colors={[
                "#160D24",
                "#21102F",
                "#160D24",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: "78%",

                borderRadius: 24,

                paddingVertical: 28,
                paddingHorizontal: 20,

                alignItems: "center",
                justifyContent: "center",

                // Purple border only
                borderWidth: 1.3,
                borderColor: "#6D21FF",

                // ❌ No shadow
                // ❌ No elevation
              }}
            >
              {/* ========================= */}
              {/* MONEY IMAGE */}
              {/* ========================= */}

              <Image
                source={money}
                resizeMode="contain"
                style={{
                  width: 90,
                  height: 90,
                }}
              />

              {/* ========================= */}
              {/* SUCCESS TEXT */}
              {/* ========================= */}

              <Text
                style={{
                  marginTop: 15,

                  fontSize: 18,

                  fontWeight: "700",

                  color: "#20C997",

                  textAlign: "center",

                  lineHeight: 25,
                }}
              >
                Subscription Activated{"\n"}
                Successfully
              </Text>
            </LinearGradient>
          </View>
        </View>
      )}
    </View>
  );
};

export default HeaderPage;