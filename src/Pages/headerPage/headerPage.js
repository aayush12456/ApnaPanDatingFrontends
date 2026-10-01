import Header from "../../components/common/header/header"
import { BlurView } from "expo-blur";
import money from '../../../assets/premiumIcons/money.gif'
import { useEffect,useState } from "react";
import { View,Image,Text } from "react-native";
const HeaderPage=({route})=>{
    const { paymentData} = route.params || {};
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
    useEffect(() => {
        if (paymentData?.razorpay_payment_id) {
          setShowPaymentSuccess(true);
      
          const timer = setTimeout(() => {
            setShowPaymentSuccess(false);
          }, 3000); // ⏱️ 3 seconds
      
          return () => clearTimeout(timer);
        }
      }, [paymentData?.razorpay_payment_id]);
return (
    <>
    <Header/>
    {showPaymentSuccess && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
            }}
          >
            {/* 🔥 BLUR BACKGROUND */}
            <BlurView
              intensity={50}          // blur strength (30–80 best)
              tint="dark"             // "light" | "dark" | "default"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
        
            {/* 🔥 CENTER BOX */}
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  width: "85%",
                  borderRadius: 20,
                  padding: 25,
                  alignItems: "center",
                  elevation: 10,
                }}
              >
                <Image source={money} style={{ width: 90, height: 90 }} />
        
                <Text
                  style={{
                    marginTop: 15,
                    fontSize: 17,
                    fontWeight: "700",
                    color: "#0DB57E",
                    textAlign: "center",
                  }}
                >
                  Subscription Activated Successfully
                </Text>
              </View>
            </View>
          </View>
        )}
    </>
)
}
export default HeaderPage