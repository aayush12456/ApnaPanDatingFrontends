import { Text, View, Image,ScrollView,StatusBar } from "react-native"
import { useWindowDimensions } from "react-native";
import { Button } from "react-native-paper";
import { Dropdown } from 'react-native-paper-dropdown';
import { Drinking, Eating, Smoking, education,relationshipStatus,Interest,Language,lookingFor,zodiacSign } from "../../utils/personalInfo";
import { profession } from "../../utils/personalInfo";
import React, { useState } from "react";
import { Formik } from 'formik';
import { additonalInformationSchema } from "../../schemas";
import bag from '../../../assets/signUpFormIcon/bag.png'
import graduate from '../../../assets/signUpFormIcon/graduate.png'
import glass from '../../../assets/signUpFormIcon/glass.png'
import smoking from '../../../assets/signUpFormIcon/smoking.png'
import spoon from '../../../assets/signUpFormIcon/spoons.png'
import relation from '../../../assets/signUpFormIcon/relation.png'
import heart from '../../../assets/signUpFormIcon/heart.png';
import looking from '../../../assets/signUpFormIcon/looking.png';
import zodiac from '../../../assets/signUpFormIcon/zodiac.png';
import language from '../../../assets/signUpFormIcon/language.png';
import music from '../../../assets/signUpFormIcon/music.png';
const AdditonalForm = ({ formData,navigation,uploadSongs }) => {
  const [interestArray,setInterestArray]=useState([])
  const [languageArray,setLanguageArray]=useState([])
  const [selectedSong, setSelectedSong] = useState(null);

const { height } = useWindowDimensions();
  const handleSelectInterest = (selectedOption, values, setFieldValue) => {
    const updatedInterests = values.interest.includes(selectedOption)
      ? values.interest.filter((item) => item !== selectedOption)
      : [...values.interest, selectedOption];

    setFieldValue('interest', updatedInterests);
    setInterestArray(updatedInterests)
  };
  const displaySelectedInterests = Array.isArray(interestArray)
    ? interestArray.join(', ')
    : '';

    const handleSelectLanguage = (selectedOption, values, setFieldValue) => {
      const updatedLanguage = values.language.includes(selectedOption)
        ? values.language.filter((item) => item !== selectedOption)
        : [...values.language, selectedOption];
  
      setFieldValue('language', updatedLanguage);
      setLanguageArray(updatedLanguage)
    };
    const displaySelectedLanguage = Array.isArray(languageArray)
    ? languageArray.join(', ')
    : '';

    const handleSelectSong = (value, setFieldValue) => {
      const song = uploadSongs.find((s) => s.songUrl === value);
      if (song) {
        setFieldValue('selectedSong', song._id); // Update Formik's selectedSong value
        setSelectedSong(song)
      }
    };

  return (
    <Formik
      initialValues={{
        profession: '',
        education: '',
        drinking: '',
        smoking: '',
        eating: '',
        relation:'',
        interest: [],
        looking: '',
        zodiac: '',
        language: [],
        selectedSong: null,
      }}
      validationSchema={additonalInformationSchema}
      onSubmit={(values) => {
        const data = {
          ...formData,
          ...values
        }
        // console.log('additional values', data); // Handle form submission
          // navigation.navigate('AdditionalDataPage',{formData:data})
          navigation.navigate('AboutMePage', { formData: data });
        // action.resetForm();
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched,setFieldValue}) => (

        <>
<StatusBar
      translucent={false}
      backgroundColor="#343434"
      barStyle="light-content"
    />
         <View style={{backgroundColor:'black',flex:1}}>
         <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 80, justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 25,color:"white" }}>Tell Us About Yourself</Text>
          </View>
          <ScrollView   contentContainerStyle={{
    flexGrow: 1,
    paddingBottom: values.relation?height * 0.12:30,
  }} style={{backgroundColor:'black'}} 
  >
    
          <View style={{marginTop:6}}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ marginLeft: 12 }}>
              <Image source={bag} style={{ width: 25, height: 25 ,tintColor:"white"}} />
            </View>
            <View style={{ marginLeft: 4, marginRight: 20, marginTop: 9, width: "80%" }}>
              <Dropdown
                label="Profession"
                options={profession}
                onSelect={handleChange('profession')}
                value={values.profession}
                mode="outlined"
              />
              {touched.profession && errors.profession && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.profession}</Text>}
            </View>
          </View>


          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ marginLeft: 12 }}>
              <Image source={graduate} style={{ width: 25, height: 25,tintColor:'white' }} />
            </View>
            <View style={{ marginLeft: 4, marginRight: 20, marginTop: 9, width: "80%" }}>
              <Dropdown
                label="Education"
                options={education}
                onSelect={handleChange('education')}
                value={values.education}
                mode="outlined"
              />
              {touched.education && errors.education && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.education}</Text>}
            </View>
          </View>


          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ marginLeft: 12 }}>
              <Image source={glass} style={{ width: 25, height: 25,tintColor:'white' }} />
            </View>
            <View style={{ marginLeft: 4, marginRight: 20, marginTop: 9, width: '80%' }}>
              <Dropdown
                label="Drinking"
                options={Drinking}
                onSelect={handleChange('drinking')}
                value={values.drinking}
                mode="outlined"
              />
              {touched.drinking && errors.drinking && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.drinking}</Text>}
            </View>
          </View>

           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ marginLeft: 12 }}>
              <Image source={smoking} style={{ width: 25, height: 25,tintColor:'white' }} />
            </View>
            <View style={{ marginLeft: 4, marginRight: 20, marginTop: 9, width: '80%' }}>
              <Dropdown
                label="Smoking"
                options={Smoking}
                onSelect={handleChange('smoking')}
                value={values.smoking}
                mode="outlined"
              />
              {touched.smoking && errors.smoking && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.smoking}</Text>}
            </View>
          </View>

         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ marginLeft: 12 }}>
              <Image source={spoon} style={{ width: 25, height: 25,tintColor:"white" }} />
            </View>
            <View style={{ marginLeft: 4, marginRight: 20, marginTop: 9, width: '80%' }}>
              <Dropdown
                label="Eating"
                options={Eating}
                onSelect={handleChange('eating')}
                value={values.eating}
                mode="outlined"
              />
              {touched.eating && errors.eating && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.eating}</Text>}
            </View>
          </View> 

  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ marginLeft: 12 }}>
              <Image source={relation} style={{ width: 25, height: 25,tintColor:'white' }} />
            </View>
            <View style={{ marginLeft: 4, marginRight: 20, marginTop: 9, width: '80%' }}>
              <Dropdown
                label="Relationship Status"
                options={relationshipStatus}
                onSelect={handleChange('relation')}
                value={values.relation}
                mode="outlined"
              />
              {touched.relation && errors.relation && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.relation}</Text>}
            </View>
          </View> 

         {values.relation? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ marginLeft: 12 }}>
                  <Image source={heart} style={{ width: 25, height: 25,tintColor:'white' }} />
                </View>
                <View style={{ marginLeft: 4, marginRight: 20, marginTop: 9, width: '80%' }}>
                  <Dropdown
                label="Interest"
                    options={Interest}
                    onSelect={(selectedOption) => handleSelectInterest(selectedOption, values, setFieldValue)}
                    // value={values.interest.join(', ')} // Displaying selected interests
                    mode="outlined"
                  />
                  {touched.interest && errors.interest && (
                    <Text style={{ color: 'red', marginLeft: 12 }}>{errors.interest}</Text>
                  )}
                     {interestArray.length > 0 && (
          <View style={{ marginTop: 10 }}>
            <Text style={{color:'white'}}>{displaySelectedInterests}</Text>
          </View>
        )}
                </View>
              </View>:null}

              {values.relation?<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ marginLeft: 12 }}>
                  <Image source={looking} style={{ width: 25, height: 25,tintColor:'white' }} />
                </View>
                <View style={{ marginLeft: 4, marginRight: 20, marginTop: 9, width: '80%' }}>
                  <Dropdown
                    label="Looking For"
                    options={lookingFor}
                    onSelect={handleChange('looking')}
                    value={values.looking}
                    mode="outlined"
                  />
                  {touched.looking && errors.looking && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.looking}</Text>}
                </View>
              </View>:null}

              {values.relation?<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ marginLeft: 12 }}>
                  <Image source={zodiac} style={{ width: 25, height: 25,tintColor:'white' }} />
                </View>
                <View style={{ marginLeft: 4, marginRight: 20, marginTop: 9, width: '80%' }}>
                  <Dropdown
                    label="Zodiac Sign"
                    options={zodiacSign}
                    onSelect={handleChange('zodiac')}
                    value={values.zodiac}
                    mode="outlined"
                  />
                  {touched.zodiac && errors.zodiac && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.zodiac}</Text>}
                </View>
              </View>:null}

              {values.relation?<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ marginLeft: 12 }}>
                  <Image source={language} style={{ width: 25, height: 25,tintColor:'white' }} />
                </View>
                <View style={{ marginLeft: 4, marginRight: 20, marginTop: 9, width: '80%' }}>
                  <Dropdown
                    label="Language"
                    options={Language}
                    onSelect={(selectedOption) => handleSelectLanguage(selectedOption, values, setFieldValue)}
                    // value={values.interest.join(', ')} // Displaying selected interests
                    mode="outlined"
                  />
                  {touched.language && errors.language && (
                    <Text style={{ color: 'red', marginLeft: 12 }}>{errors.language}</Text>
                  )}
                     {languageArray.length > 0 && (
          <View style={{ marginTop: 10 }}>
            <Text style={{color:'white'}}>{displaySelectedLanguage}</Text>
          </View>
        )}
                </View>
              </View>:null}

              {values.relation?<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ marginLeft: 12 }}>
                <Image source={music} style={{ width: 25, height: 25,tintColor:'white' }} />
              </View>
              <View style={{ marginLeft: 4, marginRight: 20, marginTop: 9, width: '80%' }}>
                <Dropdown
                  label="Bio Track (Optional)"
                  options={Array.isArray(uploadSongs) ? uploadSongs.map((song) => ({
                    label: (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                          source={{ uri: song.songImage }}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            marginRight: 10,
                          }}
                        />
                        <Text style={{ fontSize: 14, color: '#333' }}>{song.songName}</Text>
                      </View>
                    ),
                    value: song.songUrl,
                  })) : []}
                  mode="outlined"
                  onSelect={(value) => handleSelectSong(value, setFieldValue)}
                  value={values.selectedSong ? values.selectedSong.songName : 'Select a song'}
                />
                {selectedSong && (
                  <Text style={{ marginTop: 10, fontSize: 14, color: 'white' }}>
                    {selectedSong.songName}
                  </Text>
                )}
              </View>
            </View>:null} 
          <View style={{ width: '100%', overflow: 'hidden' }}>
              <Button
                      mode="contained"
                      onPress={handleSubmit}
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:11,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         marginTop: 20,
                         marginLeft: 12,
                         marginRight: 20,
                      }}
                      buttonColor="rgba(234, 88, 12, 1)"
                    >
           SUBMIT
                    </Button>
          </View> 
          </View>
          </ScrollView>
          
         </View>


        </>
      )}
    </Formik>
  )
}
export default AdditonalForm