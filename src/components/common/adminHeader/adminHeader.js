
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar, Image, Text, View } from 'react-native';
import AdminPage from '../../../Pages/adminPage/adminPage';
import registerIcon from "../../../../assets/adminIcon/register.png";
import adminIcon from "../../../../assets/adminIcon/admin.png";
import reportIcon from "../../../../assets/adminIcon/report.png";
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import ReportUserPages from "../../../Pages/reportUserPages/reportUserPages"
import CredentialsPage from '../../../Pages/credentialsPage/credentialsPage';

const AdminHeader = () => {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();

  const CustomDrawerContent = (props) => {

    const handleSignOut = () => {
      navigation.navigate('LoginPage');
    };

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#343434',
          marginTop: 30
        }}
      >

        {/* Admin Icon */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 25,
          }}
        >
          <Image
            source={adminIcon}
            style={{
              width: 90,
              height: 90,
              resizeMode: 'contain',
            }}
          />
        </View>


        {/* Drawer Items */}
        <View style={{ flex: 1 }}>

          {/* Register User */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              paddingHorizontal: 20,
            }}
          >
            <Image
              source={registerIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: 'white',
              }}
            />

            <Text
              style={{
                color: 'white',
                marginLeft: 15,
                fontSize: 15,
                fontWeight: '500',
              }}
              onPress={() => {
                props.navigation.navigate('Admin');
              }}
            >
              Register User
            </Text>
          </View>


          {/* Report User */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              paddingHorizontal: 20,
            }}
          >
            <Image
              source={reportIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: 'white',
              }}
            />

            <Text
              style={{
                color: 'white',
                marginLeft: 15,
                fontSize: 15,
                fontWeight: '500',
              }}
              onPress={() => {
                props.navigation.navigate('Report User');
              }}
            >
              Report User
            </Text>
          </View>
          <View 
  style={{ 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
  }}
>
  <Image 
    source={reportIcon} 
    style={{ 
      width: 28, 
      height: 28, 
      tintColor: 'white', 
    }} 
  />

  <Text 
    style={{ 
      color: 'white', 
      marginLeft: 15, 
      fontSize: 15, 
      fontWeight: '500', 
    }}
    onPress={() => {
      props.navigation.navigate('Credentials');
    }}
  >
    Credentials
  </Text>
</View>
        </View>


        {/* Sign Out */}
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 15,
            borderTopWidth: 1,
            borderTopColor: "#555",
          }}
        >
          <Button
            mode="contained"
            buttonColor="red"
            textColor="white"
            icon="logout"
            style={{
              borderRadius: 8,
            }}
            contentStyle={{
              height: 45,
            }}
            onPress={handleSignOut}
          >
            Sign Out
          </Button>
        </View>

      </View>
    );
  };


  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor="#343434"
        barStyle="light-content"
      />

<Drawer.Navigator
  drawerContent={(props) => (
    <CustomDrawerContent {...props} />
  )}
  screenOptions={{
    drawerStyle: {
      backgroundColor: "#343434",
    },

    sceneStyle: {
      backgroundColor: "black",
    },

    headerStyle: {
      backgroundColor: "#343434",
    },

    headerTintColor: "white",
  }}
>
  <Drawer.Screen
    name="Admin"
    options={{
      drawerItemStyle: {
        display: "none",
      },
    }}
  >
    {() => <AdminPage />}
  </Drawer.Screen>

  <Drawer.Screen
    name="Report User"
    options={{
      drawerItemStyle: {
        display: "none",
      },
    }}
  >
    {() => <ReportUserPages />}
  </Drawer.Screen>

  <Drawer.Screen
    name="Credentials"
    options={{
      drawerItemStyle: {
        display: "none",
      },
    }}
  >
    {() => <CredentialsPage/>}
  </Drawer.Screen>
</Drawer.Navigator>
    </>
  );
};

export default AdminHeader;

