import { Text, View, TouchableOpacity, Image, Pressable } from "react-native";
import { Button } from "react-native-paper";
import { uploadImages } from "../../utils/uploadImageData";
import bulb from '../../../assets/signUpFormIcon/bulb.png';
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { userRegisterAsync } from "../../Redux/Slice/registerSlice/registerSlice";
import { useNavigation } from '@react-navigation/native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';
import { showToasts } from "../../Redux/Slice/changePasswordToastSlice/changePasswordToastSlice";

const ImageUpload = ({ imageUpload }) => {
  const navigation = useNavigation();
  const dispatch=useDispatch()
  const [uploadedImages, setUploadedImages] = useState(uploadImages); // Track uploaded images to be shown
  const [imgFileType,setImgFileType]=useState([])
  const [fileUploadError,setFileUploadError]=useState('')
  const [error,setError]=useState('')
  console.log('image upload is', imageUpload);

  // const uploadImageData = async (index) => {
  //   try {
  //     let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     console.log('Permissions: ', permissionResult);

  //     if (!permissionResult.granted) {
  //       alert("Permission to access media library is required!");
  //       return;
  //     }

  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsMultipleSelection: true,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 1,
  //     });
  //     console.log('result images',result)
  //     setImgFileType((prevImageFile)=>[...prevImageFile,result.assets[0]])
  //     if (!result.canceled && result.assets && result.assets.length > 0) {
  //       const imgURI = result.assets[0].uri;
  //       console.log('Selected Image URI:', imgURI);

  //       // Update the image in the array with the selected one
  //       const updatedImages = [...uploadedImages];
  //       updatedImages[index].img = { uri: imgURI }; // Replace the image at the clicked index

  //       setUploadedImages(updatedImages); // Update the state to reflect the change
  //     } else {
  //       console.log('No image selected or operation canceled.');
  //     }
  //   } catch (error) {
  //     console.log('Error during media picking:', error);
  //   }
  // };
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
        allowsMultipleSelection: true,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      console.log('Result:', result);
  
      // Check if the operation was canceled or no assets were returned
      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log('No image selected or operation canceled.');
        return;
      }
  
      // Proceed if a valid image is selected
      const imgURI = result.assets[0].uri;
      console.log('Selected Image URI:', imgURI);
  
      setImgFileType((prevImageFile) => [...prevImageFile, result.assets[0]]);
  
      // Update the image in the array with the selected one
      const updatedImages = [...uploadedImages];
      updatedImages[index].img = { uri: imgURI }; // Replace the image at the clicked index
  
      setUploadedImages(updatedImages); // Update the state to reflect the change
    } catch (error) {
      console.log('Error during media picking:', error);
    }
  };
  
  console.log('Uploaded images:', uploadedImages);


  const compareFaces = async (image1, image2) => { // ye face comparison ka function hai
    const apiKey = 'DeIceKMrrwx5e4iS-v97d0lVAEWV8EvA12'; // Replace with actual Face++ API Key
    const apiSecret = 'VZrAWBOA58qiP0cw-US3_nOYJlpcUlND12'; // Replace with actual Face++ API Secret
    const apiEndpoint = 'https://api-us.faceplusplus.com/facepp/v3/compare';


    const formData = new FormData();
    formData.append('api_key', apiKey);
    formData.append('api_secret', apiSecret);
    formData.append('image_file1', {
      uri: image1.uri,
      type: 'image/jpeg',
      name: 'image1.jpg',
    });
    formData.append('image_file2', {
      uri: image2.uri,
      type: 'image/jpeg',
      name: 'image2.jpg',
    });
  
    try {
      const response = await axios.post(apiEndpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('compare face',response)
      return response.data;
    } catch (error) {
      // console.error('Error comparing faces:', error);
      if (error.response.status === 401) {
        console.warn('API Key or Secret is invalid or expired.');
        return { expiredApi: true }; // Custom flag for expired API
      }
      if (error.response && error.response.status === 413) {
        console.error('Error: Total image size exceeds 10 MB.');
        return {
          errorMessage: 'Total image size exceeds 10 MB. Please upload smaller images.',
        };
      }
  
      // Handle other errors
      // console.error('Error comparing faces:', error);
      return {
        errorMessage: 'An error occurred while comparing faces. Please try again later.',
      };
    }
  };
  
  // const imageSubmitHandler=async()=>{
  //   if(imgFileType.length===0){
  //     setFileUploadError('please upload images')
  //     return
  //   }
  //   console.log('update images',imgFileType)

  //   const formData = new FormData();
  // formData.append('firstName', imageUpload.firstName);
  // formData.append('email', imageUpload.email);
  // formData.append('phone', imageUpload.phone);
  // formData.append('password', imageUpload.password);
  // formData.append('gender', imageUpload.gender);
  // formData.append('DOB', imageUpload.date);
  // formData.append('city', imageUpload.city);
  // formData.append('aboutUser', imageUpload.AboutMe);
  // // formData.append('videoUrl', {uri:imageUpload.videoUrl.uri,name:imageUpload.videoUrl.fileName,type:imageUpload.videoUrl.type});
  // formData.append('interest', JSON.stringify(imageUpload.interest))
  // formData.append('education', imageUpload.education);
  // formData.append('drinking', imageUpload.drinking);
  // formData.append('smoking', imageUpload.smoking);
  // formData.append('eating', imageUpload.eating);
  // formData.append('profession', imageUpload.profession);
  // formData.append('looking', imageUpload.looking);
  // formData.append('relationship', imageUpload.relation);
  // formData.append('zodiac', imageUpload.zodiac);
  // formData.append('songId', imageUpload.selectedSong);
  // imgFileType.forEach((image, index) => {
  //   formData.append(images, {
  //     uri: image.uri,
  //     name: image_${index}.jpg, // Provide a unique name for each image
  //     type: "image/jpeg", // Ensure correct MIME type
  //   });
  // });
  // if (imageUpload.videoUrl?.uri) {
  //   formData.append("videoUrl", {
  //     uri: imageUpload.videoUrl.uri,
  //     name: "video.mp4", // Default name if not provided
  //     type:  "video/mp4", // Ensure correct MIME type
  //   });
  // } else {
  //   console.log("No video URL provided");
  // }
  // console.log(' complete obj data',formData)
  // dispatch(userRegisterAsync(formData))
  
  // }
  const imageSubmitHandler = async () => {
    if (imgFileType.length === 0) {
      setFileUploadError('Please upload images');
      return;
    }
  
    // Check if at least 2 images are uploaded for comparison
    if (imgFileType.length < 2) {
      setFileUploadError('Please upload at least two images for comparison');
      return;
    }
  
    console.log('Uploaded images:', imgFileType);
    // Call Face++ API for comparison
    const faceComparisonResult = await compareFaces(imgFileType[0], imgFileType[1]);
    let proceedWithRegistration = false;

  if (faceComparisonResult?.confidence >= 60) {
    console.log('Face comparison passed with confidence:', faceComparisonResult.confidence);
    proceedWithRegistration = true;
  } else if (faceComparisonResult?.expiredApi) {
    console.warn('Proceeding with registration as Face++ API key is expired.');
    proceedWithRegistration = true;
  }

  if (proceedWithRegistration) {
    const selectedSong=imageUpload.selectedSong?imageUpload.selectedSong:'none'
    const formData = new FormData();
    formData.append('firstName', imageUpload.firstName);
    formData.append('email', imageUpload.email);
    formData.append('phone', imageUpload.phone);
    formData.append('password', imageUpload.password);
    formData.append('gender', imageUpload.gender);
    formData.append('DOB', imageUpload.date);
    formData.append('city', imageUpload.city);
    formData.append('aboutUser', imageUpload.AboutMe);
    formData.append('interest', imageUpload.interest);
    formData.append('language', imageUpload.language);
    formData.append('education', imageUpload.education);
    formData.append('drinking', imageUpload.drinking);
    formData.append('smoking', imageUpload.smoking);
    formData.append('eating', imageUpload.eating);
    formData.append('profession', imageUpload.profession);
    formData.append('looking', imageUpload.looking);
    formData.append('relationship', imageUpload.relation);
    formData.append('zodiac', imageUpload.zodiac);
    formData.append('songId', selectedSong);

    imgFileType.forEach((image, index) => {
      formData.append(`images`, {
        uri: image.uri,
        name: `image_${index}.jpg`,
        type: 'image/jpeg',
      });
    });

    if (imageUpload.videoUrl?.uri) {
      formData.append('videoUrl', {
        uri: imageUpload.videoUrl.uri,
        name: 'video.mp4',
        type: 'video/mp4',
      });
    }

    console.log('Complete FormData:', formData);
    dispatch(userRegisterAsync(formData));
    dispatch(
      showToasts({
        types: 'SUCCESS',
        titles: 'Thank You!',
        textBodys: 'You have successfully registered on ApnaPan. Please login to check.',
      })
    );
    navigation.navigate('FrontPage');
  } else {
    const errorMessage = faceComparisonResult?.errorMessage
      ? faceComparisonResult.errorMessage
      : 'Your captured image and uploaded image do not match. Make sure both images are the same, especially the face.To Understand How to make it similar please click on bulb button';

    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: 'Warning',
      textBody: errorMessage,
      button: 'Close',
    });
  }
  };
  const guideImagesHandler=()=>{
    navigation.navigate('CompareFacePage')
  }
  return (
    <>
    <AlertNotificationRoot>
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
      <Pressable onPress={guideImagesHandler}>
      <View style={{
        backgroundColor: 'rgb(245, 158, 11)', borderRadius: 8, width: '95%', marginLeft: 8, marginTop: 30,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
      }}>
        <Image source={bulb} style={{ width: 25, height: 25, marginTop: 8, marginBottom: 8 }} />
        <Text style={{ fontSize: 15, color: 'black', paddingTop: 4, paddingBottom: 4 }}>
       How to upload image similar to Capture image
        </Text>
      </View>
      </Pressable>
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
    </AlertNotificationRoot>
      
      
    </>
  );
};

export default ImageUpload;
