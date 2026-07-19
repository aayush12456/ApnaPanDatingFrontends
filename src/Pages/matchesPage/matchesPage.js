import Matches from "../../components/matches/matches"
import {View} from 'react-native'
import { useState } from "react";

const MatchesPage=({loginId,finalCompleteObj,onlineUserArray})=>{

    console.log('logins is id',loginId)
   
    const completeLoginObjData=finalCompleteObj || {}
   
return (
    <>
    <View style={{backgroundColor:`black`,height:"100%"}}>
    <Matches completeObj={completeLoginObjData} loginId={loginId} onlineUsers={onlineUserArray}/>
    </View>
    </>
)
}
export default MatchesPage