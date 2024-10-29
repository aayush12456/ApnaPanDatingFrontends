import { Text } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Sidebar=()=>{
  const Drawer = createDrawerNavigator();
  const Feed = () => <Text>Feed Screen</Text>;
const Notifications = () => <Text>Notifications Screen</Text>;
const Profile = () => <Text>Profile Screen</Text>;
return (
    <>
    {/* <Card >
    <Card.Content>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
    </Card.Content>
  </Card> */}
 {/* <Drawer.Navigator initialRouteName="Feed">
      <Drawer.Screen
        name="Feed"
        component={Feed}
        options={{ drawerLabel: 'Home' }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{ drawerLabel: 'Updates' }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ drawerLabel: 'Profile' }}
      />
    </Drawer.Navigator> */}

    </>
)
}
export default Sidebar