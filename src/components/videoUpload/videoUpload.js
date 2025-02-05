import { Text, View, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import uploadImage from '../../../assets/signUpFormIcon/uploadImg.png';
import videoPlayer from '../../../assets/signUpFormIcon/videoPlayer.png';
import * as ImagePicker from 'expo-image-picker';
import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { useState } from "react";

const VideoUpload = ({ VideoUpload,navigation }) => {
  const [file, setFile] = useState(null);
  const [fileType,setFileType]=useState(null)
  const [fileUploadError,setFileUploadError]=useState('')

  const uploadVideoData = async () => {
    try {
      const maxFileSize=5*1024*1024
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      // console.log('Permissions: ', permissionResult);

      if (!permissionResult.granted) {
        alert("Permission to access media library is required!");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      setFileType(result.assets[0])
      // console.log('video upload result data',result)
      if(result.assets[0].fileSize>=maxFileSize){
setFileUploadError('file size should not be more than 5 mb')
return
      }
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const videoURI = result.assets[0].uri;
        // console.log('Video URI:', videoURI);
        setFile(videoURI);
      } else {
        // console.log('No video selected or operation canceled.');
      }
    } catch (error) {
      // console.log('Error during media picking:', error);
    }
  };
const videoSubmitHandler=()=>{
  if(fileType===null){
    setFileUploadError('please upload video')
    return
  }
  const videoSubmitData={
    ...VideoUpload,
    videoUrl:fileType
  }
  // console.log('video complete data',videoSubmitData)
  navigation.navigate('CaptureImagePage',{formData:videoSubmitData})
}
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 80, justifyContent: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Upload Your Video</Text>
      </View>
      <View style={{ marginTop: 6 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          {file? <View style={{height:'10%',marginTop:'-20%'}}>
          <VideoPlayer
            videoProps={{
              shouldPlay: true,
              resizeMode: ResizeMode.CONTAIN,
              source: {
                uri: file,
              },
            }}
            style={{
              videoBackgroundColor: 'black',
              height: 200,  // Set the desired height here
            }}
            fullscreen={{ inFullscreen: true, visible: true }} // Enable fullscreen
            showFullscreenButton // Show fullscreen button
          />
        </View>:<TouchableOpacity onPress={uploadVideoData}>
            <Image source={uploadImage} style={{ width: 200, height: 200, marginTop: 20 }} />
           {fileUploadError? <Text style={{color:"red",paddingTop:'8rem',textAlign:'center'}}>{fileUploadError}</Text>:null}
          </TouchableOpacity>}
        </View>
        <View style={{
          backgroundColor: 'blue', borderRadius: 8, width: '95%', marginLeft: 8, marginTop: file?120:30,
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8
        }}>
          <Image source={videoPlayer} style={{ width: 25, height: 25, marginTop: 8, marginBottom: 8 }} />
          <Text style={{ fontSize: 15, color: 'white', paddingTop: 4, paddingBottom: 4 }}>
            Upload video to show up in matches
          </Text>
        </View>
        <View style={{ width: '100%', overflow: 'hidden' }}>
           <Button
                      mode="contained"
                      onPress={videoSubmitHandler}
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
  );
};

export default VideoUpload;
