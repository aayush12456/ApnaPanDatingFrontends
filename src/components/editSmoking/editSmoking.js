import { Text,View,TouchableOpacity,Image} from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import rightTik from '../../../assets/myProfileIcons/rightTik.png'
import { Smoking } from '../../utils/EditPersonalInfo';
import { updatePersonalDataAsync } from '../../Redux/Slice/updatePersonalDataSlice/updatePersonalDataSlice';
import { useEffect,useState } from "react";
const EditSmoking=({navigation})=>{
    const [updateSmoking,setUpdateSmoking]=useState({})
    const dispatch=useDispatch()
    const completeLoginObj=useSelector((state)=>state.loginData.loginData.completeLoginData)
    const updatePersonalInfoSelector=useSelector((state)=>state?.updatePersonalData?.updatePersonalData?.updateData)
    console.log('update personal drinking obj',updatePersonalInfoSelector)
    
    const selectSmokingHandler=(smoking)=>{
        const updateSmokingObj={
            id:completeLoginObj._id,
            smoking:smoking
        }
  console.log('select smoking',smoking)
  dispatch(updatePersonalDataAsync(updateSmokingObj))
  navigation.navigate('EditProfilePage')
    }
    useEffect(()=>{
        if(updatePersonalInfoSelector){
           setUpdateSmoking(updatePersonalInfoSelector)
        }
        else{
           setUpdateSmoking(completeLoginObj)
        }
       },[updatePersonalInfoSelector,completeLoginObj])
return (
    <>
     <View style={{paddingTop:8,paddingLeft:8}}>
        {
                Smoking.map((smoking, index) => {
                    return (
                        <>
                          <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                          <TouchableOpacity onPress={()=>selectSmokingHandler(smoking.smoking)} >
                         <Text key={index} style={{paddingTop:22,paddingLeft:8,fontSize:15,color:`${updateSmoking?.smoking===smoking?.smoking?'rgba(0, 150, 255, 1)':'black'}`}}>{smoking.smoking}</Text>
                         </TouchableOpacity>
                         {updateSmoking?.smoking===smoking?.smoking?  <Image source={rightTik} style={{width:12,height:12,marginTop:24,marginRight:30}} />:null}
                          </View>
                        </>
                    );
                })
            }
        </View>
    </>
)
}
export default EditSmoking