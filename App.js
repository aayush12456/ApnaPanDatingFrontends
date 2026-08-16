
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector } from 'react-redux';
import { useRef, useEffect,useState } from 'react';
import {Toast, AlertNotificationRoot } from 'react-native-alert-notification';
import * as SecureStore from 'expo-secure-store';
import {Image} from 'react-native'
import {Text} from 'react-native-paper'
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
import SkipProfilePage from './src/Pages/skipProfilePage/skipProfilePage';
import BlockProfilePage from './src/Pages/blockProfilePage/blockProfilePage';
import AccountSettingsPage from './src/Pages/accountSettingsPage/accountSettingsPage';
import ChangePasswordPage from './src/Pages/changePasswordPage/changePasswordPage';
import MannageAccountPage from './src/Pages/manageAccountPage/manageAccountPage';
import DeactivateAccountPage from './src/Pages/deactivateAccountPage/deactivateAccountPage';
import DeleteAccountPage from './src/Pages/deleteAccountPage/deleteAccountPage';
import LoginWithOtpPage from './src/Pages/loginWithOtpPage/loginWithOtpPage';
import LoginWithOtpDataPage from './src/Pages/loginWithOtpDataPage/loginWithOtpDataPage';
import ForgotPasswordPage from './src/Pages/forgotPasswordPage/forgotPasswordPage';
import ResetPasswordPage from './src/Pages/resetPasswordPage/resetPasswordPage';
import ExpertChatPage from './src/Pages/expertChatPage/expertChatPage';
import axios from 'axios'
import EditSongsPage from './src/Pages/editSongsPage/editSongsPage';
import CaptureImagePage from './src/Pages/captureImagePage/captureImagePage';
import right from './assets/signUpFormIcon/right.png';
import EditBasicInfoPage from './src/Pages/editBasicInfoPage/editBasicInfoPage';
import CompareFacePage from './src/Pages/compareFacePage/compareFacePage';
import AppearancePage from './src/Pages/appearancePage/appearancePage';
import SettingsPage from './src/Pages/settingsPage/settingsPage';
import VerifyOtpPage from './src/Pages/verifyOtpPage/verifyOtpPage';
import NewAndOnlinePage from './src/Pages/newAndOnlinePage/newAndOnlinePage';
import MatchesPage from './src/Pages/matchesPage/matchesPage';
import MessagePage from './src/Pages/messagePage/messagePage';
import CallScreenPage from './src/Pages/callScreenPage/callScreenPage';
import IncomingCallScreenPage from './src/Pages/incomingCallScreenPage/incomingCallScreenPage';
import InternetChecker from './src/components/internetChecker/internetChecker';
import VideoCallScreenPage from './src/Pages/videoCallScreenPage/videoCallScreenPage';
import IncomingVideoCallScreenPage from './src/Pages/incomingVideoCallScreenPage/incomingVideoCallScreenPage';

const Stack = createNativeStackNavigator();
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://apnapandatingbackend.onrender.com")
function AppContent() {
  const BASE_URL = "http://192.168.29.169:4000";
  // const BASE_URL = "https://apnapandatingbackend.onrender.com";
  const socketRef = useRef(null);
  const [visitorNotifyObj, setVisitorNotifyObj] = useState([])
  const [loading, setLoading] = useState(true);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [loginDetails,setLoginDetails]=useState({})

  const darkColors = {
    label: '#ffffff',
    card: 'white',
    overlay: '#444444',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
  };
  
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("loginObj");
  
        console.log("Login Token:", token);
        setLoginDetails(JSON.parse(token))
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    checkToken();
  }, []);

  const finalCompleteObj=loginDetails?.loginData
  const completeLoginObjData=finalCompleteObj || {}

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

      socketRef.current.emit('setup', completeLoginObjData?._id);

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
  }, [completeLoginObjData?._id]);

  // useEffect(() => {
  //   if (!socketRef.current) {
  //     socketRef.current = io('https://apnapandatingbackend.onrender.com', {
  //       transports: ['websocket'], // Only use WebSocket transport
  //       reconnection: true,
  //       reconnectionAttempts: 10,
  //       reconnectionDelay: 1000,
  //       reconnectionDelayMax: 5000,
  //       timeout: 20000,
  //       pingTimeout: 60000,
  //       pingInterval: 25000,
  //     });

  //     socketRef.current.emit('setup', completeLoginObj?._id);

  //     socketRef.current.on('connect', () => {
  //       console.log('Connected to server');
  //       console.log('Socket ID:', socketRef.current.id);
  //     });

  //     socketRef.current.on('disconnect', () => {
  //       console.log('Disconnected from server');
  //     });

  //     socketRef.current.on('connected', () => {
  //       console.log('Socket is connected');
  //     });
  //   }

  //   return () => {
  //     if (socketRef.current) {
  //       socketRef.current.disconnect();
  //     }
  //   };
  // }, [completeLoginObj?._id,completeLoginObjForOtp?._id]);


  




