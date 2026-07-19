import {Image,Text,Pressable,View,Dimensions,  StatusBar} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import matches from '../../../../assets/sidebarIcons/profileMatch.png'
import girl from '../../../../assets/sidebarIcons/girl.png'
import boy from '../../../../assets/sidebarIcons/boy.png'
// import search from '../../../../assets/sidebarIcons/search.png'
import likes from '../../../../assets/sidebarIcons/heart.png'
import messages from '../../../../assets/sidebarIcons/messenger.png'
import settings from '../../../../assets/sidebarIcons/settings.png'
import visitors from '../../../../assets/sidebarIcons/interest.png'
import * as SecureStore from 'expo-secure-store';
import io from "socket.io-client";
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
import SettingsPage from '../../../Pages/settingsPage/settingsPage.js';
import VisitorPage from '../../../Pages/visitorPage/visitorPage.js';
import MessagePage from '../../../Pages/messagePage/messagePage.js';
import LikesPage from '../../../Pages/likesPage/likesPage.js';
import NewAndOnlinePage from '../../../Pages/newAndOnlinePage/newAndOnlinePage.js';
import MatchesPage from '../../../Pages/matchesPage/matchesPage.js';
import MyProfilePage from '../../../Pages/myProfilePage/myProfilePage';

const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://apnapandatingbackend.onrender.com")
const Header=()=>{
  const BASE_URL = "http://192.168.29.169:4000";
  // const BASE_URL = "https://apnapandatingbackend.onrender.com";
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();
    const [loginDetails, setLoginDetails] = useState(null);
    // const [loginId,setLoginId]=useState('')
    const [likeCountObj,setLikeCountObj]=useState('')
    const [visitorCountObj,setVisitorCountObj]=useState('')
    const [recordMessage, setRecordMessage] = useState([])
    const [onlineUsers,setOnlineUsers]=useState([]);
   
    // const completeLoginObjForOtp=useSelector((state)=>state?.finalLoginWithOtpData?.finalLoginWithOtpData?.completeLoginData)
    // const completeLoginObj = useSelector(
    //   (state) => state?.loginData?.loginData?.completeLoginData
    // );
    // const completeLoginObjData=completeLoginObj || completeLoginObjForOtp || {}
    useEffect(()=>{
      const getLoginData = async () => {
          const data = await SecureStore.getItemAsync('loginObj');
          setLoginDetails(JSON.parse(data))
        };
        getLoginData()
  },[])


    const finalCompleteObj=loginDetails?.loginData
console.log('final complete header',finalCompleteObj)



   
        console.log('data of login in obj',loginDetails)
 const newIcon=finalCompleteObj?.gender === 'Female' ? boy : girl
 const loginId=finalCompleteObj?.userId
 console.log('login is',loginId)
 const loginObj=finalCompleteObj
 
//  const loginResponse=useSelector((state)=>state?.loginData?.loginData?.token)
//  const loginOtpResponse=useSelector((state)=>state?.finalLoginWithOtpData?.finalLoginWithOtpData?.token) // otp login token

//  useEffect(()=>{
//     if(loginResponse || loginOtpResponse){
//       const getLoginId = async () => {
//         const loginIdData = await SecureStore.getItemAsync('loginId');
//         setLoginId(loginIdData)
//       };
//       getLoginId()
//     }
//   },[loginResponse,loginOtpResponse])
  // console.log('login id in header',loginId)
 useEffect(() => {
    const fetchLikeCountId = async () => {
      try {
        if (loginId) {
          const response = await axios.get(
            `${BASE_URL}/user/getLikeCount/${loginId}`
          );
     setLikeCountObj(response?.data?.userObj)
        }
      } catch (error) {
        // console.error("Error fetching matches:", error);
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
  // console.log('like count id is',likeCountObj)

const deleteFunction = async () => {
    // console.log('delete func invoked');
    try {
        if (!loginId) {
            // console.error('loginId is not set');
            return;
        }

        const response = await axios.post(
            `${BASE_URL}/user/deleteLikeCount`,
             {loginId} 
        );
        // console.log('Response in delete like count user', response?.data?.userObj);
        setLikeCountObj(response?.data?.userObj);
    } catch (error) {
        // console.error('Error deleting like count:', error?.response?.data || error.message);
    }
};

useEffect(() => {
  const fetchVisitorCountId = async () => {
    try {
      if (loginId) {
        const response = await axios.get(
          `${BASE_URL}/user/getVisitorCount/${loginId}`
        );
   setVisitorCountObj(response?.data?.userObj)
      }
    } catch (error) {
      // console.error("Error fetching matches:", error);
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
// console.log('visitor count obj',visitorCountObj)
const deleteVisitorFunction = async () => {
  // console.log('delete visitor func invoked');
  try {
      if (!loginId) {
          // console.error('loginId is not set');
          return;
      }

      const response = await axios.post(
          `${BASE_URL}/user/deleteVisitorCount`,
           {loginId} 
      );
      // console.log('Response in delete visitor count user', response?.data?.userObj);
      setVisitorCountObj(response?.data?.userObj);
  } catch (error) {
      // console.error('Error deleting visitor count:', error?.response?.data || error.message);
  }
};

useEffect(() => {

  const fetchRecordMessage = async () => {
      try {
        if(loginId){
          const response = await axios.get(`${BASE_URL}/chat/getRecordMessage/${loginId}`);
          setRecordMessage(response.data);

        }
      } catch (error) {
          // console.error("Error fetching messages:", error);
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

// console.log('record message obj',recordMessage)
const { width, height } = Dimensions.get('window')
const count=parseInt(likeCountObj?.counter || 0)+parseInt(visitorCountObj?.visitorCounter || 0)

useEffect(()=>{

  if(loginId){

      socket.emit("registerUser",loginId);

  }

},[loginId]);

useEffect(()=>{

socket.on("onlineUsers",(users)=>{

    setOnlineUsers(users);

});

return ()=>{

    socket.off("onlineUsers");

}

},[]);

console.log('online user array',onlineUsers)



return (
    <>
        <StatusBar
      translucent={false}
      backgroundColor="#343434"
      barStyle="light-content"
    />
 <Drawer.Navigator 
  screenOptions={{
    drawerStyle: {
      backgroundColor: `#343434`
    },

    headerStyle: {
      backgroundColor: `#343434`
    },
    headerTintColor: `white`, // 🔹 Header text ka color
  }}
>
<Drawer.Screen
  name="My Profile"
  options={{
    drawerLabel: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 16,
            color:'white',
            marginRight: 60,
          }}
        >
          {loginObj?.name || 'data'}
        </Text>

       
      </View>
    ),

    drawerIcon: () => (
      <Image
        source={{ uri: loginObj?.image }}
        style={{ width: 65, height: 65, borderRadius: 30 }}
      />
    ),

    drawerLabelStyle: {
      marginLeft: '-13%',
    },

    drawerActiveBackgroundColor: 'none',
    drawerInactiveBackgroundColor: 'none',
    drawerActiveTintColor: 'black',
    drawerInactiveTintColor: 'black',
  }}
>
  {(props) => (
    <MyProfilePage
      {...props}
      loginId={loginId}
      loginObj={finalCompleteObj}
    />
  )}
</Drawer.Screen>

<Drawer.Screen
  name="Matches"
  options={{
    drawerLabel: ({ focused }) => (
      <View
        style={{
          flexDirection: 'row',
          position: 'relative',
          left: 0,
          
        }}
      >
        <Text
          style={{
            color:
              focused?'white':'white',             
            fontWeight: '500',
          }}
        >
          Matches
        </Text>
      </View>
    ),

    drawerIcon: () => (
      <Image
        source={matches}
        style={{
          width: 45,
          height: 45,
          tintColor:
           'white'
        }}
      />
    ),

    drawerLabelStyle: {
      marginLeft: '-13%',
      fontWeight: '500',
      color:
        'white',
    },

    headerRight: () => {
      if (
        likeCountObj?._id === loginId ||
        visitorCountObj?._id === loginId
      ) {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'left',
              marginRight: 100,
              justifyContent: 'flex-start',
              right: '100%',
            }}
          >
            {count > 0 && (
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: 'red',
                  width: width * 0.05,
                  height: width * 0.05,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: width * 0.03,
                    fontWeight: 'bold',
                  }}
                >
                  {count}
                </Text>
              </View>
            )}
          </View>
        );
      }

      return null;
    },
  }}
>
  {(props) => (
    <MatchesPage
      {...props}
      loginId={loginId}
      finalCompleteObj={finalCompleteObj}
      onlineUserArray={onlineUsers}
    />
  )}
</Drawer.Screen>
<Drawer.Screen
  name="New And Online"
  options={{
    drawerLabel: ({ focused }) => (
      <View style={{ flexDirection: 'row', position: 'relative'}}>
        <Text
          style={{
            color: focused?'white':'white',
             
            fontWeight: '500',
          }}
        >
          New And Online
        </Text>
      </View>
    ),

    drawerIcon: () => (
      <Image
        source={newIcon}
        style={{
          width: 32,
          height: 32,
          tintColor:'white',
        }}
      />
    ),

    drawerLabelStyle: {
      marginLeft: '-3%',
      fontWeight: '500',
      color:
      finalCompleteObj?.appearanceMode === 'Dark Mode'
          ? 'white'
          : 'black',
    },

    headerRight: () => {
      if (
        likeCountObj?._id === loginId ||
        visitorCountObj?._id === loginId
      ) {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'left',
              marginRight: 130,
              justifyContent: 'flex-start',
              position: 'absolute',
              right: '125%',
            }}
          >
            {count > 0 && (
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: 'red',
                  width: width * 0.05,
                  height: width * 0.05,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: width * 0.03,
                    fontWeight: 'bold',
                  }}
                >
                  {count}
                </Text>
              </View>
            )}
          </View>
        );
      }

      return null;
    },
  }}
>
  {(props) => (
    <NewAndOnlinePage
      {...props}
      loginId={loginId}
      finalCompleteObj={finalCompleteObj}
    />
  )}
</Drawer.Screen>
       {/* <Drawer.Screen
        name="Search"
        component={NewAndOnline}
        options={{ 
            drawerLabel: 'Search',
            drawerIcon:()=>(
                <Image  source={search}
                style={{ width: 28, height:28 }}/>
            ),
         }}
      /> */}
<Drawer.Screen
  name="Likes"
  options={{
    drawerLabel: ({ focused }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            color: focused
              ? 'white':'white',
            fontWeight: "500",
          }}
        >
          Likes
        </Text>

        {likeCountObj?.counter &&
        likeCountObj?._id === loginId &&
        likeCountObj?.counter !== null &&
        likeCountObj?.counter !== "" ? (
          <View
            style={{
              marginLeft: 8,
              borderRadius: 20,
              width: 20,
              height: 20,
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>
              {likeCountObj?.counter}
            </Text>
          </View>
        ) : null}
      </View>
    ),

    drawerIcon: () => (
      <Image
        source={likes}
        style={{
          width: 25,
          height: 25,
          tintColor:'white',
        }}
      />
    ),

    headerRight: () => {
      if (
        likeCountObj?._id === loginId ||
        visitorCountObj?._id === loginId
      ) {
        return (
          <View
            style={{
              flexDirection: "row",
              marginRight: 70,
              right: "100%",
            }}
          >
            {count > 0 && (
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "red",
                  width: width * 0.05,
                  height: width * 0.05,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: width * 0.03,
                    fontWeight: "bold",
                  }}
                >
                  {count}
                </Text>
              </View>
            )}
          </View>
        );
      }

      return null;
    },
  }}
  listeners={{
    focus: () => {
      deleteFunction();
    },
  }}
