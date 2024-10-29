import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FrontPage from './src/components/frontPage/frontPage';
import SignUpPage from './src/Pages/signUpPage/signUpPage';
import AdditionalPage from './src/Pages/additionalPage/additionalPage';
import AdditionalDataPage from './src/Pages/additionalDataPage/additionalDataPage';
import AboutMePage from './src/Pages/aboutMePage/aboutMePage';
import VideoUploadPage from './src/Pages/videoUploadPage/videoUploadPage';
import ImageUploadPage from './src/Pages/imageUploadPage/imageUploadPage';
import VideoRecordPage from './src/Pages/videoRecordPage/videoRecordPage';
import { Provider } from 'react-redux';
import store from './src/Redux/Store/store';
import LoginPage from './src/Pages/loginPage/loginPage';
import HeaderPage from './src/Pages/headerPage/headerPage';
import EditProfilePage from './src/Pages/editProfilePage/editProfilePage';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <Provider store={store}>
    <PaperProvider>
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
              name="EditProfilePage"
              component={EditProfilePage}
              options={{ headerShown: false }}
            />
            
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </PaperProvider>
    </Provider>
     
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