useEffect(() => {

  const fetchVisitorNotify = async () => {
      try {
        if(completeLoginObjData?._id){
          const response = await axios.get(`${BASE_URL}/user/getVisitorCount/${completeLoginObjData?._id}`);
          setVisitorNotifyObj(response.data.userObj);

        }
      } catch (error) {
          // console.error("Error fetching messages:", error);
      }
  };
  fetchVisitorNotify()
  socket.on('getVisitorCountUser', (newVisitorNotifyUser) => {
    setVisitorNotifyObj(newVisitorNotifyUser);
  })
  return () => {
      socket.off('getVisitorCountUser')
  }
}, [completeLoginObjData?._id])
// console.log('visitor notify in app.js',visitorNotifyObj)

useEffect(() => {
  if (visitorNotifyObj?.visitorNotify?.length > 0 && completeLoginObjData._id===visitorNotifyObj.id) {
    visitorNotifyObj?.visitorNotify.map((notify, index) => {
      Toast.show({
        textBody: (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              textAlign: 'left',
            }}
          >
            <Image
              source={{ uri: notify.images }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25, // Circular image
                marginRight: 10,
              }}
            />
            <View>
          <Text style={{color:'black'}}>{notify.visitorName} visited you</Text>
          
          <Text style={{color:'black'}} >please checkout your visitors</Text>
            </View>
            <View style={{width:20,height:20,borderRadius:20,backgroundColor:'black',marginLeft:40,marginTop:-10}}>
            <Image source={right} style={{width:11,height:11,marginTop:4,marginLeft:3,tintColor:'white'}}/>
            </View>
          </View>
        ),
        autoClose: 13000, // Optional: automatically hide after 3 second
 
      });
    });
  }
}, [visitorNotifyObj,completeLoginObjData,visitorNotifyObj?.visitorNotify?.length>0]);
console.log('is log in',isLoggedIn)




  return (
    <AlertNotificationRoot colors={[darkColors]}>
    <NavigationContainer>
    <InternetChecker/>
      {loading?(null):(
      <Stack.Navigator  initialRouteName={isLoggedIn===true ? "HeaderPage" : "LoginPage"}>
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
          name="CaptureImagePage"
          component={CaptureImagePage}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="CompareFacePage"
          component={CompareFacePage}
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
          name="EditBasicInfoPage"
          component={EditBasicInfoPage}
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
          name="EditSongsPage"
          component={EditSongsPage}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="MatchesPage"
          component={MatchesPage}
          options={{ headerShown: false }}
        />
            <Stack.Screen
          name="NewAndOnlinePage"
          component={NewAndOnlinePage}
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
          name="MessagePage"
          component={MessagePage}
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
          <Stack.Screen
          name="AppearancePage"
          component={AppearancePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingsPage"
          component={SettingsPage}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="verifyOtpPage"
          component={VerifyOtpPage}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="CallScreenPage"
          component={CallScreenPage}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="IncomingCallScreenPage"
          component={IncomingCallScreenPage}
          options={{ headerShown: false }}
        />
           <Stack.Screen
          name="VideoCallScreenPage"
          component={VideoCallScreenPage}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="IncomingVideoCallScreenPage"
          component={IncomingVideoCallScreenPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      )
}
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