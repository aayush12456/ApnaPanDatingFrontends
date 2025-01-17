import { Image, View, TouchableOpacity, Text,Pressable } from "react-native";
import { Button } from "react-native-paper";
import back from '../../../assets/signUpFormIcon/back.png';
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import React, { useState } from "react";
import { Formik } from 'formik';
import { signUpSchema } from "../../schemas";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import closeEye from '../../../assets/AllIcons/closedeye.png'
import openEye from '../../../assets/AllIcons/openeye.png'
const OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

const SignUpForm = ({ navigation,allUserObj }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError,setEmailError]=useState('')
  const [phoneError,setPhoneError]=useState('')
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Formik
      initialValues={{
        email: '',
        gender: '',
        city: '',
        firstName: '',
        password: '',
        phone: '',
        date: ''
      }}
      validationSchema={signUpSchema}
      onSubmit={(values) => {
        console.log(values); // Handle form submission
        const emailExists = allUserObj.emailArray.includes(values.email);
        const phoneExists = allUserObj.phoneNumberArray.includes(values.phone.trim());
        if (emailExists || phoneExists) {
          setEmailError(emailExists ? 'Email already present' : '');
          setPhoneError(phoneExists ? 'Phone Number already present' : '');
          return; 
        }
        setEmailError('');
        setPhoneError('');
      
        navigation.navigate('AdditionalPage',{formData:values})
        // action.resetForm();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <>
          <View style={{ flexDirection: 'row', justifyContent: 'start' }}>
            <TouchableOpacity onPress={() => navigation.navigate('FrontPage')}>
              <Image
                source={back}
                style={{ width: 15, height: 15, marginTop: 60, marginLeft: 15 }}
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 25, paddingLeft: 16, paddingTop: 20 }}>SignUp</Text>
            <Text style={{ paddingTop: 5, paddingLeft: 15 }}>Sign up now. Meet singles!</Text>
          </View>

          <View>
            <TextInput
              label="Email"
              style={{ marginLeft: 12, marginRight: 20, marginTop: 30 }}
              mode="outlined"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.email}</Text>}
            {emailError && <Text style={{ color: 'red', marginLeft: 12 }}>{emailError}</Text>}
          </View>
           <View style={{ flexDirection: 'row', justifyContent: 'between' }}>
           <View style={{ marginLeft: 12, marginRight: 20, marginTop: 9 }}>
            <Dropdown
              label="Gender"
              options={OPTIONS}
              value={values.gender}
              onSelect={handleChange('gender')}
              mode="outlined"
            />
            {touched.gender && errors.gender && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.gender}</Text>}
          </View>

          {/* Date Picker */}
          <View>
            <TouchableOpacity onPress={showDatePicker}>
              <TextInput
                label="Date of Birth"
                style={{ marginLeft: 12, marginRight: 20, marginTop: 9 ,width:"100%"}}
                mode="outlined"
                value={values.date} // Show the selected date in the input field
                editable={false} // Prevent manual editing
              />
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                const selectedDate = date.toLocaleDateString(); // Convert date to string
                setFieldValue('date', selectedDate); // Set date in Formik state
                console.log("Selected date: ", selectedDate);
                hideDatePicker();
              }}
              onCancel={hideDatePicker}
            />
                  {touched.date && errors.date && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.date}</Text>}
          </View>

           </View>
         

          <View>
            <TextInput
              label="City"
              style={{ marginLeft: 12, marginRight: 20, marginTop: 9 }}
              mode="outlined"
              onChangeText={handleChange('city')}
              onBlur={handleBlur('city')}
              value={values.city}
            />
            {touched.city && errors.city && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.city}</Text>}
          </View>

          {values.city && (
            <View>
              <View>
                <TextInput
                  label="First Name"
                  style={{ marginLeft: 12, marginRight: 20, marginTop: 9 }}
                  mode="outlined"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                />
                {touched.firstName && errors.firstName && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.firstName}</Text>}
              </View>

              {/* <View>
                <TextInput
                  label="Password"
                  style={{ marginLeft: 12, marginRight: 20, marginTop: 9 }}
                  mode="outlined"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {touched.password && errors.password && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.password}</Text>}
              </View> */}
 <View>
            <View style={{flexDirection:'row'}}>
            <TextInput
                  label="Password"
                  style={{ marginLeft: 12, marginRight: 20, marginTop: 9 ,width:'91%'}}
                  mode="outlined"
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  type='text'
                />
               { !showPassword &&<Pressable onPress={togglePasswordVisibility}>
                <Image source={closeEye} style={{width:25,height:25,marginLeft:-65,marginTop:30}}/>
                </Pressable>}
               {showPassword&& <Pressable onPress={togglePasswordVisibility}>
                <Image source={openEye} style={{width:25,height:25,marginLeft:-65,marginTop:30}}/>
                </Pressable>}
            </View>
                {touched.password && errors.password && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.password}</Text>}
              </View>
              <View>
                <TextInput
                  label="Phone"
                  style={{ marginLeft: 12, marginRight: 20, marginTop: 9 }}
                  mode="outlined"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  placeholder="+91"
                />
                {touched.phone && errors.phone && <Text style={{ color: 'red', marginLeft: 12 }}>{errors.phone}</Text>}
                {phoneError && <Text style={{ color: 'red', marginLeft: 12 }}>{phoneError}</Text>}
              </View>
            </View>
          )}

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

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View>
              <Text style={{ paddingTop: 20 }}>By choosing to continue you agree to our </Text>
              <Text style={{ paddingLeft: 27 }}>
                <Text style={{ textDecorationLine: 'underline' }}>terms of use</Text> and{' '}
                <Text style={{ textDecorationLine: 'underline' }}>privacy policy</Text>
              </Text>
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

export default SignUpForm;
