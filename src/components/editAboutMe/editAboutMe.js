import { View,TouchableOpacity,Text} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { updatePersonalDataAsync } from '../../Redux/Slice/updatePersonalDataSlice/updatePersonalDataSlice';
const EditAboutMe = ({navigation}) => {
    const dispatch = useDispatch();
    const completeLoginObj = useSelector((state) => state.loginData.loginData.completeLoginData);
    const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
    const completeLoginObjData=completeLoginObj?completeLoginObj:completeLoginObjForOtp
    const updatePersonalInfoSelector = useSelector((state) => state?.updatePersonalData?.updatePersonalData?.updateData);
    const [aboutUser, setAboutUser] = useState(completeLoginObjData.aboutUser || '');
    useEffect(() => {
if(updatePersonalInfoSelector?.aboutUser){
  setAboutUser(updatePersonalInfoSelector?.aboutUser);
}
else{
  setAboutUser(completeLoginObjData?.aboutUser || '')
}

    }, [completeLoginObjData?.aboutUser,updatePersonalInfoSelector?.aboutUser]);

    const handleAboutUserChange = (text) => {
        setAboutUser(text);
    };
    const submitEditBio=()=>{
      const updatePersonalBioObj={
        id:completeLoginObjData?._id,
        aboutUser:aboutUser
      }
      dispatch(updatePersonalDataAsync(updatePersonalBioObj))
      navigation.navigate('EditProfilePage')
    }
    return (
      <>
       <View>
            <TextInput
                style={{ marginLeft: 12, marginRight: 20, marginTop: 24, height: 160, paddingTop: 20, borderWidth: 0, textAlignVertical: 'top' }}
                mode="outlined"
                multiline
                selectionColor="transparent"
                value={aboutUser}
                onChangeText={handleAboutUserChange}
            />
        </View>

        <View style={{ width: '100%', overflow: 'hidden' }}>
            <TouchableOpacity
              style={{
                height: 50,
                backgroundColor: 'rgba(83, 148, 228, 1)',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                marginLeft: 12,
                marginRight: 20,
                borderRadius: 11
              }}
              onPress={submitEditBio}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16 }}>SAVE</Text>
            </TouchableOpacity>
          </View>
      </>
    );
};

export default EditAboutMe;
