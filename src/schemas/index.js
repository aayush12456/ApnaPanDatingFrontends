import * as Yup from 'yup';
export const signUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    city: Yup.string().min(4).required('City is required'),
    firstName: Yup.string().min(2).max(25).required('First name is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    phone: Yup.string().max(10).required('Phone number is required'),
    date: Yup.string().required('Date Of Birth is required'),

  });
  export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),

  });
  export const additonalInformationSchema=Yup.object({
    profession:Yup.string().min(2).max(50).required("Please enter profession"),
    education:Yup.string().min(2).required("Please enter education"),
    drinking:Yup.string().min(2).required("Please enter drinking"),
    smoking:Yup.string().min(6).required("Please enter smoking"),
    eating:Yup.string().min(6).required("Please enter eating"),
    relation:Yup.string().min(2).required("Please enter relationhip status"),
})
export const additonalInformationFormSchema=Yup.object({
 
  interest: Yup.array().min(1, "Please select at least one interest").required("Please select interest"),
  looking:Yup.string().min(2).required("Please enter looking for"),
  zodiac:Yup.string().min(2).required("Please enter zodiac sign"),
 language: Yup.array().min(1, "Please select at least one language").required("Please select interest"),
})

export const AboutMeSchema = Yup.object().shape({
  AboutMe: Yup.string().min(20, 'Minimum 20 characters required').required('Please describe yourself'),
});

export const updatePasswordSchema=Yup.object({
  currentPassword:Yup.string().min(6).required("Password is mandatory"),
  newPassword:Yup.string().min(6).required("New Password is mandatory"),
  confirmNewPassword:Yup.string().min(6).required("Confirm Password is mandatory"),
  
})