import { Text, View, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native-paper";
import { uploadImages } from "../../utils/uploadImageData";
import bulb from '../../../assets/signUpFormIcon/bulb.png';
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userRegisterAsync } from "../../Redux/Slice/registerSlice/registerSlice";
import axios from 'axios';
const ImageUpload = ({ imageUpload }) => {
  const dispatch=useDispatch()
  const [uploadedImages, setUploadedImages] = useState(uploadImages); // Track uploaded images to be shown
  const [imgFileType,setImgFileType]=useState([])
  const [fileUploadError,setFileUploadError]=useState('')
  console.log('image upload is', imageUpload);

  const uploadImageData = async (index) => {
    try {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('Permissions: ', permissionResult);

      if (!permissionResult.granted) {
        alert("Permission to access media library is required!");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      setImgFileType((prevImageFile)=>[...prevImageFile,result.assets[0]])
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imgURI = result.assets[0].uri;
        console.log('Selected Image URI:', imgURI);

        // Update the image in the array with the selected one
        const updatedImages = [...uploadedImages];
        updatedImages[index].img = { uri: imgURI }; // Replace the image at the clicked index

        setUploadedImages(updatedImages); // Update the state to reflect the change
      } else {
        console.log('No image selected or operation canceled.');
      }
    } catch (error) {
      console.log('Error during media picking:', error);
    }
  };

  console.log('Uploaded images:', uploadedImages);

  const imageSubmitHandler=async()=>{
    if(imgFileType.length===0){
      setFileUploadError('please upload images')
      return
    }
    const imageSubmitData={
      firstName:imageUpload.firstName,
      email:imageUpload.email,
      phone:imageUpload.phone,
      password:imageUpload.password,
      gender:imageUpload.gender,
      DOB:imageUpload.date,
      city:imageUpload.city,
      aboutUser:imageUpload.AboutMe,
      // images:imgFileType,
      // videoUrl:imageUpload.videoUrl,
      interest:imageUpload.interest,
      education:imageUpload.education,
      drinking:imageUpload.drinking,
      smoking:imageUpload.smoking,
      eating:imageUpload.eating,
      profession:imageUpload.profession,
      looking:imageUpload.looking,
      relationship:imageUpload.relation,
      zodiac:imageUpload.zodiac,
      language:imageUpload.language
    }
    console.log('image submit data',imageSubmitData)
    const formData = new FormData();
//     // imgFileType.forEach((imageFile) => {
//     //   const localUri = imageFile.uri;
//     //   const filename = localUri.split('/').pop();
//     //   const match = /\.(\w+)$/.exec(filename);
//     //   const type = match ? `image/${match[1]}` : `image`;
  
//     //   formData.append('images', JSON.stringify({
//     //     uri: localUri,
//     //     name: filename,
//     //     type: type
//     //   }))
//     // });


  formData.append('firstName', imageUpload.firstName);
  formData.append('email', imageUpload.email);
  formData.append('phone', imageUpload.phone);
  formData.append('password', imageUpload.password);
  formData.append('gender', imageUpload.gender);
  formData.append('DOB', imageUpload.date);
  formData.append('city', imageUpload.city);
  formData.append('aboutUser', imageUpload.AboutMe);
  // formData.append('videoUrl', imageUpload.videoUrl);
  // formData.append('interest', imageUpload.interest);
  formData.append('interest', JSON.stringify(imageUpload.interest))
  formData.append('education', imageUpload.education);
  formData.append('drinking', imageUpload.drinking);
  formData.append('smoking', imageUpload.smoking);
  formData.append('eating', imageUpload.eating);
  formData.append('profession', imageUpload.profession);
  formData.append('looking', imageUpload.looking);
  formData.append('relationship', imageUpload.relation);
  formData.append('zodiac', imageUpload.zodiac);
  // formData.append('language', imageUpload.language);
  formData.append('language', JSON.stringify(imageUpload.language));
// //     // console.log('image complete data',imageSubmitData.imageFileArray)
//     console.log(' complete obj data',formData)
    // dispatch(userRegisterAsync(formData))
    try {
      // Make the API call directly using axios
      const response = await axios.post('https://9441-2405-201-3014-a811-699d-a373-e212-d219.ngrok-free.app/user/signup',formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        // Handle success, e.g., show a success message or redirect the user
        console.log('Registration successful:', response.data);
      }
    } catch (error) {
      if (error.response) {
        console.log('Backend responded with error:', error.response.data); // Backend-specific error
      } else if (error.request) {
        console.log('No response from backend:', error.request); // No response received
      } else {
        console.log('Error during request setup:', error.message); // Error during request setup
      }
    }
  }
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 80, justifyContent: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Upload Your Photos</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginLeft: 12 }}>
        {
          uploadedImages.map((uploadImg, index) => (
            <TouchableOpacity key={index} onPress={() => uploadImageData(index)}>
              <Image source={uploadImg.img} style={{ width: 100, height: 100, marginTop: 20 }} />
            </TouchableOpacity>
          ))
        }

      </View>
      {fileUploadError? <Text style={{color:"red",textAlign:'center'}}>{fileUploadError}</Text>:null}
      <View style={{
        backgroundColor: 'rgb(245, 158, 11)', borderRadius: 8, width: '95%', marginLeft: 8, marginTop: 30,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8
      }}>
        <Image source={bulb} style={{ width: 25, height: 25, marginTop: 8, marginBottom: 8 }} />
        <Text style={{ fontSize: 15, color: 'black', paddingTop: 4, paddingBottom: 4 }}>
          Upload video to show up in matches
        </Text>
      </View>
      <View style={{ width: '100%', overflow: 'hidden' }}>
         <Button
                      mode="contained"
                      onPress={imageSubmitHandler}
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
    
    </>
  );
};

export default ImageUpload;
