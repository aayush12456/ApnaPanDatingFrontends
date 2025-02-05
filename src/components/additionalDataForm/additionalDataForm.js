import { Text, View, Image } from "react-native";
import { Button } from "react-native-paper";
import React, { useState } from "react";
import { Formik } from 'formik';
import looking from '../../../assets/signUpFormIcon/looking.png';
import zodiac from '../../../assets/signUpFormIcon/zodiac.png';
import language from '../../../assets/signUpFormIcon/language.png';
import heart from '../../../assets/signUpFormIcon/heart.png';
import music from '../../../assets/signUpFormIcon/music.png';
import { additonalInformationFormSchema } from "../../schemas";
import { Interest, Language, lookingFor, zodiacSign } from "../../utils/personalInfo";
import { Dropdown } from 'react-native-paper-dropdown';

const AdditionalDataForm = ({ navigation, additionalFormData,uploadSongs }) => {
  const [interestArray,setInterestArray]=useState([])
  const [languageArray,setLanguageArray]=useState([])
  const [selectedSong, setSelectedSong] = useState(null);
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
    <>
      <Formik
        initialValues={{
          interest: [],
          looking: '',
          zodiac: '',
          language: [],
          selectedSong: null,
        }}
        validationSchema={additonalInformationFormSchema}
        onSubmit={(values) => {
          const additionalData = {
            ...additionalFormData,
            ...values
          };
          // console.log('additional form data values', additionalData); 
          navigation.navigate('AboutMePage', { formData: additionalData });
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 80, justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Tell Us About Yourself</Text>
            </View>

            <View style={{ marginTop: 6 }}>
              {/* Interest Field */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ marginLeft: 12 }}>
                  <Image source={heart} style={{ width: 25, height: 25 }} />
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
            <Text>{displaySelectedInterests}</Text>
          </View>
        )}
                </View>
              </View>

              {/* Looking For Field */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ marginLeft: 12 }}>
                  <Image source={looking} style={{ width: 25, height: 25 }} />
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
              </View>

              {/* Zodiac Sign Field */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ marginLeft: 12 }}>
                  <Image source={zodiac} style={{ width: 25, height: 25 }} />
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
              </View>

              {/* Language Field */}
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ marginLeft: 12 }}>
                  <Image source={language} style={{ width: 25, height: 25 }} />
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
            <Text>{displaySelectedLanguage}</Text>
          </View>
        )}
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ marginLeft: 12 }}>
                <Image source={music} style={{ width: 25, height: 25 }} />
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
                  <Text style={{ marginTop: 10, fontSize: 14, color: '#555' }}>
                    {selectedSong.songName}
                  </Text>
                )}
              </View>
            </View>
              {/* Submit Button */}
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
          </>
        )}
      </Formik>
    </>
  );
};

export default AdditionalDataForm;
