import { View,Text,Pressable,Image } from "react-native"
import rightTik from '../../../assets/myProfileIcons/rightTik.png'
import {useDispatch,useSelector} from 'react-redux'
import { appearModeAsync } from "../../Redux/Slice/appearModeSlice/appearModeSlice"
import {useEffect,useState} from 'react'
const Appearance=()=>{
    const [completeObj,setCompleteObj]=useState({})
    const dispatch=useDispatch()
    const completeLoginObj = useSelector(
        (state) => state.loginData.loginData.completeLoginData
      );
      const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
      
      const completeLoginObjData=completeLoginObj || completeLoginObjForOtp || {}
      const appearModeSelector=useSelector((state)=>state?.appearMode?.appearModeData?.loginUpdateUser)
      console.log('appear mode data is',appearModeSelector?.appearanceMode)
    const appearArray=[
        {id:1,name:'Dark Mode'},
        {id:2,name:'Light Mode'}
    ]
    const appearHandler=(item)=>{
        const appearObj={
            id:completeLoginObjData?._id,
            mode:item.name
        }
        dispatch(appearModeAsync(appearObj))
console.log('item',item)
    }
    useEffect(()=>{
    if(appearModeSelector){
    setCompleteObj(appearModeSelector)
    }
    else{
        setCompleteObj(completeLoginObjData)
    }
    },[appearModeSelector,completeLoginObjData])
return (
    <>
    <View style={{backgroundColor: `${completeObj?.appearanceMode==='Dark Mode'?'#343434':'#dcdcdc'}`,width:'90%',marginLeft:20,marginTop:20}} >
    {
        appearArray.map(item=>{
            return (
                <View key={item.name} style={{flexDirection:"row",justifyContent:'space-between'}}>
                <Pressable  onPress={()=>appearHandler(item)}>
                <Text style={{paddingTop:10,paddingBottom:12,paddingLeft:10,color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>{item?.name}</Text>
                </Pressable>
                {completeObj?.appearanceMode===item?.name?<Image source={rightTik} style={{width: 12, height: 12, marginTop: 14, marginRight: 30}}/>:null}
                </View>
            )
        })
    }
    </View>
    <Text style={{textAlign:"center",paddingTop:20,color:`${completeObj?.appearanceMode==='Dark Mode'?'white':''}`}}>using the system setting will automatically adjust ApnaPan appearance to match your device system settings.</Text>
    </>
)
}
export default Appearance