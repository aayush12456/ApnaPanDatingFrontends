import { Modal, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { playVideoModalActions } from '../../../Redux/Slice/playVideoModalSlice/playVideoModalSlice';
import VideoPlayer from 'expo-video-player';
import { ResizeMode } from 'expo-av';
import { useState } from 'react';

const PlayVideo = () => {
  const [playVideo, setPlayVideo] = useState(true);
  const dispatch = useDispatch();
  const containerStyle = { backgroundColor: 'white', zIndex: 20, width: '86%', marginLeft: 30 };
  const playVideoModalOpenSelector = useSelector((state) => state.playVideoModal.playVideoModalToggle);
  const playVideoSelector = useSelector((state) => state.passVideoData.passVideoData);

  const togglePlayVideoModalHandler = () => {
    setPlayVideo(false);  // Stop the video before closing
    setTimeout(() => {
      dispatch(playVideoModalActions.playVideoModalToggle());
    }, 100);  // Slight delay to ensure playVideo is set to false first
  };

  const videoUrl = playVideoSelector?.videoUrl?.endsWith('.mkv')
    ? playVideoSelector.videoUrl.replace('.mkv', '.mp4')
    : playVideoSelector?.videoUrl;

  return (
    <>
      <Portal>
        <Modal
          visible={playVideoModalOpenSelector}
          onDismiss={togglePlayVideoModalHandler}
          contentContainerStyle={containerStyle}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          {playVideo && (
            <VideoPlayer
              videoProps={{
                shouldPlay: playVideo,
                resizeMode: ResizeMode.CONTAIN,
                source: {
                  uri: videoUrl?videoUrl:'', // Default URL if videoUrl is not available
                },
              }}
              style={{
                height: 200  // Set the desired height here
              }}
              onDismiss={togglePlayVideoModalHandler}
            />
          )}
        </Modal>
      </Portal>
    </>
  );
};

export default PlayVideo;
