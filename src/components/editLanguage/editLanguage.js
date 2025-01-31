import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Language } from '../../utils/EditPersonalInfo';
import { updatePersonalDataAsync } from '../../Redux/Slice/updatePersonalDataSlice/updatePersonalDataSlice';
import { useEffect,useState } from "react";

const EditLanguage = ({ navigation,completeObj }) => {
  const [updateLanguage,setUpdateLanguage]=useState({})
  const dispatch = useDispatch();
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const completeLoginObj = useSelector((state) => state.loginData.loginData.completeLoginData);
  const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
  const completeLoginObjData=completeLoginObj?completeLoginObj:completeLoginObjForOtp
  const updatePersonalInfoSelector = useSelector((state) => state?.updatePersonalData?.updatePersonalData?.updateData);

  console.log('update personal language obj', updatePersonalInfoSelector);

  const selectLanguageHandler = (language) => {
    setSelectedLanguages((prevLanguages) => {
      if (prevLanguages.includes(language)) {
        return prevLanguages.filter((lang) => lang !== language);
      } else {
        return [...prevLanguages, language];
      }
    });
  };
console.log('langusage array in language',selectedLanguages)
  const submitEditLanguage = () => {
    const languageString = selectedLanguages.join(', ');
    const updateLanguageObj = {
      id: completeLoginObjData?._id,
      language: languageString, 
    };

    console.log('language obj in submit', updateLanguageObj);
    dispatch(updatePersonalDataAsync(updateLanguageObj));
    navigation.navigate('EditProfilePage');
  };
  useEffect(()=>{
    if(updatePersonalInfoSelector){
       setUpdateLanguage(updatePersonalInfoSelector)
    }
    else{
       setUpdateLanguage(completeLoginObjData)
    }
   },[updatePersonalInfoSelector,completeLoginObjData])
  return (
    <>
      <ScrollView>
        <View style={{ paddingTop: 8, paddingLeft: 8 }}>
          {Language.map((languageItem, index) => (
            <View key={index}>
              <TouchableOpacity onPress={() => selectLanguageHandler(languageItem.language)}>
                <Text style={{ paddingTop: 22, paddingLeft: 8, fontSize: 15,   color: `${updateLanguage?.language?.split(', ').includes(languageItem.language) ? 'rgba(0, 150, 255, 1)' : `${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`}`}}>
                  {languageItem.language}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
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
            borderRadius: 11,
            marginBottom:20
          }}
          onPress={submitEditLanguage}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16 }}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EditLanguage;
