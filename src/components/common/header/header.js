import {Image,Text} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Matches from '../../matches/matches.js'
import NewAndOnline from '../../newAndOnline/newAndOnline';
import matches from '../../../../assets/sidebarIcons/profileMatch.png'
import girl from '../../../../assets/sidebarIcons/girl.png'
import boy from '../../../../assets/sidebarIcons/boy.png'
import search from '../../../../assets/sidebarIcons/search.png'
import likes from '../../../../assets/sidebarIcons/heart.png'
import messages from '../../../../assets/sidebarIcons/messenger.png'
import visitors from '../../../../assets/sidebarIcons/interest.png'
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import MyProfile from '../../myProfile/myProfile.js';
import Likes from '../../likes/likes.js';
import FrontPage from '../../frontPage/frontPage.js';
const Header=()=>{
    const Drawer = createDrawerNavigator();
    const [loginData, setLoginData] = useState(null);
    // useEffect(() => {
    //   // Using an IIFE (Immediately Invoked Function Expression) to use await directly
    //   (async () => {
    //     const data = await SecureStore.getItemAsync('completeLoginObj');
    //     setLoginData(JSON.parse(data)); // Parse JSON string back to an object and store in state
    //   })();
    // }, []); // Empty dependency array means this runs once on component mount

    useEffect(()=>{
        const getLoginData = async () => {
            const data = await SecureStore.getItemAsync('loginObj');
            setLoginData(JSON.parse(data))
          };
          getLoginData()
    },[])
        console.log('data of login in obj',loginData)
 const newIcon=loginData?.gender === 'Female' ? boy : girl
return (
    <>
     <Drawer.Navigator>
     <Drawer.Screen
        name='My Profile'
        component={MyProfile}
        options={{ 
            drawerLabel: loginData?.name||'data',
            drawerIcon:()=>(
                <Image source={{ uri: loginData?.image }}
                style={{ width: 65, height: 65,borderRadius:30 }}/>
            ),
            drawerLabelStyle: {
                marginLeft:'-13%'
              },
              drawerActiveBackgroundColor: 'none', // No background when active
              drawerInactiveBackgroundColor: 'none', // No background when inactive
              drawerActiveTintColor: 'black', // Set text color as needed
              drawerInactiveTintColor: 'black', // Text color remains the same
         }}
      />

     <Drawer.Screen
        name="Matches"
        component={Matches}
        options={{ 
            drawerLabel: 'Matches',
            drawerIcon:()=>(
                <Image  source={matches}
                style={{ width: 45, height: 45 }}/>
            ),
            drawerLabelStyle: {
                marginLeft:'-13%'
              },
         }}
      />
       <Drawer.Screen
        name="New And Online"
        component={NewAndOnline}
        options={{ 
            drawerLabel: 'New And Online',
            drawerIcon:()=>(
                <Image  source={newIcon}
                style={{ width: 32, height: 32 }}/>
            ),
            drawerLabelStyle: {
                marginLeft:'-3%'
              },
         }}
      />
       <Drawer.Screen
        name="Search"
        component={NewAndOnline}
        options={{ 
            drawerLabel: 'Search',
            drawerIcon:()=>(
                <Image  source={search}
                style={{ width: 28, height:28 }}/>
            ),
         }}
      />
         <Drawer.Screen
        name="Likes"
        component={Likes}
        options={{ 
            drawerLabel: 'Likes',
            drawerIcon:()=>(
                <Image  source={likes}
                style={{ width: 25, height: 25 }}/>
            ),
         }}
      />
       <Drawer.Screen
        name="Messages"
        component={NewAndOnline}
        options={{ 
            drawerLabel: 'Messages',
            drawerIcon:()=>(
                <Image  source={messages}
                style={{ width: 25, height: 25 }}/>
            ),
         }}
      />
       <Drawer.Screen
        name="Visitors"
        component={NewAndOnline}
        options={{ 
            drawerLabel: 'Visitors',
            drawerIcon:()=>(
                <Image  source={visitors}
                style={{ width: 25, height: 25 }}/>
            ),
         }}
      />
          
     </Drawer.Navigator>
    </>
)
}
export default Header