>
  {(props) => (
    <LikesPage
      {...props}
      loginId={loginId}
      finalCompleteObj={finalCompleteObj}
    />
  )}
</Drawer.Screen>

<Drawer.Screen
  name="Messages"
  options={{
    drawerLabel: ({ focused }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            color: focused?'white':"white",
            fontWeight: '500',
          }}
        >
          Messages
        </Text>

        {recordMessage?.recordMessageIdArray?.length > 0 &&
        recordMessage.id === loginId ? (
          <View
            style={{
              marginLeft: 8,
              borderRadius: 20,
              width: 20,
              height: 20,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              {recordMessage.recordMessageIdArray.length}
            </Text>
          </View>
        ) : null}
      </View>
    ),

    drawerIcon: () => (
      <Image
        source={messages}
        style={{
          width: 25,
          height: 25,
          tintColor:'white',
        
        }}
      />
    ),

    headerRight: () => {
      if (
        (likeCountObj?._id === loginId ||
          visitorCountObj?._id === loginId) &&
        recordMessage.id === loginId
      ) {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'left',
              marginRight: 115,
              justifyContent: 'flex-start',
              right: '100%',
            }}
          >
            {count > 0 && (
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: 'red',
                  width: width * 0.05,
                  height: width * 0.05,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: width * 0.03,
                    fontWeight: 'bold',
                  }}
                >
                  {count}
                </Text>
              </View>
            )}
          </View>
        );
      }

      return null;
    },
  }}
