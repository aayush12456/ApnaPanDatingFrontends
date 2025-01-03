
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector } from 'react-redux';
import { useRef, useEffect,useState } from 'react';
import io from 'socket.io-client';
import * as SecureStore from 'expo-secure-store';
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
import SkipProfilePage from './src/Pages/skipProfilePage/skipProfilePage';
import BlockProfilePage from './src/Pages/blockProfilePage/blockProfilePage';
import AccountSettingsPage from './src/Pages/accountSettingsPage/accountSettingsPage';
import ChangePasswordPage from './src/Pages/changePasswordPage/changePasswordPage';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import MannageAccountPage from './src/Pages/manageAccountPage/manageAccountPage';
import DeactivateAccountPage from './src/Pages/deactivateAccountPage/deactivateAccountPage';
import DeleteAccountPage from './src/Pages/deleteAccountPage/deleteAccountPage';
import LoginWithOtpPage from './src/Pages/loginWithOtpPage/loginWithOtpPage';
import LoginWithOtpDataPage from './src/Pages/loginWithOtpDataPage/loginWithOtpDataPage';
import ForgotPasswordPage from './src/Pages/forgotPasswordPage/forgotPasswordPage';
import ResetPasswordPage from './src/Pages/resetPasswordPage/resetPasswordPage';
import ExpertChatPage from './src/Pages/expertChatPage/expertChatPage';
// import axios from 'axios'
const Stack = createNativeStackNavigator();

function AppContent() {
  const socketRef = useRef(null);
  // const [token,setLoginToken]=useState('')
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const completeLoginObj = useSelector(
    (state) => state?.loginData?.loginData?.completeLoginData
  );
  const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = await SecureStore.getItemAsync('loginToken');
  //       console.log("Fetched Token:", token);
  //       setLoginToken(token);

  //       if (token) {
  //         const result = await verifyToken(token);
  //         console.log('Token verification result:', result);

  //         if (result.message === 'Token is valid') {
  //           setIsAuthenticated(true);
  //         } else {
  //           setIsAuthenticated(false);
  //         }
  //       } else {
  //         setIsAuthenticated(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching login token:", error);
  //       setIsAuthenticated(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

//  const verifyToken = async (token) => {
//     try {
//       const response = await axios.post(
//         `http://192.168.29.169:4000/user/verifyToken`, 
//         {
//           method: 'POST',
//         }, // Empty body for POST
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Error verifying token:', error.response?.data || error.message);
//       throw error;
//     }
//   };



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
  }, [completeLoginObj?._id,completeLoginObjForOtp?._id]);

 
//   const AuthenticatedStack = () => (
//     <Stack.Navigator>
//         <Stack.Screen name="HeaderPage" component={HeaderPage} options={{ headerShown: false }} />
//         {/* Other authenticated screens */}
//     </Stack.Navigator>
// );

// const UnauthenticatedStack = () => (
//     <Stack.Navigator>
//         <Stack.Screen name="FrontPage" component={FrontPage} options={{ headerShown: false }} />

//         {/* Other unauthenticated screens */}
//     </Stack.Navigator>
// );


  return (
    <AlertNotificationRoot>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FrontPage"
          component={FrontPage}
          options={{ headerShown: false }}
        />
          {/* {isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />} */}
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
          name="LoginWithOtpPage"
          component={LoginWithOtpPage}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="LoginWithOtpDataPage"
          component={LoginWithOtpDataPage}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="ForgotPasswordPage"
          component={ForgotPasswordPage}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="ResetPasswordPage"
          component={ResetPasswordPage}
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
          <Stack.Screen
          name="SkipProfilePage"
          component={SkipProfilePage}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="BlockProfilePage"
          component={BlockProfilePage}
          options={{ headerShown: false }}
        />
            <Stack.Screen
          name="AccountSettingsPage"
          component={AccountSettingsPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePasswordPage"
          component={ChangePasswordPage}
          options={{ headerShown: false }}
        />
            <Stack.Screen
          name="ManageAccountPage"
          component={MannageAccountPage}
          options={{ headerShown: false }}
        />
           <Stack.Screen
          name="DeactivateAccountPage"
          component={DeactivateAccountPage}
          options={{ headerShown: false }}
        />
           <Stack.Screen
          name="DeleteAccountPage"
          component={DeleteAccountPage}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="ExpertChatPage"
          component={ExpertChatPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    </AlertNotificationRoot>
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
