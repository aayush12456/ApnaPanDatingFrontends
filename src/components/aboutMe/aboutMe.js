import { Text,View,TouchableOpacity } from "react-native"
import { Formik } from 'formik';
import { TextInput } from 'react-native-paper';
import { AboutMeSchema } from "../../schemas";
const AboutMe=({aboutMe,navigation})=>{
    console.log('about me ',aboutMe)
return (
    <>
    <Formik
      initialValues={{
      AboutMe:''
      }}
      validationSchema={AboutMeSchema}
      onSubmit={(values) => {
        const aboutMeData = {
          ...aboutMe,
          ...values
        }
        console.log('about me values', aboutMeData); // Handle form submission
          navigation.navigate('VideoRecordPage',{formData:aboutMeData})
        // action.resetForm();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (

        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 80, justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Describe Yourself</Text>
          </View>
          <View style={{marginTop:6}}>
          <View >
            <TextInput
              style={{ marginLeft: 12, marginRight: 20, marginTop:24,height:160,paddingTop:20,borderWidth:0, textAlignVertical: 'top' }}
              mode="outlined"
              multiline={true}
              onChangeText={handleChange('AboutMe')}
              onBlur={handleBlur('AboutMe')}
              selectionColor="transparent"
              placeholder="Describe yourself. What you currently do? What is quirky about you? What makes you smile?..."
              value={values.AboutMe}
            />
            {touched.AboutMe && errors.AboutMe && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.AboutMe}</Text>}
          </View>

            </View>
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

        </>
      )}
        </Formik>
    </>
)
}
export default AboutMe