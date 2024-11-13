import { relationship } from "../../utils/EditPersonalInfo";
import { Text,View,TouchableOpacity,Image} from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updatePersonalDataAsync } from "../../Redux/Slice/updatePersonalDataSlice/updatePersonalDataSlice";
import rightTik from '../../../assets/myProfileIcons/rightTik.png'
import { useEffect,useState } from "react";
const EditRelation = ({navigation}) => {
    const [updateRelation,setUpdateRelation]=useState({})
    const dispatch=useDispatch()
    const completeLoginObj=useSelector((state)=>state.loginData.loginData.completeLoginData)
    const updatePersonalInfoSelector=useSelector((state)=>state?.updatePersonalData?.updatePersonalData?.updateData)
    console.log('update personal relation obj',updatePersonalInfoSelector)
    const selectRelationHandler=(relation)=>{
        const updateRelationObj={
            id:completeLoginObj._id,
            relationship:relation
        }
  console.log('select relation',relation)
  dispatch(updatePersonalDataAsync(updateRelationObj))
  navigation.navigate('EditProfilePage')
    }

    useEffect(()=>{
     if(updatePersonalInfoSelector){
        setUpdateRelation(updatePersonalInfoSelector)
     }
     else{
        setUpdateRelation(completeLoginObj)
     }
    },[updatePersonalInfoSelector,completeLoginObj])
    return (
        <>
       <View style={{paddingTop:8, paddingLeft:8}}>
  {
    relationship.map((relation) => {
      return (
        <View key={relation.relation} style={{flexDirection:"row", justifyContent:'space-between'}}>
          <TouchableOpacity onPress={() => selectRelationHandler(relation.relation)}>
            <Text style={{
              paddingTop: 22,
              paddingLeft: 8,
              fontSize: 15,
              color: `${updateRelation?.relationship === relation.relation ? 'rgba(0, 150, 255, 1)' : 'black'}`}}>
              {relation.relation}
            </Text>
          </TouchableOpacity>
          {updateRelation?.relationship === relation.relation ? 
            <Image source={rightTik} style={{width: 12, height: 12, marginTop: 24, marginRight: 30}} /> : null}
        </View>
      );
    })
  }
</View>

       
        </>
    );
};

export default EditRelation;
