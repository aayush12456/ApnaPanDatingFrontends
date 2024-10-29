import { Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Formik } from 'formik';
import looking from '../../../assets/signUpFormIcon/looking.png';
import zodiac from '../../../assets/signUpFormIcon/zodiac.png';
import language from '../../../assets/signUpFormIcon/language.png';
import heart from '../../../assets/signUpFormIcon/heart.png';
import { additonalInformationFormSchema } from "../../schemas";
import { Interest, Language, lookingFor, zodiacSign } from "../../utils/personalInfo";
import { Dropdown } from 'react-native-paper-dropdown';

const AdditionalDataForm = ({ navigation, additionalFormData }) => {
  const [interestArray,setInterestArray]=useState([])
  const [languageArray,setLanguageArray]=useState([])
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
  return (
    <>
      <Formik
        initialValues={{
          interest: [],
          looking: '',
          zodiac: '',
          language: []
        }}
        validationSchema={additonalInformationFormSchema}
        onSubmit={(values) => {
          const additionalData = {
            ...additionalFormData,
            ...values
          };
          console.log('additional form data values', additionalData); 
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
              {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ marginLeft: 12 }}>
                  <Image source={language} style={{ width: 25, height: 25 }} />
                </View>
                <View style={{ marginLeft: 4, marginRight: 20, marginTop: 9, width: '80%' }}>
                  <Dropdown
                    label="Language"
                    options={Language}
                    onSelect={handleChange('language')}
                    value={values.language}
                    mode="outlined"
                  />
                  {touched.language && errors.language && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.language}</Text>}
                </View>
              </View> */}
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

              {/* Submit Button */}
              <View style={{ width: '100%', overflow: 'hidden' }}>
                <TouchableOpacity
                  style={{
                    height: 50,
                    backgroundColor: '#F00000',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    marginLeft: 12,
                    marginRight: 20,
                    borderRadius: 11
                  }}
                  onPress={handleSubmit}
                >
                  <Text style={{ color: '#FFFFFF', fontSize: 16 }}>SUBMIT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Formik>
    </>
  );
};

export default AdditionalDataForm;
