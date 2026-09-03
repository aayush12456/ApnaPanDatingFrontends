import React from "react"
import { View,ScrollView,KeyboardAvoidingView, Platform,Text,ActivityIndicator} from "react-native"
import { TextInput,Button } from 'react-native-paper';
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { credentialData, credentialsAsync } from "../../Redux/Slice/addCredSlice/addCredSlice";
import { getCredAsync } from "../../Redux/Slice/getCredSlice/getCredSlice";
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

const Credentials=()=>{
    const dispatch=useDispatch()
    const id=1
    const [appId,setAppId]=useState('')
    const [appSign,setAppSign]=useState('')
    const [apiKey,setApiKey]=useState('')
    const [loading,setLoading]=useState(false)
    
    const submitCredHandler=async()=>{
        const credObj={
            id:getCredSelector?._id||'',
            appId:appId,
            appSign:appSign,
            apiKey:apiKey
        }
        setLoading(true);

try {
  const response = await dispatch(
    credentialsAsync(credObj)
  ).unwrap();

  setLoading(false);

} catch (error) {

  setLoading(false);

}
    }
    const credSelector=useSelector((state)=>state.credential.credObj.creds)
    console.log('cred select',credSelector)

    useEffect(()=>{
  if(id || credSelector?._id){
    dispatch(getCredAsync(id))
  }
    },[dispatch,id,credSelector?._id])

    const getCredSelector=useSelector((state)=>state.getCred.getCredObj.creds)
    console.log('get cred select',getCredSelector)

    useEffect(() => 
    { 
      if (getCredSelector) {
        setAppId(getCredSelector.zegoAppId || ""); 
        setAppSign(getCredSelector.zegoAppSign || ""); 
        setApiKey(getCredSelector.exprtChatApiKey || "");
       } 
      }, [getCredSelector]);

      const isExistingCred = getCredSelector && getCredSelector?._id;

      useEffect(() => {
        if (
          credSelector?.msg === "save cred details successfully" ||
          credSelector?.msg === "cred details updated successfully"
        ) {
          setLoading(false)
          // ✅ Toast show
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: `${credSelector?.msg === "save cred details successfully"?'creds added successfully':'creds updated successfully' }`,
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
          const timer = setTimeout(() => {
            dispatch(credentialData());
          }, 3000);
      
          return () => clearTimeout(timer);
        }
      }, [credSelector, dispatch]);
return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1, height:'100%' }}
keyboardShouldPersistTaps="handled">
    <View style={{marginTop:40}}>
  <View style={{ paddingHorizontal:16 }}>
        <TextInput
          label="Zego App Id"
          mode="outlined"

          value={appId}
          onChangeText={(text)=>setAppId(text)}
     
        />
      </View>
      <View style={{ paddingHorizontal:16,marginTop:20 }}>
        <TextInput
          label="Zego App Sign"
          mode="outlined"

          value={appSign}
          onChangeText={(text)=>setAppSign(text)}
     
        />
      </View>

      <View style={{ paddingHorizontal:16,marginTop:20 }}>
        <TextInput
          label="Expert Chat Api Key"
          mode="outlined"

          value={apiKey}
          onChangeText={(text)=>setApiKey(text)}
        />
      </View>

      <View style={{ width: '100%', overflow: 'hidden' }}>
<Button
  mode="contained"
//   disabled={loading}
  style={{
    height: 50,
    borderRadius: 11,
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 12,
    fontSize: 16,
    marginRight: 20,
    backgroundColor: "#007BFF", // force color
    // opacity:loading ? 0.8 : 1, // disabled feel
  }}
  contentStyle={{ height: 50 }}
  onPress={submitCredHandler}
>
{loading ? ( <ActivityIndicator size="small" color="#ffffff" /> ) : ( isExistingCred ? "Update" : "Submit" )}
</Button>

      </View>
      </View>
</ScrollView>
    </>
)
}
export default Credentials