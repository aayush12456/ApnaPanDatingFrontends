import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image,Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator'; 
const CaptureImage = ({captureImages, navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [imageUrl,setImageUrl]=useState(null)

  const captureImage = async () => {
    try {
      // Request camera permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === 'granted') {
        // Launch the camera to capture an image
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
        console.log('Image capture result:', result);

        // Check if the user has captured an image
        if (!result.canceled) {
          const imageURI = result.assets[0].uri;
          setImageUri(imageURI); // Update state with the new image URI
          setImageUrl(result.assets[0])
        }
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.log('Error during image capture:', error);
    }
  };
const sumbitImageHandler=()=>{
const captureImageObj={
    ...captureImages,
    imageUrl:imageUrl
}
navigation.navigate('ImageUploadPage',{formData:captureImageObj})
}

const downloadImageHandler = async () => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please grant media library permissions to save the image.');
      return;
    }

    if (imageUri) {
      // Resize the image to reduce size to around 1 MB
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 800 } }], // Resize to a width of 800px (maintaining aspect ratio)
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Compress the image to 70% quality
      );
      
      // Check if the image size is around 1 MB
      const imageSize = manipulatedImage.uri;
      const asset = await MediaLibrary.createAssetAsync(imageSize);
      Alert.alert('Success', 'Image saved to your gallery!');
    } else {
      Alert.alert('Error', 'No image to save.');
    }
  } catch (error) {
    console.log('Error saving image:', error);
    Alert.alert('Error', 'Failed to save the image.');
  }
};
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:`${!imageUri?-400:0}`}}>
      <Text style={{ fontWeight: 'bold', fontSize: 25, marginBottom: 20 }}>Capture Image</Text>
      
      {/* Capture Button */}
      {!imageUri && (
        <TouchableOpacity
          onPress={captureImage}
          style={{
            height: 50,
            backgroundColor: 'rgb(22, 163, 74)',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 30,
            borderRadius: 11,
            width:'95%',
         
          }}
        >
          <Text style={{ fontSize: 18, color: 'white' }}>Capture</Text>
        </TouchableOpacity>
      )}

      {/* Preview Section */}
      {imageUri && (
        <View style={{ marginTop:10 }}>
          {/* <Text style={{ fontSize: 18, fontWeight: '600',paddingLeft:35,paddingBottom:10 }}>Preview:</Text> */}
          
          {/* Image Preview */}
          <Image
            source={{ uri: imageUri }}
            style={{ width: 300, height: 300, borderRadius: 10 }}
            resizeMode="contain"
          />
          
          {/* Capture Again Button */}
          <View style={{flexDirection:"row",justifyContent:'space-between'}}>
              <TouchableOpacity
            onPress={captureImage} // Call the same function to start the camera again
            style={{
              height: 50,
              backgroundColor: 'rgb(220, 38, 38)',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 30,
              borderRadius: 11,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: 'white' }}>Capture Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={sumbitImageHandler} // Call the same function to start the camera again
            style={{
              height: 50,
              backgroundColor: 'rgb(59,130,246)',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 30,
              borderRadius: 11,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: 'white' }}>Submit</Text>
          </TouchableOpacity>
            </View>

            <TouchableOpacity
               onPress={downloadImageHandler}
            style={{
              height: 50,
              backgroundColor: 'rgb(59,130,246)',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 30,
              borderRadius: 11,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 18, color: 'white' }}>Download Capture Image</Text>
          </TouchableOpacity>
        </View>
        
      )}
    </View>
  );
};

export default CaptureImage;
