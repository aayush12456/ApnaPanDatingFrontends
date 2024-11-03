import {Text,View,TouchableOpacity,Image} from 'react-native'
import { Education } from '../../utils/EditPersonalInfo';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updatePersonalDataAsync } from '../../Redux/Slice/updatePersonalDataSlice/updatePersonalDataSlice';
import rightTik from '../../../assets/myProfileIcons/rightTik.png'
const EditEducation=({navigation})=>{
    const dispatch=useDispatch()
    const completeLoginObj=useSelector((state)=>state.loginData.loginData.completeLoginData)
    const updatePersonalInfoSelector=useSelector((state)=>state?.updatePersonalData?.updatePersonalData?.updateData)
    console.log('update personal relation obj',updatePersonalInfoSelector)
    const selectEducationHandler=(education)=>{
        const updateEducationObj={
            id:completeLoginObj._id,
            education:education
        }
  console.log('select education',education)
  dispatch(updatePersonalDataAsync(updateEducationObj))
  navigation.navigate('EditProfilePage')
    }
return(
    <>
  <View style={{paddingTop:8,paddingLeft:8}}>
        {
                Education.map((education, index) => {
                    return (
                        <>
                        <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                        <TouchableOpacity  onPress={()=>selectEducationHandler(education.education)} >
                         <Text key={index} style={{paddingTop:22,paddingLeft:8,fontSize:15,color:`${updatePersonalInfoSelector?.education==education.education?'blue':'black'}`}}>{education.education}</Text>
                         </TouchableOpacity>
                       {updatePersonalInfoSelector.education===education.education?  <Image source={rightTik} style={{width:12,height:12,marginTop:24,marginRight:30}} />:null}
                        </View>
                        </>
                    );
                })
            }
        </View>
    </>
)
}
export default EditEducation