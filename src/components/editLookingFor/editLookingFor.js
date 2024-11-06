import { Text,View,TouchableOpacity,Image} from 'react-native';
import { lookingFor } from '../../utils/EditPersonalInfo';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updatePersonalDataAsync } from '../../Redux/Slice/updatePersonalDataSlice/updatePersonalDataSlice';
import rightTik from '../../../assets/myProfileIcons/rightTik.png'
import { useEffect,useState } from "react";
const EditLookingFor=({navigation})=>{
    const [updateLooking,setUpdateLooking]=useState({})
    const dispatch=useDispatch()
    const completeLoginObj=useSelector((state)=>state.loginData.loginData.completeLoginData)
    const updatePersonalInfoSelector=useSelector((state)=>state?.updatePersonalData?.updatePersonalData?.updateData)
    const selectLookingForHandler=(looking)=>{
        const updateLookingForObj={
            id:completeLoginObj._id,
            looking:looking
        }
  console.log('select looking',looking)
  dispatch(updatePersonalDataAsync(updateLookingForObj))
  navigation.navigate('EditProfilePage')
    }
    useEffect(()=>{
        if(updatePersonalInfoSelector){
           setUpdateLooking(updatePersonalInfoSelector)
        }
        else{
           setUpdateLooking(completeLoginObj)
        }
       },[updatePersonalInfoSelector,completeLoginObj])
return (
    <>
    <View style={{paddingTop:8,paddingLeft:8}}>
    {
lookingFor.map((looking,index)=>{
    return (
        <>
         <View style={{flexDirection:"row",justifyContent:'space-between'}}>
         <TouchableOpacity onPress={()=>selectLookingForHandler(looking.looking)}>
                         <Text key={index} style={{paddingTop:22,paddingLeft:8,fontSize:15,color:`${ updateLooking?.looking===looking.looking?'rgba(0, 150, 255, 1)':'black'}`}}>{looking.looking}</Text>
                         </TouchableOpacity>
                         {updateLooking?.looking===looking.looking?  <Image source={rightTik} style={{width:12,height:12,marginTop:24,marginRight:30}} />:null}
         </View>
        </>
    )
})
}
    </View>
    </>
)
}
export default EditLookingFor