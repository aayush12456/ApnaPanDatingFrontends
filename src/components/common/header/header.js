import {Image,Text,Pressable,View} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Matches from '../../matches/matches.js'
import NewAndOnline from '../../newAndOnline/newAndOnline';
import matches from '../../../../assets/sidebarIcons/profileMatch.png'
import girl from '../../../../assets/sidebarIcons/girl.png'
import boy from '../../../../assets/sidebarIcons/boy.png'
import search from '../../../../assets/sidebarIcons/search.png'
import likes from '../../../../assets/sidebarIcons/heart.png'
import messages from '../../../../assets/sidebarIcons/messenger.png'
import settings from '../../../../assets/sidebarIcons/settings.png'
import visitors from '../../../../assets/sidebarIcons/interest.png'
import * as SecureStore from 'expo-secure-store';
import io from "socket.io-client";
import { useEffect, useState } from 'react';
import MyProfile from '../../myProfile/myProfile.js';
import Likes from '../../likes/likes.js';
import FrontPage from '../../frontPage/frontPage.js';
import Message from '../../message/message.js';
import {useSelector} from 'react-redux'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
import Visitors from '../../visitors/visitors.js';
import Settings from '../../settings/settings.js';
const socket = io.connect("http://192.168.29.169:4000")
const Header=()=>{
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();
    const [loginData, setLoginData] = useState(null);
    const [loginId,setLoginId]=useState('')
    const [likeCountObj,setLikeCountObj]=useState('')
    const [visitorCountObj,setVisitorCountObj]=useState('')
    const [recordMessage, setRecordMessage] = useState([])
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
 
 const loginResponse=useSelector((state)=>state.loginData.loginData.token)
 const loginOtpResponse=useSelector((state)=>state?.finalLoginWithOtpData?.finalLoginWithOtpData?.token) // otp login token

 useEffect(()=>{
    if(loginResponse || loginOtpResponse){
      const getLoginId = async () => {
        const loginIdData = await SecureStore.getItemAsync('loginId');
        setLoginId(loginIdData)
      };
      getLoginId()
    }
  },[loginResponse,loginOtpResponse])
  console.log('login id in header',loginId)
 useEffect(() => {
    const fetchLikeCountId = async () => {
      try {
        if (loginId) {
          const response = await axios.get(
            `http://192.168.29.169:4000/user/getLikeCount/${loginId}`
          );
     setLikeCountObj(response?.data?.userObj)
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };
  
    fetchLikeCountId();
  
    socket.on("getLikeCountUser", (newUser) => {
  
      setLikeCountObj(newUser)
    });
  
    return () => {
      socket.off("getLikeCountUser");

    };
  }, [loginId]);
  console.log('like count id is',likeCountObj)

const deleteFunction = async () => {
    console.log('delete func invoked');
    try {
        if (!loginId) {
            console.error('loginId is not set');
            return;
        }

        const response = await axios.post(
            `http://192.168.29.169:4000/user/deleteLikeCount`,
             {loginId} 
        );
        console.log('Response in delete like count user', response?.data?.userObj);
        setLikeCountObj(response?.data?.userObj);
    } catch (error) {
        console.error('Error deleting like count:', error?.response?.data || error.message);
    }
};

useEffect(() => {
  const fetchVisitorCountId = async () => {
    try {
      if (loginId) {
        const response = await axios.get(
          `http://192.168.29.169:4000/user/getLikeCount/${loginId}`
        );
   setVisitorCountObj(response?.data?.userObj)
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  fetchVisitorCountId();

  socket.on("getVisitorCountUser", (newUser) => {

    setVisitorCountObj(newUser)
  });

  return () => {
    socket.off("getVisitorCountUser");

  };
}, [loginId]);

const deleteVisitorFunction = async () => {
  console.log('delete visitor func invoked');
  try {
      if (!loginId) {
          console.error('loginId is not set');
          return;
      }

      const response = await axios.post(
          `http://192.168.29.169:4000/user/deleteVisitorCount`,
           {loginId} 
      );
      console.log('Response in delete visitor count user', response?.data?.userObj);
      setVisitorCountObj(response?.data?.userObj);
  } catch (error) {
      console.error('Error deleting visitor count:', error?.response?.data || error.message);
  }
};

useEffect(() => {

  const fetchRecordMessage = async () => {
      try {
        if(loginId){
          const response = await axios.get(`http://192.168.29.169:4000/chat/getRecordMessage/${loginId}`);
          // const response = await axios.get(`https://apnapandaitingwebsitebackend.up.railway.app/chat/getMessage/${id}`);
          // console.log('fetch messages is', response.data.chatUserArray)
          // console.log('fetch message in reciever', response.data.recieverChatUserArray)
          setRecordMessage(response.data);

        }
      } catch (error) {
          console.error("Error fetching messages:", error);
      }
  };
  fetchRecordMessage()
  socket.on('recieveRecordMessageId', (newMessage) => {
    setRecordMessage(newMessage);
  })
  return () => {
      socket.off('recieveRecordMessageId')
  }
}, [loginId])

console.log('record message obj',recordMessage)



return (
    <>
     <Drawer.Navigator>
     <Drawer.Screen
        name='My Profile'
        component={MyProfile}
        options={{ 
          drawerLabel: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* User Name */}
              <Text style={{ fontSize: 16, color: 'black', marginRight: 10 }}>
                {loginData?.name || 'data'}
              </Text>
              {/* Settings Icon */}
              <Pressable   onPress={() => navigation.navigate('Settings')}>
              <Image
                source={settings} // Replace with your settings image path
                style={{ width: 24, height: 24 }}
              />
              </Pressable>
            </View>
          ),
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
    drawerLabel: ({ focused }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: focused ? 'blue' : 'black' }}>Likes</Text>
        {likeCountObj?._id === loginId && likeCountObj?.counter!==null && likeCountObj?.counter!==""? (
          <View
            style={{
              marginLeft: 8, // Adjust space between "Likes" and the badge
              borderRadius: 20,
              width: 20,
              height: 20,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>{likeCountObj?.counter}</Text>
          </View>
        ) : null}
      </View>
    ),
    drawerIcon: () => (
      <Image
        source={likes}
        style={{ width: 25, height: 25 }}
      />
    ),
  }}
  listeners={{
    focus: () => {
      deleteFunction();
    },
  }}
/>



{/* 
    <Drawer.Screen
        name="Messages"
        component={Message}
        options={{ 
            drawerLabel: 'Messages',
            drawerIcon:()=>(
                <Image  source={messages}
                style={{ width: 25, height: 25 }}/>
            ),
         }}
      />  */}
      <Drawer.Screen
  name="Messages"
  component={Message}
  options={{
    drawerLabel: ({ focused }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: focused ? 'blue' : 'black' }}>Messages</Text>
        {recordMessage?.recordMessageIdArray?.length>0 && recordMessage.id===loginId? (
          <View
            style={{
              marginLeft: 8, // Adjust space between "Likes" and the badge
              borderRadius: 20,
              width: 20,
              height: 20,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>{recordMessage.recordMessageIdArray.length>0?recordMessage.recordMessageIdArray.length:null}</Text>
          </View>
        ) : null}
      </View>
    ),
    drawerIcon: () => (
      <Image
        source={messages}
        style={{ width: 25, height: 25 }}
      />
    ),
  }}

/>

       {/* <Drawer.Screen
        name="Visitors"
        component={Visitors}
        options={{ 
            drawerLabel: 'Visitors',
            drawerIcon:()=>(
                <Image  source={visitors}
                style={{ width: 25, height: 25 }}/>
            ),
         }}
      /> */}
      <Drawer.Screen
  name="Visitors"
  component={Visitors}
  options={{
    drawerLabel: ({ focused }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: focused ? 'blue' : 'black' }}>Visitors</Text>
        {visitorCountObj?._id === loginId && visitorCountObj?.visitorCounter!==null && visitorCountObj?.visitorCounter!==""? (
          <View
            style={{
              marginLeft: 8, // Adjust space between "Likes" and the badge
              borderRadius: 20,
              width: 20,
              height: 20,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>{visitorCountObj?.visitorCounter}</Text>
          </View>
        ) : null}
      </View>
    ),
    drawerIcon: () => (
      <Image
        source={visitors}
        style={{ width: 25, height: 25 }}
      />
    ),
  }}
  listeners={{
    focus: () => {
      deleteVisitorFunction();
    },
  }}
/>
          
<Drawer.Screen
    name="Settings"
    component={Settings} // Your settings component
    options={{
      drawerLabel: () => null, // Remove label
      drawerIcon: () => null, // Remove icon
      headerShown: true, // Optional: hide header if needed
      drawerActiveBackgroundColor: 'transparent', 
      drawerInactiveBackgroundColor: 'transparent', 
      drawerItemStyle: { display: 'none' }
    }}
  />


     </Drawer.Navigator>
    </>
)
}
export default Header