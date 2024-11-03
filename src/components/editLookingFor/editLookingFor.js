import { Text,View,TouchableOpacity,Image} from 'react-native';
import { lookingFor } from '../../utils/EditPersonalInfo';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updatePersonalDataAsync } from '../../Redux/Slice/updatePersonalDataSlice/updatePersonalDataSlice';
import rightTik from '../../../assets/myProfileIcons/rightTik.png'
const EditLookingFor=({navigation})=>{
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
    
return (
    <>
    <View style={{paddingTop:8,paddingLeft:8}}>
    {
lookingFor.map((looking,index)=>{
    return (
        <>
         <View style={{flexDirection:"row",justifyContent:'space-between'}}>
         <TouchableOpacity onPress={()=>selectLookingForHandler(looking.looking)}>
                         <Text key={index} style={{paddingTop:22,paddingLeft:8,fontSize:15,color:`${ updatePersonalInfoSelector?.looking===looking.looking?'blue':'black'}`}}>{looking.looking}</Text>
                         </TouchableOpacity>
                         {updatePersonalInfoSelector.looking===looking.looking?  <Image source={rightTik} style={{width:12,height:12,marginTop:24,marginRight:30}} />:null}
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