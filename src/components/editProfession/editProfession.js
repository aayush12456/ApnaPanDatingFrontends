import { Text,View,TouchableOpacity,Image,ScrollView} from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { profession } from '../../utils/EditPersonalInfo';
import rightTik from '../../../assets/myProfileIcons/rightTik.png'
import { updatePersonalDataAsync } from '../../Redux/Slice/updatePersonalDataSlice/updatePersonalDataSlice';
import { useEffect,useState } from "react";
const EditProfession=({navigation})=>{
    const [updateProfession,setUpdateProfession]=useState({})
    const dispatch=useDispatch()
    const completeLoginObj=useSelector((state)=>state.loginData.loginData.completeLoginData)
    const updatePersonalInfoSelector=useSelector((state)=>state?.updatePersonalData?.updatePersonalData?.updateData)
    console.log('update personal profession obj',updatePersonalInfoSelector)
    const selectProfessionHandler=(profession)=>{
        const updateProfessionObj={
            id:completeLoginObj._id,
            profession:profession
        }
  console.log('select profession',profession)
  dispatch(updatePersonalDataAsync(updateProfessionObj))
  navigation.navigate('EditProfilePage')
    }

    useEffect(()=>{
        if(updatePersonalInfoSelector){
           setUpdateProfession(updatePersonalInfoSelector)
        }
        else{
           setUpdateProfession(completeLoginObj)
        }
       },[updatePersonalInfoSelector,completeLoginObj])
return (
    <>
    <ScrollView>
    <View style={{paddingTop:8,paddingLeft:8}}>
        {
                profession.map((profession, index) => {
                    console.log('profess is',profession)
                    return (
                        <>
                          <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                          <TouchableOpacity onPress={()=>selectProfessionHandler(profession.profession)} >
                         <Text key={index} style={{paddingTop:22,paddingLeft:8,fontSize:15,color:`${updateProfession?.profession===profession?.profession?'rgba(0, 150, 255, 1)':'black'}`}}>{profession.profession}</Text>
                         </TouchableOpacity>
                         {updateProfession?.profession===profession?.profession?  <Image source={rightTik} style={{width:12,height:12,marginTop:24,marginRight:30}} />:null}
                          </View>
                        </>
                    );
                })
            }
        </View>
    </ScrollView>
    
    </>
)
}
export default EditProfession