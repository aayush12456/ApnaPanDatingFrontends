import { View,ScrollView,KeyboardAvoidingView, Platform,Text,ActivityIndicator} from "react-native"
import { TextInput,Button } from 'react-native-paper';
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Formik } from 'formik';
import { contactUs } from "../../schemas";
import { contactUsAsync, contactUsData } from "../../Redux/Slice/contactUsSlice/contactUsSlice";
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

const ContactUs=({completeLoginObj})=>{
    const dispatch=useDispatch()
  const [loading, setLoading] = useState(false);
  const [formReset, setFormReset] = useState(null);
  const contactSelector=useSelector((state)=>state.contactUs.contactUsObj)
// console.log('contact us data',completeLoginObj)
// console.log('test contact select',contactSelector)

useEffect(() => {
  if (contactSelector?.mssg === "Email sent successfully") {

    setLoading(false)
    // ✅ Toast show
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: `Email sent successfully`,
      autoClose: 3000,
      containerStyle: {
        borderRadius: 16,
        marginHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: "#1F2937",
      },
      titleStyle: {
        fontSize: 15,
        fontWeight: "600",
      },
    });
    if (formReset) {
      formReset();
    }
    // ✅ 3 sec baad state reset
    setTimeout(() => {
      dispatch(contactUsData());
    }, 3000);
  }
}, [contactSelector.mssg]);
return (
    <>
        <Formik 
     initialValues={{
    name:'',
    phoneNumber:'',
    message:''
     }}
     validationSchema={contactUs}
     onSubmit={async(values, { resetForm }) => {
      setLoading(true);
      setFormReset(() => resetForm);
      const contactUsData={
        name:values.name,
        phoneNumber:values.phoneNumber,
        message:values.message,
        email:completeLoginObj.email,
     }
    //  console.log('contact us data detail',contactUsData)
     dispatch(contactUsAsync(contactUsData))
    }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched })=>(
            <>
             <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0} // adjust according to header height
    >
            <ScrollView contentContainerStyle={{ flexGrow: 1,  }}
keyboardShouldPersistTaps="handled">
            <View style={{marginTop:40}}>
  <View style={{ paddingHorizontal:16 }}>
        <TextInput
          label="Your Name"
          mode="outlined"

          value={values.name}
          onChangeText={handleChange("name")}
          onBlur={handleBlur("name")}
        />
        {touched.name && errors.name && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {errors.name}
                  </Text>
                )}
      </View>
      <View style={{ paddingHorizontal:16,marginTop:12 }}>
        <TextInput
          label="Your Mobile Number"
          mode="outlined"
          keyboardType="numeric"
          value={values.phoneNumber}
          onChangeText={handleChange("phoneNumber")}
          onBlur={handleBlur("phoneNumber")}
        />
        {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {errors.phoneNumber}
                  </Text>
                )}
      </View>

      <View style={{ paddingHorizontal:16,marginTop:12 }}>
      <TextInput
  label="Message"
  mode="outlined"
  multiline
  numberOfLines={5}
  style={{
    height: 120,
    marginTop: 10,
    textAlignVertical: 'top'
  }}
  value={values.message}   // ✅ FIXED
  onChangeText={handleChange("message")}
  onBlur={handleBlur("message")}
/>
{touched.message && errors.message && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {errors.message}
                  </Text>
                )}
      </View>
     <View
  style={{
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 12,
  }}
>
  <Button
    mode="contained"
    disabled={loading}
    style={{
      height: 50,
      borderRadius: 11,
      backgroundColor: "#6D21FF",
    }}
    contentStyle={{
      height: 50,
    }}
    onPress={handleSubmit}
  >
    {loading ? "" : "Send Message"}
  </Button>

  {loading && (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: 12,
        right: 12,
        top: 0,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator
        size="small"
        color="#FFFFFF"
        style={{ marginRight: 8 }}
      />

      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 15,
          fontWeight: "600",
        }}
      >
        Sending...
      </Text>
    </View>
  )}
</View>
         </View>
            </ScrollView>
         
            </KeyboardAvoidingView>

            </>
        )}
      </Formik>
    </>
)
}
export default ContactUs