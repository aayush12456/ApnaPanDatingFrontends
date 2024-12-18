
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import io from 'socket.io-client';

import store from './src/Redux/Store/store';

import FrontPage from './src/components/frontPage/frontPage';
import SignUpPage from './src/Pages/signUpPage/signUpPage';
import AdditionalPage from './src/Pages/additionalPage/additionalPage';
import AdditionalDataPage from './src/Pages/additionalDataPage/additionalDataPage';
import AboutMePage from './src/Pages/aboutMePage/aboutMePage';
import VideoUploadPage from './src/Pages/videoUploadPage/videoUploadPage';
import ImageUploadPage from './src/Pages/imageUploadPage/imageUploadPage';
import VideoRecordPage from './src/Pages/videoRecordPage/videoRecordPage';
import LoginPage from './src/Pages/loginPage/loginPage';
import HeaderPage from './src/Pages/headerPage/headerPage';
import EditProfilePage from './src/Pages/editProfilePage/editProfilePage';
import EditRelationPage from './src/Pages/editRelationPage/editRelationPage';
import EditLookingForPage from './src/Pages/editLookingForPage/editLookingForPage';
import EditEducationPage from './src/Pages/editEducationPage/editEducationPage';
import EditProfessionPage from './src/Pages/editProfessionPage/editProfessionPage';
import EditDrinkingPage from './src/Pages/editDrinkingPage/editDrinkingPage';
import EditSmokingPage from './src/Pages/editSmokingPage/editSmokingPage';
import EditEatingPage from './src/Pages/editEatingPage/editEatingPage';
import EditZodiacPage from './src/Pages/editZodiacPage/editZodiacPage';
import EditAboutMePage from './src/Pages/editAboutMePage/editAboutMePage';
import EditLanguagePage from './src/Pages/editLanguagePage/editLanguagePage';
import EditInterestPage from './src/Pages/editInterestPage/editInterestPage';
import MyPhotoPage from './src/Pages/myPhotoPage/myPhotoPage';
import NewAndOnlinePageContent from './src/Pages/newAndOnlinePageContent/newAndOnlinePageContent';
import AnotherMatchCardPage from './src/Pages/anotherMatchCardPage/anotherMatchCardPage';
import { LogBox } from 'react-native';
import LikePageContent from './src/Pages/likePageContent/likePageContent';
import VisitorPageContent from './src/Pages/visitorPageContent/visitorPageContent';
import MessageDetailsPageContent from './src/Pages/messageDetailsPageContent/messageDetailsPageContent';
import MessageProfilePage from './src/Pages/messageProfilePage/messageProfilePage';
const Stack = createNativeStackNavigator();

function AppContent() {
  const socketRef = useRef(null);
  const completeLoginObj = useSelector(
    (state) => state?.loginData?.loginData?.completeLoginData
  );

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://192.168.29.169:4000', {
        transports: ['websocket'], // Only use WebSocket transport
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        pingTimeout: 60000,
        pingInterval: 25000,
      });

      socketRef.current.emit('setup', completeLoginObj?._id);

      socketRef.current.on('connect', () => {
        console.log('Connected to server');
        console.log('Socket ID:', socketRef.current.id);
      });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      socketRef.current.on('connected', () => {
        console.log('Socket is connected');
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [completeLoginObj?._id]);

 



  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FrontPage"
          component={FrontPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpPage"
          component={SignUpPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdditionalPage"
          component={AdditionalPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdditionalDataPage"
          component={AdditionalDataPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AboutMePage"
          component={AboutMePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideoRecordPage"
          component={VideoRecordPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideoUploadPage"
          component={VideoUploadPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ImageUploadPage"
          component={ImageUploadPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HeaderPage"
          component={HeaderPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyPhotoPage"
          component={MyPhotoPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfilePage"
          component={EditProfilePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditRelationPage"
          component={EditRelationPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditLookingForPage"
          component={EditLookingForPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditEducationPage"
          component={EditEducationPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfessionPage"
          component={EditProfessionPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditDrinkingPage"
          component={EditDrinkingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditSmokingPage"
          component={EditSmokingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditEatingPage"
          component={EditEatingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditZodiacPage"
          component={EditZodiacPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditAboutMePage"
          component={EditAboutMePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditLanguagePage"
          component={EditLanguagePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditInterestPage"
          component={EditInterestPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewAndOnlinePageContent"
          component={NewAndOnlinePageContent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AnotherMatchCardPage"
          component={AnotherMatchCardPage}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="LikePageContent"
          component={LikePageContent}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="VisitorPageContent"
          component={VisitorPageContent}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="MessageDetailsPageContent"
          component={MessageDetailsPageContent}
          options={{ headerShown: false }}
        />
              <Stack.Screen
          name="MessageProfilePage"
          component={MessageProfilePage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default function App() {
  LogBox.ignoreLogs(['Warning: VideoPlayer: Support for defaultProps will be removed']);
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppContent />
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
