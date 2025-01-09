import React, { useEffect } from 'react';
import { ALERT_TYPE,  Dialog } from 'react-native-alert-notification';
import { View,Text,Image } from 'react-native';
import sorryEmoji from '../../../assets/AllIcons/sorryEmoji.png'
const Notification=({dialog})=>{
useEffect(()=>{
if(dialog){
    Dialog.show({
        type: ALERT_TYPE[dialog.type],
        textBody:(
            <View>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
            <Image source={sorryEmoji} style={{width:100,height:80}}/>
                </View>
            <Text style={{paddingTop:7,textAlign:'center'}}>{dialog.textBody}</Text>
            </View>
        ),
        button:'close'
      });
}
},[dialog])
return (
    <>
    </>
)
}
export default Notification