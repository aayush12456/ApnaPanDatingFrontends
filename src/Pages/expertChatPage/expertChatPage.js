import ExpertChat from "../../components/expertChat/expertChat"
import { View } from "react-native";
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
const ExpertChatPage=({route})=>{
    const { formData } = route?.params;
  console.log('form data expert',formData)

  
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <ExpertChat obj={formData} />
    </View>
    </>
)
}
export default ExpertChatPage