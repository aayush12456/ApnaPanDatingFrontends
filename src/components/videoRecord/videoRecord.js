import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image,Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import {ShareAsync, shareAsync} from 'expo-sharing'
import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';


const VideoRecord = ({navigation,videoRecord}) => {
  const [videoUri, setVideoUri] = useState(null);

  const recordVideo = async () => {
    try {
      // Request camera permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === 'granted') {
        // Launch the camera for video recording
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          quality: 1,
        });
       console.log('video recording result is',result)
        // Check if the user has recorded a video
        if (!result.canceled) {
          // Set the video URI for preview
          const videoURI = result.assets[0].uri;
          setVideoUri(videoURI);
        }
      }
    } catch (error) {
      console.log('Error during video recording', error);
    }
  };

  const downloadVideo = async () => {
    try {
      const fileName = 'video.mp4';
      const fileUri = FileSystem.documentDirectory + fileName; // Define the path to save the video

      // Move the video from its temporary location to the desired file URI
      await FileSystem.moveAsync({
        from: videoUri,
        to: fileUri,
      });

      console.log('Download successful:', fileUri);
      // Now share the downloaded video
      save(fileUri);
      navigation.navigate('VideoUploadPage',{formData:videoRecord})
    } catch (error) {
      console.error('Error downloading video:', error);
    }
  };
  const save = async (uri) => {
    try {
      await shareAsync(uri); // Share the saved video file
      console.log('Video shared successfully!');
    } catch (error) {
      console.error('Error sharing video:', error);
    }
  };
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 80, justifyContent: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Video Recording</Text>
      </View>

     {videoUri?null: <TouchableOpacity onPress={recordVideo}  style={{
                height: 50,
                backgroundColor: 'rgb(22, 163, 74)',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 28,
                marginLeft: 12,
                marginRight: 20,
                borderRadius: 11,
              }}>
        <Text style={{ fontSize: 18, color: 'white' }}>START RECORDING</Text>
      </TouchableOpacity>}

      {videoUri && (
       <VideoPlayer
       videoProps={{
         shouldPlay: true,
         resizeMode: ResizeMode.CONTAIN,
         source: {
           uri:videoUri,
         },
       }}
       style={{
         videoBackgroundColor: 'black',
         height: 200,  // Set the desired height here
       }}
       fullscreen={{ inFullscreen: true, visible: true }} // Enable fullscreen
       showFullscreenButton // Show fullscreen button
     />
      )}
  {videoUri?<TouchableOpacity onPress={downloadVideo}  style={{
                height: 50,
                backgroundColor: 'rgb(59,130,246)',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 28,
                marginLeft: 12,
                marginRight: 20,
                borderRadius: 11,
              }}>
        <Text style={{ fontSize: 18, color: 'white' }}>DOWNLOAD VIDEO</Text>
      </TouchableOpacity>:null}
    </>
  );
};

export default VideoRecord;
