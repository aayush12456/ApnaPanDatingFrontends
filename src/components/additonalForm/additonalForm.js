import { Text, View, Image } from "react-native"
import { Button } from "react-native-paper";
import { Dropdown } from 'react-native-paper-dropdown';
import { Drinking, Eating, Smoking, education,relationshipStatus } from "../../utils/personalInfo";
import { profession } from "../../utils/personalInfo";
import React from "react";
import { Formik } from 'formik';
import { additonalInformationSchema } from "../../schemas";
import bag from '../../../assets/signUpFormIcon/bag.png'
import graduate from '../../../assets/signUpFormIcon/graduate.png'
import glass from '../../../assets/signUpFormIcon/glass.png'
import smoking from '../../../assets/signUpFormIcon/smoking.png'
import spoon from '../../../assets/signUpFormIcon/spoons.png'
import relation from '../../../assets/signUpFormIcon/relation.png'
const AdditonalForm = ({ formData,navigation }) => {
  return (
    <Formik
      initialValues={{
        profession: '',
        education: '',
        drinking: '',
        smoking: '',
        eating: '',
        relation:'',
      }}
      validationSchema={additonalInformationSchema}
      onSubmit={(values) => {
        const data = {
          ...formData,
          ...values
        }
        // console.log('additional values', data); // Handle form submission
          navigation.navigate('AdditionalDataPage',{formData:data})
        // action.resetForm();
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (

        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 80, justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Tell Us About Yourself</Text>
          </View>
          <View style={{marginTop:6}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ marginLeft: 12 }}>
              <Image source={bag} style={{ width: 25, height: 25 }} />
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
              <Image source={graduate} style={{ width: 25, height: 25 }} />
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
              <Image source={glass} style={{ width: 25, height: 25 }} />
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
              <Image source={smoking} style={{ width: 25, height: 25 }} />
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
              <Image source={spoon} style={{ width: 25, height: 25 }} />
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
              <Image source={relation} style={{ width: 25, height: 25 }} />
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
  )
}
export default AdditonalForm