>
  {(props) => (
    <MessagePage
      {...props}
      loginId={loginId}
      finalCompleteObj={finalCompleteObj}
      onlineUserArray={onlineUsers}
    />
  )}
</Drawer.Screen>

      {/* <Drawer.Screen
  name="Visitors"
  component={VisitorPage}
  options={{
    drawerLabel: ({ focused }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: focused ? `${completeObj?.appearanceMode === 'Dark Mode' ? '#87CEEB' : 'blue'}` :`${completeObj?.appearanceMode === 'Dark Mode' ? 'white' : 'black'}` ,fontWeight:'500' }}>Visitors</Text>
        {visitorCountObj?.visitorCounter && visitorCountObj?._id === loginId && visitorCountObj?.visitorCounter!==null && visitorCountObj?.visitorCounter!==""? (
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
        style={{ width: 25, height: 25,tintColor:`${completeObj?.appearanceMode === 'Dark Mode' ? 'white' : 'black'}` }}
      />
    ),
    headerRight: () => {
      if (likeCountObj?._id === loginId || visitorCountObj?._id === loginId  ) {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'left',
              marginRight:90,
             justifyContent:'flex-start',
             right:'100%'
            }}
          >
            {count > 0 && (
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: 'red',
                  width: width * 0.05,
                  height: width * 0.05,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: width * 0.03,
                    fontWeight: 'bold',
                  }}
                >
                  {count}
                </Text>
              </View>
            )}
          </View>
        );
      }
      return null; // Return null if the condition is not met
    },
  }}
  listeners={{
    focus: () => {
      deleteVisitorFunction();
    },
  }}
/> */}
          
          <Drawer.Screen
  name="Settings"
  options={{
    drawerLabel: ({ focused }) => (
      <Text
        style={{
          color: focused ? "white" : "white",
          fontWeight: focused ? "bold" : "500",
        }}
      >
        Settings
      </Text>
    ),
    drawerIcon: ({ focused }) => (
      <Image
        source={settings}
        style={{
          width: 28,
          height: 28,
          tintColor: focused ? "white" : "white",
        }}
      />
    ),
  }}
>
  {(props) => (
    <SettingsPage
      {...props}
      finalCompleteObj={finalCompleteObj}
    />
  )}
</Drawer.Screen>
     </Drawer.Navigator>
    </>
)
}
export default Header