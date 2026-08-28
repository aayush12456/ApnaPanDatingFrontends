import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar,Image ,Text,View} from 'react-native';
import AdminPage from '../../../Pages/adminPage/adminPage';
import registerIcon from "../../../../assets/adminIcon/register.png"
import adminIcon from "../../../../assets/adminIcon/admin.png"
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
const AdminHeader=()=>{
    const Drawer = createDrawerNavigator();
    const navigation=useNavigation()
    const CustomDrawerContent = (props) => {
      const handleSignOut=()=>{
navigation.navigate('LoginPage')
      }
      return (
        <View style={{ flex: 1, backgroundColor: '#343434',marginTop:30 }}>
    
          {/* Drawer ke top par centered image */}
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
    
          {/* Drawer ke normal screens */}
          <View style={{ flex: 1 }}>
            {props.state.routes.map((route, index) => {
              const focused = props.state.index === index;
    
              return (
                <View
                  key={route.key}
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
                      fontWeight: focused ? 'bold' : '500',
                      marginLeft: 15,
                      fontSize: 15,
                    }}
                    onPress={() => props.navigation.navigate(route.name)}
                  >
                    Register User
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={{ paddingHorizontal: 15, paddingVertical: 15, borderTopWidth: 1, borderTopColor: "#555", }} > 
          <Button mode="contained" buttonColor="red" textColor="white" icon="logout" style={{ borderRadius: 8, }} contentStyle={{ height: 45, }} onPress={handleSignOut} >
             Sign Out </Button> 
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
            backgroundColor: '#343434',
          },

          headerStyle: {
            backgroundColor: '#343434',
          },

          headerTintColor: 'white',
        }}
      >

<Drawer.Screen
          name="Admin"
          options={{
            drawerLabel: ({ focused }) => (
              <Text
                style={{
                  color: 'white',
                  fontWeight: focused ? 'bold' : '500',
                }}
              >
                Register User
              </Text>
            ),

            drawerIcon: ({ focused }) => (
              <Image
                source={registerIcon}
                style={{
                  width: 28,
                  height: 28,
                  tintColor: focused ? "white" : "white",
                }}
              />
            ),
          }}
        >
          {(props) => <AdminPage />}
        </Drawer.Screen>
    </Drawer.Navigator>
    </>
)
}
export default AdminHeader