import React, { useState } from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import * as MediaLibrary from 'expo-media-library';

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
      // Request permission to access the media library
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission not granted to access media library');
        return;
      }
  
      // Save the video to the media library
      const asset = await MediaLibrary.createAssetAsync(videoUri);
      console.log('Video saved successfully to media library:', asset.uri);
  
      // Optionally navigate or perform other actions
      navigation.navigate('VideoUploadPage', { formData: videoRecord });
    } catch (error) {
      console.error('Error saving video to media library:', error);
    }
  };
  const restartVideo = () => {
    // Reset the video URI to allow re-recording
    setVideoUri(null);
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
     { videoUri?<TouchableOpacity
            onPress={restartVideo}
            style={{
              height: 50,
              backgroundColor: 'rgb(239,68,68)',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 12,
              marginLeft: 12,
              marginRight: 20,
              borderRadius: 11,
            }}
          >
            <Text style={{ fontSize: 18, color: 'white' }}>RESTART VIDEO</Text>
          </TouchableOpacity>:null}
    </>
  );
};

export default VideoRecord;
